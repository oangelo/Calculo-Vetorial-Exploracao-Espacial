# Guia de Contribuição

Obrigado pelo interesse em contribuir com o projeto **Cálculo Vetorial Exploração Espacial**!

---

## 🎯 Como Contribuir

### 1. Criar Novo Conteúdo

#### Exercícios

- Use o prompt em `/docs/prompts/exercicios.md`
- Siga o template em `/exercicios/template.html`
- Respeite a progressão pedagógica dos capítulos
- Teste no navegador antes de submeter

#### Slides

- Use o prompt em `/docs/prompts/slides.md`
- Use o framework Reveal.js
- Separe claramente matemática de contexto histórico
- Priorize Canvas 2D sobre Three.js

### 2. Corrigir Problemas Existentes

Consulte `/docs/css/inventory.md` para:

- Referências CSS quebradas
- CSS inline duplicado
- Arquivos vazios

### 3. Melhorar Documentação

- Atualize `/docs/css/themes.md` se modificar CSS
- Mantenha `/AGENTS.md` atualizado
- Documente novas classes ou padrões

---

## ✅ Checklist de Qualidade

### Para Exercícios

- [ ] Estrutura HTML válida
- [ ] MathJax: `\( \)` e `\[ \]` (uma barra)
- [ ] 12 exercícios (ALFA/BETA/GAMMA/OMEGA)
- [ ] Contexto histórico apropriado
- [ ] Classes CSS do template mantidas
- [ ] Testado no navegador
- [ ] Progressão pedagógica respeitada

### Para Slides

- [ ] Reveal.js configurado corretamente
- [ ] Classes CSS específicas aplicadas
- [ ] Limite de 250 palavras/slide
- [ ] Separação clara: matemática vs história
- [ ] Visualizações funcionam (se houver)
- [ ] Navegação H/V funciona
- [ ] Testado no navegador

---

## 📝 Convenções

### Nomenclatura de Arquivos

- **Formato:** `kebab-case.html`
- **Exemplos:**
  - `soma-de-riemann.html` ✅
  - `SomaDeRiemann.html` ❌
  - `soma_de_riemann.html` ❌

### Estrutura de Diretórios

```
exercicios/
└── capitulo-N/
    └── nome-do-topico.html

slide-decks/
└── nome-do-topico.html
```

### CSS

- **Exercícios:** Use `../styles.css` (relativo ao capítulo)
- **Slides:** Use `space-theme.css`
- **NÃO** misture temas
- **NÃO** crie CSS inline (use externo)

### MathJax

- **Inline:** `\( fórmula \)`
- **Bloco:** `\[ fórmula \]`
- **Vetores:** `\vec{v}` (com barra invertida)
- **Matrizes:** `\begin{pmatrix}...\end{pmatrix}`

---

## 🔧 Processo de Contribuição

### 1. Fork e Clone

```bash
git clone https://github.com/seu-usuario/Calculo-Vetorial-Exploracao-Espacial.git
cd Calculo-Vetorial-Exploracao-Espacial
```

### 2. Crie uma Branch

```bash
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/descricao-do-fix
```

### 3. Faça suas Mudanças

- Siga as convenções
- Teste localmente
- Documente mudanças significativas

### 4. Commit

```bash
git add .
git commit -m "Descrição clara da mudança"
```

### 5. Push e Pull Request

```bash
git push origin feature/nome-da-feature
```

Abra um Pull Request no GitHub.

---

## 🧪 Testes

### Testes Manuais Obrigatórios

Antes de commitar:

1. **Abra no navegador**

   ```bash
   firefox exercicios/capitulo-N/arquivo.html
   ```

2. **Verifique:**

   - CSS carregou
   - MathJax renderizou
   - Interatividade funciona
   - Links funcionam

3. **Responsividade** (opcional)
   - Teste em diferentes tamanhos de tela
   - Verifique se não quebra em mobile

---

## 🚫 O que Evitar

### NÃO

- ❌ Quebrar links existentes
- ❌ Mudar IDs/classes CSS sem atualizar todos os arquivos
- ❌ Antecipar conceitos de capítulos posteriores
- ❌ Usar CSS inline (use externo)
- ❌ Misturar temas CSS
- ❌ Usar jQuery (use DOM nativo)
- ❌ Criar Three.js se Canvas 2D basta

### FAÇA

- ✅ Testar no navegador
- ✅ Manter consistência visual
- ✅ Documentar mudanças
- ✅ Seguir convenções de nomenclatura
- ✅ Respeitar progressão pedagógica

---

## 📚 Recursos

### Documentação

- `/AGENTS.md` - Guia para agentes de IA
- `/docs/workflow.md` - Processo de criação
- `/docs/css/themes.md` - Documentação de temas
- `/docs/css/inventory.md` - Status do CSS

### Templates

- `/exercicios/template.html` - Template de exercícios
- `/docs/prompts/exercicios.md` - Prompt para exercícios
- `/docs/prompts/slides.md` - Prompt para slides

### Referências

- `/investigacao/` - Material histórico
- `/notas/` - Notas do curso

---

## 💬 Dúvidas

- Abra uma **Issue** no GitHub
- Consulte `/AGENTS.md` para visão geral
- Veja arquivos existentes como exemplos

---

## 📜 Licença

(Especificar licença do projeto)

---

## 🙏 Agradecimentos

Obrigado por contribuir com a educação em Cálculo Vetorial!

---

**Última atualização:** Março 2026
