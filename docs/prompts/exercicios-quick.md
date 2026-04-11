# Prompt Rápido: Criar Exercícios

Criar exercícios de Cálculo Vetorial sobre [TÓPICO] usando o template HTML com tema "documento sigiloso da Guerra Fria".

## Regras Críticas

**Progressão:**

- Use APENAS conceitos já abordados (ver sequência abaixo)
- NÃO antecipe tópicos posteriores

**MathJax (REGRA CRÍTICA — erro comum que quebra renderização):**

- Inline: `\(fórmula\)` ← UMA barra no arquivo HTML
- Bloco: `\[fórmula\]` ← UMA barra no arquivo HTML
- Comandos: `\frac`, `\partial`, `\vec`, etc. (uma barra)
- NUNCA usar `\\(`, `\\[`, `\\frac` — barra dupla quebra o MathJax
- Após ESCREVER CADA arquivo, verifique: `grep -c '\\\\\\\\' arquivo.html` — se > 0, corrija antes de continuar

## Estrutura do Documento

Seguir template HTML em `/exercicios/template.html`:

1. **Cabeçalho**: Carimbo SIGILOSO, data censurada, metadados
2. **Fundamentação**: Definição formal, contexto espacial, nota histórica
3. **12 Exercícios**: Progressão ALFA → BETA → GAMMA → OMEGA
4. **Rodapé**: Numeração, carimbo ULTRASSECRETO

## Progressão de Exercícios

**ALFA (1-3)**: Básico, dicas completas, números simples
**BETA (4-6)**: Intermediário, dicas parciais, múltiplos passos
**GAMMA (7-9)**: Avançado, dicas mínimas, contextos realistas
**OMEGA (10-12)**: Desafiador, sem dicas, problemas complexos

## Formato de Cada Exercício

```
EXERCÍCIO VECTOR-XY
ORIGEM: [Missão/Programa] - [Data/Evento]
[Enunciado com aplicação prática]
[NOTA TÉCNICA]: [Dica] (omitir para OMEGA)
RELATÓRIO DE CÁLCULO [SIGMA-X REQUERIDO]
  [Solução passo a passo com fórmulas]
```

## Sequência de Tópicos

0. **Revisão**: Geometria Analítica, Cônicas, Derivadas, Integrais
1. **Funções Vetoriais**: Funções, Campo vetorial, Limite/continuidade, Derivadas parciais, Rotacional, Divergente
2. **Integrais Duplas**: Soma de Riemann, Definição, Conjuntos, Integrabilidade, Propriedades
3. **Teorema de Fubini**: Cálculo de integrais duplas
4. **Mudança de Variáveis**: Em integrais duplas, Massa e centro de massa
5. **Integrais Triplas**: Definição, Integrabilidade, Redução, Mudança de variáveis, Coordenadas
6. **Integrais de Linha**: Curvas, Notações, Parâmetros, Curvas C¹, Comprimento de arco
7. **Campos Conservativos**: Definição, Integrais de linha, Independência do caminho, Potencial
8. **Teorema de Green**
9. **Superfícies**: Área e integral de superfície
10. **Teorema da Divergência**: Fluxo, Teorema de Gauss
11. **Teorema de Stokes no Espaço**

## Próximo Passo

Para instruções detalhadas, consulte `/docs/prompts/exercicios-full.md`.
