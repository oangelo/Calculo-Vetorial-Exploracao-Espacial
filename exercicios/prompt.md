### Estrutura Exata do Documento

O material deve conter EXATAMENTE as seguintes seções na ordem especificada:

1. **Cabeçalho do Documento** (classe "document-header")
   - Carimbo "SIGILOSO" (classe "document-stamp")
   - Data e localização (classe "document-date")
   - Introdução do projeto (classe "document-intro")
   - Aviso de segurança (classe "warning-box")
   - Metadados do documento (classe "metadata")

2. **Seção de Fundamentação Teórica**
   - Título da seção (classe "section-title"): "FUNDAMENTAÇÃO TEÓRICA: [TÓPICO]"
   - Definição formal (classe "concept-definition") com fórmula matemática principal
   - Contextualização na exploração espacial (classe "mission-context")
   - Nota histórica (classe "historical-note")

3. **Lista de Exercícios** (dentro da tag main, classe "exercise-list")
   - Exatamente 12 exercícios (classe "exercise-item") distribuídos em 4 séries (ALFA, BETA, GAMMA, OMEGA)
   - Cada exercício com estrutura padronizada:
     * Número do exercício (classe "exercise-number")
     * Contexto histórico (classe "context")
     * Enunciado do problema
     * Dica técnica (classe "hint") - apenas para séries ALFA, BETA e GAMMA
     * Solução (dentro de tags details/summary, classe "solution")

4. **Rodapé**
   - Numeração de página (classe "page-number")
   - Carimbo "ULTRASSECRETO" (classe "footer-stamp")### Formatação Padronizada
- Título do documento: "Documento Sigiloso - [Tópico]" sempre centralizado no topo
- Carimbo "SIGILOSO" sempre no canto superior direito da seção de cabeçalho
- Data e localização: formato consistente com dia censurado, mês por extenso, ano censurado
- TODOS os exercícios devem seguir o formato:
  1. Número único do exercício (ex: "EXERCÍCIO VECTOR-1A") em negrito no topo
  2. Contexto histórico específico logo abaixo (ex: "ORIGEM: Análise de Trajetória - Programa Apollo")
  3. Enunciado do problema com parâmetros claramente identificados
  4. Dica técnica quando apropriado (usando a classe "hint")
  5. Solução detalhada dentro da tag <details> com sumário "RELATÓRIO DE CÁLCULO [NÍVEL-SIGMA REQUERIDO]"
  6. Conclusão ou interpretação dos resultados ao final da solução
- Use spans com classe "censored" para informações supostamente confidenciais
- Metadados no rodapé da seção de cabeçalho: REF, NÍVEL DE ACESSO, CÓPIAS EXISTENTES
- Página e numeração no rodapé: formato "PÁGINA X DE Y • DOCUMENTO [CÓDIGO]"
- Use "warning-box" para alertas e avisos importantes
- Carimbo "ULTRASSECRETO" no rodapéCrie materiais didáticos para um curso de Cálculo Vetorial sobre [TÓPICO ESPECÍFICO] usando o tema de documento sigiloso da Guerra Fria e exploração espacial, seguindo estas diretrizes:

### Contexto Temático
- Simule um documento sigiloso da NASA, CIA ou organização equivalente durante a Guerra Fria (1957-1975)
- Refira-se a eventos históricos reais da corrida espacial conforme apropriado para o tópico
- Use terminologia de agências espaciais e militares da época
- Inclua elementos como carimbos de "SIGILOSO", "ULTRASSECRETO", "[REDACTED]" e datas históricas relevantes
- NUNCA use o termo "classificado" para indicar sigilo (isso é um falso cognato em português)

### Requisitos Técnicos Explícitos
- Siga EXATAMENTE o formato HTML/CSS do template fornecido
- Use as tags de seção exatamente como fornecidas (não adicione ou remova seções)
- Todas as fórmulas matemáticas DEVEM usar LaTeX via MathJax
- SEMPRE use a notação \vec{} para vetores (ex: \vec{v} em vez de apenas v)
- Para matrizes, use o ambiente pmatrix: \begin{pmatrix} ... \end{pmatrix}
- Use a fonte Share Tech Mono conforme especificado no template
- Mantenha as cores e estilos exatos do template
- Utilize as classes CSS definidas no template sem modificá-las
- Preserve todos os elementos visuais (carimbos, áreas censuradas, etc.)
- Todas as datas e referências devem ser historicamente consistentes com o período escolhido

### Estrutura do Material
1. **Documento Header (Contextualização Histórica)**
   - Inclua uma data histórica relevante para o tópico (ex: perto de missões Apollo, Sputnik, etc.)
   - Crie um nome de projeto fictício relacionado ao tópico matemático (ex: "PROJETO VECTOR-X")
   - Relacione o tópico matemático a alguma necessidade da exploração espacial
   - Inclua referências a situações de "rivalidade" com os soviéticos quando apropriado

2. **Introdução ao Conceito Matemático**
   - Apresente a definição formal/matemática primeiro
   - Siga com explicações intuitivas conectadas à navegação espacial, órbitas, propulsão, etc.
   - Descreva o conceito como se fosse uma "descoberta crucial" para a segurança nacional

3. **Exercícios Práticos (2-4 exercícios por página)**
   - Cada exercício deve ter:
     - Número único (ex: "EXERCÍCIO VECTOR-1A")
     - Contexto histórico específico (ex: "ORIGEM: Análise de Trajetória - Programa Apollo")
     - Enunciado usando aplicações práticas da exploração espacial
     - Dicas técnicas (como se fossem notas de um cientista)
     - Solução detalhada em seção oculta (usando a tag details/summary)

4. **Elementos Visuais e Formatação**
   - Inclua exatamente 8-10 áreas "censuradas" por página usando spans com a classe "censored"
   - Use a classe "warning-box" para exatamente um alerta importante por página
   - Mantenha o estilo de documento datilografado/envelhecido do template
   - Adicione códigos de referência fictícios consistentes (ex: "REF: VX-1729-B")
   - Inclua exatamente um carimbo "ULTRASSECRETO" no rodapé
   - Mantenha a formatação de página com número e referência no rodapé

### Diretrizes de Conteúdo Matemático
- Balanceie rigor matemático com aplicações práticas na exploração espacial
- Conecte conceitos abstratos a problemas concretos (órbitas, navegação, propulsão, reentrada, etc.)
- Para cálculo multivariado, use exemplos de campos gravitacionais, fluxo de combustível, etc.
- Para vetores, relacione com velocidade, aceleração, forças em veículos espaciais
- Para integrais, relacione com trabalho, energia, massa, centro de massa de foguetes
- Para teoremas (Green, Stokes, Gauss), relacione com fluxo de campos, rotação de fluidos espaciais

### Progressão de Dificuldade
- Comece com exercícios básicos e aumente gradualmente a complexidade
- Primeiro exercício: aplicação direta do conceito com números simples
- Segundo exercício: aplicação mais elaborada ou combinação de conceitos
- Exercícios avançados: problemas que requerem múltiplos passos ou insight

### Eventos Históricos para Contextualização
- Lançamento do Sputnik (Outubro 1957)
- Explorer 1 - Primeiro satélite americano (Janeiro 1958)
- Programa Mercury (1958-1963)
- Yuri Gagarin - Primeiro homem no espaço (Abril 1961)
- Alan Shepard - Primeiro americano no espaço (Maio 1961)
- John Glenn - Primeira órbita americana (Fevereiro 1962)
- Crise dos Mísseis de Cuba (Outubro 1962)
- Programa Gemini (1965-1966)
- Programa Apollo (1961-1972)
- Apollo 11 - Pouso lunar (Julho 1969)
- Apollo 13 - Missão de resgate (Abril 1970)
- Skylab (1973-1979)
- Projeto Apollo-Soyuz (Julho 1975)

Certifique-se de que o material seja matematicamente rigoroso, mas também envolvente e contextualizado historicamente. O objetivo é fazer com que os estudantes sintam que estão descobrindo segredos matemáticos que foram cruciais para a corrida espacial e a segurança nacional durante a Guerra Fria.
