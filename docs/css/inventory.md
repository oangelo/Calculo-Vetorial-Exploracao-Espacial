# Inventário de CSS

Status atual do uso de CSS no projeto (última atualização: Março 2026)

## Resumo Executivo

**Total de arquivos de exercícios:** 48
**Total de temas CSS:** 3

### Status de Uso

- ✅ **4 arquivos** usando CSS externo corretamente (`../styles.css`)
- ⚠️ **40 arquivos** com CSS inline duplicado (~240 linhas cada)
- ❌ **4 arquivos** com referência quebrada (`../../css/style.css`)
- ❌ **1 arquivo** vazio (`capitulo-8/integral-de-superficie.html`)

---

## Detalhamento por Capítulo

### Capítulo 0 - Revisão (4 arquivos)

| Arquivo                  | Status         | Problema  |
| ------------------------ | -------------- | --------- |
| conicas.html             | ✅ CSS externo | -         |
| derivadas.html           | ⚠️ CSS inline  | Duplicado |
| geometria-analitica.html | ⚠️ CSS inline  | Duplicado |
| integrais.html           | ⚠️ CSS inline  | Duplicado |

### Capítulo 1 - Funções Vetoriais (7 arquivos)

| Arquivo                 | Status         | Problema               |
| ----------------------- | -------------- | ---------------------- |
| campo-vetorial.html     | ⚠️ CSS inline  | Duplicado              |
| derivadas-parciais.html | ⚠️ URL externa | Link para GitHub Pages |
| divergente.html         | ⚠️ URL externa | Link para GitHub Pages |
| funcao-vetorial.html    | ✅ CSS externo | -                      |
| limites.html            | ⚠️ CSS inline  | Duplicado              |
| revisao.html            | ⚠️ CSS inline  | Duplicado              |
| rotacional.html         | ✅ CSS externo | -                      |

### Capítulo 2 - Integrais Duplas (8 arquivos)

| Arquivo                           | Status        | Problema  |
| --------------------------------- | ------------- | --------- |
| condicoes-de-integrabilidade.html | ⚠️ CSS inline | Duplicado |
| conjunto-de-conteudo-nulo.html    | ⚠️ CSS inline | Duplicado |
| definicao-de-integral-dupla.html  | ⚠️ CSS inline | Duplicado |
| propriedades-da-integral.html     | ⚠️ CSS inline | Duplicado |
| revisao.html                      | ⚠️ CSS inline | Duplicado |
| soma-de-riemann.html              | ⚠️ CSS inline | Duplicado |
| teorema-de-fubini.html            | ⚠️ CSS inline | Duplicado |
| troca-de-ordem.html               | ⚠️ CSS inline | Duplicado |

### Capítulo 3 - Mudança de Variáveis (3 arquivos)

| Arquivo                      | Status        | Problema  |
| ---------------------------- | ------------- | --------- |
| massa-e-centro-de-massa.html | ⚠️ CSS inline | Duplicado |
| mudanca-de-variaveis.html    | ⚠️ CSS inline | Duplicado |
| revisao.html                 | ⚠️ CSS inline | Duplicado |

### Capítulo 4 - Integrais Triplas (5 arquivos)

| Arquivo                                   | Status        | Problema  |
| ----------------------------------------- | ------------- | --------- |
| centro-de-massa-e-momento-de-inercia.html | ⚠️ CSS inline | Duplicado |
| condicoes-de-integrabilidade.html         | ⚠️ CSS inline | Duplicado |
| coordenadas-esfericas-e-cilindricas.html  | ⚠️ CSS inline | Duplicado |
| mudanca-de-variaveis.html                 | ⚠️ CSS inline | Duplicado |
| reducao-a-integrais-duplas.html           | ⚠️ CSS inline | Duplicado |

### Capítulo 5 - Integrais de Linha (5 arquivos)

| Arquivo                            | Status        | Problema  |
| ---------------------------------- | ------------- | --------- |
| integral-campo-vetorial-curva.html | ⚠️ CSS inline | Duplicado |
| integral-comprimento-arco.html     | ⚠️ CSS inline | Duplicado |
| integral-curvas-c1.html            | ⚠️ CSS inline | Duplicado |
| mudanca-de-parametro.html          | ⚠️ CSS inline | Duplicado |
| notacoes-alternativas.html         | ⚠️ CSS inline | Duplicado |

### Capítulo 6 - Campos Conservativos (5 arquivos)

| Arquivo                                     | Status          | Problema              |
| ------------------------------------------- | --------------- | --------------------- |
| condicoes-de-conservacao.html               | ⚠️ CSS inline   | Duplicado             |
| conjunto-simplesmente-conexo.html           | ⚠️ CSS inline   | Duplicado             |
| definicao-e-forma-diferencial-exata.html    | ❌ Ref quebrada | `../../css/style.css` |
| independencia-caminho-funcao-potencial.html | ⚠️ CSS inline   | Duplicado             |
| integral-linha-campos-conservativos.html    | ⚠️ CSS inline   | Duplicado             |

### Capítulo 7 - Teorema de Green (4 arquivos)

| Arquivo                          | Status        | Problema  |
| -------------------------------- | ------------- | --------- |
| para-conjuntos-fronteira-c1.html | ⚠️ CSS inline | Duplicado |
| para-retangulos.html             | ⚠️ CSS inline | Duplicado |
| teorema-divergencia-plano.html   | ⚠️ CSS inline | Duplicado |
| teorema-stokes-plano.html        | ⚠️ CSS inline | Duplicado |

### Capítulo 8 - Integral de Superfície (4 arquivos)

| Arquivo                     | Status           | Problema        |
| --------------------------- | ---------------- | --------------- |
| area-de-superficie.html     | ⚠️ CSS inline    | Duplicado       |
| integral-de-superficie.html | ❌ Arquivo vazio | Nenhum conteúdo |
| plano-tangente.html         | ⚠️ CSS inline    | Duplicado       |
| superficies.html            | ⚠️ CSS inline    | Duplicado       |

### Capítulo 9 - Teorema da Divergência (3 arquivos)

| Arquivo                              | Status          | Problema              |
| ------------------------------------ | --------------- | --------------------- |
| fluxo-campo-vetorial.html            | ❌ Ref quebrada | `../../css/style.css` |
| teorema-divergencia-continuacao.html | ❌ Ref quebrada | `../../css/style.css` |
| teorema-divergencia-gauss.html       | ❌ Ref quebrada | `../../css/style.css` |

---

## Temas CSS Disponíveis

### 1. `exercicios/styles.css` (239 linhas)

- **Tema:** Industrial/Cobre
- **Uso:** Documentos sigilosos (Guerra Fria)
- **Status:** ✅ Ativo
- **Cores:** Cobre, ferrugem, dourado, marrom escuro

### 2. `exercicios/game-theme-exercises.css` (87 linhas)

- **Tema:** Arcade 8-bit
- **Uso:** Nenhum encontrado
- **Status:** ⚠️ Não utilizado
- **Cores:** Ciano, magenta, amarelo, verde (retro gaming)

### 3. `slide-decks/space-theme.css` (11KB)

- **Tema:** Exploração Espacial
- **Uso:** Slides Reveal.js
- **Status:** ✅ Ativo
- **Cores:** Azul escuro, dourado, branco, cosmos

---

## Problemas Críticos

### 1. Referência Quebrada (4 arquivos)

**Caminho incorreto:** `../../css/style.css`
**Solução:** Substituir por `../styles.css`

**Arquivos afetados:**

- `capitulo-6/definicao-e-forma-diferencial-exata.html`
- `capitulo-9/fluxo-campo-vetorial.html`
- `capitulo-9/teorema-divergencia-continuacao.html`
- `capitulo-9/teorema-divergencia-gauss.html`

### 2. CSS Inline Duplicado (~40 arquivos)

**Problema:** Cada arquivo tem ~240 linhas de CSS idêntico
**Impacto:** ~9.600 linhas de código duplicado
**Solução:** Remover CSS inline e usar `<link rel="stylesheet" href="../styles.css" />`

### 3. URL Externa (2 arquivos)

**Problema:** Referência a GitHub Pages em vez de arquivo local
**Impacto:** Dependência de conexão com internet
**Solução:** Substituir por referência local `../styles.css`

**Arquivos afetados:**

- `capitulo-1/derivadas-parciais.html`
- `capitulo-1/divergente.html`

### 4. Arquivo Vazio (1 arquivo)

**Problema:** `capitulo-8/integral-de-superficie.html` está vazio
**Solução:** Criar conteúdo ou remover arquivo

---

## Recomendações

### Curto Prazo (Sprint 1)

1. ✅ **Corrigir referências quebradas** (4 arquivos)
   - Substituir `../../css/style.css` por `../styles.css`
2. ✅ **Criar conteúdo para arquivo vazio**
   - `capitulo-8/integral-de-superficie.html`

### Médio Prazo (Sprint 2)

3. ⚠️ **Migrar CSS inline para externo** (~40 arquivos)
   - Criar script de automação
   - Testar cada arquivo após migração
   - Economia: ~9.600 linhas de código

### Longo Prazo (Backlog)

4. 📋 **Avaliar uso do game-theme-exercises.css**
   - Remover se não for usar
   - Ou criar exemplos de uso

---

## Script de Correção Automática (Sugestão)

```bash
#!/bin/bash
# Corrigir referências quebradas

find exercicios -name "*.html" -type f -exec sed -i 's|../../css/style.css|../styles.css|g' {} \;

echo "Referências corrigidas!"
```

**⚠️ Testar antes de executar em produção!**

---

## Manutenção deste Documento

Este inventário deve ser atualizado quando:

- Novos exercícios forem criados
- CSS for migrado de inline para externo
- Problemas forem corrigidos
- Novos temas CSS forem adicionados

**Última verificação:** Março 2026
**Próxima revisão:** Quando necessário
