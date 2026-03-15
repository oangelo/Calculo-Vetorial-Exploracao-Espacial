# Plano: Slides de Revisão — Capítulo 0

## Problema Identificado

O capítulo 0 tem exercícios de **Geometria Analítica** e **Cônicas** mas não tem slides correspondentes. O README lista esses tópicos, criando um gap entre o material de apresentação e os exercícios.

## Pesquisa Pedagógica

### Abordagem padrão (Calculus III / Vector Calculus)

Referências: APEX Calculus (UND), MIT 18.02SC, Stewart Calculus, Khan Academy, 3Blue1Brown

**Sequência típica para revisão de vetores:**

1. **Coordenadas Cartesianas no Espaço** — sistemas de coordenadas, distância entre pontos, esferas
2. **Vetores** — definição, notação, operações básicas (adição, escalar × vetor)
3. **Produto Escalar** — definição, ângulo entre vetores, projeções, ortogonalidade
4. **Produto Vetorial** — definição, regra da mão direita, área de paralelogramos, torque
5. **Retas** — forma paramétrica, forma vetorial, intersecções
6. **Planos** — vetor normal, equação geral, distância ponto-plano
7. **Cônicas** — círculo, elipse, parábola, hipérbole (fundamental para superfícies em cálculo vetorial)

### Insights pedagógicos

- **Visualização é crucial**: usar Canvas 2D para animações interativas (já existe `visualizacoes.js`)
- **Contexto histórico**: a corrida espacial dá motivação (trajetórias, acoplamento, órbitas)
- **Cônicas como ponte**: superfícies de segundo grau aparecem em integrais triplas e coordenadas esféricas
- **3Blue1Brown approach**: intuição geométrica antes da álgebra

## Plano de Novas Seções

### Seção: Geometria Analítica (`03-geometria-analitica.html`)

**Posição no fluxo:** Após introdução, antes de derivadas

**Sub-seções (vertical):**

1. **Coordenadas no Espaço 3D**
   - Sistema de coordenadas cartesianas
   - Distância: \(d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}\)
   - Esfera: \((x-a)^2 + (y-b)^2 + (z-c)^2 = r^2\)
   - Contexto: Posicionamento de satélites, GPS rudimentar

2. **Vetores: Fundamentos**
   - Definição: magnitude e direção
   - Notação: \(\vec{v} = \langle v_x, v_y, v_z \rangle\)
   - Vetor unitário: \(\hat{v} = \frac{\vec{v}}{|\vec{v}|}\)
   - Operações: \(\vec{u} + \vec{v}\), \(c\vec{v}\)
   - Contexto: Vetores deslocamento em missões espaciais

3. **Produto Escalar**
   - Definição: \(\vec{u} \cdot \vec{v} = u_x v_x + u_y v_y + u_z v_z\)
   - Interpretação geométrica: \(|\vec{u}||\vec{v}|\cos\theta\)
   - Projeção: \(\text{proj}_{\vec{v}}\vec{u} = \frac{\vec{u}\cdot\vec{v}}{|\vec{v}|^2}\vec{v}\)
   - Ortogonalidade: \(\vec{u} \cdot \vec{v} = 0 \iff \vec{u} \perp \vec{v}\)
   - Contexto: Cálculo de trabalho (força × deslocamento), ângulo de reentrada

4. **Produto Vetorial**
   - Definição via determinante
   - Regra da mão direita
   - Propriedades: anticomutatividade, \(|\vec{u} \times \vec{v}| = |\vec{u}||\vec{v}|\sin\theta\)
   - Área de paralelogramo: \(A = |\vec{u} \times \vec{v}|\)
   - Produto misto (volume): \(V = |\vec{a} \cdot (\vec{b} \times \vec{c})|\)
   - Contexto: Torque, momento angular, rotação de módulos espaciais

5. **Retas no Espaço**
   - Forma vetorial: \(\vec{r}(t) = \vec{r_0} + t\vec{d}\)
   - Forma paramétrica: \(x = x_0 + at, \quad y = y_0 + bt, \quad z = z_0 + ct\)
   - Intersecção de retas (ou verificar se são paralelas/esquew)
   - Contexto: Trajetórias de lançamento

6. **Planos no Espaço**
   - Vetor normal: \(\vec{n} = \langle a, b, c \rangle\)
   - Equação: \(a(x-x_0) + b(y-y_0) + c(z-z_0) = 0\)
   - Distância ponto-plano: \(d = \frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2+b^2+c^2}}\)
   - Contexto: Planos de acoplamento, janelas de lançamento

**Visualizações propostas (Canvas 2D):**
- Vetores no plano (arrastáveis)
- Demonstração do produto escalar (ângulo mudando)
- Produto vetorial e regra da mão direita
- Reta paramétrica animada
- Plano com vetor normal

### Seção: Cônicas (`04-conicas.html`)

**Posição no fluxo:** Após geometria analítica, antes de derivadas

**Sub-seções (vertical):**

1. **Seções Cônicas: Motivação**
   - Intersecção cone-plano
   - Curvas de nível de funções quadráticas
   - Contexto: Órbitas planetárias (Kepler)

2. **Elipse**
   - Equação padrão: \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\)
   - Focos, excentricidade
   - Contexto: Órbitas de planetas e satélites

3. **Parábola**
   - Equação padrão: \(y^2 = 4px\) ou \(x^2 = 4py\)
   - Foco e diretriz
   - Contexto: Trajetórias balísticas, antenas parabólicas

4. **Hipérbole**
   - Equação padrão: \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\)
   - Assíntotas, ramos
   - Contexto: Trajetórias hiperbólicas (sondas interplanetárias)

**Visualizações propostas (Canvas 2D):**
- Elipse com focos animados
- Parábola com foco e diretriz
- Hipérbole com assíntotas

### Reestruturação do index.html

**Nova ordem de seções:**

```
01-titulo.html
02-introducao.html
03-geometria-analitica.html   ← NOVA
04-conicas.html               ← NOVA
05-derivadas.html             (era 03)
06-integrais.html             (era 04)
07-curvas-de-nivel.html       (era 05)
08-historia.html              (era 06)
09-conclusao.html             (era 07)
```

## Arquivos a Criar/Modificar

| Arquivo | Ação |
|---------|------|
| `03-geometria-analitica.html` | CRIAR |
| `04-conicas.html` | CRIAR |
| `index.html` | MODIFICAR (nova ordem) |
| `visualizacoes.js` | ADICIONAR novas visualizações |

## Requisitos Técnicos

- CSS: `../space-theme.css` (relativo à pasta do capítulo)
- MathJax: `\(inline\)` e `\[bloco\]` (uma barra só)
- Canvas 2D para visualizações (não Three.js)
- Limite: 250 palavras/slide
- Separar: `math-section` de `history-section`
- Paleta de cores do AGENTS.md (azul=posição, verde=velocidade, etc.)

## Referências

- APEX Calculus Ch.11 (UND): estrutura completa de revisão vetorial
- MIT 18.02SC: abordagem de curvas de nível e visualização
- 3Blue1Brown: intuição geométrica do produto vetorial
- Stewart Calculus: revisão de seções cônicas
- Khan Academy Conics: definições e propriedades
