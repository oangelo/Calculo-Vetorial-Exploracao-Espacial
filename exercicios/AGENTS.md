# Exercícios — Instruções para Claude Code

Prompt completo: `docs/prompts/exercicios-full.md`
Referência rápida: `docs/prompts/exercicios-quick.md`
Template base: `exercicios/template.html`
CSS: `exercicios/styles.css` (tema industrial/cobre — documento sigiloso)

## Criar um exercício

1. Leia `docs/prompts/exercicios-full.md` e `exercicios/template.html`
2. Identifique o tópico na sequência de progressão
3. Use APENAS conceitos já abordados até aquele ponto
4. Salve em `exercicios/capitulo-N/nome-do-topico.html`

## Regras críticas

- **12 exercícios** por arquivo: ALFA (1-3), BETA (4-6), GAMMA (7-9), OMEGA (10-12)
- **MathJax**: `\(inline\)` e `\[bloco\]` — uma barra só
- **CSS**: usar `../styles.css` (relativo ao capítulo) — nunca CSS inline
- **Classes**: usar apenas as do template (não inventar novas)
- **Progressão**: nunca antecipar conceitos de capítulos posteriores

## Estrutura do HTML

```
1. Cabeçalho: carimbo SIGILOSO, data censurada, metadados (REF, NÍVEL DE ACESSO)
2. Fundamentação Teórica: definição formal, contexto espacial, nota histórica
3. 12 Exercícios: número, contexto (ORIGEM: Missão - Data), enunciado, dica, solução
4. Rodapé: numeração, carimbo ULTRASSECRETO
```

## Formato de cada exercício

- **Número**: `EXERCÍCIO VECTOR-XY`
- **Contexto**: `ORIGEM: [Missão/Programa] - [Data/Evento]`
- **Dica**: `[NOTA TÉCNICA]: ...` (omitir para OMEGA)
- **Solução**: dentro de `<details><summary>RELATÓRIO DE CÁLCULO [SIGMA-X REQUERIDO]</summary>`

## Sequência de tópicos (para respeitar progressão)

0. Revisão: Geometria Analítica, Cônicas, Derivadas, Integrais
1. Funções Vetoriais: Funções, Campo vetorial, Limite, Derivadas parciais, Rotacional, Divergente
2. Integrais Duplas: Soma de Riemann, Definição, Conjuntos, Integrabilidade, Propriedades
3. Teorema de Fubini
4. Mudança de Variáveis: Em integrais duplas, Massa e centro de massa
5. Integrais Triplas: Definição, Redução a duplas, Mudança de variáveis, Coordenadas
6. Integrais de Linha: Curvas, Notações, Parâmetros, Curvas C1, Comprimento de arco
7. Campos Conservativos: Definição, Integrais de linha, Independência do caminho, Potencial
8. Teorema de Green
9. Superfícies: Área e integral de superfície
10. Teorema da Divergência: Fluxo, Teorema de Gauss
