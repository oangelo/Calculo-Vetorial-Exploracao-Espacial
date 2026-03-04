# Quick Reference - Cálculo Vetorial

Referência rápida para criação de conteúdo.

---

## MathJax

**Inline:** `\(fórmula\)`  
**Bloco:** `\[fórmula\]`  
**Vetores:** `\vec{v}`  
**Matrizes:** `\begin{pmatrix}...\end{pmatrix}`

---

## CSS

**Exercícios:** `<link rel="stylesheet" href="../styles.css" />`  
**Slides:** `<link rel="stylesheet" href="space-theme.css" />`

**Classes de Exercícios:**

- `.document-header` - Cabeçalho sigiloso
- `.exercise-item` - Cada exercício
- `.censored` - Partes censuradas
- `.solution` - Solução dentro de `<details>`

**Classes de Slides:**

- `.math-section` - Conteúdo matemático
- `.history-section` - Contexto histórico
- `.visualization-canvas` - Canvas
- `.problem-section` - Problemas

---

## Nomenclatura

**Formato:** kebab-case.html  
**Exercícios:** `exercicios/capitulo-N/nome-topico.html`  
**Slides:** `slide-decks/nome-topico.html`

**Exemplos:**

- ✅ `soma-de-riemann.html`
- ❌ `SomaDeRiemann.html`
- ❌ `soma_de_riemann.html`

---

## Estrutura de Exercícios

**12 exercícios por arquivo:**

1. **ALFA (1-3):** Básico, dicas completas
2. **BETA (4-6):** Intermediário, dicas parciais
3. **GAMMA (7-9):** Avançado, dicas mínimas
4. **OMEGA (10-12):** Desafiador, sem dicas

---

## Estrutura de Slides

**Navegação:**

- **Horizontal:** Entre tópicos
- **Vertical:** Aprofundamento

**Limites:**

- 250 palavras/slide
- 2-3 fórmulas complexas máximo

---

## Cronologia Histórica

| Cap | Período    | Contexto              |
| --- | ---------- | --------------------- |
| 0   | Pré-Guerra | Revisão               |
| 1   | 1945-1956  | Era dos Mísseis       |
| 2   | 1957-1961  | Era Sputnik           |
| 3   | 1961-1964  | Primeiros Astronautas |
| 4   | 1965-1966  | Programa Gemini       |
| 5-6 | 1967-1969  | Missões Apollo        |
| 7   | 1969-1970  | Pouso Lunar           |
| 8   | 1971-1972  | Apollo Avançadas      |
| 9   | 1973-1985  | Estações Espaciais    |

---

## Arquivos de Referência

**Templates:**

- `/exercicios/template.html`
- `/slide-decks/template.html`

**Prompts Quick:**

- `/docs/prompts/exercicios-quick.md`
- `/docs/prompts/slides-quick.md`

**Prompts Full:**

- `/docs/prompts/exercicios-full.md`
- `/docs/prompts/slides-full.md`

**Documentação:**

- `/AGENTS.md` - Visão geral
- `/docs/workflow.md` - Processo passo a passo
- `/docs/css/inventory.md` - Problemas CSS

---

## Problemas Conuns

**MathJax não renderiza:** Verificar `\( \)` e `\[ \]` (uma barra)  
**CSS não carrega:** Verificar caminho `../styles.css`  
**Links quebrados:** Usar caminhos relativos corretos

---

## Teste Obrigatório

Antes de commitar:

1. Abrir HTML no navegador
2. Verificar CSS carregou
3. Verificar MathJax renderizou
4. Testar interatividade
5. Verificar links

---

**Última atualização:** Março 2026
