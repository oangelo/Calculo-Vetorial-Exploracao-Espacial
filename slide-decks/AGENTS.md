# Slide Decks — Instruções para Claude Code

Prompt completo: `docs/prompts/slides-full.md`
Referência rápida: `docs/prompts/slides-quick.md`
CSS: `slide-decks/space-theme.css` (tema espacial)
Framework: Reveal.js (`slide-decks/reveal.js/`)

## Criar slides

1. Leia `docs/prompts/slides-full.md`
2. Identifique tópico e período histórico
3. Gere HTML seguindo estrutura Reveal.js
4. Salve em `slide-decks/capitulo-N-nome/NN-nome-da-secao.html`
5. Atualize o `index.html` (loader) da pasta do capítulo

## Estrutura de uma pasta de capítulo

```
slide-decks/capitulo-N-nome/
├── index.html              # Loader que faz fetch das seções
├── 01-titulo.html          # Seção 1
├── 02-conceito.html        # Seção 2
├── ...
├── imagens/                # SVGs e recursos visuais
└── visualizations.js       # Código JS das visualizações (se houver)
```

## Regras críticas

- **CSS**: usar `../space-theme.css` (relativo à pasta do capítulo)
- **Navegação**: horizontal (tópicos) e vertical (aprofundamento)
- **Separar**: matemática (`math-section`) de história (`history-section`)
- **Limites**: 250 palavras/slide, 2-3 fórmulas complexas, títulos < 60 chars
- **MathJax**: `\(inline\)` e `\[bloco\]` — uma barra só
- **Canvas 2D** preferível a Three.js

## Classes CSS obrigatórias

| Classe                 | Uso                                              |
| ---------------------- | ------------------------------------------------ |
| `math-section`         | Conteúdo matemático formal                       |
| `history-section`      | Contextualização histórica (com `history-label`) |
| `visualization-canvas` | Elementos canvas                                 |
| `problem-section`      | Enunciados de problemas                          |
| `controls-container`   | Controles de interação                           |
| `compact-solution`     | Soluções de problemas                            |
| `dual-panel`           | Dois painéis lado a lado                         |

## Padrão JavaScript para visualizações

- Encapsular em **IIFE** (Immediately Invoked Function Expression)
- Expor via `window.vizNome = { init, cleanup }`
- Usar `requestAnimationFrame`, nunca `setInterval`
- Cleanup: `cancelAnimationFrame` quando slide não está visível
- IDs únicos para cada canvas

## Paleta de cores (visualizações)

- Posição: `#1E88E5` (azul)
- Velocidade: `#43A047` (verde)
- Aceleração: `#E53935` (vermelho)
- Força: `#FFB300` (amarelo)
- Unitários: `#FFFFFF` (branco)

## Cronologia histórica por capítulo

| Capítulo | Período    | Contexto                        |
| -------- | ---------- | ------------------------------- |
| 0        | Pré-Guerra | Revisão                         |
| 1        | 1945-1956  | Era dos Mísseis (V-2, Redstone) |
| 2        | 1957-1961  | Era Sputnik                     |
| 3        | 1961-1964  | Primeiros Astronautas           |
| 4        | 1965-1966  | Programa Gemini                 |
| 5-6      | 1967-1969  | Missões Apollo                  |
| 7        | 1969-1970  | Pouso Lunar (Apollo 11)         |
| 8        | 1971-1972  | Apollo avançadas                |
| 9        | 1973-1985  | Estações Espaciais (Skylab)     |
