# Spec: Template Canônico — Slides Reveal.js

**Versão:** 1.0
**Curso:** Cálculo Vetorial — Exploração Espacial (Guerra Fria)
**Destinatário:** Agente de implementação de slides

---

## Estrutura de diretório

```
slide-decks/capitulo-N-nome/
├── index.html              # Loader (fetch das seções, sem CSS inline)
├── 00-capa.html            # Título + emblema da facção + período
├── 01-historia.html        # 1 slide horizontal: dual-panel (texto + foto)
├── 02-topico-1.html        # Tópico 1 (slides verticais)
├── 03-topico-2.html        # Tópico 2 (slides verticais)
├── ...
├── NN-topico-N.html        # Último tópico
├── N+1-resumo.html         # Fórmulas-chave e conexões conceituais
├── N+2-reflexao.html       # Pergunta aberta + dissonância final
└── visualizacoes.js        # (opcional) Canvas 2D
```

### Mapeamento de tópicos

Cada arquivo de tópico (`02-topico-1.html` em diante) corresponde a **um tópico de exercício** já revisado em `exercicios/capitulo-N/`. Os nomes dos arquivos devem refletir o nome do tópico de exercício.

Exemplo (Cap 1):

```
02-funcao-vetorial.html      ← exercicios/capitulo-1/funcao-vetorial/
03-campo-vetorial.html       ← exercicios/capitulo-1/campo-vetorial/
04-limites.html              ← exercicios/capitulo-1/limites/
05-derivadas-parciais.html   ← exercicios/capitulo-1/derivadas-parciais/
06-rotacional.html           ← exercicios/capitulo-1/rotacional/
07-divergente.html           ← exercicios/capitulo-1/divergente/
```

---

## Navegação

- **Horizontal:** uma seção por arquivo (`00-capa`, `01-historia`, tópicos, resumo, reflexão)
- **Vertical:** aprofundamento dentro de cada seção (slides aninhados com `<section>`)

```
→  [Capa]  →  [História]  →  [Tópico 1]  →  [Tópico 2]  →  ...  →  [Resumo]  →  [Reflexão]
                              ↕                           ↕
                          definição                    definição
                          desenvolvimento              desenvolvimento
                          exemplo guiado               exemplo guiado
                          visualização                 visualização
```

---

## Especificação por tipo de seção

### `00-capa.html`

- **1 slide horizontal** (sem slides verticais)
- Usa classes `title-slide`, `faction-emblem`, `classified-banner`, `classified-footer`
- Conteúdo:
  - `classified-banner` com texto da facção ("TOP SECRET" para allies, "СОВЕРШЕННО СЕКРЕТНО" para soviet, "DOCUMENTO TÉCNICO" para neutral)
  - `faction-emblem` com SVG inline (ver `slide-decks/emblemas/`)
  - `h1` com título do capítulo
  - `title-rule` (linha decorativa)
  - `h3` com período histórico
  - `chapter-meta` com metadados
  - `classified-footer` com código de classificação
  - `doc-border` (borda decorativa)

### `01-historia.html`

- **1 slide horizontal** com layout `dual-panel`
- Esquerda: `history-section` com `history-label` — 3 a 5 frases (segue `narrative-spec.md`)
- Direita: foto pública (NASA, Wikipedia Commons) com `<img src="URL">` e crédito em `<small>` abaixo
- O texto deve seguir **uma** das 7 diretrizes do narrative-spec (não tentar cobrir todas)
- Sem fórmulas matemáticas neste slide

### `NN-topico-N.html` (tópicos de conteúdo)

- **1 seção horizontal** com slides verticais aninhados
- Estrutura vertical típica (3 a 6 slides):
  1. **Conceito/definição** — usa `math-section`
  2. **Desenvolvimento/formalização** — fórmulas, propriedades
  3. **Exemplo guiado** — pode usar `problem-section` + `compact-solution`
  4. **Visualização** (opcional) — `<canvas>` com `visualization-canvas`
  5. **Frase histórica** (opcional) — 1 frase no último slide vertical, apenas se servir à dissonância (segue `pedagogical-spec.md` Princípio 2: só fica se ajudar o aprendizado)
- O conteúdo deve alinhar com os exercícios revisados do tópico correspondente

### `N+1-resumo.html`

- **2 a 3 slides verticais**
- Slide 1: fórmulas-chave do capítulo em formato "cheat sheet"
- Slide 2: conexões entre os tópicos (ex: "rotacional mede giro; divergente mede dispersão")
- Slide 3 (opcional): mini-mapa conceitual visual
- Usa `math-section` para fórmulas

### `N+2-reflexao.html`

- **1 a 2 slides verticais**
- Usa `history-section` com `history-label`
- 1 frase final que planta dissonância (segue narrative-spec)
- 1 pergunta aberta sem resposta (segue pedagogical-spec Princípio 1)
- Sem resolução — o aluno sai com o desconforto

---

## Loader `index.html`

Template mínimo, **sem CSS inline**. Todo CSS vem de `../space-theme.css`.

```html
<!doctype html>
<html lang="pt-BR" data-faction="allies|soviet|neutral">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TÍTULO - Cálculo Vetorial</title>
    <link rel="stylesheet" href="../reveal.js/dist/reveal.css" />
    <link rel="stylesheet" href="../space-theme.css" />
    <script src="../reveal.js/dist/reveal.js"></script>
    <script src="../reveal.js/plugin/math/math.js"></script>
  </head>
  <body>
    <div class="reveal">
      <div class="slides" id="slides-container"></div>
    </div>
    <script src="visualizacoes.js"></script>
    <script>
      async function loadSlides() {
        const sections = [
          '00-capa.html',
          '01-historia.html',
          '02-topico-1.html',
          /* ... */
          'NN-resumo.html',
          'NN-reflexao.html',
        ];

        const container = document.getElementById('slides-container');

        for (const sectionFile of sections) {
          try {
            const response = await fetch(sectionFile);
            if (!response.ok) throw new Error(`Failed to load ${sectionFile}`);

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const inlineScripts = doc.querySelectorAll('script:not([src])');
            const sections = doc.querySelectorAll('body > section');

            sections.forEach((section) => container.appendChild(section));

            for (const script of inlineScripts) {
              const scriptContent = script.textContent;
              if (scriptContent.trim()) {
                const newScript = document.createElement('script');
                newScript.textContent = scriptContent;
                document.body.appendChild(newScript);
              }
            }
          } catch (error) {
            console.error(`Error loading ${sectionFile}:`, error);
          }
        }

        Reveal.initialize({
          controls: true,
          progress: true,
          center: true,
          hash: true,
          plugins: [RevealMath.MathJax3],
        });
      }

      window.addEventListener('load', loadSlides);
    </script>
  </body>
</html>
```

---

## Seções HTML (fragmentos)

Cada arquivo de seção (exceto `index.html`) é um **fragmento HTML** sem `<html>`, `<head>`, `<body>`. Contém apenas tags `<section>` e `<script>`.

```html
<section>
  <h2>Título da Seção (horizontal)</h2>

  <section>
    <h3>Slide Vertical 1</h3>
    <div class="math-section">
      <p>Conteúdo matemático...</p>
    </div>
  </section>

  <section>
    <h3>Slide Vertical 2</h3>
    <div class="problem-section">
      <p>Exemplo guiado...</p>
    </div>
    <div class="compact-solution">
      <p>Solução...</p>
    </div>
  </section>
</section>
```

---

## Classes CSS disponíveis (space-theme.css)

| Classe                 | Uso                                            |
| ---------------------- | ---------------------------------------------- |
| `title-slide`          | Slide de capa (layout centralizado)            |
| `faction-emblem`       | Container do emblema SVG                       |
| `classified-banner`    | Faixa superior de classificação                |
| `classified-footer`    | Faixa inferior                                 |
| `doc-border`           | Borda decorativa do documento                  |
| `title-rule`           | Linha decorativa entre título e subtítulo      |
| `chapter-meta`         | Metadados do capítulo (monospace, baixa opac.) |
| `classification-code`  | Código de classificação                        |
| `watermark`            | Marca d'água rotacionada                       |
| `math-section`         | Bloco de conteúdo matemático                   |
| `history-section`      | Bloco de contextualização histórica            |
| `history-label`        | Label posicionado no topo do history-section   |
| `problem-section`      | Enunciado de problema                          |
| `compact-solution`     | Solução compacta                               |
| `visualization-canvas` | Canvas para visualizações interativas          |
| `controls-container`   | Container para sliders/botões de interação     |
| `control-slider`       | Slider com label                               |
| `control-button`       | Botão de controle                              |
| `dual-panel`           | Dois painéis lado a lado (flex)                |

**NÃO criar classes CSS novas** nos arquivos de seção. Se precisa de estilo novo, adicionar em `space-theme.css`.

---

## Regras

### MathJax

- Inline: `\(f(x)\)`
- Bloco: `\[ \int_a^b f(x) \, dx \]`
- **NUNCA** usar `$...$` (dollar sign)
- **NUNCA** usar `\\(`, `\\[`, `\\frac` (barra dupla quebra MathJax)
- Verificação: `grep -c '\\\\' arquivo.html` — resultado deve ser 0

### Limites

- Máximo 250 palavras por slide
- Máximo 2-3 fórmulas complexas por slide
- Títulos com menos de 60 caracteres
- Texto de história: 3-5 frases no máximo

### Imagens

- Usar URLs públicas (NASA.gov, Wikipedia Commons, Smithsonian)
- Incluir crédito: `<small>Crédito: NASA / Autor</small>` abaixo da imagem
- Dimensões: usar `max-width: 100%` (já em space-theme.css)
- Não usar base64 inline

### CSS

- **Zero CSS inline** nos arquivos de seção
- Todo CSS em `../space-theme.css`
- Se precisa de estilo novo → adicionar em space-theme.css

### Reveal.js

- Usar cópia local: `../reveal.js/` (nunca CDN)
- Plugin de math: `../reveal.js/plugin/math/math.js`
- Config: `controls: true, progress: true, center: true, hash: true`
- MathJax 3 via plugin (`RevealMath.MathJax3`)

### JavaScript (visualizações)

- Encapsular em IIFE
- Expor via `window.vizNome = { init, cleanup }`
- Usar `requestAnimationFrame`, nunca `setInterval`
- Cleanup: `cancelAnimationFrame` quando slide não está visível
- IDs únicos para cada canvas
- Código em `visualizacoes.js` compartilhado, ou inline na seção se for específico

---

## Facções por capítulo

| Cap | Facção  | `data-faction` | Banner              |
| --- | ------- | -------------- | ------------------- |
| 0   | Neutro  | `neutral`      | DOCUMENTO TÉCNICO   |
| 1   | URSS    | `soviet`       | СОВЕРШЕННО СЕКРЕТНО |
| 2   | Aliados | `allies`       | TOP SECRET          |
| 3   | URSS    | `soviet`       | СОВЕРШЕННО СЕКРЕТНО |
| 4   | Aliados | `allies`       | TOP SECRET          |
| 5   | URSS    | `soviet`       | СОВЕРШЕННО СЕКРЕТНО |
| 6   | Aliados | `allies`       | TOP SECRET          |
| 7   | URSS    | `soviet`       | СОВЕРШЕННО СЕКРЕТНО |
| 8   | Aliados | `allies`       | TOP SECRET          |
| 9   | URSS    | `soviet`       | СОВЕРШЕННО СЕКРЕТНО |

---

## Emblemas

SVGs dos emblemas estão em `slide-decks/emblemas/`. Incluir inline no `00-capa.html` dentro de `<div class="faction-emblem">`.
