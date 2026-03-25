              <li>São invariantes a reparametrizações da curva</li>
              <li>
                Conectam-se diretamente ao conceito físico de trabalho e energia
              </li>
              <li>
                Foram essenciais para o desenvolvimento da exploração espacial
              </li>
            </ul>
          </div>

          <div class="math-section">
            <p>Próximos passos:</p>
            <ul>
              <li>Campos Conservativos e Independência de Caminho</li>
              <li>Teorema Fundamental do Cálculo para Integrais de Linha</li>
              <li>Conexões com o Teorema de Green e Stokes</li>
            </ul>
          </div>
        </section>
      </div>
    </div>

    <!-- Script de inicialização e visualizações -->
    <script>
      // =================================================
      // INICIALIZAÇÃO DO REVEAL.JS
      // =================================================
      window.onload = function () {
        Reveal.initialize({
          controls: true,
          progress: true,
          center: true,
          hash: true,
          plugins: [RevealMath.MathJax3],
          // Configuração específica para ajuste de tela
          width: '90%', // Largura de 90%
          height: '100%',
          margin: 0.02, // Margem menor para aproveitar mais espaço
          minScale: 0.45, // Permitir mais zoom out para ver o slide completo
          maxScale: 1.5,
          // Transições
          transition: 'fade',
          // Navegação
          navigationMode: 'default',
        });

        // Inicializa as visualizações quando os slides estiverem prontos
        Reveal.on('ready', function () {
          if (document.getElementById('canvasFieldLine')) {
            initFieldVisualization();
          }

          if (document.getElementById('canvasArcLength')) {
            initOrbitalParametrizationVisualization();
          }
        });

        // Gerencia visualizações durante transições de slides
        Reveal.on('slidechanged', function (event) {
          // Campo de força
          if (
            event.currentSlide.querySelector('#canvasFieldLine') &&
            window.fieldViz
          ) {
            window.fieldViz.update();
          }

          // Visualização orbital
          if (event.currentSlide.querySelector('#canvasArcLength')) {
            if (window.orbitalViz) {
              window.orbitalViz.update();
            } else if (document.getElementById('canvasArcLength')) {
              initOrbitalParametrizationVisualization();
            }
          } else {
            // Parar animação quando sair do slide
            if (window.orbitalViz && window.orbitalViz.stop) {
              window.orbitalViz.stop();
            }
          }
        });
      };

      // =================================================
      // VISUALIZAÇÃO DO CAMPO VETORIAL E INTEGRAL DE LINHA
      // =================================================
      function initFieldVisualization() {
        const canvas = document.getElementById('canvasFieldLine');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const slider = document.getElementById('pathSlider');
        const valueDisplay = document.getElementById('pathValue');
        const btnReset = document.getElementById('btnResetPath');
        const btnToggleField = document.getElementById('btnToggleField');
        const pathSelector = document.getElementById('pathTypeSelector');
        const fieldScaleSlider = document.getElementById('fieldScaleSlider');
        const fieldScaleValue = document.getElementById('fieldScaleValue');

        // Estado da visualização
        let state = {
          showField: true,
          pathProgress: 0,
          integralValue: 0,
          pathType: 'ellipse', // Valor padrão
          fieldScale: 50, // Escala para o campo
          gridSpacing: 40, // Espaçamento entre vetores do campo
          scale: {
            field: 50, // Escala para setas do campo - aumentada
            tangent: 30, // Escala para vetor tangente
          },
        };

        // Define o campo vetorial (campo gravitacional mais realista)
        function vectorField(x, y) {
          const dx = -x;
          const dy = -y;
          const magnitude = Math.sqrt(x * x + y * y);
          if (magnitude < 0.1) return [0, 0]; // Evitar singularidade no centro

          // Normaliza e aplica a lei do inverso do quadrado
          const scale = 1 / (magnitude * magnitude);
          return [dx * scale, dy * scale];
        }

        // Define diferentes trajetórias
        const paths = {
          ellipse: (t) => {
            const a = 150;
            const b = 100;
            const x = a * Math.cos(t) + canvas.width / 2;
            const y = b * Math.sin(t) + canvas.height / 2;
            return [x, y];
          },
          circle: (t) => {
            const r = 130; // Raio maior para melhor visualização
            const x = r * Math.cos(t) + canvas.width / 2;
            const y = r * Math.sin(t) + canvas.height / 2;
            return [x, y];
          },
          spiral: (t) => {
            const a = 5; // Fator de crescimento reduzido para caber na tela
            const b = 0.5; // Fator de expansão
            const r = a * t;
            const x = r * Math.cos(b * t) + canvas.width / 2;
            const y = r * Math.sin(b * t) + canvas.height / 2;
            return [x, y];
          },
        };

        // Usar a trajetória selecionada
        function path(t) {
          return paths[state.pathType](t);
        }

        // Calcula os limites da trajetória para cada tipo
        const pathLimits = {
          ellipse: 2 * Math.PI,
          circle: 2 * Math.PI,
          spiral: 10,
        };

        // Desenha o campo vetorial
        function drawField() {
          if (!state.showField) return;

          ctx.strokeStyle = 'rgba(79, 195, 247, 0.8)'; // Aumenta opacidade
          ctx.lineWidth = 1.5; // Aumenta espessura da linha

          // Grade de vetores de campo
          for (
            let x = state.gridSpacing;
            x < canvas.width;
            x += state.gridSpacing
          ) {
            for (
              let y = state.gridSpacing;
              y < canvas.height;
              y += state.gridSpacing
            ) {
              const [dx, dy] = vectorField(
                x - canvas.width / 2,
                y - canvas.height / 2
              );
              const magnitude = Math.sqrt(dx * dx + dy * dy);

              if (magnitude < 0.001) continue;

              // Escala para visualização - usa a escala ajustável
              const arrowX = x + dx * state.fieldScale;
              const arrowY = y + dy * state.fieldScale;

              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(arrowX, arrowY);

              // Desenha ponta da seta maior
              const angle = Math.atan2(dy, dx);
              ctx.lineTo(
                arrowX - 7 * Math.cos(angle - Math.PI / 6),
                arrowY - 7 * Math.sin(angle - Math.PI / 6)
              );
              ctx.moveTo(arrowX, arrowY);
              ctx.lineTo(
                arrowX - 7 * Math.cos(angle + Math.PI / 6),
                arrowY - 7 * Math.sin(angle + Math.PI / 6)
              );

              ctx.stroke();
            }
          }
        }

        // Desenha a trajetória completa
        function drawFullPath() {
          // Desenha trajetória completa (linha mais fina)
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; // Aumenta opacidade
          ctx.lineWidth = 1.5;
          ctx.beginPath();

          const limit = pathLimits[state.pathType];
          const steps = 200; // Mais pontos para trajetórias mais suaves

          for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * limit;
            const [x, y] = path(t);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // Desenha a parte percorrida da trajetória e a integral acumulada
        function drawProgress() {
          if (state.pathProgress <= 0) return;

          const limit = pathLimits[state.pathType];
          const maxT = limit * (state.pathProgress / 100);
          const steps = Math.max(50, Math.floor(state.pathProgress)); // Pelo menos 50 pontos

          // Desenha parte percorrida da trajetória (linha mais grossa)
          ctx.strokeStyle = 'rgba(255, 90, 95, 0.8)';
          ctx.lineWidth = 3;
          ctx.beginPath();

          for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * maxT;
            const [x, y] = path(t);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();

          // Posição atual e visualização dos vetores
          const [x, y] = path(maxT);

          // Desenha a posição atual na trajetória
          ctx.fillStyle = '#ff5a5f';
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, 2 * Math.PI);
          ctx.fill();

          // Desenha o vetor do campo na posição atual
          const [dx, dy] = vectorField(
            x - canvas.width / 2,
            y - canvas.height / 2
          );
          const magnitude = Math.sqrt(dx * dx + dy * dy);

          if (magnitude > 0.001) {
            const scale = state.fieldScale;
            ctx.strokeStyle = '#64b5f6';
            ctx.lineWidth = 2.5; // Linha mais grossa
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + dx * scale, y + dy * scale);
            ctx.stroke();

            // Desenha ponta da seta (maior e mais visível)
            const angle = Math.atan2(dy, dx);
            ctx.beginPath();
            ctx.moveTo(x + dx * scale, y + dy * scale);
            ctx.lineTo(
              x + dx * scale - 8 * Math.cos(angle - Math.PI / 6),
              y + dy * scale - 8 * Math.sin(angle - Math.PI / 6)
            );
            ctx.lineTo(
              x + dx * scale - 8 * Math.cos(angle + Math.PI / 6),
              y + dy * scale - 8 * Math.sin(angle + Math.PI / 6)
            );
            ctx.closePath();
            ctx.fillStyle = '#64b5f6';
            ctx.fill();

            // Adiciona label "F" para o campo
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px Arial';
            ctx.fillText('F', x + dx * scale + 10, y + dy * scale + 5);
          }

          // Calcula o vetor tangente (d\vec{r})
          const dt = 0.01;
          const tPrev = Math.max(0, maxT - dt);
          const [x1, y1] = path(tPrev);
          const [x2, y2] = path(maxT);
          const tx = (x2 - x1) / dt;
          const ty = (y2 - y1) / dt;
          const tmag = Math.sqrt(tx * tx + ty * ty);

          if (tmag > 0.001) {
            ctx.strokeStyle = '#ffd54f';
            ctx.lineWidth = 2.5; // Linha mais grossa
            const tscale = state.scale.tangent / tmag;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + tx * tscale, y + ty * tscale);
            ctx.stroke();

            // Desenha a seta para indicar vetor tangente (maior e mais visível)
            const angle = Math.atan2(ty, tx);
            ctx.beginPath();
            ctx.moveTo(x + tx * tscale, y + ty * tscale);
            ctx.lineTo(
              x + tx * tscale - 8 * Math.cos(angle - Math.PI / 6),
              y + ty * tscale - 8 * Math.sin(angle - Math.PI / 6)
            );
            ctx.lineTo(
              x + tx * tscale - 8 * Math.cos(angle + Math.PI / 6),
              y + ty * tscale - 8 * Math.sin(angle + Math.PI / 6)
            );
            ctx.closePath();
            ctx.fillStyle = '#ffd54f';
            ctx.fill();

            // Adiciona label "d\vec{r}" para o vetor tangente
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px Arial';
            ctx.fillText('d\u20D7r', x + tx * tscale + 10, y + ty * tscale + 5);
          }

          // Calcula o produto escalar (contribuição para a integral)
          const dotProduct = (dx * tx + dy * ty) / tmag;

          // Calcula a integral acumulada (simplificada)
          state.integralValue = dotProduct;

          // Mostra o valor do produto escalar atual (mais visível)
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 16px Arial';
          ctx.textAlign = 'left';
          ctx.fillText(
            `F·d\u20D7r (produto escalar): ${dotProduct.toFixed(2)}`,
            20,
            55
          );

          // Visualização do ângulo entre os vetores
          const angleBetween =
            (Math.acos(dotProduct / (magnitude * tmag)) * 180) / Math.PI;
          ctx.fillText(
            `Ângulo entre F e d\u20D7r: ${angleBetween.toFixed(1)}°`,
            20,
            80
          );
        }

        // Atualiza a visualização
        function updateFieldVisualization() {
          try {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawField();
            drawFullPath();
            drawProgress();
          } catch (e) {
            console.error('Erro ao atualizar a visualização do campo:', e);
          }
        }

        // Reinicia a visualização
        function resetVisualization() {
          state.pathProgress = 0;
          state.integralValue = 0;
          slider.value = 0;
          valueDisplay.textContent = '0%';
          updateFieldVisualization();
        }

        // Event listeners
        slider.addEventListener('input', function () {
          state.pathProgress = parseFloat(this.value);
          valueDisplay.textContent = `${state.pathProgress}%`;
          updateFieldVisualization();
        });

        btnReset.addEventListener('click', resetVisualization);

        btnToggleField.addEventListener('click', function () {
          state.showField = !state.showField;
          updateFieldVisualization();
        });

        if (pathSelector) {
          pathSelector.addEventListener('change', function () {
            state.pathType = this.value;
            resetVisualization();
          });
        }

        // Novo listener para o controle de escala do campo
        if (fieldScaleSlider) {
          fieldScaleSlider.addEventListener('input', function () {
            state.fieldScale = parseInt(this.value);
            state.scale.field = state.fieldScale;
            fieldScaleValue.textContent = state.fieldScale;
            updateFieldVisualization();
          });
        }

        // Exporta funções para uso global
        window.fieldViz = {
          update: updateFieldVisualization,
          reset: resetVisualization,
        };

        // Inicializa a visualização
        updateFieldVisualization();
      }

      // =================================================
      // VISUALIZAÇÃO DE PARAMETRIZAÇÃO ORBITAL
      // =================================================
      function initOrbitalParametrizationVisualization() {
        const canvas = document.getElementById('canvasArcLength');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const btnToggleParam = document.getElementById('btnToggleParam');
        const btnAnimateOrbit = document.getElementById('btnAnimateOrbit');
        const btnReset = document.getElementById('btnReset');
        const sliderInterval = document.getElementById('markerInterval');
        const intervalValue = document.getElementById('intervalValue');

        // Estado da visualização
        const state = {
          // Parâmetros da órbita elíptica
          a: 180, // Semi-eixo maior
          b: 100, // Semi-eixo menor
          centerX: canvas.width / 2,
          centerY: canvas.height / 2,

          // Estado dinâmico
          useAngleParametrization: false, // true: por ângulo, false: por tempo
          isAnimating: false,
          currentT: 0,
          orbitTraces: [], // rastros deixados pelo planeta
          markerInterval: 10, // intervalo base entre marcas

          // Cores
          colors: {
            timeColor: 'rgba(255, 90, 95, 0.7)',
            angleColor: 'rgba(79, 195, 247, 0.7)',
            velocityColor: '#ffd54f',
            accelerationColor: '#ff6e40',
            sunGlow: [
              'rgba(255, 255, 0, 1)',
              'rgba(255, 140, 0, 0.8)',
              'rgba(255, 69, 0, 0)',
            ],
            planetColor: '#64f0ff',
            orbitColor: 'rgba(255, 255, 255, 0.5)',
            axisColor: 'rgba(255, 255, 255, 0.3)',
          },
        };

        // Calcula propriedades derivadas
        const c = Math.sqrt(state.a * state.a - state.b * state.b); // Distância do centro ao foco
        const focusX = state.centerX - c; // Posição X do foco (sol)
        const e = c / state.a; // Excentricidade da órbita

        // Adiciona rastros iniciais para visualização
        function initTraces() {
          state.orbitTraces = [];
          const totalPoints = 360 / state.markerInterval; // Aproximadamente um ponto a cada N graus

          // Adiciona traços iniciais baseados na parametrização atual
          if (state.useAngleParametrization) {
            // Parametrização por ângulo (distribuição uniforme)
            for (let i = 0; i < totalPoints; i++) {
              const angle = (i * 2 * Math.PI) / totalPoints;
              const position = orbitPositionByAngle(angle);
              state.orbitTraces.push({
                x: position.x,
                y: position.y,
                color: state.colors.angleColor,
              });
            }
          } else {
            // Parametrização por tempo (lei de Kepler)
            for (let i = 0; i < totalPoints; i++) {
              // Usamos a anomalia média para distribuir uniformemente no tempo
              const M = (i * 2 * Math.PI) / totalPoints;
              const E = solveKepler(M, e); // Resolve a equação de Kepler
              const position = orbitPositionByTime(E);
              state.orbitTraces.push({
                x: position.x,
                y: position.y,
                color: state.colors.timeColor,
              });
            }
          }
        }

        // Resolver a equação de Kepler: M = E - e*sin(E)
        // Onde M é a anomalia média (proporcional ao tempo) e E é a anomalia excêntrica
        function solveKepler(M, e) {
          // Método iterativo de Newton para resolver a equação de Kepler
          let E = M; // Valor inicial
          const tolerance = 1e-8;
          let delta = 1;

          // Iteração de Newton para convergir para a solução
          let iterations = 0;
          const maxIterations = 20;

          while (Math.abs(delta) > tolerance && iterations < maxIterations) {
            delta = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
            E = E - delta;
            iterations++;
          }

          return E;
        }

        // Calcular posição na órbita baseada na anomalia excêntrica (tempo)
        function orbitPositionByTime(E) {
          // Posição na elipse usando anomalia excêntrica E
          const x = state.centerX + state.a * Math.cos(E);
          const y = state.centerY + state.b * Math.sin(E);

          return { x, y };
        }

        // Calcular posição na órbita baseada no ângulo (parametrização uniforme)
        function orbitPositionByAngle(angle) {
          // Usamos a equação paramétrica da elipse com o ângulo polar
          const x = state.centerX + state.a * Math.cos(angle);
          const y = state.centerY + state.b * Math.sin(angle);

          return { x, y };
        }

        // Calcular velocidade orbital baseada na anomalia excêntrica
        function calculateOrbitalVelocity(E) {
          // Derivada da posição em relação ao tempo
          const dx =
            (-state.a * Math.sin(E) * (1 - e * Math.cos(E))) /
            (1 - e * Math.cos(E));
          const dy =
            (state.b * Math.cos(E) * (1 - e * Math.cos(E))) /
            (1 - e * Math.cos(E));

          return { dx, dy };
        }

        // Calcular velocidade orbital baseada no ângulo
        function calculateAngularVelocity(angle) {
          // Derivada da posição em relação ao ângulo (constante)
          const dx = -state.a * Math.sin(angle);
          const dy = state.b * Math.cos(angle);

          return { dx, dy };
        }

        // Desenhar a órbita elíptica
        function drawOrbit() {
          ctx.strokeStyle = state.colors.orbitColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(
            state.centerX,
            state.centerY,
            state.a,
            state.b,
            0,
            0,
            2 * Math.PI
          );
          ctx.stroke();

          // Adiciona linhas pontilhadas para os eixos principais
          ctx.strokeStyle = state.colors.axisColor;
          ctx.setLineDash([5, 5]);

          // Eixo maior
          ctx.beginPath();
          ctx.moveTo(state.centerX - state.a, state.centerY);
          ctx.lineTo(state.centerX + state.a, state.centerY);
          ctx.stroke();

          // Eixo menor
          ctx.beginPath();
          ctx.moveTo(state.centerX, state.centerY - state.b);
          ctx.lineTo(state.centerX, state.centerY + state.b);
          ctx.stroke();

          ctx.setLineDash([]); // Restaura linha sólida

          // Marca o periélio e afélio
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';

          // Periélio (ponto mais próximo do sol)
          const perihelionX = state.centerX - state.a + c;
          ctx.fillText('Periélio', perihelionX, state.centerY + 20);
          ctx.beginPath();
          ctx.arc(perihelionX, state.centerY, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 90, 95, 0.7)';
          ctx.fill();

          // Afélio (ponto mais distante do sol)
          const aphelionX = state.centerX + state.a - c;
          ctx.fillText('Afélio', aphelionX, state.centerY + 20);
          ctx.beginPath();
          ctx.arc(aphelionX, state.centerY, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(79, 195, 247, 0.7)';
          ctx.fill();
        }

        // Desenhar o sol em um dos focos
        function drawSun() {
          // Gradiente para o sol
          const gradient = ctx.createRadialGradient(
            focusX,
            state.centerY,
            0,
            focusX,
            state.centerY,
            20
          );
          gradient.addColorStop(0, state.colors.sunGlow[0]);
          gradient.addColorStop(0.5, state.colors.sunGlow[1]);
          gradient.addColorStop(1, state.colors.sunGlow[2]);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(focusX, state.centerY, 20, 0, 2 * Math.PI);
          ctx.fill();

          // Centro do sol
          ctx.fillStyle = 'rgba(255, 255, 200, 0.9)';
          ctx.beginPath();
          ctx.arc(focusX, state.centerY, 8, 0, 2 * Math.PI);
          ctx.fill();
        }

        // Desenhar o planeta na posição atual com vetores de velocidade e aceleração
        function drawPlanet() {
          let position, velocity;

          if (state.useAngleParametrization) {
            position = orbitPositionByAngle(state.currentT);
            velocity = calculateAngularVelocity(state.currentT);
          } else {
            // Para a parametrização por tempo, converte tempo para anomalia excêntrica
            const E = solveKepler(state.currentT, e);
            position = orbitPositionByTime(E);
            velocity = calculateOrbitalVelocity(E);
          }

          // Planeta
          ctx.fillStyle = state.colors.planetColor;
          ctx.beginPath();
          ctx.arc(position.x, position.y, 8, 0, 2 * Math.PI);
          ctx.fill();

          // Borda do planeta
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(position.x, position.y, 8, 0, 2 * Math.PI);
          ctx.stroke();

          // Vetor velocidade
          const velocityMagnitude = Math.sqrt(
            velocity.dx * velocity.dx + velocity.dy * velocity.dy
          );
          if (velocityMagnitude > 0.001) {
            const vScale = 0.3;
            ctx.strokeStyle = state.colors.velocityColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(position.x, position.y);
            ctx.lineTo(
              position.x + velocity.dx * vScale,
              position.y + velocity.dy * vScale
            );
            ctx.stroke();

            // Seta para o vetor velocidade
            const vAngle = Math.atan2(velocity.dy, velocity.dx);
            ctx.beginPath();
            ctx.moveTo(
              position.x + velocity.dx * vScale,
              position.y + velocity.dy * vScale
            );
            ctx.lineTo(
              position.x +
                velocity.dx * vScale -
                6 * Math.cos(vAngle - Math.PI / 6),
              position.y +
                velocity.dy * vScale -
                6 * Math.sin(vAngle - Math.PI / 6)
            );
            ctx.lineTo(
              position.x +
                velocity.dx * vScale -
                6 * Math.cos(vAngle + Math.PI / 6),
              position.y +
                velocity.dy * vScale -
                6 * Math.sin(vAngle + Math.PI / 6)
            );
            ctx.closePath();
            ctx.fillStyle = state.colors.velocityColor;
            ctx.fill();

            // Adiciona label "v" para velocidade
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px Arial';
            ctx.fillText(
              'v',
              position.x + velocity.dx * vScale + 10,
              position.y + velocity.dy * vScale + 5
            );
          }

          // Vetor aceleração (sempre aponta para o foco)
          const accelX = focusX - position.x;
          const accelY = state.centerY - position.y;
          const accelMagnitude = Math.sqrt(accelX * accelX + accelY * accelY);

          if (accelMagnitude > 0.001) {
            const aScale = 0.05;
            ctx.strokeStyle = state.colors.accelerationColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(position.x, position.y);
            ctx.lineTo(
              position.x + (accelX / accelMagnitude) * 30 * aScale,
              position.y + (accelY / accelMagnitude) * 30 * aScale
            );
            ctx.stroke();

            // Seta para o vetor aceleração
            const aAngle = Math.atan2(accelY, accelX);
            const ax = position.x + (accelX / accelMagnitude) * 30 * aScale;
            const ay = position.y + (accelY / accelMagnitude) * 30 * aScale;

            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(
              ax - 6 * Math.cos(aAngle - Math.PI / 6),
              ay - 6 * Math.sin(aAngle - Math.PI / 6)
            );
            ctx.lineTo(
              ax - 6 * Math.cos(aAngle + Math.PI / 6),
              ay - 6 * Math.sin(aAngle + Math.PI / 6)
            );
            ctx.closePath();
            ctx.fillStyle = state.colors.accelerationColor;
            ctx.fill();

            // Adiciona label "a" para aceleração
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px Arial';
            ctx.fillText('a', ax + 10, ay - 5);
          }
        }

        // Desenhar os rastros deixados pelo planeta
        function drawTraces() {
          for (const trace of state.orbitTraces) {
            ctx.fillStyle = trace.color;
            ctx.beginPath();
            ctx.arc(trace.x, trace.y, 4, 0, 2 * Math.PI);
            ctx.fill();
          }
        }

        // Atualizar a posição atual e adicionar um novo rastro
        function updatePosition() {
          // Incremento baseado no intervalo do slider
          const increment = (0.1 * state.markerInterval) / 10;

          // Avança a posição
          state.currentT += increment;
          if (state.currentT > 2 * Math.PI) {
            state.currentT = 0;
          }

          // Determina a posição atual
          let position;

          if (state.useAngleParametrization) {
            position = orbitPositionByAngle(state.currentT);
          } else {
            // Para a parametrização por tempo, converte tempo para anomalia excêntrica
            const E = solveKepler(state.currentT, e);
            position = orbitPositionByTime(E);
          }

          // Adiciona um novo rastro
          state.orbitTraces.push({
            x: position.x,
            y: position.y,
            color: state.useAngleParametrization
              ? state.colors.angleColor
              : state.colors.timeColor,
          });

          // Limita o número de rastros
          if (state.orbitTraces.length > 100) {
            state.orbitTraces.shift();
          }
        }

        // Atualizar a visualização
        function updateOrbitalVisualization() {
          if (!ctx) return;

          try {
            // Limpa o canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Desenha os elementos
            drawOrbit();
            drawSun();
            drawTraces();
            drawPlanet();

            // Título indicando o tipo de parametrização
            ctx.fillStyle = '#ffffff';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(
              state.useAngleParametrization
                ? 'Parametrização por ângulo'
                : 'Parametrização por tempo (Lei de Kepler)',
              canvas.width / 2,
              30
            );

            // Legenda para vetores
            ctx.textAlign = 'left';
            ctx.font = '14px Arial';
            const legendY = 60;

            ctx.fillStyle = state.colors.velocityColor;
            ctx.fillText('→ Vetor velocidade', 20, legendY);

            ctx.fillStyle = state.colors.accelerationColor;
            ctx.fillText(
              '→ Vetor aceleração (gravitacional)',
              20,
              legendY + 20
            );

            // Legenda para os pontos coloridos
            ctx.fillStyle = state.colors.timeColor;
            ctx.fillText(
              '● Pontos distribuídos uniformemente no tempo',
              20,
              canvas.height - 40
            );

            ctx.fillStyle = state.colors.angleColor;
            ctx.fillText(
              '● Pontos distribuídos uniformemente no ângulo',
              20,
              canvas.height - 20
            );
          } catch (e) {
            console.error('Erro ao atualizar a visualização orbital:', e);
          }
        }

        // Iniciar animação
        function startAnimation() {
          if (state.isAnimating) return;

          state.isAnimating = true;
          window.orbitalVisualizationTimer = setInterval(function () {
            updatePosition();
            updateOrbitalVisualization();
          }, 50);

          if (btnAnimateOrbit) {
            btnAnimateOrbit.textContent = 'Parar Animação';
          }
        }

        // Parar animação
        function stopAnimation() {
          state.isAnimating = false;
          if (window.orbitalVisualizationTimer) {
            clearInterval(window.orbitalVisualizationTimer);
            window.orbitalVisualizationTimer = null;
          }

          if (btnAnimateOrbit) {
            btnAnimateOrbit.textContent = 'Animar Órbita';
          }
        }

        // Adicionar listeners para os botões
        if (btnToggleParam) {
          btnToggleParam.addEventListener('click', function () {
            state.useAngleParametrization = !state.useAngleParametrization;
            stopAnimation();
            initTraces();
            updateOrbitalVisualization();
          });
        }

        if (btnAnimateOrbit) {
          btnAnimateOrbit.addEventListener('click', function () {
            if (state.isAnimating) {
              stopAnimation();
            } else {
              startAnimation();
            }
          });
        }

        if (btnReset) {
          btnReset.addEventListener('click', function () {
            stopAnimation();
            state.currentT = 0;
            initTraces();
            updateOrbitalVisualization();
          });
        }

        if (sliderInterval) {
          sliderInterval.addEventListener('input', function () {
            state.markerInterval = parseInt(this.value);
            if (intervalValue) {
              intervalValue.textContent = state.markerInterval;
            }
            // Recria os traços com o novo intervalo
            initTraces();
            updateOrbitalVisualization();
          });
        }

        // Inicializar a visualização
        if (sliderInterval && intervalValue) {
          state.markerInterval = parseInt(sliderInterval.value);
          intervalValue.textContent = state.markerInterval;
        }

        // Exporta funções para uso global
        window.orbitalViz = {
          update: updateOrbitalVisualization,
          start: startAnimation,
          stop: stopAnimation,
          reset: function () {
            stopAnimation();
            state.currentT = 0;
            initTraces();
            updateOrbitalVisualization();
          },
        };

        initTraces();
        updateOrbitalVisualization();
      }
    </script>
  </body>
</html>
