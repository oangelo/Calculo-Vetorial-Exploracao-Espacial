# Slide Decks — Instruções para Claude Code

> **Workflow:** Consulte `/AGENTS.md` para regras de commits, visualização no Firefox e fluxo de entrega.

## Issue Epic

- **Epic #1:** https://github.com/oangelo/Calculo-Vetorial-Exploracao-Espacial/issues/1 (Redesenhar Contexto Histórico)
- **Exemplos #2:** https://github.com/oangelo/Calculo-Vetorial-Exploracao-Espacial/issues/2 (Revisão de exemplos)
- **Sub-issues:** #19–#28 (uma por capítulo)

Antes de começar, verifique o status das sub-issues na epic para saber onde parou e qual capítulo deve ser trabalhado a seguir:

```bash
gh issue list --label slides --state open --limit 5
```

## Leitura obrigatória antes de criar slides

1. `template-spec.md` — Template canônico (estrutura de diretório, navegação, classes CSS, loader)
2. `narrative-spec.md` — Diretrizes narrativas (7 regras, cronologia integrada, exemplos com datas)
3. `pedagogical-spec.md` — Abordagem pedagógica (dissonância cognitiva, formato flexível, tom)

CSS: `space-theme.css` (tema espacial, 3 facções via `data-faction`)
Framework: Reveal.js (`reveal.js/`, cópia local — nunca CDN)

---

## Pipeline de revisão de slides

O pipeline segue 4 agentes com 2 gates humanos. Cada capítulo passa pelo pipeline completo.

### Agente 1: RTC (Explore)

**Função:** Analisa slides existentes e produz Relatório Técnico de Condições.

**Entradas:**

- Slides atuais do capítulo (`slide-decks/capitulo-N-name/`)
- `template-spec.md`, `narrative-spec.md`, `pedagogical-spec.md`
- Tópicos de exercício revisados (`exercicios/capitulo-N/`)
- Issue #1 (cronologia por capítulo)
- Issue do capítulo específico (#19–#28)

**Saída:** RTC como comentário na issue do capítulo via `gh issue comment N`, contendo:

| Seção                         | Conteúdo                                                      |
| ----------------------------- | ------------------------------------------------------------- |
| 1. Inventário                 | Seções atuais vs. esperadas (alinhado com template-spec)      |
| 2. Gap analysis               | Tópicos de exercício sem slide correspondente                 |
| 3. Análise de história        | O que existe, o que serve, o que precisa mudar                |
| 4. Análise de navegação       | H/V correto? Slides na ordem certa?                           |
| 5. Problemas técnicos         | CSS inline, MathJax, CDN, arquitetura (monolítico vs modular) |
| 6. Proposta de reestruturação | Estrutura final alinhada com template-spec                    |
| 7. Prioridades                | CRÍTICA / ALTA / MÉDIA / BAIXA                                |

### Gate 1: Revisão humana do RTC

Professor aprova/ajusta o RTC antes do próximo agente.

### Agente 2: PDI (General)

**Função:** Cria Plano Detalhado de Implementação por seção.

**Entradas:**

- RTC aprovado (via `gh issue view N --comments`)
- `template-spec.md`, `narrative-spec.md`, `pedagogical-spec.md`
- Exercícios revisados do capítulo

**Saída:** PDI como comentário na issue do capítulo, contendo:

| Seção                    | Conteúdo                                                           |
| ------------------------ | ------------------------------------------------------------------ |
| Progressão narrativa     | Parágrafo descrevendo a história que os slides contam              |
| Seções                   | Para CADA seção (00-capa, 01-historia, tópicos, resumo, reflexão): |
| — Título e layout        | Número de slides, tipo (H ou V)                                    |
| — Conteúdo de cada slide | Texto, fórmulas, classes CSS                                       |
| — História               | Onde entra, quanto texto, qual diretriz do narrative-spec          |
| — Imagem                 | URL da foto pública + crédito (para 01-historia)                   |
| — Visualização           | Qual canvas, que interação (se houver)                             |
| — Marcação               | NOVO / REESCREVER / MANTER                                         |
| Resumo de marcações      | Contagem NOVO/REESCREVER/MANTER                                    |
| Notas para implementador | Regras específicas do capítulo                                     |

### Gate 2: Revisão humana do PDI

Professor aprova o plano detalhado antes da implementação.

### Agente 3: Implementador (General)

**Função:** Implementa seção por seção seguindo o PDI.

**Entradas:**

- PDI aprovado
- `template-spec.md`
- `space-theme.css` (classes disponíveis)
- `emblemas/` (SVGs de facção)

**Saída:**

- Reescreve `index.html` (loader limpo, sem CSS inline)
- Cria/reescreve cada seção por vez
- Commits incrementais (1-3 arquivos por commit)
- Verifica MathJax: `grep -c '\\\\' arquivo.html` — resultado deve ser 0

### Agente 4: Verificador (Explore)

**Função:** Verifica se a implementação segue o template e os specs.

**Saída:** Relatório de verificação como comentário na issue, contendo:

| Verificação      | Critério                                                               |
| ---------------- | ---------------------------------------------------------------------- |
| Estrutura        | Segue template-spec? (00-capa, 01-historia, tópicos, resumo, reflexão) |
| Navegação        | H = seções, V = aprofundamento?                                        |
| CSS              | Zero inline? Classes corretas?                                         |
| MathJax          | `\(` e `\[` sem barra dupla?                                           |
| História         | 1 slide dual-panel? 3-5 frases? Crédito na foto?                       |
| Coerência        | Alinha com exercícios revisados?                                       |
| Narrative-spec   | Segue pelo menos 1 diretriz?                                           |
| Pedagogical-spec | Dissonância sem resolução?                                             |

---

## Estrutura de uma pasta de capítulo

```
slide-decks/capitulo-N-nome/
├── index.html              # Loader (fetch, sem CSS inline)
├── 00-capa.html            # Título + emblema + período
├── 01-historia.html        # dual-panel: texto + foto pública
├── 02-topico-1.html        # ← exercicios/capitulo-N/topico-1/
├── ...
├── NN-topico-N.html        # ← exercicios/capitulo-N/topico-N/
├── N+1-resumo.html         # Fórmulas-chave e conexões
├── N+2-reflexao.html       # Pergunta aberta + dissonância
└── visualizacoes.js        # (opcional) Canvas 2D
```

Ver `template-spec.md` para especificação completa de cada seção.

---

## Regras críticas

- **CSS:** usar `../space-theme.css` — zero CSS inline nos arquivos
- **Reveal.js:** cópia local (`../reveal.js/`) — nunca CDN
- **Navegação:** horizontal (seções) e vertical (aprofundamento)
- **MathJax:** `\(inline\)` e `\[bloco\]` — uma barra só, nunca `$` ou `\\`
- **Limites:** 250 palavras/slide, 2-3 fórmulas, títulos < 60 chars
- **Canvas 2D** preferível a Three.js

## Classes CSS (space-theme.css)

| Classe                 | Uso                                              |
| ---------------------- | ------------------------------------------------ |
| `title-slide`          | Slide de capa                                    |
| `faction-emblem`       | Container do emblema SVG                         |
| `classified-banner`    | Faixa superior de classificação                  |
| `classified-footer`    | Faixa inferior                                   |
| `doc-border`           | Borda decorativa                                 |
| `math-section`         | Conteúdo matemático formal                       |
| `history-section`      | Contextualização histórica (com `history-label`) |
| `problem-section`      | Enunciados de problemas                          |
| `controls-container`   | Controles de interação                           |
| `compact-solution`     | Soluções de problemas                            |
| `dual-panel`           | Dois painéis lado a lado                         |
| `visualization-canvas` | Canvas para visualizações                        |

**NÃO criar classes CSS novas.** Se precisa, adicionar em `space-theme.css`.

## Padrão JavaScript para visualizações

- Encapsular em **IIFE**
- Expor via `window.vizNome = { init, cleanup }`
- Usar `requestAnimationFrame`, nunca `setInterval`
- IDs únicos para cada canvas

## Paleta de cores (visualizações)

- Posição: `#1E88E5` (azul) — Velocidade: `#43A047` (verde)
- Aceleração: `#E53935` (vermelho) — Força: `#FFB300` (amarelo)
- Unitários: `#FFFFFF` (branco)

## Facções por capítulo

| Cap | Facção  | `data-faction` | Período    |
| --- | ------- | -------------- | ---------- |
| 0   | Neutro  | `neutral`      | Pré-Guerra |
| 1   | URSS    | `soviet`       | 1945-1956  |
| 2   | Aliados | `allies`       | 1957-1961  |
| 3   | URSS    | `soviet`       | 1961-1964  |
| 4   | Aliados | `allies`       | 1965-1966  |
| 5   | URSS    | `soviet`       | 1967-1969  |
| 6   | Aliados | `allies`       | 1969-1970  |
| 7   | URSS    | `soviet`       | 1971-1972  |
| 8   | Aliados | `allies`       | 1973-1985  |
| 9   | URSS    | `soviet`       | 1986-1991  |

Cronologia detalhada com eventos: ver issue #1.
