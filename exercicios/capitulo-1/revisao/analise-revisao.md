# Análise: revisão (Cap 1 — Revisão de Funções Vetoriais)

## Justificativas pedagógicas

### Bloco 1 — Fundamentos vetoriais (Cap 0 review)

- **EX-REVIEW-1 (antigo EX-09, magnitude):** Fundamento de toda a lista. Sem calcular |v|, o aluno não pode normalizar vetores ou calcular distâncias. Retoma Cap 0 — Geometria Analítica. Adicionados sub-itens (b) para vetor unitário e (c) para verificação.
- **EX-REVIEW-2 (antigo EX-10, produto escalar):** Conexão direta com EX-1 (magnitude → produto escalar → ângulo). Retoma Cap 0 — Geometria Analítica. Adicionados sub-itens (b) para ângulo e (c) para ortogonalidade.
- **EX-REVIEW-3 (antigo EX-11, produto vetorial):** Progressão natural: produto escalar (escalar) → produto vetorial (vetor). Essencial para cálculo do rotacional nos blocos posteriores. Retoma Cap 0. Adicionados sub-itens (b) para verificação de ortogonalidade e (c) para área.
- **EX-REVIEW-4 (antigo EX-12, coplanaridade):** Usa produto misto = combinação de produto escalar e vetorial. Sintetiza os dois produtos. Prepara para identidade vetorial (EX-11). Adicionados sub-itens (b) para interpretação e (c) para relação linear.

### Bloco 2 — Função vetorial e limites (Cap 1 revisitação)

- **EX-REVIEW-5 (antigo EX-03, campo temporizado):** Transição de álgebra vetorial para funções vetoriais. Mostra r(x,y,t) como rotação rígida. Conecta com equações paramétricas de Cap 0. Corrigida a verificação de magnitude (agora mostra a expansão completa). Corrigido o divergente para 2cos(t) em vez de 0.
- **EX-REVIEW-6 (antigo EX-05, campo gravitacional):** Campo com singularidade na origem. Introduz conceito de limite e continuidade de funções vetoriais. Prepara para derivadas parciais. Adicionada dica para cálculo direto.

### Bloco 3 — Derivadas parciais e gradiente (Cap 1)

- **EX-REVIEW-7 (antigo EX-04, mistura radial+rotacional):** Campo radial+rotacional. As derivadas parciais aparecem naturalmente ao calcular ∇·G e ∇×G. Conecta com curvas de nível de Cap 0. Adicionada identificação de qual parcela contribui para qual operador.
- **EX-REVIEW-8 (antigo EX-01, div+rot 2D):** Primeiro exercício com cálculo explícito de ∇·F e ∇×F. Usa derivadas parciais de EX-7. Combinação de expansão+rotação.

### Bloco 4 — Rotacional, divergente e identidades (Cap 1)

- **EX-REVIEW-9 (antigo EX-02, div nulo 3D):** Estende para 3D. Interpretação: volume preservado vs rotação. Corrigido o enunciado: agora pergunta se o campo é incompressível em vez de afirmar que ∇·V = 0 (que era falso).
- **EX-REVIEW-10 (antigo EX-06, acoplamento 3D):** Regiões de mudança de sinal do rotacional. Aplicação a turbulência.
- **EX-REVIEW-11 (antigo EX-07, identidade vetorial):** Prova de ∇·(∇×A)=0. Sintetiza operadores diferenciais. Expandida a solução para mostrar a prova geral.
- **EX-REVIEW-12 (antigo EX-08, análise paramétrica):** Encerra a lista com análise de regimes de fluxo. Usa todos os conceitos.

## Ordem final (no index.html)

```
exercicio-review-09-gamma.html  → REVIEW-1:  magnitude
exercicio-review-10-omega.html  → REVIEW-2:  produto escalar
exercicio-review-11-omega.html  → REVIEW-3:  produto vetorial
exercicio-review-12-omega.html  → REVIEW-4:  coplanaridade
exercicio-review-03-alfa.html   → REVIEW-5:  função vetorial
exercicio-review-05-beta.html   → REVIEW-6:  limites/singularidades
exercicio-review-04-beta.html   → REVIEW-7:  derivadas parciais
exercicio-review-01-alfa.html   → REVIEW-8:  div+rot 2D
exercicio-review-02-alfa.html   → REVIEW-9:  div nulo 3D
exercicio-review-06-beta.html   → REVIEW-10: acoplamento 3D
exercicio-review-07-gamma.html  → REVIEW-11: identidade vetorial
exercicio-review-08-gamma.html  → REVIEW-12: análise paramétrica
```

## Gaps identificados

1. **Gradiente (∇f):** Não há exercício focado no cálculo do gradiente de uma função escalar. O EX-7 menciona derivadas parciais mas não explora o gradiente como vetor direção de maior crescimento.
2. **Função vetorial como trajetória pura:** O EX-5 aborda campo temporal mas não r(t) como posição no tempo com velocidade/aceleração.
3. **Limites de funções vetoriais:** O EX-6 aborda singularidades mas não cálculo formal de limites.
4. **Coordenadas curvilíneas:** Falta de exercícios em coordenadas cilíndricas e esféricas.

## Erros corrigidos

- **EX-02 (REVIEW-9):** Enunciado pedia "Verifique se ∇·V = 0" mas cálculo dava 1. Corrigido para "Calcule ∇·V e discuta se o campo é incompressível."
- **EX-03 (REVIEW-5):** Magnitude não mostrava cálculo. Agora expande |F|² e mostra cancelamento. Divergente corrigido para 2cos(t).
- **Dicas:** Estrutura nested (duplo details) corrigida para estrutura simples em todos os exercícios.
- **Sub-itens:** Todos os exercícios com partes (a,b,c) agora usam `<ul><li>` em vez de `<br />`.
