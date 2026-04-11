# Diretrizes para Listas de Exercícios

## Princípios Gerais

### 1. Listas como narrativa
A sequência de exercícios deve contar uma história com progressão lógica. Nada de itens aleatórios ou "sorteados de um banco". Cada exercício prepara o terreno para o seguinte.

### 2. Transparência na progressão (estilo Netflix)
Cada exercício deve explicitar por que está ali e qual é sua conexão com os anteriores. Exemplo: *"No exercício anterior você encontrou a reta tangente à parábola. Agora vamos ver o que acontece quando a curva é um círculo."* O aluno enxerga o fio condutor.

### 3. Construir sobre o já sabido
Quando fizer sentido, a lista deve retomar conceitos de tópicos já estudados e mostrar como o novo assunto nasce deles ou os generaliza. O aluno não começa do zero a cada lista — ele reconhece ferramentas que já usou e vê o novo conceito como uma extensão natural. Exemplos: pedir para verificar tangência por interseção (retomando equações de cônicas); comparar notações Leibniz e Lagrange antes de aplicar regras; pedir para esboçar a curva e a reta tangente juntas (retomando geometria analítica). A lista não é uma ilha — ela é um elo na corrente.

### 4. Scaffolding com subitens
Exercícios complexos que exigem vários passos devem ser quebrados em itens (a, b, c...) que guiem o aluno na decomposição do problema. O objetivo é ensinar a habilidade de quebrar problemas grandes em partes menores.

### 5. Significado antes da álgebra
Sempre começar pelo conceito e pela interpretação (geométrica, física, visual) antes de entrar nas manipulações algébricas. Exercícios puramente algébricos são importantes, mas não podem ser o único tipo.

### 6. Notação como conteúdo
Trabalhar explicitamente a notação em exercícios dedicados. Alunos se perdem em símbolos (dy/dx, quem é a variável, o que muda quando se troca), e isso raramente é tratado como conteúdo.

### 7. Desenhar e esquematizar
Os exercícios devem pedir que o aluno faça esboços e diagramas, conectando equações com geometria.

### 8. Autonomia sobre decoreba
O objetivo é que, com as definições básicas, o aluno consiga derivar resultados sozinho, sem depender de fórmulas memorizadas.

---

## Regra Crítica: MathJax no HTML

**Delimitadores (uma barra só no arquivo HTML):**
- Inline: `\(fórmula\)`  ← o arquivo HTML contém exatamente `\(`
- Bloco: `\[fórmula\]`  ← o arquivo HTML contém exatamente `\[`
- Comandos LaTeX: `\frac`, `\partial`, `\vec`, `\left`, `\right`, etc.

**NUNCA usar `\\(`, `\\[`, `\\frac`** — barra dupla no arquivo quebra o MathJax.

**Por que acontece o erro:** Quando um agente gera conteúdo via Python (`'\\\\(x\\\\)'`), o resultado no arquivo é `\\(x\\)`. Mas MathJax precisa de `\(x\)`. A solução é usar `'(x)'` no Python ou escrever diretamente no arquivo com uma barra só.

**Verificação:** Após criar/editar qualquer exercício, confira:
```bash
grep -n '\\\\\\\\' exercicios/capitulo-N/pasta/*.html
```
Se encontrar `\\\\` seguido de letra ou delimitador, está errado.

---

## Exemplos por Conteúdo

### Derivadas

A lista não deve começar com regras de derivação. A progressão deve retomar conceitos de geometria analítica (reta tangente, interseção de curvas, equações de cônicas) antes de entrar nas técnicas algébricas.

1. **Reta tangente a uma parábola** — retomando a equação ponto-inclinação de geometria analítica. O aluno calcula o coeficiente angular pela derivada e monta a equação da reta tangente. Exemplo: *"Você já usou a forma y - y₀ = m(x - x₀) para retas. Agora o coeficiente angular m vem da derivada."*
2. **Verificação de tangência por interseção** — retomando discriminante de equações do 2º grau. Igualando a curva e a reta, o aluno verifica que o discriminante é zero (exatamente um ponto de contato). Conexão explícita com cônicas: *"Na lista de cônicas, você classificou curvas pelo discriminante. Agora usa a mesma ideia para confirmar que uma reta é tangente."*
3. **Reta tangente a uma circunferência** — retomando x² + y² = r². O círculo não é função y = f(x), então o aluno precisa usar derivação implícita. Verifica tangência por interseção também. Conexão com o exercício anterior: *"Agora a curva não é função — mas a verificação por interseção funciona do mesmo jeito."*
4. **Notação de derivadas** — exercícios que forcem o aluno a pensar em quem é a variável. Escrever o mesmo resultado em notação de Lagrange (f'), Leibniz (dy/dx) e Newton (ẏ). Comparar dy/dx vs. dx/dt. Conexão com o princípio 6 (Notação como conteúdo): *"Diferentes laboratórios usam notações diferentes. Você precisa reconhecer que todas representam a mesma operação."*
5. **Regras algébricas de derivação** — só agora, com o conceito bem assentado e conectado à geometria, entrar nas propriedades e técnicas algébricas (potência, produto, quociente, cadeia).

### Cônicas

A lista não deve começar dando a equação e pedindo parâmetros. A progressão deve ser:

1. **Lugar geométrico** — definir o conceito com exemplos simples (reta como lugar geométrico, circunferência como lugar dos pontos equidistantes de um centro).
2. **Parábola pela definição** — guiar o aluno a construir a equação da parábola a partir da definição (pontos equidistantes do foco e da diretriz), item por item.
3. **Elipse pela definição** — mesma abordagem: soma das distâncias constante, manipular algebricamente até chegar na equação canônica.
4. **Extrair informações da equação** — a partir da equação, fazer y=0, x=0, interpretar o que aparece. O aluno descobre os vértices e semieixos por raciocínio, não por fórmula decorada.
5. **Desenhar e esquematizar** — para cada cônica, o aluno deve fazer esboços e localizar os elementos no desenho.
6. **Hipérbole e casos gerais** — mesma filosofia, estendendo para as demais cônicas.

### Integrais

A lista não deve começar com técnicas de integração. A progressão deve ser:

1. **Integral como área** — começar com o significado geométrico, calculando áreas de figuras simples sob curvas conhecidas.
2. **Figuras clássicas** — pedir a área sob curvas que geram formas conhecidas (triângulos, trapézios, parábolas), onde o aluno pode conferir o resultado geometricamente.
3. **Motivar as técnicas** — apresentar problemas onde a área é de interesse (semicírculo, por exemplo), mas a conta direta é difícil. O aluno percebe a necessidade de técnicas mais sofisticadas.
4. **Limitações da integral simples** — usar o semicírculo para discutir que uma circunferência não é função e que a integral simples tem limitações. Dar um "teaser" da integral dupla como ferramenta futura.
5. **Técnicas de integração com motivação** — introduzir substituição, partes, frações parciais etc., sempre ligadas a problemas concretos de interesse físico ou de engenharia, não como exercícios algébricos isolados.
