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
├── capitulo-0-revisao/
│   ├── index.html              # Monta a folha final
│   ├── exercicio-1.html       # Fragmento HTML
│   ├── exercicio-2.html
│   ├── exercicio-3.html
│   ├── exercicio-4.html
│   ├── exercicio-5.html
│   └── exercicio-6.html
├── capitulo-1-funcoes-vetoriais/
│   ├── index.html
│   └── exercicio-*.html
├── ...
├── sala-template.html          # Template para novos exercícios
└── sala-styles.css             # CSS compartilhado
```

## Como Funciona

### Montagem (index.html)

O arquivo `index.html` usa JavaScript `fetch()` para carregar os exercícios:

```javascript
const EXERCICIOS = [
  'exercicio-1.html',
  'exercicio-2.html',
  // ... na ordem desejada
];

async function carregarExercicios() {
  const container = document.getElementById('exercicios-container');

  for (const arquivo of EXERCICIOS) {
    const response = await fetch(arquivo);
    const html = await response.text();
    container.insertAdjacentHTML('beforeend', html);
  }

  // Renderiza matemática após carregar todos
  renderMathInElement(document.body, {...});
}
```

**Vantagens:**

- Reordenar exercícios = mudar a lista
- Remover exercício = tirar da lista
- Editar um exercício = modificar apenas aquele arquivo

### Exercício Individual (exercicio-N.html)

Cada exercício é um **fragmento HTML** (sem `<html>`, `<head>`, `<body>`):

```html
<section class="exercicio" data-topico="retas" data-dificuldade="medio">
  <p class="exercicio-enunciado">
    <span class="exercicio-numero">1.</span>
    Enunciado do exercício.
  </p>

  <p class="questao">Pergunta principal.</p>
  <p class="dialogo">Texto explicativo.</p>
  <p class="subitem">a) Item: <span class="lacuna"></span></p>
  <p class="subitem">b) Item: <span class="lacuna"></span></p>
  <p class="dica">Dica opcional.</p>
  <p class="checkpoint">
    <span class="checkmark"></span>
    Verificação.
  </p>
</section>
```

## Metadados (data-attributes)

Atributos opcionais no `<section>`:

| Atributo           | Valores                                      | Descrição            |
| ------------------ | -------------------------------------------- | -------------------- |
| `data-topico`      | `retas`, `circunferencia`, `integrais`, etc. | Tópico matemático    |
| `data-dificuldade` | `facil`, `medio`, `dificil`                  | Nível de dificuldade |

## Classes CSS Disponíveis

### Exercício

```html
<section class="exercicio">
  <p class="exercicio-enunciado">
    <span class="exercicio-numero">N.</span>
    Texto do enunciado.
  </p>
</section>
```

### Questão

```html
<p class="questao">Pergunta que o aluno deve responder.</p>
```

### Diálogo

```html
<p class="dialogo">Texto explicativo que guia o aluno.</p>
```

### Subitens

```html
<p class="subitem">a) Passo: <span class="lacuna"></span></p>
<p class="subitem">b) Passo: <span class="lacuna"></span></p>
```

### Lacunas

```html
<!-- Inline -->
<span class="lacuna"></span>

<!-- Bloco (linha inteira) -->
<span class="lacuna-grande"></span>
```

### Fórmula Destacada

```html
<p class="formula">$$\int_a^b f(x)\,dx = F(b) - F(a)$$</p>
```

**IMPORTANTE:** Não coloque `<span class="lacuna">` dentro de equações LaTeX. Use texto simples para fórmulas com lacunas.

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

## Estilo de Diálogo

**Objetivo:** Guiar o aluno sem dar a resposta diretamente.

**Exemplos:**

❌ **Errado (muito óbvio):**

> O vetor perpendicular a (a, b) é (-b, a). Escreva o vetor perpendicular.

✅ **Certo (guia o pensamento):**

> O produto escalar de dois vetores perpendiculares é zero. Como escolher as coordenadas de um vetor para que o produto escalar seja zero?

## Fluxo de Criação

### Criar Novo Capítulo

1. Criar pasta: `sala/capitulo-N-nome/`
2. Criar `index.html` (copiar de capítulo existente ou template)
3. Criar `exercicio-1.html` a `exercicio-6.html`
4. Atualizar lista `EXERCICIOS` no `index.html`
5. Testar no navegador

### Criar/Editar Exercício

1. Abrir `exercicio-N.html`
2. Seguir a estrutura de classes CSS
3. Usar `<strong>` para variáveis simples
4. Usar LaTeX apenas para fórmulas complexas
5. Incluir `data-topico` e `data-dificuldade`

### Reordenar Exercícios

Basta mudar a ordem no array `EXERCICIOS` em `index.html`:

```javascript
const EXERCICIOS = [
  'exercicio-3.html', // Mudou ordem
  'exercicio-1.html',
  'exercicio-2.html',
  // ...
];
```

## Teste

```bash
# Navegar para a pasta do capítulo
cd sala/capitulo-N-nome/

# Iniciar servidor local
python3 -m http.server 8080

# Abrir no navegador
firefox http://localhost:8080

# Testar impressão (Ctrl+P ou Cmd+P)
```

## Exemplo Completo

```html
<!-- exercicio-1.html -->
<section class="exercicio" data-topico="retas" data-dificuldade="medio">
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
    a) O deslocamento em <strong>x</strong> é: <strong>Δx</strong> =
    <span class="lacuna"></span>
  </p>
  <p class="subitem">
    b) O deslocamento em <strong>y</strong> é: <strong>Δy</strong> =
    <span class="lacuna"></span>
  </p>
  <p class="subitem">
    c) O vetor diretor é: <strong>v⃗</strong> = (<span class="lacuna"></span>,
    <span class="lacuna"></span>)
  </p>

  <p class="questao">Encontre a equação paramétrica dessa reta.</p>

  <p class="dialogo">
    A equação paramétrica descreve todos os pontos da reta usando um parâmetro
    <strong>t</strong>.
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
