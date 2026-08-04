---
name: loop-slides
description: Protocolo de loop implementar→julgar→corrigir→julgar para slides Reveal.js do curso Cálculo Vetorial. Use quando o usuário pedir para rodar ou aplicar o loop num capítulo (por exemplo, "roda o loop no capítulo 3" ou "aplica o loop-slides no capítulo 8") ou para criar/melhorar seções de slides com verificação automática por juiz.
---

# Loop de QA para Slides (implementar → julgar → corrigir → julgar)

Automatiza o trecho **implementação → verificação** do pipeline de slides (AGENTS.md). RTC e PDI continuam planejados por humanos na issue do capítulo; este loop executa e verifica a implementação.

## Papéis e modelos

| Papel        | Subagente (`task` subagent_type) | Modelo                          | Permissão          |
| ------------ | -------------------------------- | ------------------------------- | ------------------ |
| Implementador | `implementador`                  | `opencode-go/deepseek-v4-flash` | edit allow         |
| Juiz         | `juiz`                           | `kimi-for-coding/k3`            | edit deny          |
| Corretor     | `corretor`                       | `opencode-go/deepseek-v4-flash` | edit allow         |

## Entradas

- Capítulo alvo (ex.: `capitulo-3-mudanca-de-variaveis`) e, opcionalmente, seção específica.
- Issue do capítulo (números #81–#90; arco geral #80). Achar com:
  `gh issue list --label slides --state open --limit 10`
  Se a issue tiver PDI (Camada 4 em comentários), passe os trechos relevantes ao implementador: `gh issue view N --comments`.
- Exercícios revisados: `exercicios/capitulo-N/<topico>/` (alinhamento).

## FASE 0 — Inventário (você, orquestrador)

1. Liste os arquivos do capítulo: `slide-decks/<capitulo>/`.
2. Compare com a estrutura do template-spec: `00-capa`, `01-historia`, `02..NN` tópicos, `NN+1-resumo`, `NN+2-reflexao`, `index.html`, `visualizacoes.js`.
3. Defina a ordem de processamento das seções (números em ordem). Se o usuário pediu uma seção específica, processe só ela.
4. Anote a facção/período do capítulo (tabela do AGENTS.md) para passar de contexto.

## FASE 1 — Loop por seção

Para cada seção na ordem (ou só a pedida):

1. **Implementador** — chame `implementador` com:
   - caminho do capítulo e do arquivo de seção;
   - instrução "implementa/melhora esta seção seguindo as specs";
   - contexto: facção, período, PDI da issue (se houver), tópicos de exercício correspondentes.
   - Colete o relatório dele.
2. **Juiz** — chame `juiz` com:
   - caminho do capítulo e do arquivo de seção;
   - instrução "verifica esta seção e emite o veredito".
   - Receba `VEREDITO: APROVADO` ou `VEREDITO: REPROVADO` + ISSUES.
3. Se **APROVADO**: vá para a FASE 1.5 (commit) e siga para a próxima seção.
4. Se **REPROVADO** (rodada n de 1 a 3):
   - **Corretor** — chame `corretor` passando o veredito REPROVADO **na íntegra** (todos os ISSUES).
   - **Juiz novamente** — chame `juiz` com a MESMA seção para re-verificação.
   - Se APROVADO → commit e próxima seção. Se ainda REPROVADO → repita o par (corretor → juiz).
   - **Limite:** máximo 3 rodadas de correção por seção. Esgotado sem aprovação → marque a seção como `BLOQUEADO`, registre o último veredito e SIGA para a próxima seção (não trave o capítulo).

### Regras do loop

- Um juiz por vez, sempre com contexto fresco (mesmo subagente `juiz` novo a cada chamada via task).
- Passe ao corretor apenas o veredito do juiz — nada de opiniões próprias.
- Re-verificação usa o MESMO critério; se o juiz citou `arquivo:linha`, confira que aquela linha mudou.
- Se o `juiz` reportar `NÃO VERIFICADO` (ex.: debug-slide.js não rodou), você (orquestrador) tente rodar `node debug-slide.js <capitulo>` você mesmo e passe o output; se falhar por ambiente, registre como tal no report — nunca fingir verificação.

### FASE 1.5 — Commit por seção aprovada

- `git add` os 1-3 arquivos da seção (ex.: seção + `visualizacoes.js` se mexeu).
- Commit com tipo convencional: `feat` (nova seção), `fix` (correção), `refactor` (reorganização).
- Mensagem em português, descritiva. Ex.: `fix: cap 3 — corrigir MathJax com barra dupla no Exemplo 2 da seção 02`.

## FASE 2 — Integração (ao fim de todas as seções)

- `index.html`: loader limpo, zero CSS inline, `data-faction` correto, lista `sections` completa.
- `visualizacoes.js`: exports `window.viz*` batem com os `id` de canvas das seções; IIFE; `requestAnimationFrame`.
- MathJax global: `grep -c '\\\\' slide-decks/<capitulo>/*.html` → 0 em todos.
- Rode `node debug-slide.js <capitulo>` nos slides com `dual-panel`/canvas/imagem e confira layout (`flexDirection: row`) e imagens.
- Se achar problemas de integração não cobertos por seção, corrija (você mesmo ou chamando `implementador`) e re-valide com `juiz`.
- Commit final de integração se houver mudanças.

## FASE 3 — Report final (gate humano)

Apresente ao usuário um resumo:

- Seções **APROVADAS** (1ª tentativa ou após N rodadas).
- Seções **CORRIGIDAS**: lista de issues principais que o juiz pegou e foram resolvidos.
- Seções **BLOQUEADAS**: motivo + último veredito do juiz (para decisão humana).
- Nº total de rodadas de juiz (custo) e qualquer `NÃO VERIFICADO`.
- Pergunte se quer `git push` (não commitar push sem pedir).

## Notas

- O `juiz` usa k3 (mais caro/forte) — julgue por seção, não capítulo inteiro, para controlar custo.
- Se o capítulo for monolítico (um `index.html` gigante, ex.: cap 8/9), o FASE 0 deve detectar e o implementador quebrar em seções modulares antes do loop por seção — trate como um passo prévio de modularização.
- Nunca antecipar conceitos de capítulos posteriores (AGENTS.md).
