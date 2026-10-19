# Guia de Provas - Cálculo Vetorial (Exploração Espacial)

Disciplina: **Cálculo Vetorial** — tema Exploração Espacial e Guerra Fria.
Instituição: UERJ.
Período padrão: 2025.1.

Este arquivo orneia o **pipeline de geração de provas**. Os templates HTML
canônicos (Prova, Gabarito, Folha de Resposta) estão em `./template/` e
**devem ser usados como base** para toda prova nova.
As provas `p1/p2/p3/ps-2025-1.html` já presentes nesta pasta são **histórico**
— não refatorar, não apagar. Provas futuras seguem o pipeline abaixo.

Para tudo que envolve tópicos por capítulo, narrativa histórica e convenções
MathJax do curso, ver `/AGENTS.md` na raiz do repositório.

---

## Templates

Os três templates canônicos vivem em `template/`:

| Template          | Arquivo                                   |
| ----------------- | ----------------------------------------- |
| Prova             | `./template/template-prova.html`          |
| Gabarito          | `./template/template-gabarito.html`       |
| Folha de Resposta | `./template/template-folha-resposta.html` |

**Uso:** carregue o template, substitua os placeholders `<!-- ... -->` pelo
conteúdo aprovado no plano, e salve o arquivo final na pasta `provas/` com a
nomenclatura abaixo. **Não invente CSS:** todo o estilo já vem do template.

- Placeholders principais: `<!-- TÍTULO DA PROVA -->`, `<!-- TÍTULO -->`,
  `<!-- ENUNCIADO -->`, `<!-- ITEM -->`, `<!-- pts -->`, `<!-- SOLUÇÃO
DETALHADA -->`, `<!-- JUSTIFICATIVA DIDÁTICA -->`.
- Repita o bloco `<div class="subquestion">…</div>` (prova/gabarito) ou
  `<div class="item-answer">…</div>` (folha) para cada item da questão.
- Enunciados podem conter MathJax inline `\(...\)` ou em bloco `\[...\]`.

---

## Pipeline de Geração de Provas

O processo é **interativo** e tem 4 passos. A IA nunca gera arquivos antes da
aprovação explícita do usuário.

### Passo 1 — Início

O usuário pede para criar uma prova. Ex.: "Vamos gerar a P2 de 2025.2".

### Passo 2 — Coleta de Informações

Se o usuário não fornecer, **perguntar** antes de propor o plano:

1. **Tipo de prova:** P1, P2, P3, Prova Substitutiva (PS), Prova Final.
2. **Tópicos a cobrir** — mapear para os capítulos 0–9 do curso:
   - Cap 0 Revisão | Cap 1 Funções vetoriais | Cap 2 Integrais duplas
   - Cap 3 Mudança de variáveis | Cap 4 Integrais triplas
   - Cap 5 Integrais de linha | Cap 6 Campos conservativos
   - Cap 7 Teorema de Green | Cap 8 Integral de superfície
   - Cap 9 Teorema da divergência (Stokes/Gauss)

### Passo 3 — Proposta do Plano da Prova

Apresentar o plano completo e terminar perguntando:
**"Você aprova este plano? Posso fazer alguma alteração antes de gerar os
arquivos HTML finais?"**

Regras do plano:

- **Estrutura fixa:** 4 questões, valor total 10,0, cada questão 2,5 pontos.
- **Itens por questão:** entre 2 e 4. Pontuação por_item variável (itens mais
  difíceis valem mais) somando exatamente 2,5.
- **Justificativa didática:** para cada questão, explicar brevemente por que
  ela avalia pedagogicamente os tópicos solicitados.
- **Item de verificação** (quando fizer sentido, no último item da questão):
  - Após integral dupla de área → verificar via produto vetorial dos lados.
  - Após encontrar potencial escalar → integrar por dois caminhos e comparar.
  - Após Stokes → calcular fluxo do rotacional diretamente e pela integral de
    linha da fronteira; conferir igualdade.
  - Após divergência (Gauss) → calcular fluxo por integral tripla e, se
    possível, por simetria; comparar.
  - Após centro de massa → checar coerência com a simetria geométrica.
  - Para tópicos sem verificação direta (ex: determinante isolado), o item
    final pode ser uma pergunta conceitual.
- **Não antecipar** conceitos de capítulos posteriores ao escopo da prova.

### Passo 4 — Geração dos Arquivos HTML

Após aprovação, gerar **três arquivos HTML completos e distintos** usando os
templates de `template/`, preenchidos com o conteúdo aprovado:

1. **Prova** — `template-prova.html` (A4 duas colunas, cabeçalho UERJ,
   identificação, grade table Q1–Q4+TOTAL).
2. **Gabarito** — `template-gabarito.html` (itens com `<details>` colapsáveis;
   acrescentar a justificativa didática logo após o enunciado geral de cada
   questão, no elemento `<p class="didactic">…</p>`).
3. **Folha de Resposta** — `template-folha-resposta.html` (A4, 2 páginas:
   Q1–Q2 / Q3–Q4, espaço em branco para resolução).

### Nomenclatura dos arquivos

```
p<N>-<ano>.<semestre>.html         ex: p1-2025.1.html, p2-2025.1.html
ps-<ano>.<semestre>.html           ex: ps-2025.1.html
```

Gabarito e folha de resposta levam sufixo `-gab` e `-folha`:

```
p2-2025.1-gab.html
p2-2025.1-folha.html
```

---

## Convenções do Repositório (não-negociáveis)

- **MathJax:** delimitadores `\( ... \)` (inline) e `\[ ... \]` (bloco), com
  **uma** barra no HTML. **Nunca** `\\(`, `\\[`, `\\frac` no conteúdo — barra
  dupla quebra o MathJax. Após escrever cada arquivo, conferir.
- **CSS:** todo o estilo vem dos templates em `template/`. **Zero
  CSS inline** nos arquivos de prova gerados.
- **jQuery/Three.js:** proibidos (DOM nativo e Canvas 2D quando precisar).
- **Sem narrativa histórica** nas provas — provas são documento neutro. A
  narrativa Exploração Espacial vive nos slides e exercícios didáticos, não
  nas folhas de avaliação.

---

## Histórico

Os arquivos `p1-2025-1.html`, `p2-2025-1.html`, `p3-2025-1.html` e
`ps-2025-1.html` são registro das provas aplicadas em 2025.1, geradas antes
deste padrão. **Não refatorar, não apagar** — servem de referência de estilo e
conteúdo. Novas provas seguem o pipeline e os templates acima.
