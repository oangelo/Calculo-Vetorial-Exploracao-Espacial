# Spec: Template Canônico — Slides Reveal.js

**Versão:** 1.4
**Curso:** Cálculo Vetorial — Exploração Espacial (Guerra Fria)
**Destinatário:** Agente de implementação de slides

> **ATENÇÃO:** Este spec foi complementado pelo `template-system.md`, que define o sistema de templates com slides âncora (fixos) e slides variáveis (alternam layout). Leia ambos antes de implementar.
>
> **Design visual:** Consulte `visual-design-spec.md` para os 3 princípios de design visual (hierarquia tipográfica, enquadramento via slide-header/footer, profundidade por opacidade). Todo slide que NÃO é capa deve ter `slide-header` e `slide-footer`.

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

> **Sistema de templates:** `template/template-system.md` define slides **âncora** (layout fixo: capa, história, abertura de tópico, resumo, reflexão) e slides **variáveis** (alternam layout: conceito, fórmula, exemplo, visualização). Os templates HTML de cada variante estão em `template/ancoras/` e `template/variaveis/`.

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

- **1 seção horizontal** com slides verticais aninhados (5 a 8 slides)
- O conteúdo deve alinhar com os exercícios revisados do tópico correspondente

#### Fluxo pedagógico obrigatório

Cada seção de conteúdo segue este fluxo. A ordem não é sugerida — é obrigatória:

```
━━━ ABERTURA (V1) ━━━
  Pergunta-problema ou situação concreta que motiva o tópico
  Conexão com tópico anterior (progressão)
  Insert histórico (1-2 frases, parágrafo final, com a classe `history-insert`)
  → TODA seção de conteúdo recebe insert no V1. Sem exceção.
    Se não houver conexão natural, criar por analogia, contraste ou ironia.
  → Layout fixo (âncora A3). Ver template `template/ancoras/a3-abertura-topico.html`.

━━━ CONCEITO (V2) ━━━
  A ideia ANTES da fórmula
  O que é, para que serve, analogia visual
  Exemplo intuitivo (cotidiano ou espacial)
  → O aluno deve entender O QUE é antes de ver COMO se calcula.
  → Layout variável (V-CONCEITO). Escolher entre variantes A, B, C.
    Ver `template/template-system.md` § V-CONCEITO e templates em `template/variaveis/v-conceito-*.html`.

━━━ FORMALIZAÇÃO (V3-V4) ━━━
  V3: Definição matemática precisa + fórmula principal
      → usar formula-spotlight para a fórmula principal
  V4: Interpretação geométrica e/ou propriedades
      → pode usar dual-panel para comparar
  → Layout variável (V-FORMULA). Escolher entre variantes A, B, C.
    Ver `template/template-system.md` § V-FORMULA e templates em `template/variaveis/v-formula-*.html`.

━━━ APLICAÇÃO (V5-V6) ━━━
  1 a 3 exemplos clássicos, calculáveis em aula
  → usar problem-section (NUNCA compact-solution nos exemplos)
  → NUNCA incluir solução — o professor resolve em sala de aula
  → OBRIGATÓRIO: toda seção tem pelo menos 1 exemplo guiado
  → Exemplos devem ser problemas clássicos do tópico, não truques
  → Exemplos podem usar dual-panel: esquerda = math, direita = fragmento histórico/emocional
  → O fragmento NÃO precisa ter relação lógica com o exemplo — justaposição emocional é válida
  → Nem todos os exemplos precisam de fragmento — dinâmico, 1 ou mais por seção
  → Fragmentos seguem narrative-spec.md (Camada 3: fragmentos)
  → Layout variável (V-EXEMPLO). Escolher entre variantes A, B, C, D.
    Ver `template/template-system.md` § V-EXEMPLO e templates em `template/variaveis/v-exemplo-*.html`.
  → REGRA DE ALTERNÂNCIA: nunca repetir a mesma variante em exemplos consecutivos.
  → Se o exemplo for complexo, adicionar V-DICA após (dica de resolução, sem valores calculados).

━━━ EXPLORAÇÃO (V7, opcional) ━━━
  Visualização interativa (Canvas 2D)
  → usar visualization-canvas + controls-container
  → IIFE com window.vizNome = { init, cleanup }
  → IDs únicos para cada canvas
  → Layout variável (V-VISUALIZACAO). Escolher entre variantes A, B, C.
    Ver `template/template-system.md` § V-VISUALIZACAO e templates em `template/variaveis/v-visualizacao-*.html`.
```

**Número típico de slides por seção:** 5 (mínimo) a 8 (máximo).

**Exceções permitidas:** nenhuma. Todo tópico tem motivação, conceito, fórmula, exemplo e (quando aplicável) visualização.

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

**Loaders prontos por facção** (copiar para `index.html` do capítulo):

| Facção  | Loader                         | Capítulos     |
| ------- | ------------------------------ | ------------- |
| Aliados | `template/loader-allies.html`  | 2, 4, 6, 8    |
| URSS    | `template/loader-soviet.html`  | 1, 3, 5, 7, 9 |
| Neutro  | `template/loader-neutral.html` | 0             |

Após copiar, editar apenas: `title`, array `sections` e (se necessário) adicionar `<script src="visualizacoes.js">`.

**Regras do loader:**

- Fragmentos HTML usam `<section>` direto no `<body>` (NUNCA dentro de `<div class="slides">`)
- Usa `doc.querySelectorAll('body > section')` — sem fallback `.slides`
- Zero CSS inline, zero CDN, zero arquivos CSS complementares
- `data-faction` no `<html>` define as cores da facção

Referência implementada: `capitulo-1-funcoes-vetoriais/index.html`.

```html
<!doctype html>
<html lang="pt-BR" data-faction="allies|soviet|neutral">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[TÍTULO] - Cálculo Vetorial</title>
    <link rel="stylesheet" href="../reveal.js/dist/reveal.css" />
    <link rel="stylesheet" href="../space-theme.css" />
    <script src="../reveal.js/dist/reveal.js"></script>
    <script src="../reveal.js/plugin/math/math.js"></script>
  </head>
  <body>
    <div class="reveal">
      <div class="slides" id="slides-container"></div>
    </div>
    <script>
      async function loadSlides() {
        var sections = [
          '00-capa.html',
          '01-historia.html',
          '02-topico-1.html',
          /* ... */
          'NN-resumo.html',
          'NN-reflexao.html',
        ];

        var container = document.getElementById('slides-container');

        for (var i = 0; i < sections.length; i++) {
          var sectionFile = sections[i];
          try {
            var response = await fetch(sectionFile);
            if (!response.ok) throw new Error('Failed to load ' + sectionFile);

            var html = await response.text();
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');

            var inlineScripts = doc.querySelectorAll('script:not([src])');
            var parsedSections = doc.querySelectorAll('body > section');

            parsedSections.forEach(function (section) {
              container.appendChild(section);
            });

            for (var j = 0; j < inlineScripts.length; j++) {
              var scriptContent = inlineScripts[j].textContent;
              if (scriptContent.trim()) {
                var newScript = document.createElement('script');
                newScript.textContent = scriptContent;
                document.body.appendChild(newScript);
              }
            }
          } catch (error) {
            console.error('Error loading ' + sectionFile + ':', error);
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
    <div class="slide-header">SEÇÃO 02 · TÓPICO</div>
    <div class="slide-body">
      <h3>Slide Vertical 1</h3>
      <div class="math-section">
        <p>Conteúdo matemático...</p>
      </div>
    </div>
    <div class="slide-footer">CV-CH[N]-[ANO] · CAPÍTULO [N]</div>
  </section>

  <section>
    <div class="slide-header">SEÇÃO 02 · TÓPICO</div>
    <div class="slide-body">
      <h3>Slide Vertical 2 — Exemplo</h3>
      <div class="problem-section">
        <p>Enunciado do problema (sem solução)...</p>
      </div>
    </div>
    <div class="slide-footer">CV-CH[N]-[ANO] · CAPÍTULO [N]</div>
  </section>

  <section>
    <div class="slide-header">SEÇÃO 02 · TÓPICO</div>
    <div class="slide-body">
      <h3>Slide Vertical 3 — Dica de Resolução</h3>
      <div class="compact-solution">
        <p>
          <strong>Estratégia:</strong> 1. Passo sem valores. 2. Passo. 3. Passo.
        </p>
      </div>
    </div>
    <div class="slide-footer">CV-CH[N]-[ANO] · CAPÍTULO [N]</div>
  </section>
</section>
```

---

## Classes CSS disponíveis (space-theme.css)

| Classe                 | Uso                                                |
| ---------------------- | -------------------------------------------------- |
| `title-slide`          | Slide de capa (layout centralizado)                |
| `faction-emblem`       | Container do emblema SVG                           |
| `classified-banner`    | Faixa superior de classificação                    |
| `classified-footer`    | Faixa inferior                                     |
| `doc-border`           | Borda decorativa do documento                      |
| `title-rule`           | Linha decorativa entre título e subtítulo          |
| `chapter-meta`         | Metadados do capítulo (monospace, baixa opac.)     |
| `classification-code`  | Código de classificação                            |
| `watermark`            | Marca d'água rotacionada                           |
| `math-section`         | Bloco de conteúdo matemático                       |
| `history-section`      | Bloco de contextualização histórica                |
| `history-label`        | Label posicionado no topo do history-section       |
| `history-insert`       | Insert histórico no V1 (itálico + barra de acento) |
| `problem-section`      | Enunciado de problema                              |
| `compact-solution`     | Dica de resolução (V-DICA, sem valores calculados) |
| `visualization-canvas` | Canvas para visualizações interativas              |
| `canvas-overlay`       | Container para overlay de fórmulas sobre canvas    |
| `controls-container`   | Container para sliders/botões de interação         |
| `control-slider`       | Slider com label                                   |
| `control-button`       | Botão de controle                                  |
| `dual-panel`           | Dois painéis lado a lado (flex)                    |
| `triple-panel`         | Três painéis lado a lado (flex)                    |
| `slide-body`           | Container flex entre header e footer               |
| `slide-header`         | Cabeçalho de navegação (topo, monospace)           |
| `slide-footer`         | Rodapé de navegação (base, monospace)              |
| `h-bar`                | Barra horizontal divisória                         |
| `v-bar`                | Barra vertical divisória (usar dentro de dual)     |
| `timeline`             | Timeline vertical (Cap 0 — Revisão)                |
| `timeline-item`        | Item da timeline                                   |
| `timeline-date`        | Data destacada na timeline                         |

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

- **Zero CSS inline** nos arquivos de seção e no `index.html`
- **Zero arquivos CSS complementares** (tudo em `../space-theme.css`)
- Se precisa de estilo novo → adicionar em space-theme.css
- Classes existentes cobrem todos os casos de uso (dual-panel, math-section, etc.)

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
