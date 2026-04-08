# Guia para Agentes de IA - Cálculo Vetorial Exploração Espacial

## Visão Geral

Curso de Cálculo Vetorial com tema de **Exploração Espacial e Guerra Fria**:

- **48 exercícios** interativos no formato "documento sigiloso"
- **20+ apresentações** Reveal.js com visualizações interativas
- **3 temas CSS** distintos (industrial, arcade, espacial)

## Estrutura de Diretórios

```
/
├── exercicios/           # Exercícios de CASA (formato "documento sigiloso")
│   ├── capitulo-0/       # Revisão (geometria, derivadas, integrais)
│   ├── capitulo-1/       # Funções vetoriais
│   ├── capitulo-2/       # Integrais duplas
│   ├── capitulo-3/       # Mudança de variáveis
│   ├── capitulo-4/       # Integrais triplas
│   ├── capitulo-5/       # Integrais de linha
│   ├── capitulo-6/       # Campos conservativos
│   ├── capitulo-7/       # Teorema de Green
│   ├── capitulo-8/       # Integral de superfície
│   ├── capitulo-9/       # Teorema da divergência
│   ├── template.html     # Template base
│   └── styles.css        # Tema industrial/cobre
├── sala/                 # Exercícios de SALA (folhas A4 para resolução em aula)
│   ├── AGENTS.md         # Guia específico para exercícios de sala
│   ├── sala-styles.css   # CSS compartilhado
│   ├── capitulo-0-revisao/
│   │   ├── index.html    # Monta a folha final
│   │   └── exercicio-*.html
│   ├── capitulo-1-funcoes-vetoriais/
│   └── ...
├── slide-decks/          # Apresentações Reveal.js organizadas por capítulo
│   ├── capitulo-0-revisao/
│   ├── capitulo-1-funcoes-vetoriais/
│   ├── capitulo-2-integrais-duplas/
│   ├── capitulo-3-mudanca-de-variaveis/
│   ├── capitulo-4-integrais-triplas/
│   ├── capitulo-5-integrais-de-linha/
│   ├── capitulo-6-campos-conservativos/
│   ├── capitulo-7-teorema-de-green/
│   ├── capitulo-8-integral-de-superficie/
│   ├── capitulo-9-teorema-da-divergencia/
│   ├── reveal.js/        # Framework
│   └── space-theme.css   # Tema espacial
├── docs/                 # Documentação
│   ├── prompts/          # Instruções para criar conteúdo
│   │   ├── exercicios.md # Prompt para exercícios
│   │   └── slides.md     # Prompt para slides
│   └── css/              # Documentação de estilos
│       ├── inventory.md  # Status e problemas CSS
│       └── themes.md     # Documentação dos 3 temas
├── planejamento/         # Cronogramas e planejamentos semestrais
├── investigacao/         # Material de pesquisa histórica
├── notas/                # Notas do curso
└── .tree/                # Git worktrees (ignorado pelo git)
```

## ⚠️ Importante: Dois Tipos de Exercícios

Este projeto possui **dois tipos de exercícios** com finalidades diferentes:

### 1. Exercícios de CASA (`exercicios/`)

- Formato "documento sigiloso" (tema narrativo)
- Para entrega em casa
- Tema visual: industrial/cobre

### 2. Exercícios de SALA (`sala/`)

- Folhas A4 coluna dupla para resolução em aula
- Diálogo guiado com lacunas para preencher
- Sem tema narrativo
- Guia específico em `sala/AGENTS.md`

**NÃO confunda os dois!** Cada um tem seu próprio guia e estrutura.

## ⚠️ Importante: Worktrees

Ao criar um **worktree** para trabalhar em uma branch separada, use:

```bash
# Errado: cria worktree na raiz, embaralha tudo
git worktree add ../minha-branch

# Correto: especifica o caminho correto
git worktree add ../minha-branch -b minha-branch
```

O worktree deve ser criado em uma **pasta separada** (ex: `.trees/exercicios-sala/`), não na raiz do projeto.

## Para Agentes de IA: Como Contribuir

### Criar Exercícios de Casa

**Arquivos:** `/docs/prompts/exercicios.md` + `/exercicios/template.html`

**Passos:**

1. Leia o prompt completamente
2. Identifique o tópico (ver sequência no final do prompt)
3. Use o template como base
4. Salve em `/exercicios/capitulo-N/nome-do-topico.html`

**Regras críticas:**

- Exercícios por tópico: quantos forem necessários para cobrir a narrativa matemática (ALFA/BETA/GAMMA/OMEGA)
- **Narrativa matemática:** cada exercício deve ter motivação clara e construir sobre o anterior. O aluno precisa entender por que está aprendendo cada conceito e para onde a lista o leva. A lista conta uma história da matemática.
- Use APENAS conceitos já abordados na progressão
- MathJax: `\(inline\)` e `\[bloco\]` (uma barra)
- Classes CSS do template (não invente novas)

### Criar Exercícios de Sala

**Arquivos:** `/sala/AGENTS.md` + `/sala/sala-styles.css`

**Passos:**

1. Leia `/sala/AGENTS.md` completamente
2. Identifique o tópico na sequência de progressão
3. Use o padrão de diálogo guiado (baby steps)
4. Salve em `/sala/capitulo-N-nome-do-topico/exercicio-N.html`

**Estrutura de um capítulo de sala:**

```
sala/capitulo-N-nome/
├── index.html              # Monta a folha final (usa fetch())
├── exercicio-1.html        # Fragmento HTML
├── exercicio-2.html
└── ...
```

### Criar Slides

**Arquivos:** `/docs/prompts/slides.md` + Reveal.js

**Passos:**

1. Leia o prompt completamente
2. Identifique tópico e período histórico (ver cronologia no prompt)
3. Gere HTML seguindo estrutura Reveal.js
4. Salve em `/slide-decks/capitulo-N-nome-do-capitulo/NN-nome-da-secao.html`
5. Crie ou atualize o `index.html` (loader) na pasta do capítulo

**Estrutura de uma pasta de capítulo:**

```
slide-decks/capitulo-N-nome/
├── index.html              # Loader que faz fetch das seções
├── 01-titulo.html          # Seção 1
├── 02-conceito.html        # Seção 2
├── 03-exemplos.html        # Seção 3
└── ...
```

**Regras críticas:**

- Separe matemática (`math-section`) de história (`history-section`)
- Canvas 2D preferível a Three.js
- Limite: 250 palavras/slide, 2-3 fórmulas complexas
- Navegação horizontal (tópicos) e vertical (aprofundamento)

## Contexto dos Capítulos

| Cap | Tópico                 | Período    | Contexto                        |
| --- | ---------------------- | ---------- | ------------------------------- |
| 0   | Revisão                | Pré-Guerra | Geometria, derivadas, integrais |
| 1   | Funções vetoriais      | 1945-1956  | Era dos Mísseis (V-2, Redstone) |
| 2   | Integrais duplas       | 1957-1961  | Era Sputnik                     |
| 3   | Mudança de variáveis   | 1961-1964  | Primeiros Astronautas           |
| 4   | Integrais triplas      | 1965-1966  | Programa Gemini                 |
| 5   | Integrais de linha     | 1967-1969  | Primeiras Apollo                |
| 6   | Campos conservativos   | 1967-1969  | Missões Apollo                  |
| 7   | Teorema de Green       | 1969-1970  | Pouso Lunar (Apollo 11)         |
| 8   | Integral de superfície | 1971-1972  | Apollo avançadas                |
| 9   | Teorema da divergência | 1973-1985  | Estações Espaciais (Skylab)     |

## Arquivos Importantes

**Para criar exercícios de casa:**

- `/docs/prompts/exercicios.md` - Instruções para exercícios
- `/exercicios/template.html` - Template base

**Para criar exercícios de sala:**

- `/sala/AGENTS.md` - Guia específico para exercícios de sala
- `/sala/sala-styles.css` - CSS compartilhado

**Para criar slides:**

- `/docs/prompts/slides.md` - Instruções para slides

**Para entender estilos:**

- `/docs/css/themes.md` - Documentação dos temas
- `/docs/css/inventory.md` - Problemas conhecidos de CSS

**Para workflow:**

- `/docs/workflow.md` - Processo passo a passo

## Convenções

**Nomenclatura:** kebab-case.html

- Exercícios de casa: `exercicios/capitulo-N/nome-do-topico.html`
- Exercícios de sala: `sala/capitulo-N-nome/exercicio-N.html`
- Slides: `slide-decks/capitulo-N-nome-do-capitulo/index.html` (arquivo principal do capítulo)
- Seções de slides: `slide-decks/capitulo-N-nome/NN-nome-da-secao.html`

**CSS:**

- Exercícios de casa: usar `../styles.css` (relativo ao capítulo)
- Exercícios de sala: usar `../sala-styles.css` (relativo à pasta do capítulo)
- Slides: usar `../space-theme.css` (relativo à pasta do capítulo)

## O que Evitar

- NÃO quebrar links existentes
- NÃO mudar IDs/classes CSS sem atualizar TODOS os arquivos
- NÃO antecipar conceitos de capítulos posteriores
- NÃO misturar temas CSS
- NÃO usar jQuery (use DOM nativo)
- NÃO criar Three.js se Canvas 2D basta
- NÃO confundir exercícios de casa (`exercicios/`) com exercícios de sala (`sala/`)

## Problemas Conhecidos

Ver `/docs/css/inventory.md` para detalhes:

- 38 arquivos com CSS inline (deveriam usar externo)
- 4 arquivos com referência quebrada
- 1 arquivo vazio

## Teste Manual

Antes de commitar, abra no navegador e verifique:

1. CSS carregou
2. MathJax/KaTeX renderizou
3. Interatividade funciona
4. Links funcionam

## Workflow de Entrega

### Commits incrementais

Após criar ou editar **1-3 arquivos** de um mesmo tópico, faça commit:

```bash
git add <arquivos> && git commit -m "<tipo>: <descrição>"
```

**Tipos:** `feat`, `fix`, `refactor`, `docs`, `style`

**Regras:**

- Não acumular mudanças de capítulos diferentes no mesmo commit
- Não deixar arquivos soltos sem commit por muito tempo
- Após commitar, perguntar ao usuário se deve fazer `git push`

### Visualização

Ao terminar uma tarefa de criação de conteúdo, **sempre perguntar**:

> "Quer abrir no Firefox para visualizar?"

Para abrir:

```bash
# Iniciar servidor (se necessário)
cd pasta/do/conteudo && python3 -m http.server 8080 &

# Abrir no Firefox
firefox http://localhost:8080/caminho/arquivo.html &
```

### Fluxo completo

```
Criar/editar conteúdo → Perguntar visualização → Ajustar se necessário → Commit → Push
```

## Recursos Adicionais

- `/docs/workflow.md` - Processo detalhado de criação
- `/sala/AGENTS.md` - Guia específico para exercícios de sala
- `/CONTRIBUTING.md` - Guia para contribuidores humanos
- `/investigacao/` - Material histórico de referência
