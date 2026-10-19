# Checklist por Seção — Slides Reveal.js

**Versão:** 1.2
**Uso:** Agente 3 (implementador) e Agente 4 (verificador) verificam cada seção contra este checklist.
**Referência:** `template-spec.md` v1.4 (fluxo pedagógico), `narrative-spec.md` v3.0 (inserts + fragmentos), `AGENTS.md` (pipeline).

---

## Para cada seção de conteúdo (02–NN)

### ABERTURA (V1)

- [ ] V1 tem pergunta-problema ou motivação concreta (por que estudamos isso)?
- [ ] V1 conecta com o tópico anterior (progressão)?
- [ ] V1 tem insert histórico (1-2 frases, parágrafo final)?
  - Se não houver conexão natural, foi criada por analogia/contraste/ironia?
- [ ] Insert usa a classe `history-insert` (itálico + barra de acento; nunca `history-section`)?

### CONCEITO (V2)

- [ ] V2 apresenta a ideia ANTES da fórmula?
- [ ] V2 tem analogia visual ou exemplo intuitivo?
- [ ] O aluno entende O QUE é antes de ver COMO se calcula?

### FORMALIZAÇÃO (V3–V4)

- [ ] V3 tem definição matemática precisa?
- [ ] Fórmula principal está em `formula-spotlight`?
- [ ] V4 tem interpretação geométrica ou propriedades importantes?
- [ ] Layout está correto (dual-panel quando comparando, math-section quando explanando)?

### APLICAÇÃO (V5–V6)

- [ ] Pelo menos 1 exemplo guiado com `problem-section` (enunciado apenas, sem solução)?
- [ ] NENHUM exemplo inclui solução — o professor resolve em sala?
- [ ] Se o exemplo for complexo, há V-DICA com `compact-solution` (estratégia, sem valores)?
- [ ] Exemplo é um problema clássico do tópico (não um truque)?
- [ ] Exemplo é calculável em aula (número razoável de passos)?
- [ ] Se há 2-3 exemplos, são variações progressivas ou casos diferentes?
- [ ] Se o exemplo tem fragmento (dual-panel): esquerda = math, direita = fragmento?
- [ ] Fragmento NÃO força conexão lógica com o exemplo (justaposição livre é válida)?
- [ ] Fragmento gera emoção (dissonância, ironia, desconforto, curiosidade)?
- [ ] Fragmento tem 2-4 frases, tom seco, sem classe CSS especial?
- [ ] Fragmentos ao longo do capítulo distribuem beats narrativos sem repetição?

### EXPLORAÇÃO (V7, se aplicável)

- [ ] Visualização interativa com Canvas 2D?
- [ ] Posição flexível: pode estar entre CONCEITO e FORMALIZAÇÃO, ou na INTERPRETAÇÃO, quando apoia a definição (ex.: elemento de área/jacobiano) — não obrigatoriamente no V7 final?
- [ ] IIFE com `window.vizNome = { init, cleanup }`?
- [ ] IDs únicos para cada canvas?
- [ ] Paleta de cores segue a tabela (posição, velocidade, aceleração, força, unitários)?

### QUALIDADE DE CONTEÚDO (todas as seções de conteúdo)

- [ ] Exemplos são clássicos E simples (2-5 passos em sala, sem truque de substituição longo)?
- [ ] História é concreta: nomes, datas, fatos verificáveis (sem "o engenheiro que calculou...")?
- [ ] TODO exemplo tem fragmento em dual-panel (esquerda math | direita história)?
- [ ] Fragmentos variam beats e não repetem inserts de V1 nem entre si?

---

## Para cada seção especial

### 00-capa

- [ ] classified-banner com texto da facção correto?
- [ ] faction-emblem com SVG inline do emblema correto?
- [ ] h1 com título do capítulo?
- [ ] h3 com período histórico?
- [ ] classified-footer com código?
- [ ] Zero slides verticais?

### 01-historia

- [ ] Layout dual-panel (texto + foto)?
- [ ] history-section com history-label?
- [ ] Texto segue 3-5 frases (narrativa do capítulo)?
- [ ] Foto com crédito (`<small>`)?
- [ ] Sem fórmulas matemáticas?

### NN-resumo

- [ ] Cheat sheet de fórmulas (todas do capítulo)?
- [ ] Mapa de conexões entre tópicos?
- [ ] Identidades vetoriais importantes?
- [ ] Prévia do que vem nos próximos capítulos?
- [ ] Sem insert histórico (referência técnica pura)?

### NN+1-reflexao

- [ ] history-section com history-label?
- [ ] Dissonância final (1 frase)?
- [ ] Pergunta aberta sem resposta?
- [ ] Sem resolução — aluno sai com desconforto?

---

## Técnico (todas as seções)

- [ ] MathJax: `\(...\)` inline, `\[...\]` bloco, sem `\\` duplo?
- [ ] Verificação: `grep -c '\\\\' arquivo.html` — resultado = 0?
- [ ] Zero CSS inline (tudo em `space-theme.css`)?
- [ ] HTML fragment (sem `<html>`, `<head>`, `<body>`)?
- [ ] `\cr` para quebra de linha em matrizes (nunca `\\`)?
- [ ] IDs únicos para cada canvas (sem colisões)?
- [ ] Reveal.js local (`../reveal.js/`), nunca CDN?
- [ ] `data-faction` correto no `index.html`?

---

## Coerência narrativa (verificação entre seções)

- [ ] Todo tópico (02–NN) tem insert no V1?
- [ ] Os inserts formam um arco narrativo coerente (cada beat é único)?
- [ ] Nenhum fato histórico se repete entre inserts?
- [ ] Tipo de crítica diferente de capítulos adjacentes?
- [ ] Inserts usam tipos variados (justaposição, ironia, metáfora, contraste, fato impactante)?
- [ ] O arco narrativo faz sentido lendo apenas os inserts em ordem?
- [ ] Fragmentos junto a exemplos complementam (sem repetir) os inserts de V1?
- [ ] Fragmentos ao longo do capítulo formam arco coerente com inserts?
