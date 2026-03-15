# Prompt: Criar Slides de Geometria Analítica e Cônicas — Capítulo 0

## Contexto

Curso de Cálculo Vetorial com tema de Exploração Espacial. Capítulo 0 é "Revisão" e precisa de slides de **Geometria Analítica** e **Cônicas** que não existem ainda.

## Localização dos arquivos

```
Tree: /home/oangelo/git/Calculo-Vetorial-Exploracao-Espacial/.tree/slide-decks/
Pasta dos slides: slide-decks/capitulo-0-revisao/
```

## Ordem desejada (index.html)

```
01-titulo.html
02-introducao.html
03-geometria-analitica.html  ← CRIAR
04-conicas.html              ← CRIAR
05-derivadas.html            (já existe)
06-integrais.html            (já existe)
07-curvas-de-nivel.html      (já existe)
08-historia.html             (já existe)
09-conclusao.html            (já existe)
```

## Regras CRÍTICAS (aprendidas na marra)

### LaTeX — USA EXATAMENTE ASSIM:
- Inline: `\(f(x)\)` — barra simples + parênteses
- Display: `\[f(x) = c\]` — barra simples + colchetes
- **NÃO usar** `$...$` nem `$$...$$`
- **NÃO usar** `\\` (barra dupla) — era `\\vec{v}` no arquivo fonte mas o sed corrompeu

### Visualizações — SEGUE O PADRÃO EXATO:
```javascript
(function () {
  let canvas, ctx, slider;

  function init() {
    canvas = document.getElementById('meu-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    slider = document.getElementById('meu-slider');
    if (slider) slider.addEventListener('input', draw);
    draw();
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ... desenhar ...
    const valor = slider ? parseFloat(slider.value) : 0;
    // ... atualizar span se houver ...
  }

  function cleanup() {
    if (slider) slider.removeEventListener('input', draw);
  }

  window.vizMeuNome = { init, cleanup };
})();
```

### HTML dos slides:
```html
<section class="math-section">
  <h3>Título</h3>
  <p>Texto com \(inline\) math</p>
  \[equação display\]
  <canvas id="meu-canvas" class="visualization-canvas" width="500" height="350"></canvas>
  <div class="controls-container">
    <div class="control-slider">
      <label for="meu-slider">label =</label>
      <input type="range" id="meu-slider" min="0" max="10" step="1" value="5" />
      <span id="meu-slider-value">5</span>
    </div>
  </div>
</section>
```

### Inicialização no visualizacoes.js

No handler `Reveal.on('ready', ...)` adicionar:
```javascript
if (window.vizMeuNome) window.vizMeuNome.init();
```

No handler `Reveal.on('slidechanged', ...)` adicionar:
```javascript
if (event.currentSlide.querySelector('#meu-canvas') && window.vizMeuNome) {
  window.vizMeuNome.init();
}
```

## Conteúdo: Geometria Analítica (03-geometria-analitica.html)

**Separar texto de visualização — cada canvas em slide próprio!**

1. **Slide título**: "Geometria Analítica no Espaço" — introdução
2. **Coordenadas 3D** (só texto):
   - Ponto P(x,y,z), distância, equação da esfera
3. **Visualização Coordenadas 3D** (canvas `coordenadas-3d`):
   - Eixos x,y,z coloridos (azul,verde,vermelho)
   - Ponto P(2,1,1.5) com linhas pontilhadas
   - Slider para rotação
4. **Vetores** (só texto):
   - Definição, magnitude, vetor unitário
5. **Visualização Vetor** (canvas `vetor-basico`):
   - Vetor interativo com sliders vx, vy
   - Mostrar magnitude calculada
6. **Produto Escalar** (só texto):
   - Fórmula, interpretação geométrica, projeção
7. **Produto Vetorial** (só texto):
   - Fórmula com determinante, propriedades, produto misto
8. **Visualização Produto Vetorial** (canvas `produto-vetorial`):
   - Dois vetores, paralelogramo (área), animação
9. **Retas** (só texto):
   - Forma vetorial e paramétrica
10. **Visualização Reta** (canvas `reta-espaco`):
    - Reta com slider para parâmetro t
11. **Planos** (só texto):
    - Vetor normal, equação geral, distância
12. **Visualização Plano** (canvas `plano-espaco`):
    - Plano com vetor normal, sliders a,b,c

## Conteúdo: Cônicas (04-conicas.html)

1. **Slide título**: "Seções Cônicas" — Kepler, contexto histórico
2. **Elipse** (texto):
   - Definição (soma das distâncias), equação, elementos
3. **Visualização Elipse** (canvas `elipse-canvas`):
   - Elipse com focos, slider excentricidade
4. **Parábola** (texto):
   - Definição (distância foco=diretriz), equações, elementos
5. **Visualização Parábola** (canvas `parabola-canvas`):
   - Parábola com foco e diretriz, slider p
6. **Hipérbole** (texto):
   - Definição (diferença das distâncias), equação, assíntotas
7. **Visualização Hipérbole** (canvas `hiperbole-canvas`):
   - Hipérbole com assíntotas, slider excentricidade
8. **Aplicações** (texto):
   - Tipos de órbita baseados em e
9. **Visualização Órbitas** (canvas `orbitas-canvas`):
   - Órbita mudando de elipse para parábola para hipérbole

## Paleta de cores (visualizações)

```javascript
const COR_POSICAO = '#1E88E5';    // azul
const COR_VELOCIDADE = '#43A047'; // verde
const COR_ACELERACAO = '#E53935'; // vermelho
const COR_FORCA = '#FFB300';      // amarelo
const COR_FUNDO = '#0a0a0f';      // fundo escuro
```

## Verificação

1. `cd .tree/slide-decks/slide-decks/capitulo-0-revisao`
2. `python3 -m http.server 8765` (da pasta slide-decks, não de dentro do capítulo!)
3. Abrir `http://localhost:8765/capitulo-0-revisao/index.html`
4. Verificar:
   - LaTeX renderiza (sem `\\` visíveis)
   - Canvas aparecem e respondem a sliders
   - Conteúdo cabe na tela
   - Navegação vertical funciona

## Arquivos de referência

- Slide que FUNCIONA: `07-curvas-de-nivel.html` + visualização `vizEsferaNiveis`
- CSS: `../space-theme.css` (classes: `math-section`, `visualization-canvas`, `controls-container`, `control-slider`, `note`, `dual-panel`, `history-section`)
- Reveal.js: `../reveal.js/`

## O que NÃO fazer

- NÃO usar `$...$` ou `$$...$$` para LaTeX
- NÃO usar `\\` (barra dupla) em comandos LaTeX
- NÃO misturar texto e canvas no mesmo slide (fica apertado)
- NÃO usar Three.js (só Canvas 2D)
- NÃO criar visualizações complexas com muitos elementos
