Crie materiais didáticos para um curso de Cálculo Vetorial sobre [TÓPICO ESPECÍFICO] usando EXATAMENTE o template HTML fornecido, com tema de documento sigiloso da Guerra Fria e exploração espacial.

### IMPORTANTE: RESPEITAR A PROGRESSÃO DOS TÓPICOS
- Os exercícios DEVEM usar APENAS conceitos já abordados até o tópico atual
- NUNCA antecipe conceitos de tópicos posteriores na progressão do curso
- Consulte a sequência de tópicos ao final deste prompt
- Se o tópico solicitado for "Funções Vetoriais", não use conceitos de "Derivadas Parciais" ou posteriores
- Relacione o contexto histórico à época apropriada (ex: tópicos iniciais com Sputnik/Mercury, mais avançados com Apollo)

### IMPORTANTE: USO CORRETO DE FÓRMULAS LATEX
- No corpo do HTML, use APENAS:
  * `\[fórmula\]` para fórmulas em bloco (display mode)
  * `\(fórmula\)` para fórmulas inline
- NUNCA use barras duplas (`\\[` ou `\\(`) no corpo do HTML
- EXEMPLOS CORRETOS:
  * Bloco: `<p>\[|\vec{v}| = \sqrt{v_x^2 + v_y^2}\]</p>`
  * Inline: `<p>O vetor \(\vec{v}\) tem magnitude \(|\vec{v}|\)</p>`
- Mesmo que você veja `\\[` na configuração do MathJax, no corpo do HTML use apenas UMA barraCrie materiais didáticos para um curso de Cálculo Vetorial sobre [TÓPICO ESPECÍFICO] usando EXATAMENTE o template HTML fornecido, com tema de documento sigiloso da Guerra Fria e exploração espacial.

### Estrutura Exata do Documento
Siga RIGOROSAMENTE o template HTML fornecido, mantendo todas as tags, classes e estrutura:

1. **Cabeçalho do Documento** (classe "document-header")
   - Carimbo "SIGILOSO" (classe "document-stamp")
   - Data e localização (classe "document-date") com partes censuradas
   - Introdução do projeto (classe "document-intro") com nome de projeto fictício
   - Aviso de segurança (classe "warning-box")
   - Metadados (classe "metadata") com REF, NÍVEL DE ACESSO, CÓPIAS EXISTENTES

2. **Seção de Fundamentação Teórica**
   - Título (classe "section-title"): "FUNDAMENTAÇÃO TEÓRICA: [TÓPICO]"
   - Definição formal (classe "concept-definition") com fórmula matemática principal
   - Contextualização na exploração espacial (classe "mission-context")
   - Nota histórica (classe "historical-note")

3. **Lista de Exercícios** (tag main, classe "exercise-list")
   - 12 exercícios (classe "exercise-item") em progressão de dificuldade
   - Cada exercício com número, contexto, enunciado, dica (opcional), solução

4. **Rodapé**
   - Numeração de página (classe "page-number")
   - Carimbo "ULTRASSECRETO" (classe "footer-stamp")

### Requisitos Técnicos Específicos
- Use HTML/CSS EXATAMENTE como no template fornecido
- Todas as fórmulas matemáticas com LaTeX via MathJax
- SEMPRE use \vec{} para vetores (ex: \vec{v})
- Para matrizes, use o ambiente pmatrix: \begin{pmatrix} ... \end{pmatrix}
- Use a classe "censored" para áreas censuradas (8-10 por documento)
- Mantenha todos os carimbos e elementos visuais do template
- NUNCA use o termo "classificado" para sigilo (falso cognato em português)

### Progressão de 12 Exercícios
1. **Série ALFA (Exercícios 1-3)**
   - Nomenclatura: VECTOR-1A, VECTOR-1B, VECTOR-1C
   - Nível: Básico (aplicação direta de conceitos)
   - Dicas: Completas e detalhadas
   - Acesso: SIGMA-1
   - Use números simples e contextos elementares

2. **Série BETA (Exercícios 4-6)**
   - Nomenclatura: VECTOR-2A, VECTOR-2B, VECTOR-2C
   - Nível: Intermediário (múltiplos conceitos combinados)
   - Dicas: Parciais
   - Acesso: SIGMA-2
   - Problemas com múltiplos passos

3. **Série GAMMA (Exercícios 7-9)**
   - Nomenclatura: VECTOR-3A, VECTOR-3B, VECTOR-3C
   - Nível: Avançado (aplicações complexas)
   - Dicas: Mínimas
   - Acesso: SIGMA-3
   - Problemas em contextos realistas

4. **Série OMEGA (Exercícios 10-12)**
   - Nomenclatura: VECTOR-4A, VECTOR-4B, VECTOR-4C
   - Nível: Desafiador (integração de conceitos)
   - Dicas: Nenhuma
   - Acesso: SIGMA-4
   - Problemas complexos da exploração espacial

### Formato Padrão de Cada Exercício
- **Número** (classe "exercise-number"): "EXERCÍCIO VECTOR-XY"
- **Contexto** (classe "context"): "ORIGEM: [Missão/Programa] - [Data/Evento]"
- **Enunciado**: Descrição do problema com aplicação prática
- **Dica** (classe "hint"): "[NOTA TÉCNICA]: [Sugestão]" (omitir para série OMEGA)
- **Solução** (tags details/summary): Título "RELATÓRIO DE CÁLCULO [SIGMA-X REQUERIDO]"
  * Dentro da classe "solution": Explicação passo a passo
  * Fórmulas relevantes em LaTeX
  * Conclusão ou interpretação dos resultados

### Eventos Históricos para Contextualização
- Lançamento do Sputnik (1957) - primeiros tópicos
- Programa Mercury (1958-1963) - tópicos iniciais
- Programa Gemini (1965-1966) - tópicos intermediários
- Programa Apollo (1961-1972) - tópicos avançados
- Apollo 11 - primeira alunissagem (1969) - tópicos avançados
- Skylab (1973-1979) - tópicos muito avançados

### Sequência de Tópicos do Curso
0. **Revisão**: Geometria Analítica, Cônicas, Derivadas, Integrais

1. **Funções Vetoriais**:
   a. Função vetoriais
   b. Campo vetorial
   c. Limite e continuidade
   d. Derivadas parciais
   e. Rotacional
   f. Divergente

2. **Integrais Duplas**: Soma de Riemann, Definição, Conjuntos, Integrabilidade, Propriedades

3. **Teorema de Fubini**: Cálculo de integrais duplas

4. **Mudança de Variáveis**: Em integrais duplas, Massa e centro de massa

5. **Integrais Triplas**: Definição, Integrabilidade, Redução a duplas, Mudança de variáveis, Coordenadas

6. **Integrais de Linha**: Sobre curvas, Notações, Parâmetros, Curvas C¹, Comprimento de arco

7. **Campos Conservativos**: Definição, Integrais de linha, Independência do caminho, Potencial

8. **Teorema de Green**

9. **Superfícies**: Área e integral de superfície

10. **Teorema da Divergência**: Fluxo de campo vetorial, Teorema de Gauss

11. **Teorema de Stokes no Espaço**

IMPORTANTE: Use APENAS conceitos já abordados na progressão até o tópico solicitado.
