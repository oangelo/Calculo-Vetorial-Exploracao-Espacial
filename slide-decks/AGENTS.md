# Slide Decks — Instruções para Claude Code

> **Workflow:** Consulte `/AGENTS.md` para regras de commits, visualização no Firefox e fluxo de entrega.

## Issue Epic

- **Arco narrativo:** #80 (curso completo) → #81–#90 (por capítulo)
- **Mockup:** #79 (Cap 1 como referência)
- **Exemplos:** #2 (revisão de exemplos)
- **Sub-issues:** #19–#28 (uma por capítulo)

Antes de começar, verifique o status das issues:

```bash
gh issue list --label slides --state open --limit 10
```

## Leitura obrigatória antes de criar slides

1. `template-spec.md` — Template canônico (estrutura de diretório, navegação, classes CSS, loader)
2. `narrative-spec.md` — Diretrizes narrativas gerais (7 regras, princípios, sem exemplos específicos)
3. `pedagogical-spec.md` — Abordagem pedagógica (dissonância cognitiva, formato flexível, tom)

**Detalhes históricos** (datas, nomes, eventos): consultar issues #80–#90, NÃO os specs.

CSS: `space-theme.css` (tema espacial, 3 facções via `data-faction`)
Framework: Reveal.js (`reveal.js/`, cópia local — nunca CDN)

---

## Depuração visual

O backend do navegador (Playwright MCP) é remoto e **não alcança `localhost`**. Além disso, o modelo de IA que executa os agentes **não lê imagens**. Para diagnosticar o layout renderizado, usar o script local:

```bash
# Pré-requisito (uma vez):
sudo npm install -g playwright-core@1.62.1
# Versão pinada: casa com o chromium-1234 já em ~/.cache/ms-playwright (não baixa browser).

# Uso:
node debug-slide.js <pasta-do-capitulo> [hash-do-slide]

# Exemplos:
node debug-slide.js capitulo-3-mudanca-de-variaveis "#/1"   # slide horizontal 1 (história)
node debug-slide.js capitulo-3-mudanca-de-variaveis "#/2/2" # slide vertical 2 do tópico 2
node debug-slide.js capitulo-1 "#/6"                        # slide 6 (rotacional)
```

**O que ele faz:** sobe o servidor HTTP em `:8090` se preciso, navega com Chromium headless local, salva screenshot em `/tmp/slide-debug.png` (para o humano conferir) e imprime diagnóstico em **texto**: seções H/V carregadas, `flexDirection` de cada `.dual-panel`, bounding boxes dos painéis, estado das imagens (render vs. natural, 404), `window.viz*` exportados, CSS inline, e contagem de `\\` no HTML.

**Uso comum:** antes de concluir um capítulo, rodar nos slides com `dual-panel`/imagem e conferir no output que `flexDirection=row` (lado a lado) e que as imagens renderizam no tamanho certo. Slide vazio, dual-panel em `column` ou imagem `CARREGANDO/404` indicam problema.

---

## Pipeline de revisão de slides

O pipeline segue 4 agentes com 2 gates humanos. Cada capítulo passa pelo pipeline completo.

### Agente 1: RTC (Explore)

**Função:** Analisa slides existentes e produz Relatório Técnico de Condições.

**Entradas:**

- Slides atuais do capítulo (`slide-decks/capitulo-N-name/`)
- `template-spec.md`, `narrative-spec.md`, `pedagogical-spec.md`
- Tópicos de exercício revisados (`exercicios/capitulo-N/`)
- Issue do arco narrativo do capítulo (#81–#90)

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

### Agente 2: PDI (General) — 4 Camadas

**Função:** Cria Plano Detalhado de Implementação em 4 camadas independentes, publicadas como comentários separados na issue do capítulo.

**Problemas que motivam o modelo em camadas:**

- A história não pode ser "tempero" da matemática — é uma narrativa que precisa valer por si mesma
- Matemática e história devem ser planejadas de forma independente antes de se integrarem
- A integração pode resultar em conexões naturais (analogias) ou em separação limpa (história e matemática lado a lado)
- Nem todo slide precisa de insert histórico — forçar conexões artificiais é pior que não ter

**Entradas:**

- RTC aprovado (via `gh issue view N --comments`)
- `template-spec.md`, `narrative-spec.md`, `pedagogical-spec.md`
- Exercícios revisados do capítulo (`exercicios/capitulo-N/*/intro.html`)
- Issue do arco narrativo do capítulo (#81–#90)
- Issue do arco geral (#80)

**Saída:** 4 comentários separados na issue do capítulo:

#### Camada 1 — Núcleo Matemático (independente)

Para cada seção de conteúdo (02–NN), mapear:

- Quais conceitos dos `intro.html` viram slides verticais
- Um conceito por slide (atomicidade)
- Ordem de progressão
- O que fica para os exercícios (não tudo precisa estar nos slides)

**Requisitos obrigatórios:**

- Cada seção deve incluir **1 a 3 exemplos clássicos** (usar `problem-section`, sem solução). Sem exceções. Exemplos devem ser problemas clássicos do tópico, calculáveis em aula. O professor resolve em sala.
- Cada seção deve seguir o **fluxo pedagógico** (ver `template-spec.md` v1.4+): motivação → conceito → formalização → interpretação → exemplos → visualização.

Publicado como primeiro comentário. Aprovação humana antes de seguir.

#### Camada 2 — História (independente)

Qual história este capítulo conta? Com arco narrativo completo:

- **Abertura** (01-historia): o que apresenta — sistema, pessoa, evento, pergunta
- **Desenvolvimento**: beats narrativos ao longo dos tópicos
- **Fechamento** (N+2-reflexao): dissonância final, pergunta sem resposta
- **Tipo(s) de crítica**: que variedade de crítica este capítulo traz (moral, social, econômica, política, filosófica)

A história é planejada **sem referência à matemática**. É uma narrativa com coerência própria. As peças históricas (01-historia, frases de abertura, inserts, reflexão) formam UMA história que começa, se desenvolve e termina no capítulo.

Publicado como segundo comentário. Aprovação humana antes de seguir.

#### Camada 3 — Integração

Onde Camada 1 e Camada 2 se encontram — dois mecanismos:

**Inserts no V1 (obrigatório):**

- **Todo tópico de conteúdo (02–NN) recebe insert no V1** (slide de abertura/motivação). Sem exceção.
- Se não houver conexão natural, usar analogia, contraste ou ironia para criar uma.
- Inserts são 1-2 frases, parágrafo final do V1, sem classe CSS especial.

**Fragmentos junto a exemplos (dinâmico):**

- Nos slides de APLICAÇÃO, exemplos podem usar `dual-panel`: esquerda = math, direita = fragmento histórico/emocional.
- O fragmento NÃO precisa ter relação lógica com o exemplo — justaposição emocional é válida (ver `narrative-spec.md` v3.0 e `pedagogical-spec.md` v1.1).
- 1 ou mais exemplos por seção recebem fragmento. Nem todos precisam.
- Fragmentos distribuem beats narrativos que não couberam nos inserts de V1.
- Tipos: fato brutal, ironia sistêmica, justaposição temporal, pergunta aberta, contraste emocional, beat narrativo.

**Regras gerais da integração:**

- Garantir que a história flui coerentemente APESAR da matemática
- Tipos variados (justaposição, ironia, pergunta aberta, fato impactante, metáfora, contraste)
- Inserts e fragmentos não repetem os mesmos fatos — cada beat é único

Publicado como terceiro comentário. Aprovação humana antes de seguir.

#### Camada 4 — PDI Final (slide a slide)

Para cada slide de cada seção:

- Conteúdo matemático (se houver) — texto, fórmulas, classes CSS
- Conteúdo histórico (se houver) — textos prontos para implementação
- Layout (dual-panel, triple-panel, canvas, etc.)
- Marcação: NOVO / REESCREVER / MANTER
- Imagens (URL + crédito, para 01-historia)
- Para exemplos com fragmento: indicar tipo de fragmento (fato brutal, ironia, justaposição, etc.) e texto do fragmento

Publicado como quarto comentário. Aprovação humana antes de implementar.

### Variedade de críticas por capítulo

Para evitar repetição ao longo do curso, cada capítulo deve trazer tipo(s) diferente(s) de crítica. O mapeamento é definido no issue do arco narrativo (#81–#90). Tipos possíveis:

| Tipo                    | Exemplos                                                      |
| ----------------------- | ------------------------------------------------------------- |
| **Moral**               | Apropriação de tecnologia, custo humano, hipocrisia           |
| **Social (raça)**       | Segregação, apagamento de pessoas negras                      |
| **Social (gênero)**     | Performance de inclusão, invisibilização de mulheres          |
| **Social (orientação)** | Lavender Scare, perseguição a minorias                        |
| **Econômica**           | Trabalho invisível, complexo militar-industrial, desigualdade |
| **Política**            | Propaganda, controle totalitário, vigilância                  |
| **Filosófica**          | Neutralidade ilusória, tecnologia como distração, niilismo    |

Nenhum tipo de crítica deve aparecer em mais de 2-3 capítulos. Variedade é essencial.

### Gate 2: Revisão humana do PDI

Professor aprova as 4 camadas antes da implementação.

### Agente 3: Implementador (General)

**Função:** Implementa seção por seção seguindo o PDI final (Camada 4).

**Entradas:**

- PDI aprovado (Camada 4)
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
| Fluxo pedagógico | Cada seção segue V1→V2→V3→... conforme template-spec v1.4+?            |
| Exemplos         | Cada seção tem 1-3 exemplos clássicos (problem-section, sem solução)?  |
| Fragmentos       | Exemplos com fragmento usam dual-panel? Fragmento gera emoção?         |
| Navegação        | H = seções, V = aprofundamento?                                        |
| CSS              | Zero inline? Classes corretas?                                         |
| MathJax          | `\(` e `\[` sem barra dupla?                                           |
| Inserts          | Todo tópico (02–NN) tem insert no V1?                                  |
| História         | Arco narrativo coerente? Variedade de inserts e fragmentos?            |
| Coerência        | Alinha com exercícios revisados?                                       |
| Narrative-spec   | Segue pelo menos 1 diretriz?                                           |
| Pedagogical-spec | Dissonância sem resolução?                                             |
| Variedade        | Tipo de crítica diferente de capítulos adjacentes?                     |

Ver também `section-checklist.md` para checklist completo por seção.

---

## Estrutura de uma pasta de capítulo

```
slide-decks/capitulo-N-nome/
├── index.html              # Loader (fetch, sem CSS inline)
├── 00-capa.html            # Título + emblema + período
├── 01-historia.html        # 1 seção H: narrativa histórica do capítulo
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
- **Canvas 2D** preferível a Three.js

## Classes CSS (space-theme.css)

| Classe                 | Uso                                                |
| ---------------------- | -------------------------------------------------- |
| `title-slide`          | Slide de capa                                      |
| `faction-emblem`       | Container do emblema SVG                           |
| `classified-banner`    | Faixa superior de classificação                    |
| `classified-footer`    | Faixa inferior                                     |
| `doc-border`           | Borda decorativa                                   |
| `math-section`         | Conteúdo matemático formal                         |
| `history-section`      | Contextualização histórica (com `history-label`)   |
| `problem-section`      | Enunciados de problemas                            |
| `controls-container`   | Controles de interação                             |
| `compact-solution`     | Dica de resolução (V-DICA, sem valores calculados) |
| `dual-panel`           | Dois painéis lado a lado                           |
| `triple-panel`         | Três painéis lado a lado                           |
| `formula-spotlight`    | Destaque para fórmula principal                    |
| `visualization-canvas` | Canvas para visualizações                          |

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

Cronologia detalhada com eventos: ver issue #80.
Mapeamento de críticas por capítulo: ver issues #81–#90.
