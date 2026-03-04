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

**Próximo passo:** Aprovar plano e responder perguntas abaixo.

## Perguntas

1. **Nome das pastas:** `capitulo-1-funcoes-vetoriais` ou `cap-01-funcoes-vetoriais`?

2. **Loader:** Fetch síncrono (simples) ou paralelo (rápido)?

3. **Backups:** Manter `.backup` temporariamente?

4. **Ordem:** Capítulo 1 primeiro OK?

5. **Servidor:** Python http.server OK para testes?
