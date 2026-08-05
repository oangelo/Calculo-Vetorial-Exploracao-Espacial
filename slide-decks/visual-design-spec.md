# Visual Design Spec — Princípios de Design Visual

> Referência para slides de conteúdo. A capa (00-capa) já aplica estes princínpios nativamente via `title-slide` + componentes classificados.

## Os 3 Princípios

### 1. Hierarquia Tipográfica

Variação de tamanho, peso e cor para guiar o olho. Sem hierarquia, tudo compete por atenção e o slide fica "plano".

**Níveis na capa (referência):**

| Nível | Elemento | Tamanho | Exemplo |
|---|---|---|---|
| Título principal | h1 dentro de `.title-slide` | 1.7em | "Funções Vetoriais" |
| Subtítulo | h3 | 0.95em | "Cálculo Vetorial" |
| Metadados | `.chapter-meta` | 0.6em | "Capítulo 1 · Era dos Mísseis" |
| Código | `.classification-code` | 0.55em | "DOC. REF: CV-CH1-1945" |

**Níveis em slides de conteúdo (alvo):**

| Nível | Elemento | Tamanho | Uso |
|---|---|---|---|
| Título da seção | h2 | 1.6em | Nome do tópico (1 por seção H) |
| Subtítulo do slide | h3 | 1.2em | Título de cada slide V |
| Fórmula destaque | `.formula-spotlight` | 1.4em | Fórmula principal do slide |
| Corpo | p | 22px (base) | Texto descritivo |
| Label/metadata | monospace pequeno | 0.5-0.6em | Headers, footers, códigos |

**Regra:** Nunca ter mais de 2 elementos consecutivos no mesmo nível sem um contraste (tamanho, cor, ou separador visual).

**Anti-pattern:** Sequências de `<p>` sem variação. Alternar com h3, `.formula-spotlight`, `.h-bar`, ou mudanças de layout (dual-panel, triple-panel).

---

### 2. Enquadramento (Framing)

Barras horizontais no topo e base do slide que delimitam o espaço visual, criando a sensação de "documento" ou "janela" — profundidade por contorno.

**Na capa (referência):**

- `.classified-banner` — faixa superior com texto + fundo gradiente + borda inferior
- `.classified-footer` — faixa inferior com borda superior
- `.doc-border` — moldura retangular interna, opacidade 0.08
- `.watermark` — texto grande diagonal no fundo, opacidade 0.025

**Em slides de conteúdo:**

Usar `.slide-header` e `.slide-footer` (já definidos no CSS, linhas 754-793):

```html
<div class="slide-header">SEÇÃO 02 · FUNÇÃO VETORIAL</div>
<!-- conteúdo do slide -->
<div class="slide-footer">CV-CH1-1945 · CAPÍTULO 1</div>
```

**Regras:**

- Todo slide de conteúdo (02–NN) usa header + footer
- Capa (00-capa) usa classified-banner + classified-footer + doc-border
- História (01-historia) pode usar classified-banner/footer quando apropriado
- Resumo (N+1-resumo) e reflexão (N+2-reflexao) usam header/footer

**Efeito visual:** As barras "puxam" o olho para as bordas, criando sensação de volume e profundidade — como molduras em design de interiores.

---

### 3. Profundidade por Opacidade

Camadas de informação com opacidades diferentes simulam profundidade física — como se elementos estivessem em diferentes distâncias do observador.

**Camadas de opacidade:**

| Camada | Opacidade | Elementos | Analogia |
|---|---|---|---|
| Fundo profundo | 0.02-0.04 | Watermark, texturas | Parede distante |
| Moldura | 0.08-0.15 | doc-border, bordas | Sancas, rodapés |
| Informação secundária | 0.2-0.4 | Footer, labels, metadata | Mobília de fundo |
| Contexto | 0.5-0.7 | history-section em slide math | Objeto lateral |
| Conteúdo principal | 0.8-1.0 | Títulos, fórmulas, texto-chave | Ponto focal |

**Aplicação em slides de conteúdo:**

- `.slide-header`: opacidade 0.5 (já definida no CSS)
- `.slide-footer`: opacidade 0.2 (já definida)
- Labels dentro de componentes (history-label, etc.): opacidade 0.4
- Fórmulas principais: opacidade total + text-shadow (glow)
- Elementos com `.fragment`: podem usar opacidade progressiva

**Regra:** Nunca ter tudo em opacidade 1.0. Pelo menos 2 camadas de profundidade por slide.

---

## Aplicação Prática — Checklist por Slide

Antes de finalizar um slide de conteúdo, verificar:

- [ ] **Header/Footer:** slide tem `.slide-header` e `.slide-footer`?
- [ ] **Hierarquia:** há variação de tamanho entre elementos? (não é tudo `<p>`)
- [ ] **Profundidade:** há pelo menos 2 níveis de opacidade?
- [ ] **Contraste:** algum separador visual entre blocos? (`.h-bar`, `.v-bar`, componente com background)
- [ ] **Ponto focal:** é claro qual é o elemento mais importante do slide?

## Relação com outros Specs

- **template-spec.md** — estrutura e classes CSS disponíveis
- **narrative-spec.md** — conteúdo narrativo (história)
- **pedagogical-spec.md** — abordagem pedagógica (dissonância)
- **visual-design-spec.md** (este) — como os elementos VISUAIS se organizam no slide

Este spec não define *o que* dizer, mas *como apresentar visualmente* o que os outros specs definem.
