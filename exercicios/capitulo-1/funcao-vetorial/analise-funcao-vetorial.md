# Análise: funcao-vetorial

## Justificativas pedagógicas

- EX-01-ALFA: Introduz o conceito básico de função vetorial paramétrica circular, identificando componentes e verificando a geometria da trajetória (círculo de raio constante).
- EX-02-ALFA: Ensina avaliação de função vetorial em ponto específico e cálculo de derivada componente a componente, com interpretação física como taxa de variação.
- EX-03-ALFA: Aplica transformação linear vetorial 2D, mas foge ao escopo central de funções vetoriais (mais adequado para Álgebra Linear).
- EX-04-BETA: Introduz campos vetoriais tridimensionais, calculando valores em pontos específicos e analisando dependências funcionais (conceito relacionado, mas distinto).
- EX-05-BETA: Desenvolve análise completa de trajetória espiral: diferenciação, cálculo de velocidade/aceleração e comportamento assintótico do módulo.
- EX-06-BETA: Pratica derivação básica de funções vetoriais polinomiais componente a componente (fundamento essencial).
- EX-07-GAMMA: Aplica derivação para encontrar velocidade em instante específico, conectando cálculo vetorial à cinemática.
- EX-08-GAMMA: Introduz equações diferenciais vetoriais, verificando soluções e integrando cálculo diferencial com álgebra vetorial.
- EX-09-GAMMA: Consolida cálculo de aceleração (segunda derivada) em instante específico, reforçando a hierarquia posição → velocidade → aceleração.
- EX-10-OMEGA: Analisa condições para hélice circular uniforme, envolvendo velocidade e aceleração constantes em magnitude (aplicação avançada).
- EX-11-OMEGA: Prova propriedade fundamental sobre ortogonalidade entre posição e velocidade quando o módulo é constante (formalismo matemático).
- EX-12-OMEGA: Converte equação polar para função vetorial paramétrica, aplicando coordenadas polares em contexto de espiral logarítmica.

## Ordem sugerida

A ordem atual (agrupada por dificuldade: alfa, beta, gamma, omega) tem alguns problemas progressivos:
1. EX-03-ALFA (transformações lineares) e EX-04-BETA (campos vetoriais) são conceitos adjacentes, mas não core de "funções vetoriais do tempo".
2. A progressão dentro de cada grupo nem sempre segue do mais simples ao mais complexo.

**Ordem sugerida para melhor progressão pedagógica:**
1. EX-01-ALFA: Definição e componentes básicas (circular)
2. EX-06-BETA: Derivação componente a componente (fundamental)
3. EX-02-ALFA: Avaliação em ponto + derivada (conecta com anterior)
4. EX-07-GAMMA: Velocidade em instante específico (aplicação direta)
5. EX-09-GAMMA: Aceleração em instante específico (hierarquia completa)
6. EX-05-BETA: Análise completa de espiral (síntese de derivadas)
7. EX-08-GAMMA: Equações diferenciais vetoriais (avançado)
8. EX-10-OMEGA: Hélice circular uniforme (aplicação complexa)
9. EX-11-OMEGA: Prova de propriedade (formalismo)
10. EX-12-OMEGA: Espiral logarítmica (conversão polar-paramétrica)

**Exercícios que poderiam ser movidos para outros tópicos:**
- EX-03-ALFA: Transformações lineares → tópico de Álgebra Linear ou Transformações.
- EX-04-BETA: Campos vetoriais → tópico dedicado a Campos Vetoriais.

## Gaps identificados

1. **Integração de funções vetoriais**: Faltam exercícios sobre integração componente a componente, posição a partir da velocidade, ou comprimento de arco.
2. **Produto vetorial com funções vetoriais**: Nenhum exercício explora r(t) × r'(t) ou propriedades do produto vetorial.
3. **Funções vetoriais com domínio restrito**: Todos os exercícios usam domínios ilimitados; faltam exemplos com intervalos específicos.
4. **Condições iniciais**: Faltam exercícios que usem condições iniciais para determinar constantes de integração.
5. **Aplicações de comprimento de arco**: Conceito importante em trajetórias espaciais não abordado.
6. **Parametrizações alternativas**: Falta explorar diferentes parametrizações da mesma curva.

## Exercícios adicionais sugeridos

1. **Integração básica**: Dada v(t) = (2t, cos t, e^t) e r(0) = (1,0,1), encontrar r(t).
2. **Produto vetorial**: Calcular r(t) × r'(t) para r(t) = (cos t, sin t, t) e interpretar geometricamente.
3. **Comprimento de arco**: Calcular o comprimento da trajetória r(t) = (t, t², t³) entre t=0 e t=1.
4. **Domínio restrito**: Analisar r(t) = (1/(t-2), ln(t), √t) determinando seu domínio máximo.
5. **Parametrização alternativa**: Encontrar uma parametrização por comprimento de arco para r(t) = (cos t, sin t).
6. **Condições iniciais**: Encontrar r(t) tal que r''(t) = (0,0,-g), r'(0) = (v₀,0,0), r(0) = (0,0,h) (projétil).
7. **Aplicação orbital**: Modelar órbita elíptica com r(t) = (a cos t, b sin t) e calcular energia cinética.
8. **Limite e continuidade**: Verificar se r(t) = (t²-1)/(t-1), t, t²) é contínua em t=1.