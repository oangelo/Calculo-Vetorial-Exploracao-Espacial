# Guia para Agentes de IA - Cálculo Vetorial Espacial

## Comandos Principais

```bash
# Formatação (Prettier)
npm run format              # Formata todos os arquivos

# Linting HTML
npm run lint:html           # Valida HTML com HTMLHint

# Servidor local para teste
python3 -m http.server 8080  # Inicia servidor na porta 8080

# Instalar dependências
npm install                 # Instala husky + prettier
```

**Não há testes automatizados.** Teste manualmente abrindo no navegador (Firefox recomendado).

## Estrutura do Projeto

```
├── exercicios/          # Exercícios de casa (tema espacial)
├── sala/                # Exercícios de sala (resolução em aula)
├── slide-decks/         # Apresentações Reveal.js
├── provas/              # Provas e avaliações
├── visualizacao/        # Visualizações interativas
├── docs/                # Documentação e prompts
├── sala-styles.css      # CSS compartilhado (sala)
└── sala-template.html   # Template para exercícios de sala
```

## Estilo de Código

### Formatação

- **Prettier** com: 2 espaços, aspas simples, semicolons, trailing comma (es5)
- Execute `npm run format` antes de commitar

### HTML

- Fragmentos HTML sem `<html>`, `<head>`, `<body>` para exercícios individuais
- Use classes CSS definidas (veja abaixo)
- Atributos `data-topico` e `data-dificuldade` em `<section>`

### JavaScript

- Funções simples, sem frameworks
- IIFE para visualizações canvas
- Cleanup ao mudar de slide/contexto

### Matemática

- **Sala:** KaTeX com `$...$` (inline) e `$$...$$` (bloco)
- **Exercícios/Slides:** MathJax com `\(inline\)` e `\[bloco\]`
- Use `<strong>` para variáveis simples em vez de LaTeX
- **NUNCA** coloque `<span class="lacuna">` dentro de equações LaTeX

## Convenções de Nomenclatura

| Tipo       | Padrão                         | Exemplo               |
| ---------- | ------------------------------ | --------------------- |
| Pastas     | `capitulo-N-nome/`             | `capitulo-0-revisao/` |
| Exercícios | `exercicio-N.html`             | `exercicio-1.html`    |
| Slides     | `01-titulo.html`, `index.html` | `02-introducao.html`  |
| CSS        | `styles.css`, `*-theme.css`    | `space-theme.css`     |

## Classes CSS (Exercícios de Sala)

| Classe                | Uso                          |
| --------------------- | ---------------------------- |
| `exercicio`           | Container principal          |
| `exercicio-enunciado` | Texto do problema            |
| `exercicio-numero`    | Número do exercício          |
| `questao`             | Pergunta principal           |
| `dialogo`             | Texto explicativo guiado     |
| `subitem`             | Itens a), b), c)             |
| `lacuna`              | Espaço inline para preencher |
| `lacuna-grande`       | Espaço grande para resposta  |
| `formula`             | Fórmula destacada            |
| `dica`                | Dica opcional                |
| `checkpoint`          | Verificação com checkmark    |

## Diretrizes de Conteúdo

### Exercícios de Sala

- 4-6 exercícios por folha
- 2-4 questões por exercício
- 2-4 subitens por questão
- Total: ~15-25 interações
- Diálogo guiado, não dar respostas diretas
- Checkpoints para auto-verificação

### Exercícios de Casa

- 12 exercícios (níveis: ALFA, BETA, GAMMA, OMEGA)
- Tema narrativo espacial
- 8-10 partes censuradas com `.censored`
- Contexto histórico

### Slides (Reveal.js)

- Máximo 250 palavras/slide
- 2-3 fórmulas complexas máximo
- Canvas 2D para visualizações
- Classes: `math-section`, `history-section`, `visualization-canvas`

## Fluxo de Trabalho

### Criar Exercício de Sala

1. Criar pasta: `sala/capitulo-N-nome/`
2. Copiar `index.html` de capítulo existente
3. Criar `exercicio-1.html` a `exercicio-6.html`
4. Atualizar array `EXERCICIOS` no `index.html`
5. Testar: `python3 -m http.server 8080` → Firefox

### Criar Slide

1. Usar template em `slide-decks/template.html`
2. Estrutura: `01-titulo.html`, `02-introducao.html`, etc.
3. Incluir `index.html` como entry point
4. Testar navegação horizontal/vertical

### Git

```bash
git checkout -b feature/nome-da-feature
# Fazer alterações
npm run format
git add .
git commit -m "Descrição clara da mudança"
git push origin feature/nome-da-feature
```

## Teste Manual

1. Abrir no Firefox: `firefox arquivo.html`
2. Verificar: CSS carregou, matemática renderizou, interatividade funciona
3. Para impressão: Ctrl+P → verificar layout A4

## Recursos

- `/docs/workflow.md` - Processo detalhado
- `/docs/prompts/` - Prompts para geração
- `/docs/css/themes.md` - Documentação CSS
- `/CONTRIBUTING.md` - Guia de contribuição
