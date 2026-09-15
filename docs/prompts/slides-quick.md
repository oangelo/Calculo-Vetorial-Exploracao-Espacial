# Prompt Rápido: Criar Slides

Criar slides interativos de Cálculo Vetorial usando Reveal.js com tema espacial.

## Estrutura de Navegação

- **Horizontal**: Entre tópicos principais
- **Vertical**: Aprofundamento dentro de cada tópico

```
Título do Capítulo
    ↓
Contexto Histórico Geral
    ↓
Tópico 1 (→)
    ↓ (↓)
    - Conceito
    - Visualização
    - Problema
    - Solução
    - Conclusão
Tópico 2 (→)
    ...
Aplicações (→)
```

## Classes CSS Obrigatórias

**Matemática:**

```html
<div class="math-section">
  <p>Conteúdo matemático...</p>
</div>
```

**História:**

```html
<div class="history-section">
  <div class="history-label">CONTEXTO</div>
  <p><strong>Evento (Ano)</strong></p>
  <p>Descrição...</p>
</div>
```

**Canvas:**

```html
<canvas
  id="idUnico"
  class="visualization-canvas"
  width="700"
  height="400"
></canvas>
```

**Problema:**

```html
<div class="problem-section">
  <p><strong>Problema:</strong> Descrição...</p>
</div>
```

**Controles:**

```html
<div class="controls-container">
  <!-- Controles aqui -->
</div>
```

## Limites de Conteúdo

- **Títulos**: Máximo 60 caracteres
- **Por slide**: 250 palavras, 2-3 fórmulas complexas
- **História**: 150 palavras

## Notação Matemática

- **Inline**: `\( ... \)`
- **Bloco**: `\[ ... \]` (linha separada)
- **Vetores**: `\vec{v}`
- **Unidades**: `\text{ m/s}`

## Cronologia Histórica

- 1945-1956: Mísseis (Cap 1)
- 1957-1961: Sputnik (Cap 2)
- 1961-1964: Astronautas (Cap 3)
- 1965-1966: Gemini (Cap 4)
- 1967-1969: Apollo (Cap 5-6)
- 1969-1970: Lua (Cap 7)
- 1971-1972: Apollo avançado (Cap 8)
- 1973-1985: Estações (Cap 9)

## Padrões de Código JavaScript

**Estrutura IIFE:**

```javascript
(function () {
  let canvas, ctx;

  function init() {
    /* ... */
  }
  function cleanup() {
    /* ... */
  }

  window.vizNome = { init, cleanup };
})();
```

**Preferências:**

- Canvas 2D sobre Three.js
- DOM nativo (não jQuery)
- IDs únicos
- Cleanup de recursos

## Próximo Passo

Para instruções detalhadas, consulte `/docs/prompts/slides-full.md`.
