# Diretrizes para Criação de Slides de Cálculo Vetorial

## Resumo do Projeto
Criar slides interativos para um curso de Cálculo Vetorial usando o tema espacial, com **separação clara entre conteúdo matemático e contextualização histórica**. As visualizações interativas devem ser mantidas em slides separados para maximizar clareza e visibilidade.

## Template Obrigatório
Você DEVE seguir o template HTML e a estrutura de slide exatamente conforme especificado abaixo. O template usa o arquivo space-theme.css atualizado que já inclui todas as classes necessárias.

## Estrutura Padronizada dos Slides

Cada conceito matemático deve ser apresentado seguindo esta sequência exata:

1. **Slide de conceito principal**:
   - Título centralizado
   - Definição formal em uma `math-section`
   - Contextualização histórica em uma `history-section` separada

2. **Slide de visualização** (separado):
   - Apenas o canvas e controles, sem texto competindo por espaço
   - Interface minimalista para foco na visualização

3. **Slide de formalismo matemático**:
   - Desenvolvimento detalhado da teoria
   - Explicações adicionais e derivações

4. **Slide de problema**:
   - Enunciado claro com contexto espacial
   - Não incluir a solução no mesmo slide

5. **Slide de solução**:
   - Solução passo a passo do problema apresentado
   - Conclusão e interpretação dos resultados

6. **Slide de conexões**:
   - Relações com outros conceitos
   - Próximos passos e aplicações

## Classes CSS Obrigatórias

Você DEVE usar estas classes CSS específicas do space-theme.css:

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

## Notação Matemática

- Vetores: Sempre usar `\vec{v}` em LaTeX
- Escalares: Usar notação padrão `a, b, c`
- Unidades: Incluir unidades onde apropriado `\text{ m/s}`
- Equações importantes: Usar display math `\[...\]`
- Equações inline: Usar `\(...\)`

## Paleta de Cores para Visualizações

Usar consistentemente:
- Vetores de posição: `#1E88E5` (azul)
- Vetores de velocidade: `#43A047` (verde)
- Vetores de aceleração: `#E53935` (vermelho)
- Vetores de força: `#FFB300` (amarelo)
- Vetores unitários: `#FFFFFF` (branco)

## Exemplo de Entrega

Para um módulo sobre Campos Vetoriais, você deve entregar HTML que siga exatamente o template, incluindo:

1. Slide conceitual sobre campos vetoriais (definição + contexto histórico)
2. Slide de visualização interativa de um campo vetorial
3. Slide de formalismo matemático aprofundado
4. Slide com problema prático relacionado
5. Slide com solução detalhada
6. Slide de conexões e próximos passos

Adira estritamente à estrutura, classes CSS e organização especificadas.
