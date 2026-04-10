# Checklist de Conceitos e Progressão por Capítulo

Use este checklist ao gerar RTCs. Ele define:
1. **O que PODE e NÃO PODE usar** (conceitos permitidos por capítulo)
2. **Como deve ser a progressão narrativa** (sequência pedagógica obrigatória)

Antes de gerar qualquer RTC, leia também `diretrizes-listas-de-exercicios.md`
para entender os 8 princípios de design de listas.

---

## Cap 0 — Revisão

### Geometria Analítica

**Permitido:**

- Pontos em R² e R³
- Vetores (componentes, soma, escalar)
- Norma e distância entre pontos
- Produto escalar (ângulo, projeção, ortogonalidade)
- Produto vetorial (área, normal)
- Produto misto (volume)
- Equação de reta (vetorial, paramétrica, simétrica)
- Equação de plano
- Distâncias (ponto-reta, ponto-plano, retas reversas)

**NÃO usar:** coordenadas polares, coordenadas polares focais

**Progressão sugerida:**

```
PONTOS → VETORES → NORMA
  ↓
DOIS VETORES → PRODUTO ESCALAR → ÂNGULO → PROJEÇÃO
  ↓
DOIS VETORES → PRODUTO VETORIAL → ÁREA
  ↓
TRÊS VETORES → PRODUTO MISTO → VOLUME
  ↓
PONTO + DIREÇÃO → RETA (vetorial, paramétrica, simétrica)
  ↓
TRÊS PONTOS / PONTO + NORMAL → PLANO
  ↓
RETA + PLANO → INTERSEÇÃO
  ↓
DISTÂNCIAS: PONTO-RETA, PONTO-PLANO, RETAS REVERSAS
```

Cada exercício deve explicitar sua conexão com o anterior.
Ex: "Agora que sabemos calcular vetores entre pontos, vamos medir o ângulo entre dois vetores de velocidade."

---

### Cônicas

**Permitido:**

- Circunferência (centro, raio, equação geral)
- Elipse (focos, vértices, excentricidade, forma canônica)
- Parábola (foco, diretriz, vértice, equação PF=PD)
- Hipérbole (focos, vértices, assíntotas, excentricidade)
- Classificação por discriminante (B²−4AC)
- Formas canônicas translacionadas (completar quadrados)

**NÃO usar:** coordenadas polares, coordenadas polares focais

**Progressão sugerida (obrigatório seguir):**

1. **Lugar geométrico** — definir o conceito com exemplos simples (reta como lugar geométrico, circunferência como lugar dos pontos equidistantes de um centro).
2. **Parábola pela definição PF=PD** — guiar o aluno a construir a equação a partir da definição, item por item.
3. **Elipse pela definição** — soma das distâncias constante, manipular algebricamente até a equação canônica.
4. **Extrair informações da equação** — fazer y=0, x=0, interpretar o que aparece. O aluno descobre vértices e semieixos por raciocínio, não por fórmula.
5. **Desenhar e esquematizar** — esboços com elementos localizados no desenho.
6. **Hipérbole e casos gerais** — mesma filosofia, estendendo para as demais cônicas.

**NÃO começar com:** "dada a equação, encontre os parâmetros". Começar pela construção/definição.

---

### Curvas de Nível

**Permitido:**

- Identificação de curvas de nível (círculos, elipses, parábolas, retas)
- Propriedades (não se cruzam, distância = inclinação)
- Esboço de mapas de curvas de nível
- Gradiente como direção de crescimento (conceitual, sem derivadas parciais)

**Permitido como revisão de Cálculo 2:** derivadas parciais, gradiente ∇f, pontos críticos (∇f = 0)

**NÃO usar:** Hessiana, autovalores, classificação de pontos críticos via determinante de H

**Progressão sugerida:**

1. **O que é uma curva de nível** — conectar com o conceito de "fatia" de um gráfico 3D, exemplos visuais (mapa de altitude).
2. **Identificar formato** — círculo, elipse, parábola, reta a partir da equação da função.
3. **Encontrar curva que passa por ponto** — substituir coordenadas, interpretar o nível.
4. **Esboçar mapas** — várias curvas de nível juntas, interpretar distância entre elas.
5. **Gradiente e crescimento** — direção de maior crescimento como perpendicular às curvas.

---

### Derivadas

**Permitido:**

- Limites de funções
- Derivadas de funções elementares
- Regra da cadeia
- Derivadas de funções trigonométricas, exponenciais, logarítmicas
- Máximos e mínimos (critério da primeira e segunda derivada)

**NÃO usar:** derivadas parciais, derivadas de funções vetoriais

**Progressão sugerida (obrigatório seguir):**

1. **Reta tangente a uma parábola** — retomando equação ponto-inclinação (geom. analítica). O aluno calcula o coeficiente angular pela derivada e monta a equação da reta tangente.
2. **Verificação de tangência por interseção** — retomando discriminante de equações do 2º grau (cônicas). Igualando curva e reta, o aluno verifica que o discriminante é zero (um único ponto de contato).
3. **Reta tangente a uma circunferência** — retomando x² + y² = r². O círculo não é função y = f(x), então o aluno usa derivação implícita. Verifica tangência por interseção também.
4. **Notação de derivadas** — exercícios que forcem o aluno a pensar em quem é a variável. Comparar notação de Lagrange (f'), Leibniz (dy/dx) e Newton (ẏ). Comparar dy/dx vs. dx/dt.
5. **Regras algébricas de derivação** — só agora, com o conceito bem assentado e conectado à geometria, entrar nas propriedades e técnicas algébricas (potência, produto, quociente, cadeia).

**NÃO começar com:** regras de derivação. Começar pelo significado geométrico (reta tangente) e retomar conceitos de geometria analítica (ponto-inclinação, discriminante, equação de circunferência).

---

### Integrais

**Permitido:**

- Integrais indefinidas (primitivas)
- Integrais definidas (área sob curva)
- Técnicas: substituição, partes, frações parciais
- Integrais impróprias (conceitual)

**NÃO usar:** integrais duplas, triplas, de linha, de superfície

**Progressão sugerida (obrigatório seguir):**

1. **Integral como área** — começar com o significado geométrico, calculando áreas de figuras simples sob curvas conhecidas.
2. **Figuras clássicas** — pedir a área sob curvas que geram formas conhecidas (triângulos, trapézios), onde o aluno pode conferir o resultado geometricamente.
3. **Motivar as técnicas** — apresentar problemas onde a área é de interesse mas a conta direta é difícil (ex: semicírculo). O aluno percebe a necessidade de técnicas.
4. **Limitações da integral simples** — usar o semicírculo para discutir que uma circunferência não é função. "Teaser" da integral dupla como ferramenta futura.
5. **Técnicas de integração com motivação** — substituição, partes, frações parciais, sempre ligadas a problemas concretos, não como exercícios algébricos isolados.

**NÃO começar com:** "calcule a integral" de expressões aleatórias. Começar pelo significado geométrico.

## Cap 1 — Funções Vetoriais

**Permitido:** tudo do Cap 0 +

- Funções vetoriais de R → R³
- Campos vetoriais (definição, visualização)
- Limites de funções vetoriais
- Derivadas parciais (∂f/∂x, ∂f/∂y)
- Gradiente (∇f)
- Rotacional (∇ × F)
- Divergente (∇ · F)

**NÃO usar:** integrais de qualquer tipo

**Progressão sugerida:**

1. **Função vetorial como trajetória** — interpretar r(t) como posição de um objeto no tempo, conectar com equações paramétricas de reta (Cap 0).
2. **Derivar a trajetória** — velocidade r'(t), aceleração r''(t). Significado físico antes da fórmula.
3. **Campo vetorial como mapa de vetores** — visualizar campos (vento, gravidade), desenhar setas em pontos de uma grade.
4. **Derivadas parciais como taxas de variação** — ∂f/∂x como "variação na direção x", conectar com curvas de nível (Cap 0).
5. **Gradiente como direção de maior crescimento** — perpendicular às curvas de nível, magnitude = inclinação.
6. **Rotacional e divergente** — significado físico (rotação, expansão) antes das fórmulas com determinantes.

**NÃO começar com:** fórmulas de rotacional/divergente. Começar pela interpretação geométrica e física.

---

## Cap 2 — Integrais Duplas

**Permitido:** tudo do Cap 0-1 +

- Soma de Riemann em 2D
- Integral dupla (definição, propriedades)
- Conjunto de conteúdo nulo
- Condições de integrabilidade
- Teorema de Fubini
- Troca de ordem de integração
- Coordenadas polares (r, θ)

**NÃO usar:** integrais triplas, de linha, de superfície

**Progressão sugerida:**

1. **Soma de Riemann em 2D** — volume como "soma de colunas", conectar com área sob curva (Cap 0 Integrais) estendida para 2D.
2. **Definição formal** — partições, limites de somas. Por que precisamos de rigor aqui?
3. **Integrabilidade** — quando a integral existe? Funções descontínuas, conjuntos de conteúdo nulo.
4. **Fubini** — reduzir dupla a iteradas. Motivar: "se pudéssemos fatiar de outro jeito..."
5. **Troca de ordem** — por que a ordem importa? Desenhar a região e trocar dx dy → dy dx.
6. **Coordenadas polares** — quando o Jacobiano r aparece naturalmente (círculos, setores).

---

## Cap 3 — Mudança de Variáveis

**Permitido:** tudo do Cap 0-2 +

- Jacobiano
- Mudança de variáveis em integrais duplas
- Massa e centro de massa (em 2D)

**Progressão sugerida:**

1. **Por que mudar de variáveis?** — integrais que ficam mais simples em outro sistema de coordenadas (exemplo concreto).
2. **Jacobiano como fator de escala** — o que acontece com a área de um pequeno retângulo após a transformação? Desenhar.
3. **Mudança de variáveis passo a passo** — transformar limites, multiplicar pelo |J|, integrar.
4. **Massa e centro de massa** — aplicação: "onde está o equilíbrio deste objeto?" Motivar a integral dupla com densidade.

---

## Cap 4 — Integrais Triplas

**Permitido:** tudo do Cap 0-3 +

- Integral tripla (definição)
- Redução a integrais duplas
- Coordenadas cilíndricas (r, θ, z)
- Coordenadas esféricas (ρ, θ, φ)
- Centro de massa e momento de inércia (em 3D)

**Progressão sugerida:**

1. **De dupla para tripla** — volume como "soma de caixas", extensão natural do capítulo anterior.
2. **Redução a duplas** — integrar primeiro z, depois x,y. Analogia com Fubini em 3D.
3. **Coordenadas cilíndricas** — quando a região tem simetria em torno de um eixo. Jacobiano r.
4. **Coordenadas esféricas** — quando a região tem simetria esférica. Jacobiano ρ²sin(φ). Desenhar os elementos de volume.
5. **Centro de massa 3D e momento de inércia** — aplicação: "como esse corpo gira?"

---

## Cap 5 — Integrais de Linha

**Permitido:** tudo do Cap 0-4 +

- Curvas parametrizadas
- Integral de linha de campo escalar
- Integral de linha de campo vetorial
- Comprimento de arco

**Progressão sugerida:**

1. **Curva como trajetória parametrizada** — revisitar r(t) do Cap 1, agora como caminho de integração.
2. **Comprimento de arco** — "quanto eu ando ao longo da curva?" Motivar como integral de ||r'(t)||.
3. **Integral de linha escalar** — acumular um escalar (temperatura, densidade) ao longo de um caminho.
4. **Integral de linha vetorial** — trabalho de uma força ao longo de um caminho. Significado físico: ∫ F · dr.

**NÃO começar com:** a fórmula geral. Começar pelo significado físico (trabalho, acumulação).

---

## Cap 6 — Campos Conservativos

**Permitido:** tudo do Cap 0-5 +

- Campo conservativo (definição, teste)
- Independência do caminho
- Função potencial
- Forma diferencial exata

**Progressão sugerida:**

1. **Quando o caminho não importa?** — comparar integrais de linha em dois caminhos diferentes com o mesmo campo. Se der igual, o campo é conservativo.
2. **Teste de conservatividade** — rotacional nulo (∇ × F = 0). Por que isso funciona?
3. **Função potencial** — se F = ∇f, como encontrar f? Integrar componente a componente.
4. **Forma diferencial exata** — reformular o problema em termos de M dx + N dy = 0. Condição ∂M/∂y = ∂N/∂x.

---

## Cap 7 — Teorema de Green

**Permitido:** tudo do Cap 0-6 +

- Teorema de Green (para retângulos e conjuntos com fronteira C1)
- Teorema de Stokes no plano
- Teorema da Divergência no plano

**Progressão sugerida:**

1. **Integral de linha ao redor de uma região** — "o que mede dar a volta no perímetro?"
2. **Green para retângulos** — provar para o caso mais simples primeiro. A integral de linha = integral dupla do rotacional.
3. **Green para regiões gerais** — estender para fronteira C1. Como decompor uma região complexa.
4. **Stokes no plano** — versão do teorema de Green interpretada como Stokes.
5. **Divergência no plano** — fluxo através da fronteira = integral da divergência. Conectar com significado físico.

---

## Cap 8 — Integral de Superfície

**Permitido:** tudo do Cap 0-7 +

- Superfícies parametrizadas
- Plano tangente
- Área de superfície
- Integral de superfície

**Progressão sugerida:**

1. **Superfície como mapa paramétrico** — r(u,v) como generalização de r(t). Exemplo: esfera com coordenadas esféricas.
2. **Plano tangente** — derivadas parciais r_u e r_v → normal = r_u × r_v. Geometria antes da fórmula.
3. **Área de superfície** — "quanto de tecido precisamos para cobrir esta superfície?" ||r_u × r_v|| como fator de escala.
4. **Integral de superfície** — acumular um campo sobre uma superfície. Analogia com integral de linha, mas em 2D.

---

## Cap 9 — Teorema da Divergência

**Permitido:** tudo do Cap 0-8 +

- Fluxo de campo vetorial
- Teorema da Divergência (Gauss)

**Progressão sugerida:**

1. **Fluxo como "quanto atravessa"** — fluxo de um campo vetorial através de uma superfície. Significado físico (água atravessando uma rede).
2. **Gauss: fluxo pela superfície = integral da divergência no volume** — "tudo que entra deve sair (ou se acumular)".
3. **Aplicações** — conservação de massa, eletrostática. Usar o teorema para simplificar cálculos.
