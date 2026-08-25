---
name: loop-sala
description: Protocolo de loop implementar→julgar→corrigir→julgar para exercícios de sala (folhas A4 coluna dupla) do curso Cálculo Vetorial. Use quando o usuário pedir para rodar ou aplicar o loop num capítulo de sala (por exemplo, "roda o loop-sala no capítulo 3" ou "aplica o loop-sala no capitulo-3-mudanca-de-variaveis") ou para criar/melhorar folhas de sala com verificação automática por juiz.
---

# Loop de QA para Exercícios de Sala (implementar → julgar → corrigir → julgar)

Automatiza o trecho **implementação → verificação** das folhas de sala (`sala/AGENTS.md`). Objetivo central: impedir que a folha **revele respostas** (checkpoint/diálogo) ou **ensine pré-requisitos básicos** (ex.: determinante), além de validar estrutura, KaTeX e classes.

## Papéis e modelos

| Papel         | Subagente (`task` subagent_type) | Modelo                          | Permissão  |
| ------------- | -------------------------------- | ------------------------------- | ---------- |
| Implementador | `implementador`                  | `opencode-go/deepseek-v4-flash` | edit allow |
| Juiz          | `juiz`                           | `opencode-go/glm-5.2`           | edit deny  |
| Corretor      | `corretor`                       | `opencode-go/deepseek-v4-flash` | edit allow |

## Entradas

- Capítulo alvo (ex.: `capitulo-3-mudanca-de-variaveis`) e, opcionalmente, exercício específico.
- Exercícios de casa revisados do tópico: `exercicios/capitulo-N/<topico>/` (coerência de progressão).
- Capítulos de sala existentes (cap-0/1/2) como modelo de tom e checkpoint.

## FASE 0 — Inventário (você, orquestrador)

1. Liste os arquivos: `sala/<capitulo>/` (espera-se `index.html` + `exercicio-1.html`..`exercicio-N.html`).
2. Confira a ordem no array `EXERCICIOS` do `index.html`.
3. Anote `data-topico` e `data-dificuldade` de cada exercício para passar de contexto.
4. Verifique a progressão do capítulo (tabela de contextos do AGENTS.md raiz).

## FASE 1 — Loop por exercício

Para cada exercício na ordem (ou só o pedido):

1. **Implementador** — chame `implementador` com:
   - caminho do capítulo e do arquivo `exercicio-N.html`;
   - instrução "implementa/melhora este exercício seguindo o `sala/AGENTS.md`";
   - contexto: tópico, dificuldade, conceitos já vistos, modelo do capítulo.
   - Colete o relatório dele.
2. **Juiz** — chame `juiz` com:
   - caminho do capítulo e do arquivo;
   - instrução "verifica este exercício e emite o veredito".
   - Ele aplica os 12 critérios (estrutura, KaTeX, CSS, **diálogo sem resposta**, **checkpoint genérico**, **não ensinar pré-requisito**, **limites em branco**, quantidades, metadados, progressão, português, resolubilidade). Os critérios vivem no prompt do agente `juiz`.
   - Receba `VEREDITO: APROVADO` ou `VEREDITO: REPROVADO` + ISSUES.
3. Se **APROVADO**: vá para a FASE 1.5 (commit) e siga para o próximo exercício.
4. Se **REPROVADO** (rodada n de 1 a 3):
   - **Corretor** — chame `corretor` passando o veredito REPROVADO **na íntegra** (todos os ISSUES).
   - **Juiz novamente** — chame `juiz` com a MESMA seção para re-verificação.
   - Se APROVADO → commit e próximo. Se ainda REPROVADO → repita o par (corretor → juiz).
   - **Limite:** máximo 3 rodadas de correção por exercício. Esgotado sem aprovação → marque como `BLOQUEADO`, registre o último veredito e SIGA para o próximo (não trave a folha).

### Regras do loop

- Um juiz por vez, sempre com contexto fresco (novo subagente `juiz` a cada chamada via task).
- Passe ao corretor apenas o veredito do juiz — nada de opiniões próprias.
- Re-verificação usa o MESMO critério; se o juiz citou `arquivo:linha`, confira que aquela linha mudou.
- Se o `juiz` reportar `NÃO VERIFICADO` (ex.: não conseguiu rodar um grep), você (orquestrador) tente rodar o check você mesmo e passe o output; se falhar por ambiente, registre como tal — nunca fingir verificação.

### FASE 1.5 — Commit por exercício aprovado

- `git add` os arquivos do exercício.
- Commit com tipo convencional: `feat` (novo exercício), `fix` (correção), `refactor` (reorganização).
- Mensagem em português, descritiva. Ex.: `fix: cap 3 — remover resposta 8/(3π) do checkpoint do ex 7`.

## FASE 2 — Integração (ao fim de todos os exercícios)

- `index.html`: array `EXERCICIOS` completo e na ordem; zero CSS inline; KaTeX configurado.
- KaTeX: em `sala/<capitulo>/*.html`, `\\` só como quebra de linha dentro de matrizes (ex.: `\begin{pmatrix}`); equações `$...$`/`$$...$$` balanceadas; nenhum `<span class="lacuna">` dentro de equação.
- Classes: nenhuma classe fora do `sala-styles.css`/AGENTS.md.
- Se achar problemas de integração não cobertos por exercício, corrija (você mesmo ou chamando `implementador`) e re-valide com `juiz`.
- Commit final de integração se houver mudanças.

## FASE 3 — Report final (gate humano)

Apresente ao usuário:

- Exercícios **APROVADOS** (1ª tentativa ou após N rodadas).
- Exercícios **CORRIGIDOS**: lista dos issues principais que o juiz pegou e foram resolvidos.
- Exercícios **BLOQUEADOS**: motivo + último veredito do juiz (decisão humana).
- Nº total de rodadas de juiz (custo) e qualquer `NÃO VERIFICADO`.
- Pergunte se quer `git push` (não commitar push sem pedir).

## Notas

- O `juiz` usa glm-5.2 (mais forte) — julgue por exercício, não folha inteira, para controlar custo.
- Critérios de QA vivem no prompt dos agentes (`juiz.md` e `implementador.md`) — se o usuário quiser afrouxar/endurecer, edite os dois arquivos (`.opencode/agent/juiz.md` e `.opencode/agent/implementador.md`) e reinicie.
- Foco principal: **não revelar respostas** (checkpoint/diálogo) e **não ensinar pré-requisito básico**.
