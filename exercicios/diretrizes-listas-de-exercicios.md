# Diretrizes para Listas de Exercícios

## Princípios Gerais

### 1. Listas como narrativa

A sequência de exercícios deve contar uma história com progressão lógica. Nada de itens aleatórios ou "sorteados de um banco". Cada exercício prepara o terreno para o seguinte.

### 2. Transparência na progressão (estilo Netflix)

Cada exercício deve explicitar por que está ali e qual é sua conexão com os anteriores. Exemplo: _"No exercício anterior você encontrou a reta tangente à parábola. Agora vamos ver o que acontece quando a curva é um círculo."_ O aluno enxerga o fio condutor.

### 3. Construir sobre o já sabido

Quando fizer sentido, a lista deve retomar conceitos de tópicos já estudados e mostrar como o novo assunto nasce deles ou os generaliza. O aluno não começa do zero a cada lista — ele reconhece ferramentas que já usou e vê o novo conceito como uma extensão natural. Exemplos: pedir para verificar tangência por interseção (retomando equações de cônicas); comparar notações Leibniz e Lagrange antes de aplicar regras; pedir para esboçar a curva e a reta tangente juntas (retomando geometria analítica). A lista não é uma ilha — ela é um elo na corrente.

### Formato do Enunciado (dentro de `<li class="exercise-item">`)

O enunciado deve ser **texto corrido** — parágrafos `<p>` puros, sem wrappers extras.

**Permitido:**

- Múltiplos `<p>` para separar parágrafos
- `<strong>` ou `<em>` para ênfase ocasional (destacar um dado, uma condição importante)

**NÃO incluir:**

- `<div>` wrapper dentro do exercício (nada de `.narrative`, `.mission-context`, `.narrative-connection`)
- `<ul><li>` — já estabelecido acima
- `<strong>Solicitação:</strong>` ou labels extras antes dos sub-itens
- Qualquer tag estrutural além de `<p>`, `<strong>`, `<em>`

**Referências a outros exercícios:**

- Sempre pelo **conceito**, nunca pelo número/nome do exercício
- ✅ "No exercício anterior, você calculou o produto escalar..."
- ✅ "Agora que sabemos calcular ângulos entre vetores, vamos usar isso para..."
- ❌ "No VECTOR-03, você calculou..." — quebra se reordenar
- ❌ "Conforme feito no EXERCÍCIO 7..." — frágil

### 4. Scaffolding com subitens

Exercícios complexos que exigem vários passos devem ser quebrados em itens (a, b, c...) que guiem o aluno na decomposição do problema. O objetivo é ensinar a habilidade de quebrar problemas grandes em partes menores.

**Formato:** Sem `<ul><li>` (gera bullet points). Usar `<p><strong>(a)</strong> texto...</p>`:

```html
<p><strong>(a)</strong> Primeira parte...</p>
<p><strong>(b)</strong> Segunda parte...</p>
```

### 5. Significado antes da álgebra

Sempre começar pelo conceito e pela interpretação (geométrica, física, visual) antes de entrar nas manipulações algébricas. Exercícios puramente algébricos são importantes, mas não podem ser o único tipo.

### 6. Notação como conteúdo

Trabalhar explicitamente a notação em exercícios dedicados. Alunos se perdem em símbolos (dy/dx, quem é a variável, o que muda quando se troca), e isso raramente é tratado como conteúdo.

### 7. Desenhar e esquematizar

Os exercícios devem pedir que o aluno faça esboços e diagramas, conectando equações com geometria.

### 8. Autonomia sobre decoreba

O objetivo é que, com as definições básicas, o aluno consiga derivar resultados sozinho, sem depender de fórmulas memorizadas.

---

## Regra de Escopo — Conceitos de Capítulos Posteriores

Cada capítulo do curso introduz conceitos novos e depende dos capítulos anteriores. Ao criar ou revisar exercícios de um capítulo, é ESTRITAMENTE PROIBIDO usar conceitos de capítulos posteriores.

**Exemplo de violação:** Um exercício de Cap 1 (Funções Vetoriais) que calcula "circulação" usa integral de linha — conceito de Cap 5.

**Como verificar:** Consulte `checklist-conceitos-permitidos.md`, seção "TERMOS PROIBIDOS" do capítulo. Cada entrada é uma palavra ou frase que, se aparecer no exercício, indica violação de escopo.

**Regra simples:** Cap N pode usar tudo de Cap 0 a N-1, mais os conceitos próprios de Cap N listados em "Permitido". NADA de Cap N+1 em diante.

**No pipeline de revisão (Etapa 1):** O Agente Revisor DEVE executar grep para cada termo proibido antes de gerar o RTC. Exercícios com termos proibidos devem ser listados como PROBLEMA CRÍTICO.

---

## Fundamentação Teórica (intro.html e index.html)

A fundamentação teórica é uma **mini-aula passiva** — diferente dos exercícios ativos. O aluno lê para rever o panorama antes de resolver.

**Estrutura obrigatória:**

1. **CONTEXTUALIZAÇÃO** — 1-2 parágrafos motivando o tópico. "Por que precisamos disso? Para onde leva?" O aluno vê o mapa antes dos detalhes.

2. **CONCEITOS NUMERADOS** — Cada conceito é uma seção `<div class="concept-definition">` com:

   - Título: `<strong>N. NOME: SUBTÍTULO</strong>` (ex: "3. PRODUTO ESCALAR: ÂNGULOS E PROJEÇÕES")
   - 1-2 parágrafos explicando O QUE é e POR QUE importa
   - Fórmula principal em `<p class="formula-highlight">` (bloco destacado)
   - Fórmulas secundárias inline `\(...\)` dentro do texto
   - Parâmetros explicados logo após a fórmula (o que é \\(v_x\\)? o que é \\(\\theta\\)?)
   - Conexão para o próximo conceito ("com isso, podemos agora...")

3. **APLICAÇÕES** — `<div class="mission-context">` com exemplos concretos de uso na exploração espacial.

4. **NOTA HISTÓRICA** — `<div class="historical-note">` opcional.

**Regras de formatação:**

- Uma seção `<div class="concept-definition">` por conceito (não agrupar tudo num bloco só)
- NÃO usar `<ul><li>` — texto corrido com `<p>` e `<strong>`
- Fórmulas principais: `<p class="formula-highlight">\\[...\\]</p>`
- Fórmulas secundárias: inline `\\(...\\)` dentro de `<p>`
- CSS: `.concept-definition` tem `background-color` e `padding`, SEM `border-left`

## Regra Crítica: MathJax no HTML

**Delimitadores (uma barra só no arquivo HTML):**

- Inline: `\(fórmula\)` ← o arquivo HTML contém exatamente `\(`
- Bloco: `\[fórmula\]` ← o arquivo HTML contém exatamente `\[`
- Comandos LaTeX: `\frac`, `\partial`, `\vec`, `\left`, `\right`, etc.

**NUNCA usar `\\(`, `\\[`, `\\frac`** — barra dupla no arquivo quebra o MathJax.

**Por que acontece o erro:** Quando um agente gera conteúdo via Python (`'\\\\(x\\\\)'`), o resultado no arquivo é `\\(x\\)`. Mas MathJax precisa de `\(x\)`. A solução é usar `'(x)'` no Python ou escrever diretamente no arquivo com uma barra só.

**Verificação OBRIGATÓRIO após cada arquivo escrito:**

```bash
grep -c '\\\\\\\\' exercicios/capitulo-N/pasta/arquivo.html
```

Se resultado > 0, CORRIJA antes de continuar. Execute este grep em TODO arquivo .html que criar ou editar. Não pule este passo.

---

## Exemplos por Conteúdo

### Derivadas

A lista não deve começar com regras de derivação. A progressão deve retomar conceitos de geometria analítica (reta tangente, interseção de curvas, equações de cônicas) antes de entrar nas técnicas algébricas.

1. **Reta tangente a uma parábola** — retomando a equação ponto-inclinação de geometria analítica. O aluno calcula o coeficiente angular pela derivada e monta a equação da reta tangente. Exemplo: _"Você já usou a forma y - y₀ = m(x - x₀) para retas. Agora o coeficiente angular m vem da derivada."_
2. **Verificação de tangência por interseção** — retomando discriminante de equações do 2º grau. Igualando a curva e a reta, o aluno verifica que o discriminante é zero (exatamente um ponto de contato). Conexão explícita com cônicas: _"Na lista de cônicas, você classificou curvas pelo discriminante. Agora usa a mesma ideia para confirmar que uma reta é tangente."_
3. **Reta tangente a uma circunferência** — retomando x² + y² = r². O círculo não é função y = f(x), então o aluno precisa usar derivação implícita. Verifica tangência por interseção também. Conexão com o exercício anterior: _"Agora a curva não é função — mas a verificação por interseção funciona do mesmo jeito."_
4. **Notação de derivadas** — exercícios que forcem o aluno a pensar em quem é a variável. Escrever o mesmo resultado em notação de Lagrange (f'), Leibniz (dy/dx) e Newton (ẏ). Comparar dy/dx vs. dx/dt. Conexão com o princípio 6 (Notação como conteúdo): _"Diferentes laboratórios usam notações diferentes. Você precisa reconhecer que todas representam a mesma operação."_
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
