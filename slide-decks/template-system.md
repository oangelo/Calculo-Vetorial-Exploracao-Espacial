# Sistema de Templates — Slides Reveal.js

**Versão:** 1.2
**Curso:** Cálculo Vetorial — Exploração Espacial (Guerra Fria)
**Destinatário:** Agente de implementação de slides

---

## Estrutura de arquivos

```
slide-decks/template/
├── template-system.md          # Este documento
├── mockup.html                 # Apresentação de exemplo usando todas as variantes
├── loader-allies.html          # Loader canônico para facção Aliados (copiar para index.html)
├── loader-soviet.html          # Loader canônico para facção Soviética
├── loader-neutral.html         # Loader canônico para facção Neutra
├── ancoras/                    # Slides de layout fixo
│   ├── a1-capa.html
│   ├── a2-historia.html
│   ├── a3-abertura-topico.html
│   ├── a4-resumo.html
│   └── a5-reflexao.html
└── variaveis/                  # Slides de layout variável
    ├── v-conceito-a.html
    ├── v-conceito-b.html
    ├── v-conceito-c.html
    ├── v-formula-a.html
    ├── v-formula-b.html
    ├── v-formula-c.html
    ├── v-exemplo-a.html
    ├── v-exemplo-b.html
    ├── v-exemplo-c.html
    ├── v-exemplo-d.html
    ├── v-visualizacao-a.html
    ├── v-visualizacao-b.html
    └── v-visualizacao-c.html
```

**Mockup:** `mockup.html` é uma apresentação completa de demonstração com 2 tópicos, mostrando como as variantes se alternam na prática. Abra no Firefox para visualizar.

**Loaders por facção:** `loader-allies.html`, `loader-soviet.html`, `loader-neutral.html` — copiar para `index.html` do capítulo, editar título e array de seções.

---

## Filosofia

Manter alguns slides sempre identicos para que o aluno se situe (capa, historia, abertura de secao, resumo, reflexao). Variar os slides de conteudo (conceito, formula, exemplo, visualizacao) para nao cair na monotonia. O aluno reconhece a estrutura pelas ancora, mas nao sabe o que vem dentro de cada secao.

---

## Slides Ancora (SEMPRE IGUAIS)

Estes slides usam layout fixo em TODO capitulo. O aluno aprende a reconhece-los como marcos de navegacao.

### A1 — Capa (`00-capa.html`)

**Layout fixo:**

- `classified-banner` no topo (texto varia por faccao)
- `faction-emblem` com SVG da faccao
- `h1` titulo do capitulo
- `title-rule` + `h3` subtitulo
- `chapter-meta` com numero, era, periodo
- `classified-footer` com texto da faccao
- `doc-border` borda decorativa

**O que muda:** titulo, faccao, periodo. A estrutura NAO muda.

```html
<section class="title-slide">
  <div class="classified-banner">[BANNER FACCAO]</div>
  <div class="doc-border"></div>
  <div class="watermark">[MARCA]</div>
  <p class="classification-code">DOC. REF: CV-CH[N]-[ANO]</p>
  <div class="faction-emblem"></div>
  <div class="title-rule"></div>
  <h1>[TITULO CAPITULO]</h1>
  <h3>Cálculo Vetorial</h3>
  <div class="title-rule"></div>
  <p class="chapter-meta">Capítulo [N] &middot; [ERA] &middot; [PERIODO]</p>
  <div class="classified-footer">[RODAPE FACCAO]</div>
</section>
```

**Template pronto:** `template/ancoras/a1-capa.html`

---

### A2 — Historia (`01-historia.html`)

**Layout fixo:** sempre `dual-panel`

- Esquerda: `history-section` com `history-label` — 3 a 5 frases
- Direita: foto publica com credito

**O que muda:** texto da historia, imagem, faccao. O layout NAO muda.

```html
<section>
  <div class="dual-panel">
    <div class="history-section">
      <span class="history-label">[LABEL]</span>
      <p>[3-5 frases de narrativa historica]</p>
    </div>
    <div>
      <img src="[URL]" alt="[descricao]" />
      <small>Crédito: [FONTE]</small>
    </div>
  </div>
</section>
```

**Template pronto:** `template/ancoras/a2-historia.html`

---

### A3 — Abertura de Topico (V1)

**Layout fixo:** pergunta-problema + insert historico

- Titulo h2 com nome do topico
- Paragrafo de motivacao (pergunta ou situacao concreta)
- Paragrafo de conexao com topico anterior
- **Insert historico obrigatorio:** 1-2 frases no paragrafo final, sem classe CSS especial

**O que muda:** conteudo da motivacao e do insert. A estrutura NAO muda.

```html
<section>
  <h2>[Nome do Topico]</h2>
  <p>[Pergunta-problema que motiva o topico]</p>
  <p>[Conexao com topico anterior — progressao]</p>
  <p>[Insert historico: 1-2 frases, paragrafo simples]</p>
</section>
```

**Template pronto:** `template/ancoras/a3-abertura-topico.html`

---

### A4 — Resumo (`N+1-resumo.html`)

**Layout fixo:** 2-3 slides verticais

- V1: formulas-chave em formato "cheat sheet" (lista de formulas)
- V2: conexoes entre topicos (texto curto)
- V3 (opcional): mini-mapa conceitual

```html
<section>
  <section>
    <h2>Resumo — Fórmulas-Chave</h2>
    <div class="math-section">
      <p>[Formula 1]</p>
      <p>[Formula 2]</p>
      <p>[Formula 3]</p>
    </div>
  </section>
  <section>
    <h2>Conexões</h2>
    <p>[Conexoes entre topicos do capitulo]</p>
  </section>
</section>
```

**Template pronto:** `template/ancoras/a4-resumo.html`

---

### A5 — Reflexao (`N+2-reflexao.html`)

**Layout fixo:** `history-section` com pergunta aberta

- 1 frase que planta dissonanca
- 1 pergunta aberta sem resposta

```html
<section>
  <div class="history-section">
    <span class="history-label">REFLEXÃO</span>
    <p>[Frase de dissonancia final]</p>
    <p>[Pergunta aberta sem resposta]</p>
  </div>
</section>
```

**Template pronto:** `template/ancoras/a5-reflexao.html`

---

## Slides Variaveis (ALTERNAM LAYOUT)

Estes slides variam de layout para evitar monotonia. O agente escolhe a variante conforme o conteudo e o ritmo desejado.

### V-CONCEITO — A ideia antes da formula (V2)

**Funcao:** O aluno entende O QUE e antes de ver COMO calcula.

**Variante A: Texto + Ilustracao**

```html
<section>
  <h3>[Titulo do Conceito]</h3>
  <p>[Explicacao intuitiva em 2-3 frases]</p>
  <p>[Analogia visual ou cotidiana]</p>
  <div class="math-section">
    <p>[Exemplo intuitivo, ainda sem formula geral]</p>
  </div>
</section>
```

**Template pronto:** `template/variaveis/v-conceito-a.html`

**Variante B: Dual-Panel (Analogia / Definicao)**

```html
<section>
  <h3>[Titulo do Conceito]</h3>
  <div class="dual-panel">
    <div>
      <p><strong>Analogia:</strong></p>
      <p>[Analogia cotidiana ou espacial]</p>
    </div>
    <div>
      <p><strong>Definicao informal:</strong></p>
      <p>[Descricao em palavras do conceito]</p>
    </div>
  </div>
</section>
```

**Template pronto:** `template/variaveis/v-conceito-b.html`

**Variante C: Triple-Panel (3 interpretacoes)**

```html
<section>
  <h3>Tres Interpretacoes</h3>
  <div class="triple-panel">
    <div>
      <p><strong>[Nome 1]</strong></p>
      <p>[Descricao curta]</p>
    </div>
    <div>
      <p><strong>[Nome 2]</strong></p>
      <p>[Descricao curta]</p>
    </div>
    <div>
      <p><strong>[Nome 3]</strong></p>
      <p>[Descricao curta]</p>
    </div>
  </div>
</section>
```

**Template pronto:** `template/variaveis/v-conceito-c.html`

**Quando usar cada:**

- A: conceito simples, uma ideia central
- B: conceito que beneficia de comparacao (familiar vs novo)
- C: conceito com multiplas faces (ex: funcao vetorial = curva/campo/transformacao)

---

### V-FORMULA — Definicao matematica (V3-V4)

**Funcao:** Apresentar a formula principal e sua interpretacao.

**REGRA: SEMPRE definir cada termo e indicar validade.**

**Variante A: Formula Central em Spotlight + Termos**

```html
<section>
  <h3>[Titulo]</h3>
  <div class="formula-spotlight">
    <p>\[ [Formula principal] \]</p>
  </div>
  <div class="math-section">
    <p><strong>Onde:</strong></p>
    <ul>
      <li>\(a\) = [significado completo]</li>
      <li>\(b\) = [significado completo]</li>
    </ul>
    <p><strong>Validade:</strong> [quando a formula se aplica]</p>
  </div>
</section>
```

**Template pronto:** `template/variaveis/v-formula-a.html`

**Variante B: Dual-panel com v-bar (Formula | Geometria)**

```html
<section>
  <h3>[Titulo]</h3>
  <div class="dual-panel">
    <div class="math-section">
      <p><strong>Definicao:</strong></p>
      <p>\[ [Formula] \]</p>
      <p><strong>Onde:</strong> [termos]</p>
      <p><strong>Validade:</strong> [quando aplica]</p>
    </div>
    <div class="v-bar"></div>
    <div class="math-section">
      <p><strong>Geometricamente:</strong></p>
      <p>[Interpretacao visual]</p>
    </div>
  </div>
</section>
```

**Template pronto:** `template/variaveis/v-formula-b.html`

**Variante C: Formula Grande + Propriedades em Lista**

```html
<section>
  <h3>[Titulo]</h3>
  <div class="formula-spotlight">
    <p>\[ [Formula grande] \]</p>
  </div>
  <div class="math-section">
    <p><strong>Onde:</strong></p>
    <ul>
      <li>[termo 1]</li>
      <li>[termo 2]</li>
    </ul>
    <p><strong>Validade:</strong> [quando aplica]</p>
  </div>
  <div class="h-bar"></div>
  <div class="math-section">
    <p><strong>Propriedades:</strong></p>
    <ul>
      <li>[Propriedade 1]</li>
      <li>[Propriedade 2]</li>
    </ul>
  </div>
</section>
```

**Template pronto:** `template/variaveis/v-formula-c.html`

**Quando usar cada:**

- A: formula unica, precisa de destaque
- B: formula com interpretacao geometrica importante
- C: formula com muitas propriedades ou casos

---

### V-EXEMPLO — Problema para sala (V5-V6)

**Funcao:** Apresentar 1-3 problemas classicos para resolucao em aula.

**REGRA CRITICA: NUNCA incluir solucao.** O professor resolve em sala de aula. Cada exemplo combina **questao matematica** + **questao historica** (exceto variante D). Separar com `v-bar` (vertical) ou `h-bar` (horizontal).

**Variante A: Dual-panel com v-bar (Math | Historia)**

```html
<section>
  <h3>Exemplo: [Titulo]</h3>
  <div class="dual-panel">
    <div class="problem-section">
      <p>[Enunciado matematico]</p>
    </div>
    <div class="v-bar"></div>
    <div class="history-section">
      <span class="history-label">CONTEXTO</span>
      <p><strong>Questao:</strong> [Questao historica]</p>
    </div>
  </div>
</section>
```

**Template pronto:** `template/variaveis/v-exemplo-a.html`

**Variante B: Dual-panel invertido (Historia | Math)**

```html
<section>
  <h3>Exemplo: [Titulo]</h3>
  <div class="dual-panel">
    <div class="history-section">
      <span class="history-label">CONTEXTO</span>
      <p><strong>Questao:</strong> [Questao historica]</p>
    </div>
    <div class="v-bar"></div>
    <div class="problem-section">
      <p>[Enunciado matematico]</p>
    </div>
  </div>
</section>
```

**Template pronto:** `template/variaveis/v-exemplo-b.html`

**Variante C: Empilhado com h-bar**

```html
<section>
  <h3>Exemplo: [Titulo]</h3>
  <div class="problem-section">
    <p>[Enunciado matematico]</p>
  </div>
  <div class="h-bar"></div>
  <div class="history-section">
    <span class="history-label">CONTEXTO</span>
    <p><strong>Questao:</strong> [Questao historica]</p>
  </div>
</section>
```

**Template pronto:** `template/variaveis/v-exemplo-c.html`

**Variante D: Math puro (sem historia)**

```html
<section>
  <h3>Exemplo: [Titulo]</h3>
  <div class="problem-section">
    <p>[Enunciado matematico]</p>
  </div>
</section>
```

**Template pronto:** `template/variaveis/v-exemplo-d.html`

**Quando usar cada:**

- A: padrao — math a esquerda, historia a direita, barra vertical separando
- B: contexto historico motiva o problema — historia vem primeiro
- C: ambos melhor lidos em sequencia (mais espaco horizontal)
- D: exemplo tecnico demais, ou quando ja houve historia nos exemplos anteriores

**Regra de alternancia:** se o exemplo anterior usou B, o proximo deve usar A, C ou D. Nunca dois B seguidos.

### V-DICA — Dica de resolucao (opcional, slide vertical apos exemplo)

**Funcao:** Dar direcao ao aluno SEM revelar a resposta.

```html
<section>
  <div class="compact-solution">
    <p><strong>Estrategia de resolucao:</strong></p>
    <ol>
      <li>[Passo 1 — sem valores numericos]</li>
      <li>[Passo 2]</li>
      <li>[Passo 3]</li>
    </ol>
  </div>
</section>
```

**Regra:** NUNCA incluir valores numericos calculados. Apenas a estrategia/rota de resolucao.

---

### V-VISUALIZACAO — Canvas interativo (V7, opcional)

**Funcao:** Ilustrar conceito com interatividade.

**Variante A: Canvas Grande + Controles Abaixo**

```html
<section>
  <h3>Visualizacao: [Titulo]</h3>
  <canvas
    id="[id-unico]"
    class="visualization-canvas"
    width="700"
    height="400"
  ></canvas>
  <div class="controls-container">
    <div class="control-slider">
      <label>[Label]:</label>
      <input type="range" id="[id]" min="0" max="100" value="50" />
    </div>
    <button class="control-button">Reiniciar</button>
  </div>
</section>
```

**Template pronto:** `template/variaveis/v-visualizacao-a.html`

**Variante B: Dual-Panel (Canvas / Explicacao)**

```html
<section>
  <h3>Visualizacao: [Titulo]</h3>
  <div class="dual-panel">
    <div>
      <canvas
        id="[id-unico]"
        class="visualization-canvas"
        width="350"
        height="350"
      ></canvas>
    </div>
    <div>
      <p>[Explicacao do que o canvas mostra]</p>
      <p>[Como interpretar]</p>
    </div>
  </div>
</section>
```

**Template pronto:** `template/variaveis/v-visualizacao-b.html`

**Variante C: Canvas com Overlay de Formulas**

```html
<section>
  <h3>Visualizacao: [Titulo]</h3>
  <div style="position: relative;">
    <canvas
      id="[id-unico]"
      class="visualization-canvas"
      width="700"
      height="400"
    ></canvas>
    <div
      class="math-section"
      style="position: absolute; top: 10px; right: 10px;"
    >
      <p>\[ [Formula relacionada] \]</p>
    </div>
  </div>
</section>
```

**Template pronto:** `template/variaveis/v-visualizacao-c.html`

**Quando usar cada:**

- A: visualizacao e o foco principal, precisa de espaco
- B: visualizacao precisa de explicacao textual ao lado
- C: formula e visual devem ser vistas simultaneamente

**IMPORTANTE:** Canvas usa IIFE com `window.vizNome = { init, cleanup }`. IDs unicos. `requestAnimationFrame`, nunca `setInterval`.

---

## Matriz de Decisao

O agente segue esta ordem para escolher a variante:

```
1. O slide e ancora? → Usar layout fixo
2. O slide e conteudo? → Identificar tipo (conceito/formula/exemplo/visualizacao)
3. Qual variante usar? → Verificar:
   a. O que foi usado no slide anterior do MESMO tipo?
   b. Qual variante ainda nao foi usada nesta secao?
   c. Qual melhor serve ao conteudo?
4. Regra: nunca repetir a mesma variante em slides consecutivos do mesmo tipo
```

### Exemplo de sequencia para um topico:

| Slide | Tipo              | Variante                | Justificativa                       |
| ----- | ----------------- | ----------------------- | ----------------------------------- |
| V1    | Ancora (abertura) | Fixo                    | Sempre igual                        |
| V2    | Conceito          | B (dual-panel)          | Comparacao familiar vs novo         |
| V3    | Formula           | A (spotlight)           | Formula unica, precisa de destaque  |
| V4    | Formula           | B (dual-panel)          | Interpretacao geometrica importante |
| V5    | Exemplo           | A (v-bar math/historia) | Padrao com questao historica        |
| V6    | Exemplo           | D (puro)                | Ja houve historia no V5             |
| V7    | Visualizacao      | A (canvas grande)       | Foco na interatividade              |

---

## Enquadramento Visual (slide-header / slide-footer)

**Referência completa:** `visual-design-spec.md` — Princípio 2 (Enquadramento).

Todo slide que NÃO é capa (A1) deve ter `slide-header` e `slide-footer`. Isso cria as "molduras" que dão volume ao slide, igual as barras da capa.

**Regras:**

| Tipo de slide            | Header                      | Footer                      | Notas           |
| ------------------------ | --------------------------- | --------------------------- | --------------- |
| A1 — Capa                | NÃO (usa classified-banner) | NÃO (usa classified-footer) | Moldura própria |
| A2 — História            | SIM                         | SIM                         |                 |
| A3 — Abertura de tópico  | SIM                         | SIM                         |                 |
| A4 — Resumo              | SIM (cada V)                | SIM (cada V)                |                 |
| A5 — Reflexão            | SIM                         | SIM                         |                 |
| V-CONCEITO (A, B, C)     | SIM                         | SIM                         |                 |
| V-FORMULA (A, B, C)      | SIM                         | SIM                         |                 |
| V-EXEMPLO (A, B, C, D)   | SIM                         | SIM                         |                 |
| V-DICA                   | SIM                         | SIM                         |                 |
| V-VISUALIZAÇÃO (A, B, C) | SIM                         | SIM                         |                 |

**Formato do header:**

```html
<div class="slide-header">SEÇÃO [NN] · [NOME DO TÓPICO]</div>
```

**Formato do footer:**

```html
<div class="slide-footer">CV-CH[N]-[ANO] · CAPÍTULO [N]</div>
```

O header e footer já estão definidos no `space-theme.css` (linhas 754-793) com posição absoluta, baixa opacidade e borda sutil. Não precisa de CSS inline.

---

## Regras de Implementacao

### CSS

- Zero CSS inline nos arquivos de secao
- Todo CSS em `../space-theme.css`
- NAO criar classes novas — usar as existentes

### MathJax

- Inline: `\(f(x)\)`
- Bloco: `\[ formula \]`
- NUNCA usar `$...$` ou `\\(`, `\\[`, `\\frac`
- Verificacao: `grep -c '\\\\' arquivo.html` → deve ser 0

### Fragmentos historicos

- Extensao: 2-4 frases
- Usar `history-section` com `history-label` nos exemplos
- NAO precisa ter relacao logica com o problema matematico
- Distribuir beats narrativos entre inserts (V1) e questoes historicas (exemplos)

### Separadores visuais

- `v-bar`: barra vertical dentro de `dual-panel` — separa math de historia
- `h-bar`: barra horizontal — separa conteudo empilhado
- Usar para dar ritmo visual e evitar monotonia

### Exemplos (regras obrigatorias)

- **NUNCA incluir solucao** — o professor resolve em sala
- `compact-solution` so e usada em slides de **Dica de Resolucao** (V-DICA)
- Todo exemplo deve ter questao matematica + questao historica (exceto variante D)
- Dica de resolucao: apenas passos/estrategia, nunca valores calculados

### Formulas (regras obrigatorias)

- **SEMPRE definir cada termo** da formula
- **SEMPRE indicar validade** (quando a formula se aplica)

### Limites

- Maximo 250 palavras por slide
- Maximo 2-3 formulas complexas por slide
- Titulos com menos de 60 caracteres

---

## Checklist de Variedade por Secao

Antes de finalizar um topico, verificar:

- [ ] Pelo menos 2 variantes diferentes de V-CONCEITO usadas no capitulo
- [ ] Pelo menos 2 variantes diferentes de V-FORMULA usadas no capitulo
- [ ] Pelo menos 3 variantes diferentes de V-EXEMPLO usadas no capitulo
- [ ] Nenhuma variante repetida em slides consecutivos do mesmo tipo
- [ ] NENHUM exemplo contem solucao (apenas enunciado)
- [ ] Toda formula define cada termo e indica validade
- [ ] Pelo menos 1 exemplo com questao historica (variante A, B ou C)
- [ ] Pelo menos 1 exemplo puro (variante D)
- [ ] Visualizacao, quando presente, usa uma das 3 variantes
- [ ] Dica de resolucao (V-DICA) usada quando exemplo e complexo

---

## Mockup (`mockup.html`)

O arquivo `mockup.html` e um catalogo didatico de templates. Cada slide se explica: "eu sou o template X, use-me quando Y". Serve para:

1. **Referencia** para o agente de implementacao
2. **Visualizar** todas as variantes de layout
3. **Testar** o CSS, v-bar, h-bar e o tema espacial

### Para visualizar

```bash
firefox slide-decks/template/mockup.html
```
