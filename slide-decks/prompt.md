# Diretrizes Unificadas para Criação de Slides Interativos de Cálculo Vetorial

## Objetivo
Criar slides interativos para um curso de Cálculo Vetorial, usando o tema de exploração espacial e Guerra Fria como contexto histórico, com foco em visualizações que demonstrem os conceitos matemáticos de forma intuitiva.

## Processo de Desenvolvimento
O desenvolvimento dos slides seguirá estas etapas sequenciais:

1. **Discussão inicial do conteúdo**
   - Definir escopo e profundidade dos tópicos
   - Estabelecer conceitos-chave a serem abordados
   - Planejar a narrativa pedagógica e conexões históricas

2. **Elaboração dos slides textuais**
   - Desenvolver o conteúdo textual completo
   - Estabelecer a estrutura narrativa dos slides
   - Submeter para revisão e aprovação antes de prosseguir

3. **Implementação das visualizações**
   - Após aprovação do conteúdo textual, desenvolver as visualizações em Canvas
   - Implementar interatividade conforme especificado
   - Integrar texto e visualizações na apresentação final

## Especificações Técnicas
- Framework: Reveal.js (usando arquivo de estilo existente)
- Tecnologias: HTML, CSS, JavaScript vanilla (sem bibliotecas extras)
- Tema visual: 
  - Desenvolvimento: Usar CDNs e CSS inline para visualização em artefatos
  - Produção: Utilizar `space-theme.css` (disponível como anexo)
  - URL alternativa: `https://oangelo.github.io/Calculo-Vetorial-Exploracao-Espacial/slide-decks/space-theme.css`
- Fórmulas matemáticas: LaTeX via MathJax
  - Vetores: usar notação `\vec{}`
  - Variáveis matemáticas: formato LaTeX padrão
- Implementar visualizações interativas em JavaScript (Canvas)

## Estrutura de Cada Tema
1. **Abertura**
   - Slide principal com definição matemática formal
   - Slides subsequentes (verticais) com explicações intuitivas e coloquiais
   - Decomposição do conceito em partes menores e explicáveis

2. **Contextualização**
   - Aplicações práticas (com ênfase em exploração espacial)
   - Conexões históricas com a Guerra Fria
   - Motivações do mundo real e relevância prática

3. **Visualizações Interativas**
   - Slides com apenas título, canvas e controles
   - Interações por arraste, clique ou sliders
   - Feedback visual claro (mudanças de cursor, realce)
   - Exibição de valores numéricos que mudam conforme interação

4. **Exercícios Práticos**
   - Problema introdutório com resolução guiada
   - Problema avançado de maior complexidade (para os alunos resolverem)
   - Soluções em slides separados

5. **Fechamento**
   - Síntese do tema
   - Conexão com próximos conceitos

## Organização de Slides
- Temas principais: navegação horizontal
- Detalhamento de cada tema: navegação vertical
- Slides com visualizações separados dos slides teóricos

## Diretrizes de Design
- Equilibrar formalidade acadêmica com engajamento
- Priorizar visualizações e exemplos práticos
- Incluir momentos de interação com a turma
- Manter clareza visual sem sobrecarga de informações
- Limitar a quantidade de texto por slide
- Distribuir o conteúdo em múltiplos slides para evitar sobrecarga
- Separar conteúdo teórico das demonstrações visuais

## Contextualização Histórica
- Enfatizar aplicações na exploração espacial
- Incluir notas históricas da Guerra Fria relevantes ao tema
- Conectar os conceitos matemáticos a aplicações práticas reconhecíveis

## Configuração para Desenvolvimento (Artefatos)

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cálculo Vetorial: [Título do Tópico]</title>
    <!-- Links para CDNs para visualização em artefatos -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/dist/reveal.min.css">
    <link rel="stylesheet" href="https://oangelo.github.io/Calculo-Vetorial-Exploracao-Espacial/slide-decks/space-theme.css">
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/dist/reveal.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/plugin/math/math.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <style>
      /* Estilos básicos para simulação do space-theme durante desenvolvimento */
      :root {
        --background-color: #0a1128;
        --text-color: #e9ecef;
        --accent-color: #ff5a5f;
        --link-color: #00b4d8;
      }
      body {
        background-color: var(--background-color);
        color: var(--text-color);
      }
      .reveal h1, .reveal h2, .reveal h3 {
        color: var(--accent-color);
      }
      /* Mais estilos simulando space-theme aqui */
    </style>
    <script>
      window.onload = function () {
        Reveal.initialize({
          controls: true,
          progress: true,
          center: true,
          hash: true,
          plugins: [RevealMath.MathJax3],
          math: {
            mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
            config: 'TeX-AMS_HTML-full',
            TeX: {
              Macros: {
                // Macros personalizados aqui, se necessário
              }
            }
          }
        });
      };
    </script>
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        <!-- Conteúdo dos slides aqui -->
        <section>
          <h1>Título do Tópico</h1>
          <p>Slide inicial para visualização</p>
        </section>
        <section>
          <h2>Exemplo de Fórmula</h2>
          <p>$$\vec{F} = m\vec{a}$$</p>
        </section>
      </div>
    </div>
  </body>
</html>
```

## Configuração Final para Produção

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cálculo Vetorial: [Título do Tópico]</title>
    <link rel="stylesheet" href="reveal.js/dist/reveal.css" />
    <link rel="stylesheet" href="space-theme.css" />
    <!-- Link alternativo usando URL pública -->
    <!-- <link rel="stylesheet" href="https://oangelo.github.io/Calculo-Vetorial-Exploracao-Espacial/slide-decks/space-theme.css" /> -->
    <script src="reveal.js/dist/reveal.js"></script>
    <script src="reveal.js/plugin/math/math.js"></script>
    <script>
      window.onload = function () {
        Reveal.initialize({
          controls: true,
          progress: true,
          center: true,
          hash: true,
          plugins: [RevealMath.MathJax3],
        });
      };
    </script>
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        <!-- Conteúdo dos slides será inserido aqui na versão final -->
      </div>
    </div>
  </body>
</html>
```
