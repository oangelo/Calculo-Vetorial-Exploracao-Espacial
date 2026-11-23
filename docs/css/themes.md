# Temas CSS do Projeto

Documentação dos 3 temas CSS utilizados no projeto.

---

## 1. Tema Industrial/Cobre (`exercicios/styles.css`)

### Uso

- **Exercícios** no formato "documento sigiloso da Guerra Fria"
- Arquivos: `/exercicios/capitulo-N/*.html`

### Características Visuais

- **Estética:** Documento classificado, envelhecido, industrial
- **Sensação:** Papel velho, carimbos, censura, metal oxidado

### Paleta de Cores

```css
--primary: #b87333; /* Cobre base */
--primary-light: #cd7f32; /* Cobre claro */
--primary-dark: #8b4513; /* Cobre escuro/oxidado */
--accent: #ffd700; /* Dourado envelhecido */
--warning: #a52a2a; /* Vermelho oxidado */
--bg-dark: #2a1810; /* Marrom muito escuro */
--bg-darker: #1a0f0a; /* Quase preto com tom marrom */
--text: #d4af37; /* Dourado suave para texto */
--text-faded: #98816b; /* Texto secundário */
--rust: #8b4513; /* Ferrugem */
--metal: #707070; /* Metal envelhecido */
```

### Classes Principais

```css
.container          /* Container principal do documento */
.document-header    /* Cabeçalho com carimbos */
.document-stamp     /* Carimbo "SIGILOSO" */
.document-date      /* Data com partes censuradas */
.censored           /* Texto censurado (█████) */
.warning-box        /* Caixa de aviso de segurança */
.metadata           /* Metadados do documento */
.exercise-list      /* Lista de exercícios */
.exercise-item      /* Item individual de exercício */
.exercise-number    /* Numeração do exercício */
.context            /* Contexto histórico do exercício */
.hint               /* Dica do exercício */
.solution           /* Solução detalhada */
.footer-stamp       /* Carimbo "ULTRASSECRETO" no rodapé */
```

### Efeitos Especiais

- **Flicker animation:** Cabeçalho piscando sutilmente (efeito de lâmpada antiga)
- **Metallic shine:** Brilho metálico ao passar mouse nos exercícios
- **Texture:** Background com textura de papel velho

### Exemplo de Uso

```html
<link rel="stylesheet" href="../styles.css" />

<div class="document-header">
  <div class="document-stamp">SIGILOSO</div>
  <div class="document-date">
    DATA: <span class="censored">12</span> DE OUTUBRO
  </div>
</div>
```

---

## 2. Tema Arcade 8-bit (`exercicios/game-theme-exercises.css`)

### Status

⚠️ **NÃO UTILIZADO** no momento

### Uso Pretendido

- Exercícios com tema de videogame retrô
- Estilo arcade 8-bit

### Características Visuais

- **Estética:** Videogame retrô, pixel art, console antigo
- **Sensação:** Nostalgia, diversão, gameificação

### Paleta de Cores

```css
--background-color: #1a1a2d; /* Azul muito escuro */
--main-font: 'VT323'; /* Fonte monospace retrô */
--heading-font: 'Press Start 2P'; /* Fonte pixel */
--text-color: #e0e0e0; /* Cinza claro */
--cyan: #00ffff; /* Ciano brilhante */
--magenta: #ff00ff; /* Magenta brilhante */
--yellow: #ffff00; /* Amarelo brilhante */
--green: #00ff00; /* Verde brilhante */
```

### Classes Principais

```css
.console-header      /* Cabeçalho estilo console */
.mission             /* Missão (exercício) */
.mission-objective   /* Objetivo da missão */
.hint-container      /* Container de dicas */
```

### Recomendação

- **Remover** se não houver plano de uso
- **OU** criar exemplos de exercícios usando este tema
- **OU** manter como referência para futuras expansões

---

## 3. Tema Espacial (`slide-decks/space-theme.css`)

### Uso

- **Slides Reveal.js** com visualizações interativas
- Arquivos: `/slide-decks/*.html`

### Características Visuais

- **Estética:** Exploração espacial, cosmos, alta tecnologia
- **Sensação:** Futurista, científico, inspirador

### Paleta de Cores

```css
/* Baseado em tons de azul escuro (cosmos) e dourado (estrelas) */
--cosmos-dark: #0a0e27; /* Azul muito escuro (espaço) */
--cosmos-light: #1a1f3a; /* Azul escuro claro */
--star-gold: #ffd700; /* Dourado (estrelas) */
--nebula-blue: #4a90e2; /* Azul nebulosa */
--text-light: #e8e8e8; /* Texto claro */
```

### Classes Principais

```css
.math-section        /* Seção com conteúdo matemático */
.history-section     /* Seção com contexto histórico */
.visualization-canvas /* Canvas para visualizações */
.problem-section     /* Seção de problemas */
.controls-container  /* Container de controles interativos */
.compact-solution    /* Solução compacta */
.dual-panel          /* Layout com dois painéis */
```

### Estrutura de Slides

```
Navegação Horizontal (→):
  - Tópicos principais
  - Slides finais

Navegação Vertical (↓):
  - Aprofundamento dentro de cada tópico
  - Detalhes, exemplos, visualizações
```

### Integração com Reveal.js

```html
<link rel="stylesheet" href="reveal.js/dist/reveal.css" />
<link rel="stylesheet" href="space-theme.css" />
<script src="reveal.js/dist/reveal.js"></script>
```

---

## Comparação de Temas

| Aspecto      | Industrial/Cobre        | Arcade 8-bit            | Espacial             |
| ------------ | ----------------------- | ----------------------- | -------------------- |
| **Uso**      | Exercícios              | (Não usado)             | Slides               |
| **Status**   | ✅ Ativo                | ⚠️ Inativo              | ✅ Ativo             |
| **Estilo**   | Documento classificado  | Videogame retrô         | Cosmos/futurista     |
| **Cores**    | Cobre, marrom, dourado  | Ciano, magenta, amarelo | Azul escuro, dourado |
| **Fonte**    | Share Tech Mono         | VT323, Press Start 2P   | (definir)            |
| **Contexto** | Guerra Fria (1945-1991) | Gameificação            | Exploração espacial  |

---

## Boas Práticas

### Ao Criar Novo Conteúdo

1. **Exercícios:** Use sempre `styles.css` (Industrial/Cobre)

   ```html
   <link rel="stylesheet" href="../styles.css" />
   ```

2. **Slides:** Use sempre `space-theme.css`

   ```html
   <link rel="stylesheet" href="space-theme.css" />
   ```

3. **NÃO misture temas** em um mesmo arquivo

### Ao Editar CSS

1. **Mantenha consistência:**

   - Não crie novas classes se as existentes funcionam
   - Preserve IDs e classes (quebra links se mudar)

2. **Teste visualmente:**

   - Abra no navegador após mudanças
   - Verifique MathJax renderiza corretamente
   - Teste responsividade

3. **Documente mudanças:**
   - Atualize este arquivo se adicionar novas classes
   - Comite junto com exemplos de uso

---

## Manutenção

### Quando Atualizar Este Documento

- Adicionar novas classes CSS
- Modificar paleta de cores
- Criar novo tema
- Decidir sobre o tema Arcade 8-bit

### Checklist de Revisão

- [ ] Todas as classes documentadas
- [ ] Paleta de cores atualizada
- [ ] Exemplos de uso funcionando
- [ ] Status de uso correto

**Última atualização:** Março 2026
