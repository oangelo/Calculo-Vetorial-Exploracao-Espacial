# TODO - Cálculo Vetorial Exploração Espacial

> Lista de tarefas pendentes e melhorias para o projeto

---

## 🎯 Em Progresso / Prioridade Alta

### Integração de Visualizações

- [ ] **Integrar canvas/fubini.html no Capítulo 2**
  - Arquivo: `slide-decks/capitulo-2-integrais-duplas/canvas/fubini.html`
  - Descrição: Visualização 3D interativa do Teorema de Fubini
  - Status: Arquivo existe mas não está integrado na apresentação
  - Ação: Criar slide em `capitulo-2-integrais-duplas/` que carregue esta visualização

---

## 📋 Backlog / Melhorias Futuras

### CSS e Estilos

- [ ] **Resolver CSS inline nos exercícios**

  - 38 arquivos com CSS inline duplicado
  - Ver: `docs/css/inventory.md` para lista completa
  - Impacto: ~9.600 linhas de código duplicado
  - Prioridade: Média

- [ ] **Padronizar temas CSS**
  - Unificar `space-theme.css` nos slides
  - Remover `integrais-duplas-complementar.css` se não for necessário
  - Verificar uso de `game-theme-exercises.css`

### Documentação

- [ ] **Atualizar CONTRIBUTING.md**

  - Refletir nova estrutura modular de slides
  - Adicionar exemplos de como criar seções
  - Incluir convenção de nomenclatura para `imagens/`

- [ ] **Criar CHANGELOG.md**
  - Documentar reorganização dos slides
  - Listar mudanças de estrutura

### Testes e Qualidade

- [ ] **Testar todos os loaders de slides**

  - Verificar se navegação horizontal/vertical funciona
  - Confirmar que MathJax renderiza em todos os capítulos
  - Validar que imagens SVG carregam corretamente
  - Testar em servidor local (Python http.server)

- [ ] **Verificar links quebrados**
  - Validar todos os links em README.md
  - Verificar referências entre exercícios e slides
  - Confirmar que TODO.md está atualizado

### Conteúdo

- [ ] **Completar exercícios do Capítulo 6**

  - Arquivo vazio: `exercicios/capitulo-6/definicao-e-forma-diferencial-exata.html`
  - Criar conteúdo seguindo template

- [ ] **Completar exercícios do Capítulo 8**
  - Arquivo vazio: `exercicios/capitulo-8/integral-de-superficie.html`
  - Criar conteúdo seguindo template

### Organização

- [ ] **Padronizar estrutura dos capítulos 8 e 9**

  - Capítulos 8 e 9 estão como arquivos completos
  - Opcional: Dividir em seções modulares como outros capítulos
  - Prioridade: Baixa (funciona como está)

- [ ] **Revisar TODO.md periodicamente**
  - Atualizar status das tarefas
  - Mover itens completos para seção "✅ Concluído"
  - Adicionar novas tarefas conforme necessário

---

## ✅ Concluído

### Março 2026

- [x] **Modularizar todos os slides**

  - Dividir 17 arquivos grandes em estrutura modular
  - 10 pastas de capítulos criadas
  - ~40.000 linhas reorganizadas
  - Commits: `5d5c603`, `8dab166`, `8ab470c`, `bd8d2db`, `ed21047`, `4c5e088`, `f1f5873`, `9ee3fee`, `7e5b01f`, `ab2e212`

- [x] **Atualizar documentação**

  - README.md: Links atualizados para nova estrutura
  - AGENTS.md: Estrutura de diretórios e convenções atualizadas

- [x] **Limpar arquivos antigos**

  - Remover 26 arquivos (originais + backups)
  - Liberar ~1.2MB do repositório
  - Commit: `f989e25`

- [x] **Reorganizar recursos SVG e Canvas**
  - Mover `svg-cap1/` → `capitulo-1/imagens/`
  - Mover `svg-mudança-de-variaveis/` → `capitulo-2/imagens/`
  - Mover `canvas/fubini.html` → `capitulo-2/canvas/`
  - Remover `diagramas_svg/` (não usado)
  - Atualizar paths nos arquivos HTML

---

## 💡 Ideias para Futuro

### Melhorias Técnicas

- [ ] Implementar lazy loading para slides
- [ ] Adicionar modo offline (Service Worker)
- [ ] Criar versão PDF das apresentações
- [ ] Otimizar imagens SVG (minificação)

### Conteúdo

- [ ] Adicionar mais visualizações interativas
- [ ] Criar vídeos explicativos curtos
- [ ] Adicionar quizzes interativos
- [ ] Criar versão mobile otimizada

### Colaboração

- [ ] Configurar GitHub Actions para CI/CD
- [ ] Criar templates de issues e PRs
- [ ] Adicionar guia de estilo de código

---

## 📝 Notas

- **Última atualização:** 06/03/2026
- **Responsável:** Prof. Angelo Mondaini Calvão
- **Próxima revisão:** Quando necessário

---

## 🆘 Como Contribuir

1. Escolha uma tarefa da lista
2. Crie uma branch: `git checkout -b feature/nome-da-tarefa`
3. Implemente a mudança
4. Teste localmente
5. Atualize este TODO.md (marque como concluído ou adicione novas tarefas)
6. Commit e push: `git commit -m "feat: descrição da mudança"`
7. Crie um PR ou merge direto (se autorizado)

---

**Legenda:**

- 🔴 Prioridade Alta
- 🟡 Prioridade Média
- 🟢 Prioridade Baixa
- ⭐ Funcionalidade Importante
- 🐛 Bug para corrigir
