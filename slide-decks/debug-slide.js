#!/usr/bin/env node
/*
 * debug-slide.js — diagnóstico visual de slides Reveal.js (Canvas 2D + DOM)
 *
 * Por que existe:
 *  - O backend do navegador (Playwright MCP) é remoto e não alcança localhost.
 *  - O modelo de IA que executa este script não lê imagens.
 *  - Solução: navegar com Chromium headless LOCAL e imprimir o layout em TEXTO
 *    (seções, slides, flex-direction, bounding boxes) + salvar screenshot.
 *
 * Uso:
 *   node debug-slide.js <pasta-do-capitulo> [hash-do-slide]
 *
 *   Exemplos:
 *     node debug-slide.js capitulo-3 "#/1"        # slide horizontal 1 (história)
 *     node debug-slide.js capitulo-3 "#/2/2"      # slide vertical 2 do tópico 2
 *     node debug-slide.js capitulo-1              # abre no slide inicial
 *
 *   Screenshot salvo em /tmp/slide-debug.png
 *
 * Pré-requisito:
 *   sudo npm install -g playwright-core@1.62.1
 *   (versão pinada: casa com o chromium-1234 já presente em ~/.cache/ms-playwright)
 */

const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const PORT = 8090;
const BASE = 'http://127.0.0.1:' + PORT;
const OUT_PNG = '/tmp/slide-debug.png';

/* ------------------------------------------------------------------ */
/* 1. Resolve o playwright-core global                                 */
/* ------------------------------------------------------------------ */
const CANDIDATES = [
  '/usr/lib/node_modules/playwright-core',
  path.join(process.env.NODE_PATH || '', 'playwright-core'),
  '/home/oangelo/.npm/_npx/e41f203b7505f1fb/node_modules/playwright-core',
];

let playwright = null;
for (const c of CANDIDATES) {
  try {
    playwright = require(c);
    break;
  } catch (e) {
    /* tenta o próximo */
  }
}
if (!playwright) {
  console.error(
    'ERRO: playwright-core não encontrado. Instale com: sudo npm install -g playwright-core@1.62.1'
  );
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/* 2. Helpers                                                          */
/* ------------------------------------------------------------------ */
function isServerUp() {
  return new Promise((resolve) => {
    const http = require('http');
    const req = http.get(BASE + '/', { timeout: 1500 }, (res) => {
      resolve(true);
      res.resume();
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

function startServer(rootDir) {
  return new Promise((resolve, reject) => {
    const srv = spawn('python3', ['-m', 'http.server', String(PORT)], {
      cwd: rootDir,
      stdio: 'ignore',
      detached: true,
    });
    srv.unref();
    let tries = 0;
    const check = async () => {
      tries += 1;
      if (await isServerUp()) {
        resolve(srv);
        return;
      }
      if (tries > 20) {
        reject(new Error('Servidor não subiu em :' + PORT));
        return;
      }
      setTimeout(check, 250);
    };
    check();
  });
}

/* ------------------------------------------------------------------ */
/* 3. Main                                                             */
/* ------------------------------------------------------------------ */
async function main() {
  const args = process.argv.slice(2);
  if (!args[0]) {
    console.error('Uso: node debug-slide.js <pasta-do-capitulo> [hash-do-slide]');
    process.exit(1);
  }
  const chapterDir = args[0];
  const hash = args[1] || '';

  const slidesRoot = path.resolve(__dirname, '..'); // .../worktrees/slides
  const chapterPath = path.join(slidesRoot, 'slide-decks', chapterDir);
  if (!fs.existsSync(path.join(chapterPath, 'index.html'))) {
    console.error('ERRO: não existe index.html em', chapterPath);
    process.exit(1);
  }

  if (!(await isServerUp())) {
    console.log('Iniciando servidor HTTP em :' + PORT + ' ...');
    await startServer(slidesRoot);
  } else {
    console.log('Servidor HTTP já ativo em :' + PORT);
  }

  const url = BASE + '/slide-decks/' + chapterDir + '/index.html' + hash;
  console.log('Abrindo:', url);

  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  page.on('pageerror', (e) => pageErrors.push(String(e)));

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.error('ERRO ao carregar:', e.message);
    await browser.close();
    process.exit(1);
  }
  await page.waitForTimeout(2500);

  // Reveal inicializa de forma assíncrona (loader com fetch). Aguarda slides.
  await page.waitForFunction(() => {
    const slides = document.querySelectorAll('.reveal .slides > section');
    return slides.length >= 1;
  }, { timeout: 15000 }).catch(() => {});

  const diag = await page.evaluate(() => {
    const horizontal = Array.from(document.querySelectorAll('.reveal .slides > section'));
    const info = {
      horizontalCount: horizontal.length,
      verticalPerSection: horizontal.map((h) => ({
        title: (h.querySelector(':scope > h1, :scope > h2') || {}).textContent || '',
        verticalCount: h.querySelectorAll(':scope > section').length,
      })),
      current: (() => {
        const cur = document.querySelector('.reveal .slides section.present');
        if (!cur) return null;
        const txt = (cur.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120);
        const rect = cur.getBoundingClientRect();
        return { text: txt, w: Math.round(rect.width), h: Math.round(rect.height) };
      })(),
      dualPanels: Array.from(document.querySelectorAll('.reveal .dual-panel')).map((dp) => {
        const cs = getComputedStyle(dp);
        return {
          flexDirection: cs.flexDirection,
          display: cs.display,
          children: Array.from(dp.children).map((ch) => {
            const r = ch.getBoundingClientRect();
            const cls = typeof ch.className === 'string' ? ch.className : '';
            return { cls: cls.slice(0, 40), w: Math.round(r.width), h: Math.round(r.height) };
          }),
        };
      }),
      imgs: Array.from(document.querySelectorAll('.reveal .present img')).map((img) => ({
        src: img.src.slice(0, 80),
        natural: img.complete && img.naturalWidth > 0 ? img.naturalWidth + 'x' + img.naturalHeight : 'CARREGANDO/404',
        w: Math.round(img.getBoundingClientRect().width),
        h: Math.round(img.getBoundingClientRect().height),
      })),
      canvasPresent: document.querySelectorAll('.reveal canvas').length,
      vizExported: Object.keys(window).filter((k) => /^viz/.test(k)),
      inlineStyle: Array.from(document.querySelectorAll('.reveal [style]')).length,
      doubleBackslash: document.documentElement.outerHTML.split('\\\\\\\\').length - 1,
      hasReveal: typeof window.Reveal !== 'undefined',
    };
    return info;
  });

  await page.screenshot({ path: OUT_PNG, fullPage: false });

  // Sumário
  console.log('\n===== DIAGNÓSTICO =====');
  console.log('Reveal.js carregado:', diag.hasReveal);
  console.log('Seções horizontais:', diag.horizontalCount);
  diag.verticalPerSection.forEach((s, i) => {
    console.log(`  H${i}: "${s.title}" — ${s.verticalCount} slide(s) vertical(is)`);
  });
  if (diag.current) {
    console.log('Slide atual:', JSON.stringify(diag.current));
  }
  console.log('\nDual-panels:');
  diag.dualPanels.forEach((dp, i) => {
    console.log(
      `  DP${i}: display=${dp.display} flexDirection=${dp.flexDirection} | ` +
        dp.children.map((c) => `${c.cls || '(div)'}[${c.w}x${c.h}]`).join(' | ')
    );
  });
  console.log('\nImagens no slide atual:');
  diag.imgs.forEach((im, i) => console.log(`  IMG${i}: ${im.src} — ${im.natural} (render ${im.w}x${im.h})`));
  console.log('\nCanvas no deck:', diag.canvasPresent, '| window.viz*:', diag.vizExported.join(', ') || '(nenhum)');
  console.log('Elementos com style inline:', diag.inlineStyle);
  console.log('Contagem de barras duplas (\\\\ em HTML):', diag.doubleBackslash);

  if (consoleErrors.length) {
    console.log('\nErros de console:');
    consoleErrors.forEach((e) => console.log('  [console]', e.slice(0, 200)));
  }
  if (pageErrors.length) {
    console.log('\nErros de página:');
    pageErrors.forEach((e) => console.log('  [page]', e.slice(0, 200)));
  }

  console.log('\nScreenshot salvo em', OUT_PNG);
  await browser.close();
  process.exit(0);
}

main().catch((e) => {
  console.error('ERRO:', e.message);
  process.exit(1);
});
