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

### Estrutura básica das visualizações

Cada visualização deve ser encapsulada em um IIFE (Immediately Invoked Function Expression) para evitar poluição do escopo global e conflitos entre visualizações:

```javascript
(function() {
  // Variáveis privadas para esta visualização específica
  let canvas, ctx;
  let animationId = null;
  let isRunning = false;
  
  // Funções principais obrigatórias
  function initVisualization() {
    // Inicialização: obter canvas, configurar contexto, criar objetos iniciais
    canvas = document.getElementById('idUnicoDoCanvas');
    if (!canvas) return; // Verificação de segurança
    
    ctx = canvas.getContext('2d');
    
    // Inicialização adicional
    setupEventListeners();
    drawVisualization();
  }
  
  function drawVisualization() {
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Código de renderização aqui
  }
  
  function updateVisualization() {
    // Atualizar estado com base nos controles
    // Redesenhar
    drawVisualization();
  }
  
  function cleanupVisualization() {
    // Limpeza de recursos: cancelar animações, remover event listeners
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    // Remover event listeners se necessário
  }
  
  function setupEventListeners() {
    // Adicionar event listeners para controles
  }
  
  // Expor apenas as funções necessárias no escopo global com nomes específicos
  window.vizNomeUnico = {
    init: initVisualization,
    update: updateVisualization,
    cleanup: cleanupVisualization
  };
})();
```

### Regras para código de visualização

1. **Encapsulamento rigoroso**:
   - Use IIFE para isolar cada visualização
   - Prefixe todas as funções e variáveis globais com nomes específicos para evitar colisões
   - Exponha apenas o mínimo necessário via objeto global nomeado

2. **Gerenciamento cuidadoso do ciclo de vida**:
   - Inicialize visualizações apenas quando o slide correspondente estiver ativo
   - Implemente função de limpeza que cancela animações e libera recursos
   - Use event listeners adequados com o Reveal.js:

```javascript
// No script principal
Reveal.on('slidechanged', function(event) {
  // Limpar TODAS as visualizações primeiro
  if (window.vizExemplo1 && window.vizExemplo1.cleanup) window.vizExemplo1.cleanup();
  if (window.vizExemplo2 && window.vizExemplo2.cleanup) window.vizExemplo2.cleanup();
  
  // Inicializar apenas a visualização atual
  if (event.currentSlide.querySelector('#canvasExemplo1')) {
    window.vizExemplo1.init();
  } else if (event.currentSlide.querySelector('#canvasExemplo2')) {
    window.vizExemplo2.init();
  }
});
```

3. **Uso correto do DOM**:
   - **SEMPRE use seletores DOM nativos** (evite seletores estilo jQuery)
   - Use IDs para identificação inequívoca de elementos
   - Prefira `document.getElementById()` em vez de querySelectorAll quando possível
   - Verifique se elementos existem antes de tentar manipulá-los

4. **Preferência por Canvas 2D sobre WebGL/Three.js**:
   - Use Canvas 2D para visualizações simples
   - Se Three.js for necessário, limite a UMA visualização 3D por vez
   - Não misture Canvas 2D e WebGL em uma mesma visualização

5. **Controle de recursos**:
   - Cancele animações quando não visíveis: `cancelAnimationFrame(id)`
   - Pare intervalos quando não necessários: `clearInterval(id)`
   - Evite memory leaks removendo event listeners quando apropriado

### Exemplo específico para Canvas 2D

```javascript
(function() {
  // Variáveis privadas para esta visualização
  let canvas, ctx;
  let particulas = [];
  let animationId = null;
  
  function initCampoVetorial() {
    canvas = document.getElementById('campoVetorialCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    // Criar partículas iniciais
    criarParticulas();
    
    // Adicionar event listeners
    const slider = document.getElementById('velocidadeSlider');
    if (slider) {
      slider.addEventListener('input', updateVelocidade);
    }
    
    // Iniciar animação
    animarCampo();
  }
  
  function criarParticulas() {
    // Inicialização de objetos
  }
  
  function animarCampo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar e atualizar partículas
    
    // Agendar próximo frame
    animationId = requestAnimationFrame(animarCampo);
  }
  
  function cleanupCampoVetorial() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }
  
  // Exportar funções públicas
  window.campoVetorial = {
    init: initCampoVetorial,
    cleanup: cleanupCampoVetorial
  };
})();
```

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

## Considerações Técnicas Adicionais

### Quando usar Three.js vs Canvas 2D

- **PREFIRA Canvas 2D** para:
  - Visualizações 2D simples (campos vetoriais planos, gráficos de funções, etc.)
  - Quando performance é crítica em dispositivos de menor capacidade
  - Quando não há necessidade de interatividade 3D

- **USE Three.js APENAS quando**:
  - Visualização 3D genuína é necessária pedagogicamente
  - Interação 3D é crucial para o entendimento do conceito
  - Não há mais de uma visualização Three.js na mesma apresentação

### Otimização de performance

1. **Renderização eficiente**:
   - Renderize apenas quando necessário, não a cada frame
   - Use `requestAnimationFrame` em vez de `setInterval` para animações
   - Implemente throttling em eventos de mouse (especialmente mousemove)

2. **Gestão de memória**:
   - Reutilize objetos em vez de criar novos a cada frame
   - Limite o número de objetos em cena
   - Implemente pooling de objetos para partículas e elementos repetitivos

3. **Responsividade**:
   - Adapte resolução do canvas ao tamanho da tela
   - Escale visualizações proporcionalmente
   - Considere simplificar visualizações em dispositivos móveis

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
