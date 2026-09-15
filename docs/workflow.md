# Workflow de Criação de Conteúdo

Guia passo a passo para agentes de IA criarem novos exercícios e slides.

---

## Criar Novos Exercícios

### Passo 1: Preparação

1. Identifique capítulo e tópico (consulte tabela em `AGENTS.md`)
2. Reúna arquivos:
   - Prompt: `/docs/prompts/exercicios.md`
   - Template: `/exercicios/template.html`

### Passo 2: Gerar Conteúdo

1. Leia o prompt em `/docs/prompts/exercicios.md`
2. Identifique o tópico solicitado
3. Use o template como base
4. Gere conteúdo seguindo instruções do prompt

### Passo 3: Revisar

**Estrutura:**

- HTML válido com classes CSS do template
- Exercícios: quantos forem necessários (ALFA/BETA/GAMMA/OMEGA)
- Contexto histórico apropriado

**MathJax:**

- `\(inline\)` e `\[bloco\]` (uma barra)
- `\vec{v}` para vetores
- `\begin{pmatrix}...\end{pmatrix}` para matrizes

**Tema:**

- Carimbos "SIGILOSO" e "ULTRASSECRETO"
- 8-10 partes censuradas com `.censored`

### Passo 4: Salvar e Testar

```bash
# Salvar
exercicios/capitulo-N/nome-do-topico.html

# Testar
firefox exercicios/capitulo-N/nome-do-topico.html
```

Verificar: CSS, MathJax, interatividade, links

---

## Criar Novos Slides

### Passo 1: Preparação

1. Identifique capítulo e período histórico (consulte `AGENTS.md`)
2. Reúna arquivos:
   - Prompt: `/docs/prompts/slides.md`
   - Framework: Reveal.js (em `/slide-decks/reveal.js/`)

### Passo 2: Gerar Conteúdo

1. Leia o prompt em `/docs/prompts/slides.md`
2. Identifique requisitos (tópico, visualizações, período histórico)
3. Gere HTML com:
   - Estrutura Reveal.js
   - Classes CSS específicas
   - Separação matemática/história

### Passo 3: Revisar

**Estrutura:**

- `<div class="reveal">` e `<div class="slides">`
- Navegação horizontal (tópicos) e vertical (aprofundamento)

**Classes CSS:**

- `math-section` para matemática
- `history-section` para contexto histórico
- `visualization-canvas` para canvas
- `problem-section` para problemas

**Conteúdo:**

- 250 palavras/slide máximo
- 2-3 fórmulas complexas máximo

**Visualizações:**

- Canvas 2D preferível
- Código encapsulado em IIFE
- Cleanup ao mudar de slide

### Passo 4: Salvar e Testar

```bash
# Salvar
slide-decks/nome-do-topico.html

# Testar
firefox slide-decks/nome-do-topico.html
```

Verificar: Reveal.js, CSS, MathJax, visualizações, navegação

---

## Workflow para Capítulo Completo

**Ordem recomendada:**

1. Slides de conceitos (com visualizações)
2. Exercícios de prática (1-2 arquivos)
3. Revisão e ajustes (testar links, ajustar)

---

## Problemas Comuns

**MathJax não renderiza:**

- Verifique `\( \)` e `\[ \]` (uma barra)
- Confirme script MathJax incluído
- Abra console do navegador

**CSS não carrega:**

- Verifique caminho: `../styles.css` para exercícios
- Confirme arquivo CSS existe

**Visualizações não funcionam:**

- IDs únicos no HTML
- Código JavaScript após HTML
- Console para erros

---

## Referências

- `/AGENTS.md` - Visão geral do projeto
- `/docs/css/themes.md` - Documentação dos temas
- `/investigacao/` - Material histórico

---

**Última atualização:** Março 2026
