---
name: loop-slides
description: Protocolo de loop implementar→julgar→corrigir→julgar para slides Reveal.js do curso Cálculo Vetorial. Use quando o usuário pedir para rodar ou aplicar o loop num capítulo (por exemplo, "roda o loop no capítulo 3" ou "aplica o loop-slides no capítulo 8") ou para criar/melhorar seções de slides com verificação automática por juiz.
---

# Loop de QA para Slides (implementar → julgar → corrigir → julgar)

Automatiza o trecho **implementação → verificação** do pipeline de slides (AGENTS.md). RTC e PDI continuam planejados por humanos na issue do capítulo; este loop executa e verifica a implementação.

## Papéis e modelos

| Papel             | Subagente (`task` subagent_type) | Modelo                          | Permissão          |
| ----------------- | -------------------------------- | ------------------------------- | ------------------ |
| Implementador     | `implementador`                  | `opencode-go/deepseek-v4-flash` | edit allow         |
| Verificador téc.  | `verificador-tecnico`            | `opencode-go/deepseek-v4-flash` | edit deny          |
| Juiz (qualidade)  | `juiz`                           | `kimi-for-coding/k3`            | edit deny          |
| Corretor          | `corretor`                       | `opencode-go/deepseek-v4-flash` | edit allow         |

**Verificação em 2 camadas:** `verificador-tecnico` (rápido/barato) faz as checagens programáticas; `juiz` (k3) julga qualidade e dá o veredito final. k3 é caro — use-o uma vez por seção no final, não para rodar greps.

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

## FASE 0.5 — PDI review (qualidade do plano ANTES de implementar)

**Motivo:** o loop de slides já queimou um ciclo inteiro porque o PDI aprovado prescrevia conteúdo fraco (exemplo complexo, história vaga, sem fragmento, viz no lugar errado). O PDI é o artefato gated — julgue-o ANTES.

Para cada seção que será implementada, com o PDI da issue em mãos (`gh issue view N --comments`, Camadas 1-4):

1. Chame `juiz` com a tarefa: "avalia o PLANO (PDI Camada 1-4) da seção NN contra os critérios de qualidade, SEM olhar slides".
2. Critérios do PDI review (os mesmos do juiz, aplicados ao plano):
   - exemplos clássicos E simples (2-5 passos em sala, sem truque de substituição longo)?
   - história concreta (nomes/datas/fatos) e beats únicos (sem repetição entre insert/fragmentos)?
   - fragmento em TODO exemplo previsto?
   - posição das visualizações (antes da formalização aceitável quando apoia a definição)?
   - fluxo pedagógico correto (motivação → conceito → [viz?] → formalização → interpretação → exemplos)?
   - atomicidade (um conceito por slide)?
3. Se o PDI **reprovar**: NÃO implemente ainda. Corrija o plano — atualize a issue (você pode pedir ao usuário ou gerar a correção e propor) — e re-julgue até aprovar.
4. Só então siga para a FASE 1 com o PDI aprovado.

> PDI sem comentários (Camada 4 inexistente): o PDI review falha por ausência — peça ao usuário/planejamento antes de implementar, OU use os exercícios revisados + specs para rascunhar um PDI curto e julgue-o.

## FASE 1 — Loop por seção

Para cada seção na ordem (ou só a pedida), **após FASE 0.5 aprovar o PDI**:

1. **Implementador** — chame `implementador` com:
   - caminho do capítulo e do arquivo de seção;
   - instrução "implementa/melhora esta seção seguindo as specs e o PDI aprovado";
   - contexto: facção, período, PDI da issue (se houver), tópicos de exercício correspondentes.
   - Colete o relatório dele.
2. **Verificador técnico** — chame `verificador-tecnico` com:
   - caminho do capítulo e do arquivo de seção;
   - instrução "verifica tecnicamente esta seção e emite VEREDITO TÉCNICO".
   - Receba `VEREDITO TÉCNICO: OK` ou `REPROVADO` + ISSUES.
   - Se REPROVADO técnico → vá para o corretor (passo 4) antes do juiz.
3. **Juiz (qualidade)** — chame `juiz` com:
   - caminho do capítulo e do arquivo de seção;
   - instrução "verifica QUALIDADE desta seção e emite o veredito final" (referencie o VEREDITO TÉCNICO já dado).
   - O juiz aplica os 13 critérios de conformidade E os critérios de **qualidade de conteúdo** (exemplos simples, história concreta com nomes/datas, fragmento em TODO exemplo, viz antes da formalização aceitável) — lê estes critérios do próprio prompt do agente `juiz`.
   - Receba `VEREDITO: APROVADO` ou `VEREDITO: REPROVADO` + ISSUES.
4. Se **APROVADO**: vá para a FASE 1.5 (commit) e siga para a próxima seção.
5. Se **REPROVADO** (técnico ou de qualidade; rodada n de 1 a 3):
   - **Corretor** — chame `corretor` passando o veredito REPROVADO **na íntegra** (todos os ISSUES).
   - **Re-verificação** — repita verificador-tecnico → juiz na MESMA seção.
   - Se APROVADO → commit e próxima seção. Se ainda REPROVADO → repita o par (corretor → re-verifica).
   - **Limite:** máximo 3 rodadas de correção por seção. Esgotado sem aprovação → marque a seção como `BLOQUEADO`, registre o último veredito e SIGA para a próxima seção (não trave o capítulo).

### Regras do loop

- Um verificador e um juiz por vez, sempre com contexto fresco (novo subagente a cada chamada via task).
- Passe ao corretor apenas o veredito do verificador/juiz — nada de opiniões próprias.
- Re-verificação usa o MESMO critério; se o verificador/juiz citou `arquivo:linha`, confira que aquela linha mudou.
- Se o `verificador-tecnico` reportar `NÃO VERIFICADO` (ex.: debug-slide.js não rodou), você (orquestrador) tente rodar `node debug-slide.js <capitulo>` você mesmo e passe o output; se falhar por ambiente, registre como tal no report — nunca fingir verificação.

### FASE 1.5 — Commit por seção aprovada

- `git add` os 1-3 arquivos da seção (ex.: seção + `visualizacoes.js` se mexeu).
- Commit com tipo convencional: `feat` (nova seção), `fix` (correção), `refactor` (reorganização).
- Mensagem em português, descritiva. Ex.: `fix: cap 3 — corrigir MathJax com barra dupla no Exemplo 2 da seção 02`.

## FASE 2 — Integração (ao fim de todas as seções)

- `index.html`: loader limpo, zero CSS inline, `data-faction` correto, lista `sections` completa.
- `visualizacoes.js`: exports `window.viz*` batem com os `id` de canvas das seções; IIFE; `requestAnimationFrame`.
- MathJax global: `grep -c '\\\\' slide-decks/<capitulo>/*.html` → 0 em todos.
- Rode `node debug-slide.js <capitulo>` nos slides com `dual-panel`/canvas/imagem e confira layout (`flexDirection: row`) e imagens.
- Se achar problemas de integração não cobertos por seção, corrija (você mesmo ou chamando `implementador`) e re-valide com `verificador-tecnico` + `juiz`.
- Commit final de integração se houver mudanças.

## FASE 3 — Report final (gate humano)

Apresente ao usuário um resumo:

- Seções **APROVADAS** (1ª tentativa ou após N rodadas).
- Seções **CORRIGIDAS**: lista de issues principais que o juiz pegou e foram resolvidos.
- Seções **BLOQUEADAS**: motivo + último veredito do juiz (para decisão humana).
- Nº total de rodadas de juiz (custo) e qualquer `NÃO VERIFICADO`.
- Pergunte se quer `git push` (não commitar push sem pedir).

## Notas

- O `juiz` usa k3 (mais caro/forte) — julgue por seção, não capítulo inteiro. O `verificador-tecnico` (deepseek) faz a triagem técnica barata antes.
- Se o capítulo for monolítico (um `index.html` gigante, ex.: cap 8/9), o FASE 0 deve detectar e o implementador quebrar em seções modulares antes do loop por seção — trate como um passo prévio de modularização.
- Nunca antecipar conceitos de capítulos posteriores (AGENTS.md).
- Critérios de qualidade (exemplos simples, história concreta, fragmento em todo exemplo, viz antes da formalização) vivem no prompt do `juiz` e do `implementador`; critérios técnicos no `verificador-tecnico`. Se o usuário quiser afrouxar/endurecer, edite os arquivos de agente (`.opencode/agent/*.md`) e reinicie.
- O PDI da issue (Camada 4) é a fonte de conteúdo — por isso a FASE 0.5 julga o PDI ANTES de implementar. Se o PDI prescreve algo que o professor rejeitou (ex.: exemplo complexo, história vaga), atualize a issue ANTES, senão o implementador repete o erro.
