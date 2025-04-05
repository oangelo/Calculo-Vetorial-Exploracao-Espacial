# Diretrizes para Criação de Slides de Cálculo Vetorial

## Resumo do Projeto
Criar slides interativos para um curso de Cálculo Vetorial usando o tema espacial, com **navegação horizontal entre tópicos principais** e **navegação vertical para aprofundamento de cada tópico**. O conteúdo deve apresentar **separação clara entre conteúdo matemático e contextualização histórica**. As visualizações interativas devem ser mantidas em slides separados para maximizar clareza e visibilidade.

## Estrutura de Navegação
O template implementa uma organização hierárquica em dois níveis:

1. **Navegação Horizontal**: Entre diferentes tópicos principais do capítulo e slides finais
2. **Navegação Vertical**: Para aprofundamento dentro de cada tópico

Cada capítulo deve seguir esta estrutura:
```
Slide de Título do Capítulo
    ↓
Slide de Contexto Histórico Geral
    ↓
Tópico 1 (Horizontal →)
    ↓ (Vertical ↓)
    - Slide 1.1: Conceito Principal
    - Slide 1.2: Visualizações
    - Slide 1.3: Teorema Relacionado
    - Slide 1.4: Problema
    - Slide 1.5: Solução: Sub-problema 1
    - Slide 1.6: Solução: Sub-problema 2
    - Slide 1.7: Conclusão
        
Tópico 2 (→)
    ↓ (↓)
    - Slides 2.x: ...

...
    
Slides Finais de Aplicação (→)
    ↓ (↓)
    - Slide A.1: Aplicação Histórica
    - Slide A.2: Aplicação Prática Moderna
```

## Estrutura Sugerida dos Slides

A seguinte estrutura serve como sugestão, priorizando sempre a didática e a clareza. Nem todos os tópicos precisarão de todos os itens listados:

1. **Slide de título do capítulo**:
   - Título principal centralizado
   - Subtítulo relacionado à explorando o espaço através da matemática

2. **Slide de contexto histórico geral**:
   - Contexto histórico relacionado ao período adequado
   - Necessidades e desafios tecnológicos da época

Para cada tópico principal (adaptar conforme necessário):

3. **Slide de conceito principal**:
   - Título centralizado
   - Definição formal em uma `math-section`
   - Interpretação física sem foco histórico

4. **Slide de visualização** (quando necessário):
   - Apenas o canvas e controles, sem texto competindo por espaço
   - Interface minimalista para foco na visualização

5. **Slide de teorema relacionado** (quando aplicável):
   - Desenvolvimento detalhado da teoria
   - Propriedades e demonstrações relevantes

6. **Slide de problema** (quando didaticamente útil):
   - Enunciado claro com contexto espacial, mas sem foco histórico
   - Não incluir a solução no mesmo slide

7. **Slides de solução** (adaptável):
   - Dividir em subproblemas conforme a complexidade
   - Cada solução com passos detalhados

8. **Slide de conclusão**:
   - Interpretação dos resultados
   - Significado prático no contexto espacial

Após todos os tópicos (no final da apresentação):

9. **Slide de aplicação histórica**:
   - Conexões entre os conceitos apresentados
   - Aplicações em missões espaciais históricas

10. **Slide de aplicação prática moderna**:
    - Aplicações contemporâneas
    - Visualização relacionada

## Classes CSS Obrigatórias

Você DEVE usar estas classes CSS específicas:

1. `math-section`: Para todo conteúdo matemático formal
   ```html
   <div class="math-section">
     <p>Conteúdo matemático aqui...</p>
   </div>
   ```

2. `history-section`: Para contextualização histórica (Guerra Fria/Exploração Espacial)
   ```html
   <div class="history-section">
     <div class="history-label">CONTEXTO</div>
     <p><strong>Evento Histórico (Ano)</strong></p>
     <p>Descrição contextual aqui...</p>
   </div>
   ```

3. `visualization-canvas`: Para todos os elementos canvas
   ```html
   <canvas id="idUnico" class="visualization-canvas" width="700" height="400"></canvas>
   ```

4. `problem-section`: Para enunciados de problemas
   ```html
   <div class="problem-section">
     <p><strong>Problema:</strong> Descrição...</p>
   </div>
   ```

5. `controls-container`: Para agrupar controles de interação
   ```html
   <div class="controls-container">
     <!-- Controles aqui -->
   </div>
   ```

6. `compact-solution`: Para soluções de problemas
   ```html
   <div class="compact-solution">
     <p><strong>Solução:</strong> Detalhamento passo a passo...</p>
   </div>
   ```

7. `dual-panel`: Para layouts com dois painéis lado a lado
   ```html
   <div class="dual-panel">
     <div>Conteúdo painel esquerdo</div>
     <div>Conteúdo painel direito</div>
   </div>
   ```

## Notação Matemática

A notação matemática deve seguir estritamente estas convenções:

- **Equações inline**: Sempre usar `\( ... \)` 
  ```
  A fórmula \( \vec{v} = \frac{d\vec{r}}{dt} \) representa...
  ```

- **Equações em destaque**: Sempre usar `\[ ... \]` em uma linha separada
  ```
  \[
    \vec{F} = m\vec{a}
  \]
  ```

- **Vetores**: Sempre usar `\vec{v}` em LaTeX
- **Escalares**: Usar notação padrão `a, b, c`
- **Unidades**: Incluir unidades onde apropriado `\text{ m/s}`

## Limites de Conteúdo

Para garantir que os slides se ajustem adequadamente:

- **Títulos**: Máximo de 60 caracteres
- **Conteúdo matemático**: Máximo de 250 palavras por slide
- **Contexto histórico**: Máximo de 150 palavras por slide
- **Fórmulas**: No máximo 2-3 fórmulas complexas por slide

## Padrões de Código JavaScript

1. Cada visualização deve ter estas três funções:
   - `initVisualization()`: Configuração inicial
   - `drawVisualization()`: Renderização principal
   - `updateVisualization()`: Atualização baseada em controles

2. Cada componente interativo deve incluir:
   - Comentários explicativos para cada seção do código
   - Feedback visual imediato para interações
   - Função de reset para valores iniciais

## Paleta de Cores para Visualizações

Usar consistentemente:
- Vetores de posição: `#1E88E5` (azul)
- Vetores de velocidade: `#43A047` (verde)
- Vetores de aceleração: `#E53935` (vermelho)
- Vetores de força: `#FFB300` (amarelo)
- Vetores unitários: `#FFFFFF` (branco)

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

Para facilitar a manutenção, use funções JavaScript independentes para cada visualização:

1. **Funções de inicialização** com nome único:
   ```javascript
   function initVisualization() { ... }
   function initApplicationVisual() { ... }
   ```

2. **Funções de atualização** específicas:
   ```javascript
   window.updateVisualization = function() { ... }
   ```

3. **IDs de elementos** únicos para cada canvas e controle:
   ```html
   <canvas id="conceptVisualization" ...></canvas>
   <input id="parameter1" ...>
   ```

## Exemplo de Entrega

Para um módulo sobre Campos Vetoriais, você deve entregar HTML que siga a estrutura sugerida, adaptando conforme necessário:

1. Slide de título para o capítulo
2. Slide de contexto histórico geral
3. Por tópico (adaptar conforme necessidade didática):
   - Slide conceitual sobre campos vetoriais (definição + interpretação física)
   - Slide de visualização interativa (quando necessário)
   - Slide de teorema relacionado (quando aplicável)
   - Slide com problema prático (quando útil para o aprendizado)
   - Slides com solução (adaptar conforme complexidade)
   - Slide de conclusão 
4. No final (após todos os tópicos):
   - Slide com aplicação histórica
   - Slide com aplicação prática moderna

Priorize a didática e clareza acima da adesão rígida à estrutura. Alguns tópicos podem precisar de mais ou menos slides dependendo da complexidade e natureza do conteúdo.

Adira às classes CSS e padrões de notação para garantir consistência visual, independentemente da estrutura escolhida.
