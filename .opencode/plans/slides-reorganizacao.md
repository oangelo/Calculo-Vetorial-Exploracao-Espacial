# PLANO: Reorganização dos Slide Decks

**Data:** 04/03/2026  
**Status:** Planejamento  
**Objetivo:** Reorganizar slides em estrutura modular por capítulo

---

## Estrutura Atual

### Problemas Identificados

1. **Arquivos muito grandes** (até 2525 linhas)
   - revisao.html: 2461 linhas
   - teorema-de-green.html: 2525 linhas
   - integrais-duplas.html: 2087 linhas
2. **Nomenclatura inconsistente**
   - capitulo-1.html
   - integrais-duplas.html
   - teorema-de-green_1.html, teorema-de-green_2.html, teorema-de-green.html
3. **Dificuldade de manutenção**
   - Editar seção específica requer abrir arquivo gigante
   - Risco de quebrar outras seções ao editar
   - Controle de versão difícil (diffs enormes)

### Arquivos Atuais

```
slide-decks/
├── area-e-integral-de-superficie.html        (1878 linhas)
├── calculo-de-integral-dupla-teorema-de-fubini.html (32 linhas)
├── campos-conservativos.html                  (1071 linhas)
├── capitulo-1.html                            (1461 linhas)
├── fluxo-de-um-campo-vetorial-teorema-da-divergencia.html (863 linhas)
├── integrais-de-linha.html                    (1829 linhas)
├── integrais-duplas.html                      (2087 linhas)
├── integrais-triplas-aplicacoes-fisicas.html  (2099 linhas)
├── integrais-triplas-coordenadas.html         (1027 linhas)
├── integrais-triplas-introducao.html          (1559 linhas)
├── mudanca-de-variaveis-na-integral-dupla.html (1981 linhas)
├── revisao.html                               (2461 linhas)
├── teorema-de-green.html                      (2525 linhas)
├── teorema-de-green_1.html                    (1825 linhas)
├── teorema-de-green_2.html                    (1526 linhas)
└── teorema-de-stokes-no-espaco.html           (762 linhas)
```

---

## Estrutura Proposta

### Nova Organização de Diretórios

```
slide-decks/
├── capitulo-0-revisao/
│   ├── index.html              (loader - faz fetch das seções)
│   ├── 01-titulo.html
│   ├── 02-geometria-analitica.html
│   ├── 03-derivadas.html
│   └── ...
│
├── capitulo-1-funcoes-vetoriais/
│   ├── index.html
│   ├── 01-titulo.html
│   ├── 02-funcoes-vetoriais.html
│   ├── 03-campo-vetorial.html
│   └── ...
│
├── capitulo-2-integrais-duplas/
├── capitulo-3-mudanca-de-variaveis/
├── capitulo-4-integrais-triplas/
├── capitulo-5-integrais-de-linha/
├── capitulo-6-campos-conservativos/
├── capitulo-7-teorema-de-green/
├── capitulo-8-integral-de-superficie/
├── capitulo-9-teorema-da-divergencia/
│
├── reveal.js/                  (manter)
├── space-theme.css             (manter)
└── template.html               (manter)
```

### Nomenclatura de Capítulos

| Capítulo | Nome da Pasta                     | Período    |
| -------- | --------------------------------- | ---------- |
| 0        | capitulo-0-revisao                | Pré-Guerra |
| 1        | capitulo-1-funcoes-vetoriais      | 1945-1956  |
| 2        | capitulo-2-integrais-duplas       | 1957-1961  |
| 3        | capitulo-3-mudanca-de-variaveis   | 1961-1964  |
| 4        | capitulo-4-integrais-triplas      | 1965-1966  |
| 5        | capitulo-5-integrais-de-linha     | 1967-1969  |
| 6        | capitulo-6-campos-conservativos   | 1967-1969  |
| 7        | capitulo-7-teorema-de-green       | 1969-1970  |
| 8        | capitulo-8-integral-de-superficie | 1971-1972  |
| 9        | capitulo-9-teorema-da-divergencia | 1973-1985  |

### Nomenclatura de Seções

- **Formato:** `NN-nome-da-secao.html`
- **Numeração:** 01, 02, 03...
- **Exemplos:** `01-titulo.html`, `02-funcoes-vetoriais.html`

---

## Implementação - Fase 1: Capítulo 1 (Piloto)

**Arquivo fonte:** `capitulo-1.html` (1461 linhas)

**Passos:**

1. **Criar estrutura de pastas**
2. **Dividir capitulo-1.html em seções**
3. **Criar index.html (loader)**
4. **Testar**
5. **Manter backup temporário**

### Estrutura do Loader (index.html)

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Include Reveal.js, MathJax, CSS -->
    <script>
      async function loadSlides() {
        const sections = [
          '01-titulo.html',
          '02-funcoes-vetoriais.html',
          '03-campo-vetorial.html',
          // ...
        ];

        const slidesContainer = document.querySelector('.slides');

        for (const sectionFile of sections) {
          const response = await fetch(sectionFile);
          const html = await response.text();
          // Parse e inserir
        }

        Reveal.initialize();
      }

      loadSlides();
    </script>
  </head>
  <body>
    <div class="reveal">
      <div class="slides"></div>
    </div>
  </body>
</html>
```

---

## Plano de Execução

### Commit 1: Plano

- Criar este arquivo de plano
- Commit e push

### Commit 2: Capítulo 1 (Piloto)

- Criar pasta `capitulo-1-funcoes-vetoriais/`
- Dividir `capitulo-1.html` em seções
- Criar `index.html` (loader)
- Testar
- Commit e push
- **PAUSAR para validação do usuário**

### Commit 3+: Demais Capítulos

- Após validação do Capítulo 1
- Repetir processo para outros capítulos
- Um commit por capítulo

---

## Benefícios

1. **Modularidade:** Arquivos de ~100-300 linhas vs ~2000 linhas
2. **Colaboração:** Menos conflitos de merge
3. **Contexto:** Menor para agentes de IA processarem
4. **Manutenção:** Fácil editar seção específica
5. **Versionamento:** Diffs menores e mais claros

---

## Checklist de Validação (Capítulo 1)

- [ ] Pasta criada
- [ ] Arquivos de seção criados
- [ ] Loader funcional
- [ ] Seções carregam corretamente
- [ ] Navegação H/V funciona
- [ ] MathJax renderiza
- [ ] Imagens/SVGs carregam
- [ ] Visualizações funcionam
- [ ] Console sem erros
- [ ] Testado em servidor local

---

**Status:** ✅ Plano aprovado pelo usuário

**Decisões:**

- Nomenclatura: `capitulo-N-nome`
- Loader: Fetch síncrono
- Backups: Manter temporariamente
- Servidor: Python http.server

---

## EXECUÇÃO - FASE 1: CAPÍTULO 1 (PILOTO)

### Estrutura Identificada do capitulo-1.html

**Total:** 1461 linhas, 8 seções principais, 66 slides verticais

| Seção | Linhas    | Tópico                | Slides Verticais | Arquivo                     |
| ----- | --------- | --------------------- | ---------------- | --------------------------- |
| 1     | 87-90     | Título                | 0                | 01-titulo.html              |
| 2     | 93-228    | Funções Vetoriais     | 9                | 02-funcoes-vetoriais.html   |
| 3     | 231-417   | Campo Vetorial        | 9                | 03-campo-vetorial.html      |
| 4     | 420-518   | Limite e Continuidade | 5                | 04-limite-continuidade.html |
| 5     | 521-667   | Derivadas Parciais    | 8                | 05-derivadas-parciais.html  |
| 6     | 670-1168  | Rotacional            | 14               | 06-rotacional.html          |
| 7     | 1143-1167 | _Síntese (problema)_  | _estrutural_     | (ignorar/mesclar)           |
| 8     | 1171-1456 | Divergente            | 15               | 07-divergente.html          |

**Nota:** Seção 7 tem problema de indentação e sobreposição. Será mesclada com Seção 6.

### Passos de Execução

#### 1. Criar Estrutura de Pastas

```bash
mkdir -p slide-decks/capitulo-1-funcoes-vetoriais
```

#### 2. Extrair Seções

Para cada seção:

**Exemplo - Seção 1 (Título):**

```bash
# Linhas 87-90
sed -n '87,90p' slide-decks/capitulo-1.html > slide-decks/capitulo-1-funcoes-vetoriais/01-titulo.html
```

**Estrutura de cada arquivo de seção:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <!-- Conteúdo da seção (linhas extraídas) -->
    <section>
      <!-- slides verticais -->
    </section>
  </body>
</html>
```

#### 3. Criar Loader (index.html)

**Características:**

- Carregar Reveal.js, MathJax, CSS (como no original)
- Fetch síncrono das seções
- Inserir seções em `<div class="slides">`
- Inicializar Reveal.js após carregar

**Template do loader:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Funções Vetoriais - Cálculo Vetorial</title>
    <link rel="stylesheet" href="../reveal.js/dist/reveal.css" />
    <link rel="stylesheet" href="../space-theme.css" />
    <script src="../reveal.js/dist/reveal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <!-- Configuração MathJax e estilos inline do original -->
  </head>
  <body>
    <div class="reveal">
      <div class="slides" id="slides-container"></div>
    </div>

    <script>
      async function loadSlides() {
        const sections = [
          '01-titulo.html',
          '02-funcoes-vetoriais.html',
          '03-campo-vetorial.html',
          '04-limite-continuidade.html',
          '05-derivadas-parciais.html',
          '06-rotacional.html',
          '07-divergente.html',
        ];

        const container = document.getElementById('slides-container');

        for (const sectionFile of sections) {
          const response = await fetch(sectionFile);
          const html = await response.text();

          // Parse HTML e extrair <section>
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const section = doc.querySelector('section');

          if (section) {
            container.appendChild(section);
          }
        }

        // Inicializar Reveal.js
        Reveal.initialize({
          // config do Reveal.js
        });
      }

      loadSlides();
    </script>
  </body>
</html>
```

#### 4. Ajustar Paths de Recursos

**No loader:**

- CSS: `../space-theme.css`
- Reveal.js: `../reveal.js/dist/reveal.css`

**Nas seções:**

- SVGs: `../../svg-cap1/imagem.svg`
- Imagens: manter paths originais (relativos à slide-decks/)

#### 5. Criar Backup do Original

```bash
cp slide-decks/capitulo-1.html slide-decks/capitulo-1.html.backup
```

#### 6. Testar

```bash
cd slide-decks
python3 -m http.server 8000
# Abrir http://localhost:8000/capitulo-1-funcoes-vetoriais/
```

**Checklist de teste:**

- [ ] Loader abre no navegador
- [ ] Todas as 7 seções carregam
- [ ] Navegação horizontal funciona
- [ ] Navegação vertical funciona
- [ ] MathJax renderiza fórmulas
- [ ] SVGs carregam
- [ ] Visualizações Canvas funcionam
- [ ] Console sem erros

#### 7. Commit e Push

```bash
git add slide-decks/capitulo-1-funcoes-vetoriais/
git add slide-decks/capitulo-1.html.backup
git commit -m "refactor: modularize chapter 1 slides

- Create capitulo-1-funcoes-vetoriais/ folder
- Split capitulo-1.html into 7 section files
- Create index.html loader with synchronous fetch
- Backup original as capitulo-1.html.backup
- Total: 1461 lines → 7 files of ~100-300 lines each"

git push origin main
```

---

## PRÓXIMOS PASSOS (Após Validação)

1. **Se usuário aprovar:**
   - Remover capitulo-1.html.backup
   - Aplicar mesmo processo aos outros capítulos
2. **Se houver problemas:**
   - Ajustar conforme feedback
   - Re-testar
3. **Capítulos subsequentes:**
   - Capítulo 0 (revisao.html)
   - Capítulo 2 (integrais-duplas.html)
   - E assim por diante...
