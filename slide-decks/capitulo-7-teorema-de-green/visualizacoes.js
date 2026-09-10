      window.onload = function () {
        Reveal.initialize({
          controls: true,
          progress: true,
          center: true,
          hash: true,
          plugins: [RevealMath.MathJax3],
        });
      };
    </script>
    <script>
      window.onload = function () {
        Reveal.initialize({
          controls: true,
          progress: true,
          center: true,
          hash: true,
          plugins: [RevealMath.MathJax3],
          math: {
            mathjax:
              'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
            config: 'TeX-AMS_HTML-full',
            TeX: {
              Macros: {
                // Macros personalizados aqui, se necessário
              },
            },
          },
        });

        // Inicializar as visualizações quando os slides forem carregados
        initializeVisualizations();
      };

      // Função para inicializar todas as visualizações
      function initializeVisualizations() {
        Reveal.on('slidechanged', function (event) {
          // Verificar se o slide atual contém uma visualização
          const currentSlide = event.currentSlide;

          // Teorema de Green - Campo Vetorial
          if (currentSlide.querySelector('#greenTheoremCanvas')) {
            initGreenTheoremVisualization();
          }

          // Fronteiras C¹
          if (currentSlide.querySelector('#c1BoundaryCanvas')) {
            initC1BoundaryVisualization();
          }

          // Campos Conservativos vs. Rotativos
          if (currentSlide.querySelector('#vectorFieldCanvas')) {
            initVectorFieldVisualization();
          }

          // Fontes e Sumidouros
          if (currentSlide.querySelector('#divergenceCanvas')) {
            initDivergenceVisualization();
          }
        });

        // Inicializar a primeira visualização se estiver visível
        if (Reveal.getCurrentSlide().querySelector('#greenTheoremCanvas')) {
          initGreenTheoremVisualization();
        }
      }

      // Visualização 1: Teorema de Green básico
      function initGreenTheoremVisualization() {
        const canvas = document.getElementById('greenTheoremCanvas');
        if (!canvas || canvas.initialized) return;
        canvas.initialized = true;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Configuração inicial
        let aValue = 2;
        let bValue = 1;
        let pathType = 'circle';
        let isDrawing = false;
        let userPath = [];
        let pathClosed = false;

        // Variáveis para o campo vetorial
        const field = {
          // P(x,y) = -by, Q(x,y) = ax
          P: (x, y) => -bValue * y,
          Q: (x, y) => aValue * x,
          // Rotacional (∂Q/∂x - ∂P/∂y)
          curl: () => aValue + bValue,
        };

        // Função para desenhar o campo vetorial
        function drawVectorField() {
          ctx.clearRect(0, 0, width, height);

          // Escala e deslocamento para centralizar o campo
          const scale = 40;
          const offsetX = width / 2;
          const offsetY = height / 2;

          // Desenhar eixos
          ctx.strokeStyle = 'rgba(150, 150, 150, 0.5)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, offsetY);
          ctx.lineTo(width, offsetY);
          ctx.moveTo(offsetX, 0);
          ctx.lineTo(offsetX, height);
          ctx.stroke();

          // Desenhar o campo vetorial
          ctx.strokeStyle = 'rgba(100, 181, 246, 0.8)';
          ctx.fillStyle = 'rgba(100, 181, 246, 0.8)';

          const gridSize = 20;
          for (let i = 0; i <= width; i += gridSize) {
            for (let j = 0; j <= height; j += gridSize) {
              const x = (i - offsetX) / scale;
              const y = (offsetY - j) / scale;

              const vx = field.P(x, y);
              const vy = field.Q(x, y);

              // Normalizar para visualização
              const mag = Math.sqrt(vx * vx + vy * vy);
              const normalizedLength = mag ? gridSize * 0.7 : 0;

              if (mag > 0) {
                const nx = (vx / mag) * normalizedLength;
                const ny = (-vy / mag) * normalizedLength;

                ctx.beginPath();
                ctx.moveTo(i, j);
                ctx.lineTo(i + nx, j + ny);
                ctx.stroke();

                // Seta na ponta do vetor
                const angle = Math.atan2(ny, nx);
                ctx.beginPath();
                ctx.moveTo(i + nx, j + ny);
                ctx.lineTo(
                  i + nx - 3 * Math.cos(angle - Math.PI / 6),
                  j + ny - 3 * Math.sin(angle - Math.PI / 6)
                );
                ctx.lineTo(
                  i + nx - 3 * Math.cos(angle + Math.PI / 6),
                  j + ny - 3 * Math.sin(angle + Math.PI / 6)
                );
                ctx.closePath();
                ctx.fill();
              }
            }
          }

          // Desenhar o caminho (círculo ou definido pelo usuário)
          if (pathType === 'circle') {
            const radius = 100;
            drawCirclePath(radius);
            updateResults(radius);
          } else if (pathType === 'user' && userPath.length > 0) {
            drawUserPath();
            if (pathClosed) {
              calculateUserPathResults();
            }
          }
        }

        // Desenhar caminho circular
        function drawCirclePath(radius) {
          ctx.strokeStyle = 'rgba(255, 90, 95, 0.8)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
          ctx.stroke();
        }

        // Desenhar caminho definido pelo usuário
        function drawUserPath() {
          if (userPath.length < 2) return;

          ctx.strokeStyle = 'rgba(255, 90, 95, 0.8)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(userPath[0].x, userPath[0].y);

          for (let i = 1; i < userPath.length; i++) {
            ctx.lineTo(userPath[i].x, userPath[i].y);
          }

          if (pathClosed) {
            ctx.closePath();
          }

          ctx.stroke();

          // Destacar ponto inicial
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(userPath[0].x, userPath[0].y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }

        // Calcular os resultados para o caminho circular
        function updateResults(radius) {
          const scale = 40;
          const r = radius / scale;

          // Para o campo vetorial definido, o resultado exato é:
          // ∮ (-by dx + ax dy) = ∮ F·dr = πr²(a+b)
          const lineIntegral = Math.PI * r * r * (aValue + bValue);

          // A integral dupla do rotacional é:
          // ∬ (∂Q/∂x - ∂P/∂y) dA = ∬ (a+b) dA = (a+b)·πr²
          const doubleIntegral = (aValue + bValue) * Math.PI * r * r;

          document.getElementById('lineIntegralValue').textContent =
            lineIntegral.toFixed(4);
          document.getElementById('doubleIntegralValue').textContent =
            doubleIntegral.toFixed(4);
          document.getElementById('curlValue').textContent = field
            .curl()
            .toFixed(4);
        }

        // Calcular resultados para o caminho definido pelo usuário
        function calculateUserPathResults() {
          if (userPath.length < 3 || !pathClosed) return;

          // Calcular a área do polígono usando a fórmula do determinante
          let area = 0;
          for (let i = 0; i < userPath.length; i++) {
            const j = (i + 1) % userPath.length;
            area += userPath[i].x * userPath[j].y;
            area -= userPath[j].x * userPath[i].y;
          }
          area = Math.abs(area) / 2;

          // Converter para unidades do campo vetorial
          const scale = 40;
          const offsetX = width / 2;
          const offsetY = height / 2;

          // Para esse campo específico, a integral de linha é (a+b) * área
          const doubleIntegral = (field.curl() * area) / (scale * scale);

          document.getElementById('lineIntegralValue').textContent =
            doubleIntegral.toFixed(4);
          document.getElementById('doubleIntegralValue').textContent =
            doubleIntegral.toFixed(4);
          document.getElementById('curlValue').textContent = field
            .curl()
            .toFixed(4);
        }

        // Manipuladores de evento para interação com o canvas
        canvas.addEventListener('mousedown', function (e) {
          if (pathType !== 'user') return;

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Verificar se estamos próximos ao ponto inicial para fechar o caminho
          if (userPath.length > 2) {
            const dx = x - userPath[0].x;
            const dy = y - userPath[0].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 15) {
              pathClosed = true;
              drawVectorField();
              return;
            }
          }

          if (!pathClosed) {
            isDrawing = true;
            userPath = [{ x, y }];
          }
        });

        canvas.addEventListener('mousemove', function (e) {
          if (!isDrawing || pathType !== 'user' || pathClosed) return;

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Adicionar ponto apenas se estiver a uma distância mínima do último
          if (userPath.length > 0) {
            const lastPoint = userPath[userPath.length - 1];
            const dx = x - lastPoint.x;
            const dy = y - lastPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 10) {
              userPath.push({ x, y });
              drawVectorField();
            }
          }
        });

        canvas.addEventListener('mouseup', function () {
          isDrawing = false;
        });

        // Manipuladores de eventos para controles
        document
          .getElementById('aSlider')
          .addEventListener('input', function (e) {
            aValue = parseFloat(e.target.value);
            document.getElementById('aValue').textContent = aValue.toFixed(1);
            drawVectorField();
          });

        document
          .getElementById('bSlider')
          .addEventListener('input', function (e) {
            bValue = parseFloat(e.target.value);
            document.getElementById('bValue').textContent = bValue.toFixed(1);
            drawVectorField();
          });

        document
          .getElementById('circlePathBtn')
          .addEventListener('click', function () {
            pathType = 'circle';
            userPath = [];
            pathClosed = false;
            drawVectorField();
          });

        document
          .getElementById('userPathBtn')
          .addEventListener('click', function () {
            pathType = 'user';
            userPath = [];
            pathClosed = false;
            drawVectorField();
          });

        document
          .getElementById('resetPathBtn')
          .addEventListener('click', function () {
            userPath = [];
            pathClosed = false;
            drawVectorField();
          });

        // Desenhar a visualização inicial
        drawVectorField();
      }

      // Visualização 2: Fronteiras C¹
      function initC1BoundaryVisualization() {
        const canvas = document.getElementById('c1BoundaryCanvas');
        if (!canvas || canvas.initialized) return;
        canvas.initialized = true;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Configuração inicial
        const center = { x: width / 2, y: height / 2 };
        let aValue = 4;
        let bValue = 3;
        let rotation = 0;
        let controlPoints = [];
        let boundaryType = 'ellipse';

        // Configuração do campo vetorial
        const field = {
          // Campo: F(x,y) = (y², x²)
          P: (x, y) => y * y,
          Q: (x, y) => x * x,
          // Rotacional: ∂Q/∂x - ∂P/∂y
          curl: (x, y) => 2 * x - 2 * y,
        };

        // Inicializar pontos de controle para curva personalizada
        function initControlPoints() {
          controlPoints = [];
          const angleStep = Math.PI / 6;
          for (let angle = 0; angle < 2 * Math.PI; angle += angleStep) {
            const x = center.x + 120 * Math.cos(angle);
            const y = center.y + 120 * Math.sin(angle);
            controlPoints.push({ x, y, angle });
          }
        }

        // Função para desenhar a visualização
        function drawVisualization() {
          ctx.clearRect(0, 0, width, height);

          // Escala e deslocamento para centralizar
          const scale = 50;

          // Desenhar eixos
          ctx.strokeStyle = 'rgba(150, 150, 150, 0.5)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, center.y);
          ctx.lineTo(width, center.y);
          ctx.moveTo(center.x, 0);
          ctx.lineTo(center.x, height);
          ctx.stroke();

          // Desenhar grade para referência
          ctx.strokeStyle = 'rgba(100, 100, 100, 0.2)';
          ctx.beginPath();
          for (let i = 0; i < width; i += scale) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
          }
          for (let j = 0; j < height; j += scale) {
            ctx.moveTo(0, j);
            ctx.lineTo(width, j);
          }
          ctx.stroke();

          // Desenhar campo vetorial
          ctx.strokeStyle = 'rgba(100, 181, 246, 0.7)';
          ctx.fillStyle = 'rgba(100, 181, 246, 0.7)';

          const gridSize = 50;
          for (let i = 0; i <= width; i += gridSize) {
            for (let j = 0; j <= height; j += gridSize) {
              const x = (i - center.x) / scale;
              const y = (center.y - j) / scale;

              const vx = field.P(x, y);
              const vy = field.Q(x, y);

              // Normalizar para visualização
              const mag = Math.sqrt(vx * vx + vy * vy);
              const normalizedLength = mag ? gridSize * 0.3 : 0;

              if (mag > 0) {
                const nx = (vx / mag) * normalizedLength;
                const ny = (-vy / mag) * normalizedLength;

                ctx.beginPath();
                ctx.moveTo(i, j);
                ctx.lineTo(i + nx, j + ny);
                ctx.stroke();

                // Seta na ponta do vetor
                const angle = Math.atan2(ny, nx);
                ctx.beginPath();
                ctx.moveTo(i + nx, j + ny);
                ctx.lineTo(
                  i + nx - 3 * Math.cos(angle - Math.PI / 6),
                  j + ny - 3 * Math.sin(angle - Math.PI / 6)
                );
                ctx.lineTo(
                  i + nx - 3 * Math.cos(angle + Math.PI / 6),
                  j + ny - 3 * Math.sin(angle + Math.PI / 6)
                );
                ctx.closePath();
                ctx.fill();
              }
            }
          }

          // Desenhar a fronteira
          if (boundaryType === 'ellipse') {
            drawEllipse();
            calculateEllipseResults();
          } else if (boundaryType === 'custom') {
            drawCustomBoundary();
            calculateCustomResults();
          }
        }

        // Desenhar elipse
        function drawEllipse() {
          const a = aValue * 50;
          const b = bValue * 50;

          ctx.strokeStyle = 'rgba(255, 90, 95, 0.8)';
          ctx.lineWidth = 2;
          ctx.beginPath();

          for (let angle = 0; angle <= 2 * Math.PI; angle += 0.01) {
            const rotatedAngle = angle + rotation;
            const x = center.x + a * Math.cos(rotatedAngle);
            const y = center.y + b * Math.sin(rotatedAngle);

            if (angle === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.closePath();
          ctx.stroke();
        }

        // Desenhar fronteira personalizada usando pontos de controle
        function drawCustomBoundary() {
          if (controlPoints.length < 3) return;

          ctx.strokeStyle = 'rgba(255, 90, 95, 0.8)';
          ctx.lineWidth = 2;
          ctx.beginPath();

          // Usar curva fechada suave passando pelos pontos de controle
          ctx.moveTo(controlPoints[0].x, controlPoints[0].y);

          for (let i = 0; i <= controlPoints.length; i++) {
            const p0 = controlPoints[i % controlPoints.length];
            const p1 = controlPoints[(i + 1) % controlPoints.length];

            ctx.lineTo(p1.x, p1.y);
          }

          ctx.stroke();

          // Desenhar pontos de controle
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          for (const point of controlPoints) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            ctx.fill();
          }
        }

        // Calcular resultados para a elipse
        function calculateEllipseResults() {
          const a = aValue;
          const b = bValue;

          // Para este campo, podemos calcular a integral analiticamente
          // A área da elipse é π·a·b
          const area = Math.PI * a * b;

          // Atualizar resultados na interface
          document.getElementById('boundaryArea').textContent = area.toFixed(4);
          document.getElementById('boundarySmooth').textContent = 'Sim (C∞)';

          // Para este campo específico, podemos calcular a integral de linha
          const lineIntegral = Math.PI * a * a * b;
          document.getElementById('boundaryLineIntegral').textContent =
            lineIntegral.toFixed(4);
        }

        // Calcular resultados para a fronteira personalizada
        function calculateCustomResults() {
          if (controlPoints.length < 3) return;

          // Calcular área aproximada usando soma de triângulos
          let area = 0;
          for (let i = 0; i < controlPoints.length; i++) {
            const j = (i + 1) % controlPoints.length;
            area += controlPoints[i].x * controlPoints[j].y;
            area -= controlPoints[j].x * controlPoints[i].y;
          }
          area = Math.abs(area) / 2;

          // Converter para unidades do campo
          const scale = 50;
          area = area / (scale * scale);

          // Verificar se a curva é suave (C¹)
          let isSmooth = true;
          for (let i = 0; i < controlPoints.length; i++) {
            const prev =
              controlPoints[
                (i - 1 + controlPoints.length) % controlPoints.length
              ];
            const curr = controlPoints[i];
            const next = controlPoints[(i + 1) % controlPoints.length];

            // Calcular vetores entre pontos
            const v1 = { x: curr.x - prev.x, y: curr.y - prev.y };
            const v2 = { x: next.x - curr.x, y: next.y - curr.y };

            // Normalizar vetores
            const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
            const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

            if (mag1 > 0 && mag2 > 0) {
              const dot = (v1.x * v2.x + v1.y * v2.y) / (mag1 * mag2);

              // Se o ângulo for muito acentuado, a curva não é suave
              if (dot < 0) {
                isSmooth = false;
                break;
              }
            }
          }

          // Atualizar resultados na interface
          document.getElementById('boundaryArea').textContent = area.toFixed(4);
          document.getElementById('boundarySmooth').textContent = isSmooth
            ? 'Sim (aproximadamente)'
            : 'Não (tem cantos)';

          // Estimativa da integral de linha (aproximação)
          const lineIntegral = area * 2; // Simplificação para este campo específico
          document.getElementById('boundaryLineIntegral').textContent =
            lineIntegral.toFixed(4);
        }

        // Manipuladores de eventos para controles
        document
          .getElementById('aParamSlider')
          .addEventListener('input', function (e) {
            aValue = parseFloat(e.target.value);
            document.getElementById('aParamValue').textContent =
              aValue.toFixed(1);
            drawVisualization();
          });

        document
          .getElementById('bParamSlider')
          .addEventListener('input', function (e) {
            bValue = parseFloat(e.target.value);
            document.getElementById('bParamValue').textContent =
              bValue.toFixed(1);
            drawVisualization();
          });

        document
          .getElementById('rotationSlider')
          .addEventListener('input', function (e) {
            rotation = (parseFloat(e.target.value) * Math.PI) / 180;
            document.getElementById('rotationValue').textContent =
              e.target.value + '°';
            drawVisualization();
          });

        document
          .getElementById('ellipseBoundaryBtn')
          .addEventListener('click', function () {
            boundaryType = 'ellipse';
            drawVisualization();
          });

        document
          .getElementById('customBoundaryBtn')
          .addEventListener('click', function () {
            boundaryType = 'custom';
            initControlPoints();
            drawVisualization();
          });

        // Eventos para manipular pontos de controle
        let draggedPointIndex = -1;

        canvas.addEventListener('mousedown', function (e) {
          if (boundaryType !== 'custom') return;

          const rect = canvas.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          // Verificar se clicou em algum ponto de controle
          for (let i = 0; i < controlPoints.length; i++) {
            const dx = mouseX - controlPoints[i].x;
            const dy = mouseY - controlPoints[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 10) {
              draggedPointIndex = i;
              break;
            }
          }
        });

        canvas.addEventListener('mousemove', function (e) {
          if (draggedPointIndex === -1 || boundaryType !== 'custom') return;

          const rect = canvas.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          // Atualizar posição do ponto arrastado
          controlPoints[draggedPointIndex].x = mouseX;
          controlPoints[draggedPointIndex].y = mouseY;

          drawVisualization();
        });

        canvas.addEventListener('mouseup', function () {
          draggedPointIndex = -1;
        });

        // Inicializar pontos de controle e desenhar visualização inicial
        initControlPoints();
        drawVisualization();
      }

      // Visualização 3: Campos Conservativos vs. Rotativos
      function initVectorFieldVisualization() {
        const canvas = document.getElementById('vectorFieldCanvas');
        if (!canvas || canvas.initialized) return;
        canvas.initialized = true;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Configuração inicial
        const center = { x: width / 2, y: height / 2 };
        let fieldType = 'rotational';
        let particlesVisible = true;
        let particles = [];

        // Definição dos campos vetoriais
        const fields = {
          conservative: {
            // Campo conservativo: F(x,y) = (x, y) = ∇(x²/2 + y²/2)
            P: (x, y) => x,
            Q: (x, y) => y,
            potential: (x, y) => (x * x + y * y) / 2,
            curl: () => 0,
          },
          rotational: {
            // Campo rotacional: F(x,y) = (-y, x)
            P: (x, y) => -y,
            Q: (x, y) => x,
            curl: () => 2,
          },
        };

        // Inicializar partículas
        function initParticles(count = 50) {
          particles = [];
          for (let i = 0; i < count; i++) {
            // Distribuir as partículas em círculo
            const angle = Math.random() * 2 * Math.PI;
            const radius = 20 + Math.random() * 80;

            particles.push({
              x: center.x + radius * Math.cos(angle),
              y: center.y + radius * Math.sin(angle),
              life: 0,
              maxLife: 200 + Math.round(Math.random() * 100),
            });
          }
        }

        // Função principal de renderização
        function drawVisualization() {
          ctx.clearRect(0, 0, width, height);

          // Escala e deslocamento
          const scale = 40;

          // Desenhar eixos
          ctx.strokeStyle = 'rgba(150, 150, 150, 0.5)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, center.y);
          ctx.lineTo(width, center.y);
          ctx.moveTo(center.x, 0);
          ctx.lineTo(center.x, height);
          ctx.stroke();

          // Selecionar o campo ativo
          const field = fields[fieldType];

          // Desenhar campo de potencial apenas para campo conservativo
          if (fieldType === 'conservative') {
            drawPotentialField(field);
          }

          // Desenhar campo vetorial
          drawVectorField(field);

          // Desenhar e atualizar partículas
          if (particlesVisible) {
            updateAndDrawParticles(field);
          }

          // Desenhar caminho de integração
          drawIntegrationPath();

          // Atualizar resultados
          updateResults(field);
        }

        // Desenhar o campo de potencial (apenas para campo conservativo)
        function drawPotentialField(field) {
          // Desenhar contornos de potencial
          const levels = 5;
          const maxRadius = 120;

          ctx.strokeStyle = 'rgba(100, 181, 246, 0.3)';
          ctx.lineWidth = 1;

          for (let i = 1; i <= levels; i++) {
            const radius = (i / levels) * maxRadius;

            ctx.beginPath();
            ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
            ctx.stroke();
          }
        }

        // Desenhar o campo vetorial
        function drawVectorField(field) {
          ctx.strokeStyle = 'rgba(100, 181, 246, 0.8)';
          ctx.fillStyle = 'rgba(100, 181, 246, 0.8)';

          const gridSize = 40;
          const scale = 40;

          for (let i = 0; i <= width; i += gridSize) {
            for (let j = 0; j <= height; j += gridSize) {
              const x = (i - center.x) / scale;
              const y = (center.y - j) / scale;

              const vx = field.P(x, y);
              const vy = field.Q(x, y);

              // Normalizar para visualização
              const mag = Math.sqrt(vx * vx + vy * vy);
              const normalizedLength = mag ? gridSize * 0.7 : 0;

              if (mag > 0) {
                const nx = (vx / mag) * normalizedLength;
                const ny = (-vy / mag) * normalizedLength;

                ctx.beginPath();
                ctx.moveTo(i, j);
                ctx.lineTo(i + nx, j + ny);
                ctx.stroke();

                // Seta na ponta do vetor
                const angle = Math.atan2(ny, nx);
                ctx.beginPath();
                ctx.moveTo(i + nx, j + ny);
                ctx.lineTo(
                  i + nx - 3 * Math.cos(angle - Math.PI / 6),
                  j + ny - 3 * Math.sin(angle - Math.PI / 6)
                );
                ctx.lineTo(
                  i + nx - 3 * Math.cos(angle + Math.PI / 6),
                  j + ny - 3 * Math.sin(angle + Math.PI / 6)
                );
                ctx.closePath();
                ctx.fill();
              }
            }
          }
        }

        // Atualizar e desenhar partículas
        function updateAndDrawParticles(field) {
          const scale = 40;
          const dt = 0.1;

          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Coordenadas no sistema do campo
            const x = (p.x - center.x) / scale;
            const y = (center.y - p.y) / scale;

            // Obter velocidade do campo
            const vx = field.P(x, y);
            const vy = field.Q(x, y);

            // Atualizar posição
            p.x += vx * dt * scale;
            p.y -= vy * dt * scale;

            // Incrementar vida da partícula
            p.life += 1;

            // Desenhar partícula
            const alpha = 1 - p.life / p.maxLife;
            ctx.globalAlpha = alpha;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
            ctx.fill();

            // Resetar partícula se saiu do canvas ou expirou
            if (
              p.x < 0 ||
              p.x > width ||
              p.y < 0 ||
              p.y > height ||
              p.life >= p.maxLife
            ) {
              // Reposicionar em um círculo ao redor do centro
              const angle = Math.random() * 2 * Math.PI;
              const radius = 20 + Math.random() * 80;

              p.x = center.x + radius * Math.cos(angle);
              p.y = center.y + radius * Math.sin(angle);
              p.life = 0;
            }
          }

          ctx.globalAlpha = 1.0;
        }

        // Desenhar caminhos de integração
        function drawIntegrationPath() {
          ctx.strokeStyle = 'rgba(255, 90, 95, 0.8)';
          ctx.lineWidth = 2;

          // Desenhar dois caminhos fechados diferentes
          const pathRadius = 80;

          // Caminho 1: Círculo
          ctx.beginPath();
          ctx.arc(center.x, center.y, pathRadius, 0, 2 * Math.PI);
          ctx.stroke();

          // Caminho 2: Retângulo
          const rectSize = pathRadius * 1.2;
          ctx.beginPath();
          ctx.rect(
            center.x - rectSize / 2,
            center.y - rectSize / 2,
            rectSize,
            rectSize
          );
          ctx.stroke();

          // Indicar direção de integração com setas
          ctx.fillStyle = 'rgba(255, 90, 95, 0.8)';

          // Seta no círculo
          const arrowAngle = Math.PI / 4;
          const arrowX = center.x + pathRadius * Math.cos(arrowAngle);
          const arrowY = center.y + pathRadius * Math.sin(arrowAngle);

          ctx.beginPath();
          ctx.moveTo(arrowX, arrowY);
          ctx.lineTo(arrowX + 8, arrowY - 4);
          ctx.lineTo(arrowX + 8, arrowY + 4);
          ctx.closePath();
          ctx.fill();

          // Seta no retângulo
          ctx.beginPath();
          ctx.moveTo(center.x + rectSize / 2 - 20, center.y - rectSize / 2);
          ctx.lineTo(center.x + rectSize / 2 - 12, center.y - rectSize / 2 - 4);
          ctx.lineTo(center.x + rectSize / 2 - 12, center.y - rectSize / 2 + 4);
          ctx.closePath();
          ctx.fill();
        }

        // Atualizar resultados
        function updateResults(field) {
          // Para o campo rotacional, a integral de linha não é zero
          // Para o campo conservativo, a integral de linha é zero

          const isConservative = fieldType === 'conservative';
          const circleRadius = 80 / 40; // Raio em unidades do campo

          document.getElementById('fieldCurl').textContent = field
            .curl()
            .toFixed(2);
          document.getElementById('fieldType').textContent = isConservative
            ? 'Conservativo'
            : 'Rotacional';

          // Calcular integral de linha para o círculo
          let circleIntegral;
          if (isConservative) {
            circleIntegral = 0;
          } else {
            // Para o campo rotacional (-y, x), a integral é 2πr²
            circleIntegral = 2 * Math.PI * circleRadius * circleRadius;
          }

          // Calcular integral de linha para o retângulo
          let rectIntegral;
          if (isConservative) {
            rectIntegral = 0;
          } else {
            // Para o campo rotacional, é a área do retângulo * curl
            const rectSize = circleRadius * 1.2;
            rectIntegral = rectSize * rectSize * 2;
          }

          document.getElementById('pathCircleIntegral').textContent =
            circleIntegral.toFixed(4);
          document.getElementById('pathRectIntegral').textContent =
            rectIntegral.toFixed(4);
        }

        // Manipuladores de eventos para controles
        document
          .getElementById('conservativeFieldBtn')
          .addEventListener('click', function () {
            fieldType = 'conservative';
            drawVisualization();
          });

        document
          .getElementById('rotationalFieldBtn')
          .addEventListener('click', function () {
            fieldType = 'rotational';
            drawVisualization();
          });

        document
          .getElementById('toggleParticlesBtn')
          .addEventListener('click', function () {
            particlesVisible = !particlesVisible;
            this.textContent = particlesVisible
              ? 'Ocultar Partículas'
              : 'Mostrar Partículas';
            drawVisualization();
          });

        document
          .getElementById('resetParticlesBtn')
          .addEventListener('click', function () {
            initParticles();
            drawVisualization();
          });

        // Inicializar partículas e começar visualização
        initParticles();
        drawVisualization();

        // Animar partículas
        function animate() {
          if (particlesVisible) {
            drawVisualization();
          }
          requestAnimationFrame(animate);
        }

        animate();
      }

      // Visualização 4: Fontes e Sumidouros (Divergência)
      function initDivergenceVisualization() {
        const canvas = document.getElementById('divergenceCanvas');
        if (!canvas || canvas.initialized) return;
        canvas.initialized = true;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Configuração inicial
        const center = { x: width / 2, y: height / 2 };
        let sourceStrength = 1.0;
        let sinkStrength = 1.0;
        let particles = [];
        let showDivergence = true;

        // Posições das fontes e sumidouros
        const sourcePosition = { x: center.x - 100, y: center.y };
        const sinkPosition = { x: center.x + 100, y: center.y };

        // Função que define o campo vetorial
        function fieldVector(x, y) {
          // Converter para coordenadas do campo
          const fx = (x - center.x) / 40;
          const fy = (center.y - y) / 40;

          // Posições das fontes e sumidouros no sistema do campo
          const sourceX = (sourcePosition.x - center.x) / 40;
          const sourceY = (center.y - sourcePosition.y) / 40;
          const sinkX = (sinkPosition.x - center.x) / 40;
          const sinkY = (center.y - sinkPosition.y) / 40;

          // Calcular vetor da fonte (radiação para fora)
          const sourceDistX = fx - sourceX;
          const sourceDistY = fy - sourceY;
          const sourceDistSq =
            sourceDistX * sourceDistX + sourceDistY * sourceDistY;
          const sourceDist = Math.sqrt(sourceDistSq);

          // Calcular vetor do sumidouro (radiação para dentro)
          const sinkDistX = fx - sinkX;
          const sinkDistY = fy - sinkY;
          const sinkDistSq = sinkDistX * sinkDistX + sinkDistY * sinkDistY;
          const sinkDist = Math.sqrt(sinkDistSq);

          // Combinar efeitos (fonte + sumidouro)
          let vx = 0,
            vy = 0;

          if (sourceDist > 0.1) {
            vx += (sourceStrength * sourceDistX) / sourceDistSq;
            vy += (sourceStrength * sourceDistY) / sourceDistSq;
          }

          if (sinkDist > 0.1) {
            vx -= (sinkStrength * sinkDistX) / sinkDistSq;
            vy -= (sinkStrength * sinkDistY) / sinkDistSq;
          }

          return { vx, vy };
        }

        // Calcular divergência no ponto (x, y)
        function calculateDivergence(x, y) {
          const h = 0.1; // Passo para derivada numérica

          // Campo nos pontos deslocados
          const pRight = fieldVector(x + h, y);
          const pLeft = fieldVector(x - h, y);
          const pUp = fieldVector(x, y - h);
          const pDown = fieldVector(x, y + h);

          // Derivadas parciais aproximadas
          const dFx_dx = (pRight.vx - pLeft.vx) / (2 * h);
          const dFy_dy = (pDown.vy - pUp.vy) / (2 * h);

          // Divergência
          return dFx_dx + dFy_dy;
        }

        // Inicializar partículas
        function initParticles(count = 200) {
          particles = [];
          for (let i = 0; i < count; i++) {
            // Distribuir as partículas pelo canvas
            const x = Math.random() * width;
            const y = Math.random() * height;

            particles.push({
              x: x,
              y: y,
              age: 0,
              maxAge: 100 + Math.round(Math.random() * 100),
            });
          }
        }

        // Função principal de renderização
        function drawVisualization() {
          ctx.clearRect(0, 0, width, height);

          // Desenhar mapa de divergência
          if (showDivergence) {
            drawDivergenceMap();
          }

          // Desenhar campo vetorial
          drawVectorField();

          // Desenhar e atualizar partículas
          updateAndDrawParticles();

          // Desenhar fontes e sumidouros
          drawSourcesAndSinks();

          // Desenhar caminho de integração
          drawIntegrationPath();

          // Atualizar resultados
          updateResults();
        }

        // Desenhar mapa de divergência
        function drawDivergenceMap() {
          const gridSize = 20;

          for (let i = 0; i < width; i += gridSize) {
            for (let j = 0; j < height; j += gridSize) {
              const div = calculateDivergence(i, j);

              // Mapear divergência para cor
              let r = 0,
                g = 0,
                b = 0,
                a = 0.3;

              if (div > 0) {
                // Fonte: vermelho
                r = Math.min(255, Math.round(div * 200));
                a = Math.min(0.5, 0.1 + div * 0.2);
              } else if (div < 0) {
                // Sumidouro: azul
                b = Math.min(255, Math.round(-div * 200));
                a = Math.min(0.5, 0.1 - div * 0.2);
              }

              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
              ctx.fillRect(i, j, gridSize, gridSize);
            }
          }
        }

        // Desenhar campo vetorial
        function drawVectorField() {
          ctx.strokeStyle = 'rgba(200, 200, 200, 0.7)';
          ctx.fillStyle = 'rgba(200, 200, 200, 0.7)';

          const gridSize = 30;

          for (let i = 0; i <= width; i += gridSize) {
            for (let j = 0; j <= height; j += gridSize) {
              const field = fieldVector(i, j);
              const { vx, vy } = field;

              // Normalizar para visualização
              const mag = Math.sqrt(vx * vx + vy * vy);
              const normalizedLength = Math.min(gridSize * 0.8, mag * 10);

              if (mag > 0.01) {
                const nx = (vx / mag) * normalizedLength;
                const ny = (vy / mag) * normalizedLength;

                ctx.beginPath();
                ctx.moveTo(i, j);
                ctx.lineTo(i + nx, j + ny);
                ctx.stroke();

                // Seta na ponta do vetor
                const angle = Math.atan2(ny, nx);
                ctx.beginPath();
                ctx.moveTo(i + nx, j + ny);
                ctx.lineTo(
                  i + nx - 3 * Math.cos(angle - Math.PI / 6),
                  j + ny - 3 * Math.sin(angle - Math.PI / 6)
                );
                ctx.lineTo(
                  i + nx - 3 * Math.cos(angle + Math.PI / 6),
                  j + ny - 3 * Math.sin(angle + Math.PI / 6)
                );
                ctx.closePath();
                ctx.fill();
              }
            }
          }
        }

        // Atualizar e desenhar partículas
        function updateAndDrawParticles() {
          const dt = 0.5;

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Obter campo no ponto
            const field = fieldVector(p.x, p.y);
            const { vx, vy } = field;

            // Atualizar posição
            p.x += vx * dt * 5;
            p.y += vy * dt * 5;

            // Incrementar idade
            p.age += 1;

            // Desenhar partícula com opacidade baseada na idade
            const alpha = 1 - p.age / p.maxAge;

            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5, 0, 2 * Math.PI);
            ctx.fill();

            // Resetar partícula se saiu do canvas ou envelheceu demais
            if (
              p.x < 0 ||
              p.x > width ||
              p.y < 0 ||
              p.y > height ||
              p.age >= p.maxAge
            ) {
              // Nova posição aleatória
              p.x = Math.random() * width;
              p.y = Math.random() * height;
              p.age = 0;
            }
          }
        }

        // Desenhar fontes e sumidouros
        function drawSourcesAndSinks() {
          // Desenhar fonte (vermelho)
          ctx.fillStyle = `rgba(255, 50, 50, ${0.6 + 0.4 * (sourceStrength / 2)})`;
          ctx.beginPath();
          ctx.arc(sourcePosition.x, sourcePosition.y, 15, 0, 2 * Math.PI);
          ctx.fill();

          // Desenhar sumidouro (azul)
          ctx.fillStyle = `rgba(50, 50, 255, ${0.6 + 0.4 * (sinkStrength / 2)})`;
          ctx.beginPath();
          ctx.arc(sinkPosition.x, sinkPosition.y, 15, 0, 2 * Math.PI);
          ctx.fill();

          // Adicionar símbolos
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          ctx.fillText('+', sourcePosition.x, sourcePosition.y);
          ctx.fillText('-', sinkPosition.x, sinkPosition.y);
        }

        // Desenhar caminho de integração
        function drawIntegrationPath() {
          ctx.strokeStyle = 'rgba(255, 255, 100, 0.8)';
          ctx.lineWidth = 2;

          // Desenhar círculo ao redor das fontes e sumidouros
          ctx.beginPath();
          ctx.arc(center.x, center.y, 150, 0, 2 * Math.PI);
          ctx.stroke();

          // Indicar direção de integração com seta
          ctx.fillStyle = 'rgba(255, 255, 100, 0.8)';

          const arrowAngle = Math.PI / 4;
          const arrowX = center.x + 150 * Math.cos(arrowAngle);
          const arrowY = center.y + 150 * Math.sin(arrowAngle);

          ctx.beginPath();
          ctx.moveTo(arrowX, arrowY);
          ctx.lineTo(arrowX + 10, arrowY);
          ctx.lineTo(arrowX + 7, arrowY - 7);
          ctx.closePath();
          ctx.fill();
        }

        // Atualizar resultados
        function updateResults() {
          // Calcular fluxo total através da fronteira
          // Para o caso de uma fonte e um sumidouro, o fluxo será proporcional à diferença
          const totalFlux = 2 * Math.PI * (sourceStrength - sinkStrength);

          // Calcular a divergência nos pontos das fontes e sumidouros
          const sourceDiv = 2 * Math.PI * sourceStrength;
          const sinkDiv = -2 * Math.PI * sinkStrength;

          document.getElementById('sourceStrengthValue').textContent =
            sourceStrength.toFixed(2);
          document.getElementById('sinkStrengthValue').textContent =
            sinkStrength.toFixed(2);
          document.getElementById('totalFluxValue').textContent =
            totalFlux.toFixed(4);
          document.getElementById('sourceDivValue').textContent =
            sourceDiv.toFixed(4);
          document.getElementById('sinkDivValue').textContent =
            sinkDiv.toFixed(4);
        }

        // Manipuladores de eventos para controles
        document
          .getElementById('sourceSlider')
          .addEventListener('input', function (e) {
            sourceStrength = parseFloat(e.target.value);
            document.getElementById('sourceValue').textContent =
              sourceStrength.toFixed(1);
            drawVisualization();
          });

        document
          .getElementById('sinkSlider')
          .addEventListener('input', function (e) {
            sinkStrength = parseFloat(e.target.value);
            document.getElementById('sinkValue').textContent =
              sinkStrength.toFixed(1);
            drawVisualization();
          });

        document
          .getElementById('toggleDivergenceBtn')
          .addEventListener('click', function () {
            showDivergence = !showDivergence;
            this.textContent = showDivergence
              ? 'Ocultar Mapa de Divergência'
              : 'Mostrar Mapa de Divergência';
            drawVisualization();
          });

        document
          .getElementById('resetParticlesBtn2')
          .addEventListener('click', function () {
            initParticles();
            drawVisualization();
          });

        // Inicializar partículas e começar visualização
        initParticles();
        drawVisualization();

        // Animar a visualização
        function animate() {
          drawVisualization();
          requestAnimationFrame(animate);
        }

        animate();
      }
