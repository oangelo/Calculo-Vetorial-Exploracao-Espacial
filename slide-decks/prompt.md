# Diretrizes para Criação de Slides de Cálculo Vetorial

## Resumo do Projeto
Criar slides interativos para um curso de Cálculo Vetorial usando um tema espacial, com **navegação horizontal entre tópicos principais** e **navegação vertical para aprofundamento de cada tópico**. O conteúdo deve ser otimizado para caber adequadamente na tela, com separação clara entre conceito matemático e contextualização histórica.

## Estrutura de Navegação Obrigatória
O template implementa uma organização hierárquica em dois níveis:

1. **Navegação Horizontal**: Entre diferentes tópicos principais do capítulo
2. **Navegação Vertical**: Para aprofundamento dentro de cada tópico

Cada capítulo deve seguir esta estrutura:
```
Slide de Título do Capítulo
    ↓
Tópico 1 (Horizontal →)
    ↓ (Vertical ↓)
    - Slide 1.1: Conceito Principal
    - Slide 1.2: Visualizações
    - Slide 1.3: Formalismo...
        
Tópico 2 (→)
    ↓ (↓)
    - Slide 2.1: Conceito Principal
    - Slide 2.2: Visualizações
    ...
        
Tópico 3 (→)
    ...
```

## Template HTML e CSS
Use o template fornecido que já inclui:
- CSS ultra-compacto otimizado para maximizar espaço
- Estrutura de navegação horizontal/vertical correta
- Controles de navegação inteligentes que desaparecem quando não há mais slides
- Classes CSS para diferentes tipos de conteúdo

## Diretrizes por Tipo de Slide

### 1. Slides de Tópico Principal (Primeiro Slide Vertical de Cada Tópico)
- **Conteúdo**: Introdução ao conceito, definição formal, propriedades essenciais
- **Layout**: Usar `math-section` para conteúdo matemático e `history-section` para contextualização
- **Indicador**: Incluir "▼ Clique para aprofundar ▼" no final para indicar conteúdo vertical

### 2. Slides de Visualização
- **Conteúdo**: Canvas único com controles interativos, sem texto competindo por espaço
- **Scripts**: Implementar funções específicas para cada tópico (`initTopic1Visualization`, `updateTopic1Visualization`, etc.)
- **Controles**: Usar `controls-container` e `control-slider` para parâmetros ajustáveis

### 3. Slides de Formalismo Matemático
- **Conteúdo**: Desenvolvimento detalhado, teoremas, provas
- **Layout**: Usar `multi-column` para organizar conteúdo relacionado em colunas
- **Elementos**: Incluir caixas de `example-box` ou `hint-box` para destacar pontos importantes

### 4. Slides de Problema
- **Conteúdo**: Enunciado claro e dados do problema
- **Layout**: Usar `problem-section` com layout em colunas para etapas e dados
- **Separação**: Não incluir a solução no mesmo slide

### 5. Slides de Solução
- **Estrutura**: Dividir soluções longas em múltiplos slides (Parte 1, Parte 2, etc.)
- **Classes**: Usar `math-section compact-solution` para maximizar densidade de conteúdo
- **Passos**: Organizar em `solution-part` e `math-steps` para clareza

## Classes CSS Específicas para Uso

### Contêineres Principais
- `math-section`: Para conteúdo matemático formal
- `history-section`: Para contextualização histórica (inclui `history-label`)
- `problem-section`: Para enunciados de problemas
- `visualization-canvas`: Para elementos canvas

### Layout e Organização
- `multi-column`: Container para layout em colunas
- `column`: Colunas individuais

### Elementos Auxiliares
- `hint-box`: Dicas importantes e insights
- `example-box`: Exemplos práticos
- `note-box`: Observações adicionais
- `solution-part`: Partes da solução de um problema
- `compact-solution`: Classe para maximizar densidade em soluções
- `math-steps`: Para equações sequenciais passo a passo

### Visualizações
- `controls-container`: Container para controles interativos
- `control-slider`: Sliders para parâmetros
- `control-button`: Botões de ação
- `visualization-legend`: Legendas para visualizações

## Contextualização Histórica Progressiva

Mantenha a cronologia progressiva ao longo dos capítulos:

1. **1945-1956 (Era dos Mísseis)**: Funções Vetoriais e Campos Vetoriais
2. **1957-1961 (Era Sputnik)**: Derivadas Parciais, Rotacional, Divergente
3. **1961-1964 (Primeiros Astronautas)**: Integrais Duplas
4. **1965-1966 (Programa Gemini)**: Mudança de Variáveis e Integrais Triplas
5. **1967-1969 (Primeiras Missões Apollo)**: Integrais de Linha e Campos Conservativos
6. **1969-1970 (Pouso Lunar)**: Teorema de Green
7. **1971-1972 (Missões Apollo Avançadas)**: Área e Integral de Superfície
8. **1973-1985 (Estações Espaciais)**: Fluxo e Teorema da Divergência
9. **1980-1991 (Exploração Planetária)**: Teorema de Stokes no Espaço

## Implementação de Visualizações

Cada tópico deve ter suas próprias funções de visualização independentes:

1. **Funções de inicialização** com nome único por tópico:
   ```javascript
   function initTopic1Visualization() { ... }
   function initTopic2Visualization() { ... }
   ```

2. **Funções de atualização** específicas para cada tópico:
   ```javascript
   window.updateTopic1Visualization = function() { ... }
   window.updateTopic2Visualization = function() { ... }
   ```

3. **IDs de elementos** únicos para cada tópico:
   ```html
   <canvas id="concept1Visualization" ...></canvas>
   <input id="param1Topic1" ...>
   ```

## Otimização de Espaço

Para garantir que o conteúdo caiba adequadamente:

1. **Usar layout em colunas** para conteúdo relacionado
2. **Dividir soluções longas** em múltiplos slides
3. **Usar classes compactas** para áreas com muito conteúdo
4. **Minimizar espaçamento** usando as classes otimizadas
5. **Limitar a quantidade de texto** por slide
6. **Favorecer listas concisas** sobre parágrafos longos

## Exemplo de Implementação

Para cada capítulo:

1. **Slide de título do capítulo**
2. **Para cada tópico principal**:
   - Slide de conceito principal (horizontal)
   - 2-5 slides de aprofundamento (vertical)
3. **Conexões no final** do capítulo

## Elementos Obrigatórios por Slide de Tópico

1. **Título claro e conciso** (máximo 60 caracteres)
2. **Definição matemática formal** usando LaTeX
3. **Contextualização histórica** correspondente ao período adequado
4. **Visualização interativa** relacionada ao conceito
5. **Problema contextualizado** na exploração espacial
6. **Solução passo a passo** dividida quando extensa

Adira estritamente à estrutura, classes CSS e organização hierárquica especificadas para garantir consistência visual e navegabilidade.
