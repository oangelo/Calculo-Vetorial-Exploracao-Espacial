# Prompts para Criação de Conteúdo

Este diretório contém os prompts usados para gerar conteúdo do curso com assistência de IA.

## Arquivos Disponíveis

### `exercicios.md`

Prompt para criar **listas de exercícios** no formato "documento sigiloso da Guerra Fria".

**Características:**

- 12 exercícios por arquivo
- Progressão: ALFA (básico) → BETA (intermediário) → GAMMA (avançado) → OMEGA (desafiador)
- Tema visual: documento classificado, partes censuradas
- Template HTML específico (`/exercicios/template.html`)

**Como usar (AGENTES):**

1. Leia o prompt completamente
2. Identifique o tópico solicitado (ver sequência no final do arquivo)
3. Use o template HTML (`/exercicios/template.html`) como base
4. Gere o conteúdo seguindo as instruções do prompt
5. Salve o resultado em `/exercicios/capitulo-N/nome-do-topico.html`

### `slides.md`

Prompt para criar **apresentações Reveal.js** com visualizações interativas.

**Características:**

- Estrutura hierárquica (horizontal: tópicos, vertical: aprofundamento)
- Separação clara: conteúdo matemático vs contexto histórico
- Visualizações interativas com Canvas 2D ou Three.js
- Tema visual: exploração espacial
- Cronologia histórica progressiva

**Como usar (AGENTES):**

1. Leia o prompt completamente
2. Identifique o tópico solicitado (ver cronologia no prompt)
3. Verifique se precisa de visualizações interativas
4. Gere o HTML seguindo a estrutura e classes CSS especificadas
5. Salve o resultado em `/slide-decks/nome-do-topico.html`

## Diferenças Principais

| Aspecto        | Exercícios                          | Slides                        |
| -------------- | ----------------------------------- | ----------------------------- |
| Formato        | Lista de 12 problemas               | Apresentação navegável        |
| Tema Visual    | Documento sigiloso (Guerra Fria)    | Exploração espacial           |
| Interatividade | Solutions ocultas (details/summary) | Visualizações Canvas/Three.js |
| Foco           | Prática e aplicação                 | Didática e conceitos          |
| Estrutura      | Linear (1-12)                       | Hierárquica (H/V)             |

## Workflow para Agentes

### Ao Receber Solicitação

1. **Identificar tipo**: Exercícios ou Slides
2. **Ler prompt correspondente** deste diretório
3. **Consultar template/exemplos** se necessário
4. **Gerar conteúdo** seguindo instruções
5. **Testar no navegador** (abrir arquivo HTML)
6. **Ajustar se necessário**

### Para Novo Capítulo

1. **Primeiro**: Gerar slides (conceitos + visualizações)
2. **Depois**: Gerar exercícios (prática + aplicação)

## Importante

Esses prompts foram refinados para:

- Manter consistência visual com material existente
- Respeitar progressão pedagógica do curso
- Evitar erros comuns de MathJax e CSS
- Garantir qualidade didática

**Agentes**: Sigam as instruções rigorosamente. Consultem exemplos existentes em caso de dúvida.
