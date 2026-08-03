# Spec: Narrativa Crítica — Cálculo Vetorial: Exploração Espacial

**Versão:** 3.0  
**Curso:** Cálculo Vetorial — Exploração Espacial (Guerra Fria)  
**Destinatário:** Agente de implementação de slides

---

## Fonte de detalhes históricos

O arco narrativo completo do curso, cronologia por capítulo, exemplos com datas e pessoas está em:

- **Issue #80** — Arco narrativo do curso (estrutura em 3 atos)
- **Issues #81–#90** — Arcos narrativos por capítulo (B.0–B.9)
- **Issue #1** — Cronologia detalhada com eventos

Este spec contém **apenas diretrizes gerais**. Nomes, datas e eventos específicos não devem ser inventados — consultar as issues correspondentes.

---

## Tese central

A corrida espacial foi um teatro de dois sistemas que prometiam liberação e entregavam controle. A narrativa hegemônica — o herói individual branco que conquista o cosmos — é uma construção de relações públicas, não história. O cálculo vetorial que ensinamos foi produzido em grande parte por pessoas que a história oficial tentou apagar. Nenhum dos dois lados foi o "lado bom".

O avanço tecnológico foi usado sistematicamente como substituto narrativo de progresso social. Foguetes imensos, feitos fantásticos, a Lua — e a sugestão implícita de que o avanço é em todas as frentes. Uma falácia. A vida da maioria das pessoas não melhora automaticamente com avanços tecnológicos e econômicos. Tecnologia é fácil de financiar porque não ameaça hierarquias. Redistribuição de poder ameaça. O engenheiro que não entende isso torna-se instrumento de sistemas que não o servirão igualmente.

---

## Diretriz 1 — Regra do Coletivo

**Princípio:** Toda conquista individual citada deve ser desconstruída mostrando quem estava por trás e não foi creditado.

**Aplicação:** Ao mencionar um nome famoso (Armstrong, Gagarin, Glenn), incluir no mesmo slide ou no seguinte as pessoas que tornaram aquilo possível e foram invisibilizadas.

---

## Diretriz 2 — Regra da Ironia Sistêmica

**Princípio:** Cada narrativa de "liberdade" ou "igualdade" deve ser confrontada com o que o sistema fazia simultaneamente.

**Aplicação:** Usar justaposição temporal — o mesmo ano, o mesmo país, duas realidades incompatíveis.

---

## Diretriz 3 — Regra do Apagamento Ativo

**Princípio:** A omissão de marginalizados não foi acidente — foi decisão ativa de sistemas e instituições.

**Aplicação:** Nomear o mecanismo de exclusão, não apenas a ausência.

---

## Diretriz 4 — Regra da Performance dos Dois Lados

**Princípio:** Ambos os lados cooptavam narrativas de inclusão quando serviam à propaganda, e as abandonavam quando não havia mais utilidade.

**Aplicação:** Para cada gesto de "progressismo" de cada lado, mostrar o que veio depois.

---

## Diretriz 5 — Regra do Herói como Produto de PR

**Princípio:** Os heróis individuais da corrida espacial foram selecionados e construídos como produtos de relações públicas, não apenas pelos méritos técnicos.

**Aplicação:** Questionar os critérios de seleção dos "rostos" da corrida espacial.

---

## Diretriz 6 — Regra da Matemática Neutra, Sistema Não

**Princípio:** O cálculo vetorial não discrimina. Os sistemas que decidiram quem o aplicava, quem recebia crédito e quem foi contratado ou demitido — esses discriminaram ativamente.

**Aplicação:** Usar como fio condutor filosófico ao longo do curso. A equação não tem raça, gênero ou orientação sexual. As pessoas que a escreveram, ensinaram e aplicaram viviam sob sistemas que as classificavam e excluíam.

---

## Diretriz 7 — Regra da Tecnologia como Distração

**Princípio:** O avanço tecnológico não implica avanço social. A corrida espacial foi financiada por impostos de trabalhadores dos dois lados para demonstrar superioridade de sistemas que não os serviram igualmente. Usar conquistas técnicas espetaculares para sugerir progresso geral é uma falácia deliberada.

**Aplicação:** Ao apresentar marcos tecnológicos, questionar explicitamente: _para quem, de fato, isso foi bom?_ Mostrar o que não avançou no mesmo período.

**A pergunta que o agente deve plantar nos slides:**

> _"Se somos capazes de resolver problemas técnicos desta magnitude, por que escolhemos não resolver outros?" A resposta não é técnica — é política._

**Conexão com o ensino técnico:**

O engenheiro, o matemático, o cientista são frequentemente vendidos a si mesmos como figuras neutras — resolvem problemas que outros definem. Essa neutralidade é uma ilusão conveniente para quem define os problemas. Compreender o contexto social do trabalho técnico não é "politizar a ciência" — é entender onde o trabalho técnico realmente existe.

---

## Três camadas onde a história aparece

A história entra nos slides em três níveis de profundidade, do mais ao menos explícito:

1. **`01-historia.html`** — slide dedicado após a capa. Pode apresentar um sistema, uma pessoa, um evento ou uma pergunta. Conteúdo varia por capítulo (ver issue B.N correspondente).

2. **Insert no V1 de cada tópico** — slide de abertura (motivação) das seções de conteúdo (02, 03, etc.). Parágrafo final do V1, 1-2 frases, com a classe `.history-insert` (itálico + barra de acento, discreta). **Todo tópico de conteúdo recebe insert no V1.** Se não houver conexão natural com a matemática, criar uma por analogia, contraste ou ironia. Inserts NÃO são opcionais — são parte do arco narrativo do capítulo.

3. **Fragmento junto a exemplos matemáticos** — nos slides de APLICAÇÃO (V5+), exemplos podem usar `dual-panel`: esquerda = problema + solução, direita = fragmento histórico/emocional. O fragmento NÃO precisa ter relação lógica com o exemplo. A justaposição em si é o mecanismo pedagógico.

---

## Fragmento (Camada 3) — mecanismo e regras

### O que é um fragmento

Um fragmento é um bloco de texto curto (2-4 frases) que aparece ao lado de um exemplo matemático, sem relação lógica obrigatória com ele. O objetivo é **ancorar a memória técnica numa experiência emocional** — o aluno lembra do cálculo porque lembra do que sentiu ao ler o fragmento.

### Por que funciona

O cérebro arquiva experiências com carga emocional, não informação neutra (Damasio). A justaposição de matemática fria com um fato que gera desconforto, ironia ou curiosidade cria uma memória composta — o conteúdo técnico e o impacto emocional ficam gravados juntos, mesmo que não tenham conexão racional.

### O fragmento NÃO precisa

- Explicar o exemplo ao lado
- Ter relação lógica com o conteúdo matemático
- Ser "relevante" no sentido tradicional
- Resolver ou comentar a matemática

### O fragmento PODE

- Ser um fato histórico brutal e seco
- Gerar dissonância cognitiva (dois fatos incompatíveis lado a lado)
- Distribuir um beat narrativo que não coube nos inserts de V1
- Criar ironia, desconforto, curiosidade ou surpresa
- Ser uma pergunta sem resposta
- Ser um dado que gera impacto emocional

### Formato

- **Layout:** `dual-panel` (esquerda: `problem-section` + `compact-solution`, direita: fragmento em `<p>` simples)
- **Extensão:** 2-4 frases
- **Classes CSS:** nenhuma classe especial no fragmento. Parágrafo `<p>` simples dentro do painel direito
- **Tom:** seco, factual, sem adjetivos dramáticos. O impacto vem do conteúdo, não da retórica
- **Frequência:** dinâmico — 1 ou mais exemplos por seção recebem fragmento. Nem todos precisam. A decisão é do PDI (Camada 3: integração), que indica quais exemplos recebem fragmento e quais ficam em math puro

### Tipos de fragmento

| Tipo                  | Descrição                                    | Exemplo                                                                                                                 |
| --------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Fato brutal           | Dado histórico que gera desconforto          | "O R-7 consumia 250 kg de combustível por segundo."                                                                     |
| Ironia sistêmica      | Sistema diz X, faz Y                         | "O Designer-Chefe recebia o Prêmio Stalin sem poder usar o próprio nome."                                               |
| Justaposição temporal | Mesmo momento, duas realidades               | "Em 1949, a URSS detonou sua primeira bomba atômica. Os nomes dos calculadores permaneceram classificados por décadas." |
| Pergunta aberta       | Questão sem resposta, plantada para o futuro | "Quem decide para que a matemática é usada?"                                                                            |
| Contraste emocional   | Beleza técnica vs. custo humano              | "A órbita é elegante. Os engenheiros que a calcularam eram prisioneiros."                                               |
| Beat narrativo        | Trecho do arco narrativo que não coube no V1 | Distribuição dos 5 beats do capítulo entre inserts e fragmentos                                                         |

### Relação com o arco narrativo

Os fragmentos são uma **segunda via** para distribuir o arco narrativo do capítulo. Os inserts de V1 ancoram o tópico; os fragmentos distribuem os beats restantes e fatos complementares. O PDI (Camada 3) mapeia quais beats vão em inserts e quais vão em fragmentos, garantindo que o arco seja coerente e sem repetição.

---

## Instrução geral para o agente

- Cada inserção histórica não deve ultrapassar **1 slide** ou **30 segundos de narração**
- O conteúdo matemático é prioridade; o histórico é dissonância cognitiva, não contexto decorativo
- Inserts no V1 são obrigatórios em toda seção de conteúdo (02–NN). Formato: 1-2 frases, parágrafo final, com a classe `.history-insert`
- Fragmentos junto a exemplos são dinâmicos (1 ou mais por seção). Decisão fica no PDI Camada 3
- Fontes prioritárias: NASA.gov, Wikipedia (inglês), AIP.org, Smithsonian — nada de revisionismo sem base documental
- Tom: seco, direto, sem sentimentalismo. O impacto vem dos fatos, não da retórica
- Se houver dúvida sobre qual fato usar: escolher o que gera mais dissonância ou impacto emocional
- Fragmentos não precisam ter relação lógica com o exemplo — justaposição emocional é válida
