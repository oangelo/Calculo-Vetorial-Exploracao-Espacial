# Exercícios — Instruções para Agentes

> **Workflow:** Consulte `/AGENTS.md` para regras de commits, visualização no Firefox e fluxo de entrega.

Prompt completo: `docs/prompts/exercicios-full.md`
Referência rápida: `docs/prompts/exercicios-quick.md`
Template base: `exercicios/template.html`
CSS: `exercicios/styles.css` (tema industrial/cobre — documento sigiloso)

## Estrutura de pastas (nova)

Cada tópico tem sua própria pasta com arquivos modulares:

```
exercicios/capitulo-N/topico/
├── intro.html              # Fundamentação teórica (fragmento HTML)
├── exercicio-*.html        # Cada exercício em arquivo separado
└── index.html              # HTML completo que monta tudo via fetch()
```

O `_backup/` contém os arquivos monolíticos originais (referência).

## Criar um exercício

1. Leia `docs/prompts/exercicios-full.md` e `exercicios/template.html`
2. Identifique o tópico na sequência de progressão
3. Use APENAS conceitos já abordados até aquele ponto
4. Salve como arquivo individual na pasta do tópico

## Regras críticas

### MathJax (APRENDIDO NA DURAS)

- **NÃO usar `async`** no script MathJax — causa race condition com a config
- **NÃO criar config explícita** — MathJax v3 já reconhece `\(...\)` e `\[...\]` por padrão
- **Script puro**: `<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>`
- **Delimitadores nos exercícios**: `\(inline\)` e `\[bloco\]` — uma barra só
- **NUNCA** usar `$...$` ou `$$...$$`

### CSS

- **Usar CSS inline** no `<style>` do index.html (tema papel antigo/couro)
- **NÃO usar `../../styles.css`** — é o tema cobre/industrial, diferente do padrão dos exercícios
- Copiar o bloco `<style>` de um tópico existente (ex: `derivadas/index.html`) como base

### Notas técnicas (hints)

- **Sempre dentro de `<details>`**, nunca como `<p>` solto:

```html
<details class="hint-container">
  <summary>ARQUIVO AUXILIAR [SIGMA-N]</summary>
  <div class="hint">
    [NOTA TÉCNICA]: conteúdo da dica com \(math\) se necessário
  </div>
</details>
```

- **OMEGA (exercício 12)**: sem dica — omitir completamente o hint-container

### Imagens e SVGs

- **SVG fornece dados, aluno deduz equação** (não o contrário)
- Mostrar apenas informações necessárias para resolver (pontos, distâncias, curva)
- **Omitir respostas** no SVG (ex: focos quando o aluno deve calcular)
- SVG inline dentro do `<li class="exercise-item">`:
  - `transform="translate(cx,cy) scale(sx,-sy)"` (y para cima)
  - Escala: ~25px por unidade
  - Cores: azul=curva, vermelho=focos/vértices, verde=assíntotas/elementos auxiliares
  - Texto: `transform="scale(1,-1)"` para não ficar espelhado
  - Bordas: `stroke-width` proporcional à escala (~0.1 linhas, ~0.15 curvas)

### Classes CSS

- `exercise-item`: cada exercício
- `exercise-number`: `EXERCÍCIO VECTOR-XY`
- `context`: `ORIGEM: [Missão] - [Data]`
- `hint-container`: nota técnica em `<details>`
- `concept-definition`: definições na fundamentação teórica
- `section-title`: título de seção
- `mission-context`: contexto da missão espacial
- `historical-note`: nota histórica
- `formula-highlight`: bloco de fórmulas destacado
- `warning-box`: aviso de sigilo
- `censored`: texto censurado (preto sobre preto)

## Estrutura do intro.html (fragmento)

```html
<div class="document-header">
  <div class="document-stamp">SIGILOSO</div>
  <div class="document-date">DATA: ...</div>
  <div class="document-intro">narrativa temática...</div>
  <div class="warning-box">aviso de sigilo...</div>
  <div class="metadata">REF, NÍVEL DE ACESSO, CÓPIAS...</div>
</div>
<div class="section-title">FUNDAMENTAÇÃO TEÓRICA: ...</div>
<div class="concept-definition">definições...</div>
<div class="mission-context">contexto espacial...</div>
<div class="historical-note">NOTA HISTÓRICA: ...</div>
```

## Estrutura do index.html

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" ... />
    <title>Documento Sigiloso - Cálculo Vetorial</title>
    <link href="...Share+Tech+Mono..." rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <style>
      /* CSS inline (copiar de outro tópico) */
    </style>
  </head>
  <body>
    <div class="container">
      <!-- INTRO INLINE (copiar do intro.html) -->
      <div class="document-header">...</div>
      <div class="section-title">...</div>
      <div class="concept-definition">...</div>
      ...
      <main>
        <ol class="exercise-list" id="exercises"></ol>
      </main>
      <div class="page-number">...</div>
    </div>
    <script>
      async function loadExercises() {
        const exercises = ['exercicio-1.html', ...];
        const list = document.getElementById('exercises');
        for (const file of exercises) {
          const resp = await fetch(file);
          if (resp.ok) list.innerHTML += await resp.text();
        }
        if (window.MathJax && typeof MathJax.typeset === 'function') {
          MathJax.typeset();
        }
      }
      loadExercises();
    </script>
  </body>
</html>
```

## Formato de cada exercício (fragmento)

```html
<li class="exercise-item">
  <div class="exercise-number">EXERCÍCIO VECTOR-XY</div>
  <div class="context">ORIGEM: [Missão/Programa] - [Data/Evento]</div>
  <p>enunciado com \(math\) e \[equações\]</p>
  <p>SVG inline (se houver imagem)</p>
  <details class="hint-container">
    <summary>ARQUIVO AUXILIAR [SIGMA-N]</summary>
    <div class="hint">[NOTA TÉCNICA]: dica...</div>
  </details>
  <details>
    <summary>RELATÓRIO DE CÁLCULO [SIGMA-N REQUERIDO]</summary>
    <p>solução completa...</p>
  </details>
</li>
```

## Progressão de dificuldade (ALFA → OMEGA)

- **ALFA (1-3)**: conceitos básicos, cálculos diretos, com dica
- **BETA (4-6)**: aplicação de múltiplos conceitos, com dica
- **GAMMA (7-9)**: problemas que exigem análise, com dica
- **OMEGA (10-12)**: desafio, sem dica, pode exigir criatividade

## Sequência de tópicos

0. Revisão: Geometria Analítica, Cônicas, Derivadas, Integrais
1. Funções Vetoriais: Funções, Campo vetorial, Limite, Derivadas parciais, Rotacional, Divergente
2. Integrais Duplas: Soma de Riemann, Definição, Conjuntos, Integrabilidade, Propriedades
3. Teorema de Fubini
4. Mudança de Variáveis: Em integrais duplas, Massa e centro de massa
5. Integrais Triplas: Definição, Redução a duplas, Mudança de variáveis, Coordenadas
6. Integrais de Linha: Curvas, Notações, Parâmetros, Curvas C1, Comprimento de arco
7. Campos Conservativos: Definição, Integrais de linha, Independência do caminho, Potencial
8. Teorema de Green
9. Superfícies: Área e integral de superfície
10. Teorema da Divergência: Fluxo, Teorema de Gauss

## Tópicos com problemas conhecidos

| Tópico                                    | Problema                                        |
| ----------------------------------------- | ----------------------------------------------- |
| cap-6/definicao-e-forma-diferencial-exata | VAZIO — só index.html, sem intro nem exercícios |
| cap-8/integral-de-superficie              | VAZIO — só index.html                           |
| cap-9/\* (todos os 3 tópicos)             | VAZIO — só index.html                           |
