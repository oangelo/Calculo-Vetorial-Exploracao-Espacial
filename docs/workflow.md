# Workflow de Criação de Conteúdo

Guia passo a passo para agentes de IA criarem novos exercícios e slides.

---

## 📋 Criar Novos Exercícios

### Passo 1: Preparação

1. **Identifique o capítulo e tópico**

   - Consulte a tabela de capítulos no `AGENTS.md`
   - Verifique se já existe material similar
   - Escolha um tópico que respeite a progressão pedagógica

2. **Reúna os arquivos necessários**
   - Prompt: `/docs/prompts/exercicios.md`
   - Template: `/exercicios/template.html`
   - CSS: `/exercicios/styles.css` (já linkado no template)

### Passo 2: Seguir o Prompt

1. **Leia o prompt** em `/docs/prompts/exercicios.md`

2. **Identifique o tópico** solicitado pelo usuário

   - Exemplo: "Funções Vetoriais", "Integrais Duplas", "Teorema de Green"

3. **Use o template** `/exercicios/template.html` como base

   - Preserve toda a estrutura HTML
   - Mantenha classes CSS existentes

4. **Gere o conteúdo** seguindo rigorosamente as instruções do prompt

### Passo 3: Revisar Resultado

**Checklist de Revisão:**

- [ ] **Estrutura HTML correta**

  - `<!doctype html>` presente
  - Todas as tags fechadas corretamente
  - Classes CSS do template mantidas

- [ ] **Conteúdo matemático**

  - MathJax: `\(inline\)` e `\[bloco\]` (apenas UMA barra)
  - Vetores: `\vec{v}` (com barra invertida)
  - Matrizes: `\begin{pmatrix}...\end{pmatrix}`
  - Fórmulas renderizam corretamente

- [ ] **Tema visual**

  - Carimbos "SIGILOSO" e "ULTRASSECRETO" presentes
  - Partes censuradas com classe `.censored` (8-10 por documento)
  - Contexto histórico apropriado ao período

- [ ] **Progressão pedagógica**

  - 12 exercícios no total
  - Série ALFA (1-3): Básico, dicas completas
  - Série BETA (4-6): Intermediário, dicas parciais
  - Série GAMMA (7-9): Avançado, dicas mínimas
  - Série OMEGA (10-12): Desafiador, sem dicas

- [ ] **Apenas conceitos já abordados**
  - Não antecipa tópicos de capítulos posteriores
  - Respeita a sequência do curso

### Passo 4: Salvar e Testar

1. **Salve o arquivo**

   ```bash
   # Nomenclatura: nome-do-topico.html (kebab-case)
   # Local: exercicios/capitulo-N/

   # Exemplo:
   exercicios/capitulo-2/soma-de-riemann.html
   ```

2. **Teste no navegador**

   ```bash
   # Abra o arquivo no navegador
   firefox exercicios/capitulo-2/soma-de-riemann.html
   # ou
   google-chrome exercicios/capitulo-2/soma-de-riemann.html
   ```

3. **Verifique:**

   - CSS carregou (não parece "sem estilo")
   - MathJax renderizou (fórmulas visíveis)
   - Interatividade funciona (details/summary)
   - Links internos funcionam (navegação)

4. **Comite** (se estiver tudo certo)
   ```bash
   git add exercicios/capitulo-2/soma-de-riemann.html
   git commit -m "Adiciona exercícios sobre soma de Riemann"
   ```

---

## 🎨 Criar Novos Slides

### Passo 1: Preparação

1. **Identifique o capítulo e tópico**

   - Consulte a cronologia histórica no `AGENTS.md`
   - Escolha tópico alinhado com período histórico
   - Verifique necessidade de visualizações

2. **Reúna os arquivos necessários**
   - Prompt: `/docs/prompts/slides.md`
   - Framework: Reveal.js (já em `/slide-decks/reveal.js/`)
   - CSS: `/slide-decks/space-theme.css`

### Passo 2: Seguir o Prompt

1. **Leia o prompt** em `/docs/prompts/slides.md`

2. **Identifique requisitos:**

   - Tópico desejado
   - Se precisa de visualizações interativas
   - Nível de complexidade
   - Período histórico para contextualização

3. **Gere o HTML** seguindo:
   - Estrutura Reveal.js
   - Classes CSS específicas
   - Separação matemática/história

### Passo 3: Revisar Resultado

**Checklist de Revisão:**

- [ ] **Estrutura Reveal.js correta**

  - `<div class="reveal">` e `<div class="slides">` presentes
  - Navegação horizontal (tópicos) e vertical (aprofundamento)
  - Scripts Reveal.js e MathJax incluídos

- [ ] **Classes CSS específicas**

  - `math-section` para conteúdo matemático
  - `history-section` para contexto histórico
  - `visualization-canvas` para canvas
  - `problem-section` para problemas
  - `controls-container` para controles

- [ ] **Conteúdo**

  - Limite: 250 palavras por slide
  - 2-3 fórmulas complexas máximo por slide
  - Separação clara: matemática vs história
  - Exemplos simples e didáticos

- [ ] **Visualizações** (se houver)

  - Canvas 2D preferível a Three.js
  - Código encapsulado em IIFE
  - Função de cleanup implementada
  - IDs únicos para elementos

- [ ] **Contexto histórico**
  - Período correto para o capítulo
  - Eventos apropriados
  - Conexão clara com conceitos matemáticos

### Passo 4: Salvar e Testar

1. **Salve o arquivo**

   ```bash
   # Nomenclatura: nome-do-topico.html (kebab-case)
   # Local: slide-decks/

   # Exemplo:
   slide-decks/integrais-duplas.html
   ```

2. **Teste no navegador**

   ```bash
   # Abra o arquivo
   firefox slide-decks/integrais-duplas.html
   ```

3. **Verifique:**

   - Reveal.js carrega (navegação funciona)
   - CSS aplicado (tema espacial)
   - MathJax renderizou
   - Visualizações funcionam (se houver)
   - Navegação H/V funciona corretamente

4. **Teste interatividade**

   - Controles sliders/buttons funcionam
   - Animações rodam suavemente
   - Cleanup ao mudar de slide (sem memory leaks)

5. **Comite**
   ```bash
   git add slide-decks/integrais-duplas.html
   git commit -m "Adiciona slides sobre integrais duplas"
   ```

---

## 🔄 Workflow para Capítulo Completo

### Ordem Recomendada

1. **Primeiro: Slides de conceitos**

   - Criar apresentação principal do capítulo
   - Incluir visualizações interativas
   - Foco em didática e clareza

2. **Segundo: Exercícios de prática**

   - Criar 1-2 arquivos de exercícios
   - Cobrir tópicos principais do capítulo
   - Progressão de dificuldade

3. **Terceiro: Revisão e ajustes**
   - Testar tudo junto
   - Verificar links entre slides e exercícios
   - Ajustar conforme necessário

---

## 🛠️ Dicas e Truques

### Para Exercícios

1. **Contexto histórico**

   - Use eventos reais da Guerra Fria
   - Consulte `/investigacao/` para referências
   - Mantenha tom de "documento sigiloso"

2. **Progressão de dificuldade**

   - ALFA: Números simples, aplicação direta
   - BETA: Múltiplos passos, conceitos combinados
   - GAMMA: Problemas realistas, mínimas dicas
   - OMEGA: Integração de conceitos, sem dicas

3. **Dicas**
   - Sutis, não dão a resposta
   - Direcionam o raciocínio
   - Usam linguagem técnica

### Para Slides

1. **Visualizações**

   - Canvas 2D para maioria dos casos
   - Three.js apenas se 3D for essencial
   - Limpar recursos ao mudar de slide

2. **Didática**

   - Um conceito por slide
   - Texto mínimo necessário
   - Fórmulas bem espaçadas

3. **Cronologia histórica**
   - 1945-1956: Mísseis (Cap 1)
   - 1957-1961: Sputnik (Cap 2)
   - 1961-1964: Astronautas (Cap 3)
   - 1965-1966: Gemini (Cap 4)
   - 1967-1969: Apollo (Cap 5-6)
   - 1969-1970: Lua (Cap 7)
   - 1971-1972: Apollo avançado (Cap 8)
   - 1973-1985: Estações (Cap 9)

---

## 📚 Referências

- **AGENTS.md** - Visão geral do projeto
- **docs/css/themes.md** - Documentação dos temas
- **docs/css/inventory.md** - Status do CSS
- **investigacao/** - Material histórico de referência

---

## 🆘 Problemas Comuns

### MathJax não renderiza

- Verifique se há `\( \)` e `\[ \]` (apenas UMA barra)
- Confirme se script MathJax está incluído
- Abra console do navegador para ver erros

### CSS não carrega

- Verifique caminho relativo: `../styles.css` para exercícios
- Confirme se arquivo CSS existe
- Teste com caminho absoluto temporariamente

### Links quebrados

- Use caminhos relativos corretos
- Teste links no navegador
- Verifique se arquivo de destino existe

### Visualizações não funcionam

- Verifique IDs únicos no HTML
- Confirme se código JavaScript está após o HTML
- Teste console para erros
- Verifique cleanup de recursos

---

**Última atualização:** Março 2026
