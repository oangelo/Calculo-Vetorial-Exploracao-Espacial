# Bloco 3: 1967–1970  
(Resumo anterior: Blocos 1 e 2 mostraram como funções vetoriais, integrais duplas e mudança de variáveis permitiram prever trajetórias, modelar a reentrada e guiar encontros orbitais durante a era Mercury, Vostok e Gemini.)

---

## Período 5: Início do Programa Apollo (1967–1969)  
**Conexão com: Integrais de Linha e Campos Conservativos**

---

### Contexto Histórico

Após o sucesso do Projeto Gemini, os EUA se lançaram ao monumental **Programa Apollo**, cujo objetivo era claro: pousar um ser humano na Lua e trazê-lo de volta com segurança até o fim da década de 1960. O início foi trágico. Em **27 de janeiro de 1967**, os astronautas da Apollo 1 ― Gus Grissom, Ed White e Roger Chaffee ― morreram durante um teste em solo devido a um incêndio dentro da cápsula. Esse desastre levou a uma revisão completa do projeto da nave, atrasando o cronograma mas melhorando significativamente a segurança.  

Durante os anos seguintes, missões não tripuladas e tripuladas testaram os sistemas. A **Apollo 7** (1968) validou o novo módulo de comando. E a Apollo 8, lançada em **dezembro de 1968**, realizou o primeiro voo tripulado **além da órbita terrestre**, orbitando a Lua dez vezes e retornando com sucesso. Essa missão foi um divisor de águas ― mostrou que os EUA dominavam o **planejamento de trajetórias translunares**, um feito de precisão orbital e cálculo matemático sofisticado. Toda a trajetória envolvia manobras em campos gravitacionais mutáveis, exigindo modelagem matemática detalhada e o uso extensivo de cálculo vetorial e integrais de linha para prever a energia necessária ao longo do caminho Terra–Lua e retorno.

---

### Eventos-Chave (1967–1969)

1. **27/01/1967 – Incêndio da Apollo 1:**  
   - Primeiro teste tripulado da cápsula Apollo termina em tragédia.  
   - *Protagonistas:* Gus Grissom, Ed White, Roger Chaffee.  
   - *Desafio:* Falhas de segurança em ambientes pressurizados com oxigênio puro.  
   - *Avanço:* Redesenho completo da cápsula para segurança e eficiência.

2. **11/10/1968 – Apollo 7:**  
   - Primeiro voo tripulado da nova cápsula Apollo em órbita terrestre.  
   - *Protagonistas:* Schirra, Eisele, Cunningham.  
   - *Avanço:* Teste do módulo de comando e seus sistemas de suporte à vida.

3. **21–27/12/1968 – Apollo 8 orbita a Lua:**  
   - Primeira missão a deixar a órbita terrestre e orbitar a Lua.  
   - *Protagonistas:* Frank Borman, James Lovell, William Anders.  
   - *Desafio:* Cálculo de trajetória precisa usando empuxo mínimo.  
   - *Avanço:* Demonstrou viabilidade do perfil de missão lunar.

---

### Aplicações Matemáticas: Integrais de Linha e Campos Conservativos

O planejamento das trajetórias Terra–Lua exigiu a aplicação direta de **integrais de linha** em **campos conservativos**. A energia total de uma nave espacial ― cinética mais potencial gravitacional ― foi modelada por funções escalares associadas a **campos vetoriais conservativos**, como o campo gravitacional $$\mathbf{F} = -\nabla \Phi,$$ onde $\Phi$ é o potencial gravitacional.

Ao longo da trajetória, a nave sofria a influência combinada dos campos gravitacionais da Terra, da Lua e, em menor grau, do Sol. Para determinar a energia necessária ao longo de uma trajetória, os engenheiros integravam o campo de força ao longo do caminho:  
$$W = \int_C \mathbf{F} \cdot d\mathbf{r}.$$

Como $\mathbf{F}$ é conservativo, esse trabalho não depende do caminho, apenas do ponto inicial e final. Isso permitia o uso de estratégias eficientes como as **manobras de inserção translunar**, onde a nave seguia uma trajetória quase parabólica.  

Durante a **Apollo 8**, a inserção lunar (Lunar Orbit Insertion, LOI) foi cronometrada com extrema precisão. A nave realizou uma queima de motor exatamente na **linha de ação oposta** ao vetor velocidade, reduzindo a energia mecânica e capturando a espaçonave na órbita da Lua. Os cálculos envolviam o uso de **integrais vetoriais em coordenadas esféricas** e modelos numéricos para estimar a energia gasta e a trajetória resultante.  

Além disso, os engenheiros validaram que a força gravitacional é **irrotacional** ($\nabla \times \mathbf{F} = 0$), garantindo a existência de uma função potencial escalar $\Phi$. Isso tornava possível calcular mudanças de energia entre pontos distantes sem precisar conhecer o caminho exato – apenas o valor de $\Phi$ em cada ponto.

Essas ferramentas matemáticas permitiram à NASA realizar os primeiros voos interplanetários tripulados com segurança e eficiência, consolidando a importância das integrais de linha e dos campos conservativos na navegação espacial.

---

### Nota Histórica Concisa  
Entre 1967 e 1969, a NASA dominou as trajetórias Terra–Lua. Usando integrais de linha e campos conservativos, engenheiros planejaram o voo da Apollo 8 até a órbita lunar ― demonstrando a aplicabilidade direta do cálculo vetorial à navegação interplanetária.

---

## Período 6: Pouso Lunar (1969–1970)  
**Conexão com: Teorema de Green e Teorema de Stokes no plano**

---

### Contexto Histórico

O ano de **1969** marcou um dos momentos mais icônicos da humanidade: **a chegada do homem à Lua**. Em 20 de julho, os astronautas Neil Armstrong e Buzz Aldrin pousaram o módulo **Eagle** da missão **Apollo 11** no Mar da Tranquilidade. Esse feito foi o clímax de décadas de desenvolvimento tecnológico, motivadas pela competição geopolítica da Guerra Fria.  

Mas além do aspecto simbólico, o pouso lunar envolveu uma série de **decisões matemáticas de alta precisão**. O local de pouso teve que ser escolhido com base em imagens detalhadas da superfície lunar ― mapeada por sondas anteriores como a **Surveyor** e **Lunar Orbiter**. Esses mapas permitiram estimar áreas planas e seguras com base em topografia tridimensional projetada em planos 2D. Na aproximação final, Armstrong precisou assumir o controle manual e escolher uma área plana livre de rochas, recalculando mentalmente a posição de pouso enquanto o combustível acabava. O pouso bem-sucedido dependia do entendimento de áreas em projeção e da circulação de vetores em torno de curvas, como veremos via **Teorema de Green**.

---

### Eventos-Chave (1969–1970)

1. **16–24/07/1969 – Apollo 11:**  
   - Primeiro pouso humano na Lua, no Mar da Tranquilidade.  
   - *Protagonistas:* Armstrong, Aldrin, Collins.  
   - *Desafio:* Pousar com precisão em terreno hostil e retornar à órbita lunar.  
   - *Avanço:* Execução perfeita de navegação, descida e decolagem lunar.

2. **14/11/1969 – Apollo 12:**  
   - Segundo pouso tripulado, agora com maior precisão.  
   - *Protagonistas:* Conrad, Bean, Gordon.  
   - *Avanço:* Pousaram a apenas 160 metros da sonda Surveyor 3 – validando a capacidade de **navegação de precisão com base em cálculo topográfico**.

---

### Aplicações Matemáticas: Teorema de Green e mapeamento lunar

Durante o planejamento e análise das áreas de pouso lunares, os engenheiros e cientistas da NASA usaram **o Teorema de Green** como ferramenta para calcular **áreas planas** baseando-se em curvas conhecidas da topografia da superfície da Lua.  

O **Teorema de Green** relaciona uma **integral de linha ao redor de uma curva fechada C** com uma **integral dupla sobre a região D que ela delimita**:
$$
\oint_C (P\,dx + Q\,dy) = \iint_D \left( \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} \right) dA.
$$

Ao mapear imagens da Lua em coordenadas cartesianas (2D), os técnicos delimitavam curvas representando áreas de interesse (por exemplo, regiões planas com baixa densidade de crateras). A aplicação do Teorema de Green permitia calcular **rapidamente a área delimitada** por essas curvas sem ter que contar “pixel por pixel” nas imagens.

Além disso, durante o pouso do **Eagle**, a orientação e o controle vetorial do módulo exigiram entender a **circulação de vetores de velocidade e empuxo** ao longo do tempo. Embora mais complexa, a **versão do Teorema de Stokes no plano** (como generalização do de Green) apareceu em simulações do **campo de empuxo gerado pelo motor** durante a descida. Isso foi essencial para simular a força resultante gerada por vetores de direção variável em tempo real.

Na Apollo 12, os engenheiros aplicaram essas ferramentas para pousar próximo à sonda Surveyor 3. Eles modelaram a projeção dos vetores de navegação no plano da superfície lunar, ajustando parâmetros para alcançar o alvo ― um processo baseado em integrais vetoriais e diferenciais.

---

### Nota Histórica Concisa  
O pouso lunar da Apollo 11 exigiu precisão absoluta. Com o Teorema de Green, engenheiros calcularam áreas planas seguras para pouso na Lua, transformando mapas topográficos em dados úteis. A matemática do século XIX guiou o maior feito da exploração espacial do século XX.

---

### Fontes Primárias e Secundárias

- NASA Apollo Mission Reports (Apollo 1, 8, 11, 12): Documentação técnica, trajetórias e transcrições.  
- Chaikin, A. (1994). *A Man on the Moon*. Penguin Books.  
- NASA SP-4029: Apollo by the Numbers – Tabelas detalhadas sobre tempo de queima, força G, etc.  
- Tewari, A. (2007). *Atmospheric and Space Flight Dynamics*. Springer.  
- Jones, E.M. et al.: *Apollo Lunar Surface Journal* (NASA/History Division)  
- AMS Feature Columns (David Austin): Aplicações de Green e Stokes na física e engenharia espacial.  
- Imagens do arquivo NASA e JSC Digital Image Collection.  
