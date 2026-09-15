# Guia de Contribuição

Obrigado pelo interesse em contribuir com o projeto **Cálculo Vetorial Exploração Espacial**!

---

## Como Contribuir

### 1. Criar Novo Conteúdo

**Exercícios:**

- Use `/docs/prompts/exercicios.md` e `/exercicios/template.html`
- Consulte `/docs/workflow.md` para processo completo

**Slides:**

- Use `/docs/prompts/slides.md` e Reveal.js
- Consulte `/docs/workflow.md` para processo completo

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

## Processo de Contribuição

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

- Siga convenções em `/AGENTS.md`
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

## Testes Manuais Obrigatórios

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

---

## Recursos

### Documentação

- `/AGENTS.md` - Guia para agentes de IA (visão geral)
- `/docs/workflow.md` - Processo de criação passo a passo
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

## Dúvidas

- Abra uma **Issue** no GitHub
- Consulte `/AGENTS.md` para visão geral
- Veja arquivos existentes como exemplos

---

Obrigado por contribuir com a educação em Cálculo Vetorial!

**Última atualização:** Março 2026
