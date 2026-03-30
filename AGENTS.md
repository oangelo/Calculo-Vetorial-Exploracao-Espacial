# Guia para Agentes de IA - Exercícios de Sala

## Visão Geral

**Exercícios de sala** são folhas A4 coluna dupla para resolução em aula, com:

- Diálogo guiado (baby steps)
- Lacunas para preencher
- Sem tema narrativo (diferente dos exercícios de casa)

**Características:**

- Objetivo e direto
- Foco em reforço do conteúdo
- Perguntas que levam o aluno a pensar
- Checkpoints de verificação

## Estrutura de Arquivos

```
sala/
├── capitulo-0-revisao.html
├── capitulo-1-funcoes-vetoriais.html
├── capitulo-2-integrais-duplas.html
├── capitulo-3-mudanca-de-variaveis.html
├── capitulo-4-integrais-triplas.html
├── capitulo-5-integrais-de-linha.html
├── capitulo-6-campos-conservativos.html
├── capitulo-7-teorema-de-green.html
├── capitulo-8-integral-de-superficie.html
└── capitulo-9-teorema-da-divergencia.html
```

## Template

Use `sala-template.html` como base.

## Estrutura da Folha

### Cabeçalho

```html
<header class="header">
  <div class="header-left">
    <h1 class="title">Capítulo N: Título</h1>
    <p class="subtitle">Tópico Principal</p>
  </div>
  <div class="header-right">
    <p class="course-info">Cálculo Vetorial - 2026/1</p>
    <p class="course-info">Nome: _______________________</p>
    <p class="course-info">Data: ___/___/___</p>
  </div>
</header>
```

### Instruções

```html
<div class="instructions">
  <p>Resolva os exercícios seguindo o raciocínio proposto...</p>
</div>
```

### Exercício

Cada exercício tem:

1. **Enunciado** (`exercicio-enunciado`)
2. **Questões** (`questao`)
3. **Diálogo** (`dialogo`) - texto explicativo
4. **Subitens** (`subitem`) - passos a), b), c)
5. **Lacunas** (`lacuna` ou `lacuna-grande`)
6. **Dica** (`dica`)
7. **Checkpoint** (`checkpoint`)

## Classes Disponíveis

### Exercício

```html
<section class="exercicio">
  <p class="exercicio-enunciado">
    <span class="exercicio-numero">1.</span>
    Enunciado do exercício.
  </p>
  <!-- conteúdo -->
</section>
```

### Questão

```html
<p class="questao">Pergunta que o aluno deve responder.</p>
```

### Diálogo

```html
<p class="dialogo">
  Texto explicativo que guia o aluno, fazendo perguntas retóricas ou dando
  contexto.
</p>
```

### Subitens

```html
<p class="subitem">a) Primeiro passo: <span class="lacuna"></span></p>
<p class="subitem">b) Segundo passo: <span class="lacuna"></span></p>
<p class="subitem">c) Resultado: <span class="lacuna"></span></p>

<!-- Subitens numerados (a.1, a.2, etc.) -->
<p class="subitem">a.1) Primeiro subpasso:</p>
<p class="subitem">a.2) Segundo subpasso:</p>
```

### Lacunas

```html
<!-- Inline (dentro da linha) -->
Resultado: <span class="lacuna"></span>

<!-- Bloco (linha inteira) -->
<p class="subitem">Resultado final: <span class="lacuna-grande"></span></p>
```

### Fórmula Destacada

```html
<p class="formula">$$(x - h)^2 + (y - k)^2 = r^2$$</p>
```

**IMPORTANTE:** Não coloque `<span class="lacuna">` dentro de equações LaTeX. Use:

- Texto simples para fórmulas com lacunas
- Ou separe a lacuna da equação

**Errado:** `$(x - $<span class="lacuna"></span>$)^2$`
**Certo:** `(x − <span class="lacuna"></span>)²` ou texto simples

### Dica

```html
<p class="dica">Texto de ajuda para o aluno.</p>
```

### Checkpoint

```html
<p class="checkpoint">
  <span class="checkmark"></span>
  Verificação: o resultado faz sentido?
</p>
```

## Exemplo Completo

```html
<section class="exercicio">
  <p class="exercicio-enunciado">
    <span class="exercicio-numero">1.</span>
    Considere os pontos A(1, 2) e B(4, 8).
  </p>

  <p class="questao">
    Encontre o vetor diretor da reta que passa por esses dois pontos.
  </p>

  <p class="dialogo">
    Para ir do ponto A até o ponto B, precisamos saber quanto nos deslocamos em
    cada direção.
  </p>

  <p class="subitem">
    a) O deslocamento em x é: <strong>Δx</strong> = <span class="lacuna"></span>
  </p>
  <p class="subitem">
    b) O deslocamento em y é: <strong>Δy</strong> = <span class="lacuna"></span>
  </p>
  <p class="subitem">
    c) O vetor diretor é: <strong>v⃗</strong> = (<span class="lacuna"></span>,
    <span class="lacuna"></span>)
  </p>

  <p class="questao">Encontre a equação paramétrica dessa reta.</p>

  <p class="dialogo">
    A equação paramétrica descreve todos os pontos da reta usando um parâmetro
    t.
  </p>

  <p class="subitem">
    a) Usando A como ponto inicial: <strong>r(t)</strong> = A + t v⃗
  </p>
  <p class="subitem">
    b) Em coordenadas: <strong>r(t)</strong> = (1, 2) + t(<span
      class="lacuna"
    ></span
    >, <span class="lacuna"></span>)
  </p>
  <p class="subitem">
    c) Componentes: <strong>x(t)</strong> = <span class="lacuna"></span>,
    <strong>y(t)</strong> = <span class="lacuna"></span>
  </p>
</section>
```

## Estilo de Diálogo

**Objetivo:** Guiar o aluno sem dar a resposta diretamente.

**Exemplos:**

❌ **Errado (muito óbvio):**

> O vetor perpendicular a (a, b) é (-b, a). Escreva o vetor perpendicular.

✅ **Certo (guia o pensamento):**

> O produto escalar de dois vetores perpendiculares é zero: u⃗ · v⃗ = 0. Se v⃗ = (v₁, v₂), como escolher as coordenadas de u⃗ = (u₁, u₂) para que u₁ · v₁ + u₂ · v₂ = 0?

❌ **Errado (fórmula pronta):**

> A fórmula do ponto médio é M = ((x₁+x₂)/2, (y₁+y₂)/2).

✅ **Certo (pede dedução):**

> O ponto médio está "no meio do caminho" entre A e B. Imagine que você sai de A e quer chegar no ponto exatamente no meio. Quanto do trajeto você precisa percorrer?

## Matemática

**KaTeX** (não MathJax) para renderização.

- Inline: `$...$`
- Bloco: `$$...$$`

**Variáveis simples:** Use `<strong>` em vez de LaTeX:

- `<strong>x</strong>` em vez de `$x$`
- `<strong>v⃗</strong>` em vez de `$\vec{v}$`

Isso melhora performance e evita problemas com lacunas.

## Quantidade de Exercícios

- **4-6 exercícios por folha**
- **2-4 questões por exercício**
- **2-4 subitens por questão**
- **Total: ~15-25 interações**

## Nível de Dificuldade

**Reforço:** aluno já viu o conteúdo em aula.

- Não explicar conceitos do zero
- Focar em aplicação
- Fazer perguntas que levam ao raciocínio
- Checkpoints para auto-verificação

## Tópicos por Capítulo

| Capítulo | Tópicos Principais                             |
| -------- | ---------------------------------------------- |
| 0        | Geometria analítica, derivadas, integrais      |
| 1        | Funções vetoriais, limites, derivadas parciais |
| 2        | Integrais duplas, regiões de integração        |
| 3        | Mudança de variáveis, Jacobiano                |
| 4        | Integrais triplas, coordenadas esféricas       |
| 5        | Integrais de linha, campos conservativos       |
| 6        | Potencial, trabalho, independência de caminho  |
| 7        | Teorema de Green, aplicações                   |
| 8        | Integrais de superfície, fluxo                 |
| 9        | Teorema da divergência, aplicações             |

## Regras

1. Sem tema narrativo - direto ao ponto
2. Use apenas conceitos já abordados - não antecipe
3. KaTeX para matemática complexa, `<strong>` para variáveis simples
4. Classes CSS do template - não invente novas
5. 4-6 exercícios por folha
6. Perguntas que guiam, não dão respostas
7. Lacunas nos pontos chave

## Fluxo de Criação

1. Identifique o capítulo
2. Escolha 4-6 exercícios de reforço
3. Divida cada exercício em questões e subitens
4. Adicione diálogo explicativo entre questões
5. Inclua checkpoints e dicas quando relevante
6. Salve em `sala/capitulo-N-nome.html`
7. Teste no navegador e impressão

## Teste

Antes de commitar:

```bash
# Visualizar no navegador
cd /home/oangelo/github/Calculo-Vetorial-Exploracao-Espacial/.trees/exercicios-sala
firefox sala/capitulo-N-nome.html

# Testar impressão (Ctrl+P ou Cmd+P)
# Verificar:
# - Coluna dupla
# - Math renderizado
# - Lacunas com espaço adequado
# - Exercícios separados visualmente
```
