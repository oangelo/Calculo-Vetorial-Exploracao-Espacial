# Guia para Agentes de IA - Cálculo Vetorial Exploração Espacial

## Visão Geral

Curso de Cálculo Vetorial com tema de **Exploração Espacial e Guerra Fria**. O projeto combina:

- **48 exercícios** interativos no formato "documento sigiloso"
- **20+ apresentações** Reveal.js com visualizações interativas
- **3 temas CSS** distintos (industrial, arcade, espacial)

## Estrutura de Diretórios

```
/
├── exercicios/           # 48 exercícios HTML organizados por capítulo
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
│   ├── template.html     # Template base para novos exercícios
│   └── styles.css        # Tema industrial/cobre
├── slide-decks/          # 20+ apresentações Reveal.js
│   ├── reveal.js/        # Framework
│   └── space-theme.css   # Tema espacial
├── docs/                 # Documentação
│   ├── prompts/          # Instruções para criar conteúdo
│   │   ├── exercicios.md # Prompt para criar exercícios
│   │   └── slides.md     # Prompt para criar slides
│   └── css/              # Documentação de estilos
│       ├── inventory.md  # Mapeamento de uso de CSS
│       └── themes.md     # Documentação dos 3 temas
├── investigacao/         # Material de pesquisa histórica
├── notas/                # Notas do curso
└── img/                  # Imagens do projeto
```

## Para Agentes de IA: Como Contribuir

### Criar Novos Exercícios

**Arquivos necessários:**

1. Prompt: `/docs/prompts/exercicios.md`
2. Template: `/exercicios/template.html`
3. CSS: `/exercicios/styles.css` (já linkado no template)

**Passos:**

1. Leia `/docs/prompts/exercicios.md` completamente
2. Identifique o tópico solicitado (consulte sequência no final do prompt)
3. Use o template `/exercicios/template.html` como base
4. Gere o conteúdo seguindo as instruções do prompt
5. Salve o resultado em `/exercicios/capitulo-N/nome-do-topico.html`

**Importante:**

- Use APENAS conceitos já abordados na progressão do curso
- Mantenha o tema "documento sigiloso da Guerra Fria"
- 12 exercícios por arquivo (4 níveis: ALFA, BETA, GAMMA, OMEGA)
- Use classes CSS do template (não invente novas)
- MathJax: `\(inline\)` e `\[bloco\]` (apenas UMA barra)

### Criar Novos Slides

**Arquivos necessários:**

1. Prompt: `/docs/prompts/slides.md`
2. Framework: Reveal.js (já em `/slide-decks/reveal.js/`)
3. CSS: `/slide-decks/space-theme.css`

**Passos:**

1. Leia `/docs/prompts/slides.md` completamente
2. Identifique o tópico solicitado (consulte cronologia histórica no prompt)
3. Gere o HTML seguindo estrutura Reveal.js e classes CSS especificadas
4. Salve o resultado em `/slide-decks/nome-do-topico.html`

**Importante:**

- Separe conteúdo matemático de contextualização histórica
- Use classes CSS específicas (`math-section`, `history-section`)
- Visualizações Canvas 2D são preferíveis a Three.js
- Limite: 250 palavras por slide, 2-3 fórmulas complexas
- Navegação horizontal entre tópicos, vertical para aprofundamento

### Editar Conteúdo Existente

**Padrões CSS atuais:**

- Exercícios: CSS inline (~240 linhas duplicadas) ou externo (`styles.css`)
- Slides: CSS externo (`space-theme.css`)

**Problemas conhecidos** (ver `/docs/css/inventory.md`):

- 4 arquivos com referência quebrada (`../../css/style.css`)
- ~40 arquivos com CSS inline (deveriam usar externo)
- 1 arquivo vazio (`capitulo-8/integral-de-superficie.html`)

**Ao editar:**

- Preserve IDs e classes CSS existentes (quebra visual se mudar)
- Use MathJax: `\(inline\)` e `\[bloco\]`
- Teste visualmente no navegador antes de commitar
- Consulte `/docs/css/themes.md` para entender o tema

## Contexto dos Capítulos

| Capítulo | Tópico Principal       | Período Histórico | Contexto                                 |
| -------- | ---------------------- | ----------------- | ---------------------------------------- |
| 0        | Revisão                | Pré-Guerra Fria   | Geometria, derivadas, integrais          |
| 1        | Funções vetoriais      | 1945-1956         | Era dos Mísseis (V-2, Redstone)          |
| 2        | Integrais duplas       | 1957-1961         | Era Sputnik (primeiros satélites)        |
| 3        | Mudança de variáveis   | 1961-1964         | Primeiros Astronautas (Gagarin, Shepard) |
| 4        | Integrais triplas      | 1965-1966         | Programa Gemini                          |
| 5        | Integrais de linha     | 1967-1969         | Primeiras missões Apollo                 |
| 6        | Campos conservativos   | 1967-1969         | Missões Apollo                           |
| 7        | Teorema de Green       | 1969-1970         | Pouso Lunar (Apollo 11)                  |
| 8        | Integral de superfície | 1971-1972         | Missões Apollo avançadas                 |
| 9        | Teorema da divergência | 1973-1985         | Estações Espaciais (Skylab)              |

## Arquivos Importantes

### Para Criar Conteúdo

- `/docs/prompts/exercicios.md` - Instruções detalhadas para criar exercícios
- `/docs/prompts/slides.md` - Instruções detalhadas para criar slides
- `/exercicios/template.html` - Template base para exercícios

### Para Entender Estilos

- `/docs/css/themes.md` - Documentação dos 3 temas CSS
- `/docs/css/inventory.md` - Mapeamento de uso e problemas
- `/exercicios/styles.css` - Tema industrial/cobre (exercícios)
- `/slide-decks/space-theme.css` - Tema espacial (slides)

### Para Workflow

- `/docs/workflow.md` - Processo completo de criação passo a passo

## Evitar

- **NÃO** quebrar links existentes (muitos HTMLs já publicados)
- **NÃO** mudar IDs/classes CSS sem atualizar TODOS os arquivos
- **NÃO** antecipar conceitos de capítulos posteriores
- **NÃO** usar `\vec{v}` sem barra invertida no MathJax
- **NÃO** misturar temas CSS (industrial vs arcade vs espacial)
- **NÃO** usar jQuery (use DOM nativo)
- **NÃO** criar visualizações Three.js se Canvas 2D basta

## Convenções de Nomenclatura

### Exercícios

- Arquivo: `nome-do-topico.html` (kebab-case)
- Local: `exercicios/capitulo-N/`
- Exemplo: `exercicios/capitulo-1/campo-vetorial.html`

### Slides

- Arquivo: `nome-do-topico.html` (kebab-case)
- Local: `slide-decks/`
- Exemplo: `slide-decks/integrais-duplas.html`

### CSS

- Exercícios: Usar `../styles.css` (relativo ao capítulo)
- Slides: Usar `space-theme.css` (já configurado)

## Testes Manuais Recomendados

Antes de commitar:

1. Abra o HTML no navegador
2. Verifique se MathJax renderiza corretamente
3. Verifique se CSS carregou (não deve parecer "sem estilo")
4. Teste interatividade (se houver)
5. Verifique links internos (navegação)

## Contato e Contexto

- Projeto educacional de código aberto
- Foco em didática e clareza
- Tema histórico da Guerra Fria como fio condutor
- Material usado em cursos reais de Cálculo Vetorial
