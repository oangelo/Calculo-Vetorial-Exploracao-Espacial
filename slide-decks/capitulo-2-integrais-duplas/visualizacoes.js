// Visualizações para Capítulo 2 - Integrais Duplas
      // =============================================
      // VISUALIZAÇÃO DA SOMA DE RIEMANN
      // =============================================
      function initRiemannVisualization() {
        const riemannCanvas = document.getElementById('riemannCanvas');
        if (!riemannCanvas) return;

        const ctx = riemannCanvas.getContext('2d');
        let subdivisions = 4; // Valor inicial
        let angle = 30;
        let scale = 120;
        let isDragging = false;
        let lastX = 0;
        let lastY = 0;

        // Configurar controle deslizante
        const subdivSlider = document.getElementById('subdivSlider');
        const subdivValue = document.getElementById('subdivValue');

        // Atualizar valor do slider
        subdivSlider.addEventListener('input', updateRiemannVisualization);

        // Função da superfície
        function f(x, y) {
          return Math.pow(x, 2) / 4 + Math.pow(y, 2) / 9;
        }

        // Conversão para coordenadas 2D isométricas
        function to2D(x, y, z) {
          const angleRad = (angle * Math.PI) / 180;
          const isoX = (x - y) * Math.cos(angleRad);
          const isoY = ((x + y) * Math.sin(angleRad)) / 2 - z * 0.7;
          return {
            x: isoX * scale + riemannCanvas.width / 2,
            y: isoY * scale + riemannCanvas.height / 2,
          };
        }

        // Função principal de desenho
        function drawRiemannVisualization() {
          ctx.clearRect(0, 0, riemannCanvas.width, riemannCanvas.height);

          // Desenhar eixos
          ctx.beginPath();
          ctx.strokeStyle = '#FF69B4'; // Rosa para eixo X (vetor posição)
          const xStart = to2D(-1.2, 0, 0);
          const xEnd = to2D(1.2, 0, 0);
          ctx.moveTo(xStart.x, xStart.y);
          ctx.lineTo(xEnd.x, xEnd.y);
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = '#4CAF50'; // Verde para eixo Y (vetor velocidade)
          const yStart = to2D(0, -1.2, 0);
          const yEnd = to2D(0, 1.2, 0);
          ctx.moveTo(yStart.x, yStart.y);
          ctx.lineTo(yEnd.x, yEnd.y);
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = '#2196F3'; // Azul para eixo Z
          const zStart = to2D(0, 0, 0);
          const zEnd = to2D(0, 0, 1.2);
          ctx.moveTo(zStart.x, zStart.y);
          ctx.lineTo(zEnd.x, zEnd.y);
          ctx.stroke();

          // Desenhar retângulos da soma de Riemann
          const dx = 2 / subdivisions;
          const dy = 2 / subdivisions;

          for (let i = 0; i < subdivisions; i++) {
            for (let j = 0; j < subdivisions; j++) {
              const x = -1 + i * dx + dx / 2;
              const y = -1 + j * dy + dy / 2;
              const z = f(x, y);

              // Calcular cor baseada na altura
              const blue = Math.min(255, Math.floor(150 + z * 100));
              const strokeColor = `rgba(52, 152, 219, 0.8)`;
              const fillColor = `rgba(52, 152, ${blue}, ${0.2 + z * 0.3})`;

              ctx.beginPath();
              ctx.strokeStyle = strokeColor;
              ctx.fillStyle = fillColor;
              ctx.lineWidth = 1;

              const points = [
                to2D(x - dx / 2, y - dy / 2, 0),
                to2D(x + dx / 2, y - dy / 2, 0),
                to2D(x + dx / 2, y + dy / 2, 0),
                to2D(x - dx / 2, y + dy / 2, 0),
                to2D(x - dx / 2, y - dy / 2, z),
                to2D(x + dx / 2, y - dy / 2, z),
                to2D(x + dx / 2, y + dy / 2, z),
                to2D(x - dx / 2, y + dy / 2, z),
              ];

              // Desenhar base
              ctx.moveTo(points[0].x, points[0].y);
              ctx.lineTo(points[1].x, points[1].y);
              ctx.lineTo(points[2].x, points[2].y);
              ctx.lineTo(points[3].x, points[3].y);
              ctx.lineTo(points[0].x, points[0].y);

              // Desenhar arestas verticais
              for (let k = 0; k < 4; k++) {
                ctx.moveTo(points[k].x, points[k].y);
                ctx.lineTo(points[k + 4].x, points[k + 4].y);
              }

              // Desenhar topo
              ctx.moveTo(points[4].x, points[4].y);
              ctx.lineTo(points[5].x, points[5].y);
              ctx.lineTo(points[6].x, points[6].y);
              ctx.lineTo(points[7].x, points[7].y);
              ctx.lineTo(points[4].x, points[4].y);

              ctx.stroke();
              ctx.fill();
            }
          }

          updateRiemannIntegralValue();
        }

        // Calcular o valor aproximado da integral
        function calculateRiemannApproximation() {
          const dx = 2 / subdivisions;
          const dy = 2 / subdivisions;
          let sum = 0;

          for (let i = 0; i < subdivisions; i++) {
            for (let j = 0; j < subdivisions; j++) {
              const x = -1 + i * dx + dx / 2;
              const y = -1 + j * dy + dy / 2;
              sum += f(x, y) * dx * dy;
            }
          }
          return sum.toFixed(3);
        }

        // Atualizar o valor exibido
        function updateRiemannIntegralValue() {
          const integralValueElement = document.getElementById('integralValue');
          if (integralValueElement) {
            integralValueElement.textContent = calculateRiemannApproximation();
          }
        }

        // Função de atualização baseada nos controles
        function updateRiemannVisualization() {
          subdivisions = parseInt(this.value);
          document.getElementById('subdivValue').textContent = subdivisions;
          drawRiemannVisualization();
        }

        // Função de reset
        window.resetRiemannVisualization = function () {
          subdivisions = 4;
          if (subdivSlider) {
            subdivSlider.value = 4;
            subdivValue.textContent = 4;
          }
          drawRiemannVisualization();
        };

        // Manipuladores de interação com mouse/toque
        riemannCanvas.addEventListener('mousedown', (e) => {
          isDragging = true;
          lastX = e.clientX;
          lastY = e.clientY;
          riemannCanvas.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
          if (!isDragging) return;

          const deltaX = e.clientX - lastX;
          angle = (angle + deltaX * 0.5) % 360;
          lastX = e.clientX;

          drawRiemannVisualization();
        });

        document.addEventListener('mouseup', () => {
          isDragging = false;
          riemannCanvas.style.cursor = 'grab';
        });

        // Iniciar desenho da visualização de Riemann
        drawRiemannVisualization();
      }

      // =============================================
      // VISUALIZAÇÃO DO VOLUME
      // =============================================
      function initVolumeVisualization() {
        const volumeCanvas = document.getElementById('volumeCanvas');
        if (!volumeCanvas) return;

        const volumeCtx = volumeCanvas.getContext('2d');

        // Estado
        let angleZ = 225;
        let angleX = 30;
        let limitSize = 1; // Valor inicial
        let limitXMin = -limitSize;
        let limitXMax = limitSize;
        let limitYMin = -limitSize;
        let limitYMax = limitSize;
        let volumeIsDragging = false;
        let volumeLastX = 0;
        let volumeLastY = 0;

        // Configurar controle deslizante
        const limitRange = document.getElementById('limitRange');
        const limitValue = document.getElementById('limitValue');

        // Atualizar valor do slider
        limitRange.addEventListener('input', updateVolumeVisualization);

        // Função da superfície
        function f(x, y) {
          return Math.pow(x, 2) / 4 + Math.pow(y, 2) / 9;
        }

        // Função de conversão para coordenadas isométricas
        function iso(x, y, z) {
          const scale = 90;
          const angleZRad = (angleZ * Math.PI) / 180;
          const angleXRad = (angleX * Math.PI) / 180;

          // Rotação em torno do eixo Z
          let x1 = x * Math.cos(angleZRad) - y * Math.sin(angleZRad);
          let y1 = x * Math.sin(angleZRad) + y * Math.cos(angleZRad);
          let z1 = z;

          // Rotação em torno do eixo X
          let y2 = y1 * Math.cos(angleXRad) - z1 * Math.sin(angleXRad);
          let z2 = y1 * Math.sin(angleXRad) + z1 * Math.cos(angleXRad);

          return {
            x: volumeCanvas.width / 2 + x1 * scale,
            y: volumeCanvas.height / 2 + y2 * scale,
          };
        }

        // Função principal de renderização do volume
        function drawVolumeVisualization() {
          volumeCtx.clearRect(0, 0, volumeCanvas.width, volumeCanvas.height);

          // Desenhar eixos coordenados
          const origin = iso(0, 0, 0);
          const axisLength = 3;

          // Eixo X - Rosa (vetor posição)
          volumeCtx.beginPath();
          volumeCtx.strokeStyle = '#FF69B4';
          volumeCtx.lineWidth = 1.5;
          const xEnd = iso(axisLength, 0, 0);
          volumeCtx.moveTo(origin.x, origin.y);
          volumeCtx.lineTo(xEnd.x, xEnd.y);
          volumeCtx.stroke();

          // Eixo Y - Verde (vetor velocidade)
          volumeCtx.beginPath();
          volumeCtx.strokeStyle = '#4CAF50';
          const yEnd = iso(0, axisLength, 0);
          volumeCtx.moveTo(origin.x, origin.y);
          volumeCtx.lineTo(yEnd.x, yEnd.y);
          volumeCtx.stroke();

          // Eixo Z - Azul
          volumeCtx.beginPath();
          volumeCtx.strokeStyle = '#2196F3';
          const zEnd = iso(0, 0, axisLength);
          volumeCtx.moveTo(origin.x, origin.y);
          volumeCtx.lineTo(zEnd.x, zEnd.y);
          volumeCtx.stroke();

          // Desenhar região de integração (base)
          volumeCtx.strokeStyle = 'rgba(255, 50, 50, 0.8)';
          volumeCtx.lineWidth = 2;
          volumeCtx.beginPath();
          const r1 = iso(limitXMin, limitYMin, 0);
          const r2 = iso(limitXMax, limitYMin, 0);
          const r3 = iso(limitXMax, limitYMax, 0);
          const r4 = iso(limitXMin, limitYMax, 0);
          volumeCtx.moveTo(r1.x, r1.y);
          volumeCtx.lineTo(r2.x, r2.y);
          volumeCtx.lineTo(r3.x, r3.y);
          volumeCtx.lineTo(r4.x, r4.y);
          volumeCtx.closePath();
          volumeCtx.stroke();

          // Desenhar grade vertical (linhas da superfície até a região)
          volumeCtx.strokeStyle = 'rgba(255,255,255,0.2)';
          volumeCtx.lineWidth = 0.5;
          const step = Math.max(0.5, limitSize / 4); // Ajusta a densidade da grade

          for (let x = limitXMin; x <= limitXMax + 0.01; x += step) {
            for (let y = limitYMin; y <= limitYMax + 0.01; y += step) {
              const p1 = iso(x, y, 0);
              const p2 = iso(x, y, f(x, y));
              volumeCtx.beginPath();
              volumeCtx.moveTo(p1.x, p1.y);
              volumeCtx.lineTo(p2.x, p2.y);
              volumeCtx.stroke();
            }
          }

          // Desenhar superfície
          const resolution = 15;
          const dx = (limitXMax - limitXMin) / resolution;
          const dy = (limitYMax - limitYMin) / resolution;

          for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
              const x1 = limitXMin + i * dx;
              const y1 = limitYMin + j * dy;
              const x2 = x1 + dx;
              const y2 = y1 + dy;

              const z1 = f(x1, y1);
              const z2 = f(x2, y1);
              const z3 = f(x2, y2);
              const z4 = f(x1, y2);

              // Cor baseada na altura média
              const avgZ = (z1 + z2 + z3 + z4) / 4;
              const blue = Math.min(255, Math.floor(150 + avgZ * 70));

              const p1 = iso(x1, y1, z1);
              const p2 = iso(x2, y1, z2);
              const p3 = iso(x2, y2, z3);
              const p4 = iso(x1, y2, z4);

              // Desenhar face preenchida
              volumeCtx.fillStyle = `rgba(52, 152, ${blue}, 0.5)`;
              volumeCtx.beginPath();
              volumeCtx.moveTo(p1.x, p1.y);
              volumeCtx.lineTo(p2.x, p2.y);
              volumeCtx.lineTo(p3.x, p3.y);
              volumeCtx.lineTo(p4.x, p4.y);
              volumeCtx.closePath();
              volumeCtx.fill();

              // Desenhar contorno
              volumeCtx.strokeStyle = `rgba(100, 180, 255, 0.7)`;
              volumeCtx.lineWidth = 0.5;
              volumeCtx.beginPath();
              volumeCtx.moveTo(p1.x, p1.y);
              volumeCtx.lineTo(p2.x, p2.y);
              volumeCtx.lineTo(p3.x, p3.y);
              volumeCtx.lineTo(p4.x, p4.y);
              volumeCtx.closePath();
              volumeCtx.stroke();
            }
          }

          // Calcular e exibir volume
          const volume = calculateVolume();
          document.getElementById('volumeValue').textContent =
            volume.toFixed(3);
        }

        // Cálculo do volume
        function calculateVolume() {
          const resolution = 50;
          const dx = (limitXMax - limitXMin) / resolution;
          const dy = (limitYMax - limitYMin) / resolution;
          let sum = 0;

          for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
              const x = limitXMin + (i + 0.5) * dx;
              const y = limitYMin + (j + 0.5) * dy;
              sum += f(x, y) * dx * dy;
            }
          }

          return sum;
        }

        // Função de atualização baseada nos controles
        function updateVolumeVisualization() {
          const value = parseInt(this.value) / 5;
          limitSize = value;
          limitXMin = -limitSize;
          limitXMax = limitSize;
          limitYMin = -limitSize;
          limitYMax = limitSize;
          limitValue.textContent = limitSize.toFixed(1);
          drawVolumeVisualization();
        }

        // Função de reset
        window.resetVolumeVisualization = function () {
          limitSize = 1;
          limitXMin = -limitSize;
          limitXMax = limitSize;
          limitYMin = -limitSize;
          limitYMax = limitSize;
          if (limitRange) {
            limitRange.value = 5;
            limitValue.textContent = '1.0';
          }
          drawVolumeVisualization();
        };

        // Configurar interação de rotação
        volumeCanvas.addEventListener('mousedown', (e) => {
          volumeIsDragging = true;
          volumeLastX = e.clientX;
          volumeLastY = e.clientY;
          volumeCanvas.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
          if (!volumeIsDragging) return;

          const deltaX = e.clientX - volumeLastX;
          const deltaY = e.clientY - volumeLastY;

          angleZ = (angleZ - deltaX * 0.5) % 360;
          angleX = Math.max(-89, Math.min(89, angleX + deltaY * 0.5));

          volumeLastX = e.clientX;
          volumeLastY = e.clientY;

          drawVolumeVisualization();
        });

        document.addEventListener('mouseup', () => {
          volumeIsDragging = false;
          volumeCanvas.style.cursor = 'grab';
        });

        // Iniciar desenho da visualização de volume
        drawVolumeVisualization();
      }

      // =============================================
      // VISUALIZAÇÃO DE APLICAÇÃO PRÁTICA (PAINEL SOLAR EM ÓRBITA)
      // =============================================
      function initApplicationVisualization() {
        const canvas = document.getElementById('applicationVisual');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Parâmetros da órbita
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const a = 120; // Semi-eixo maior da elipse
        const b = 70; // Semi-eixo menor da elipse

        // Parâmetros de animação
        let orbitAngle = 0;
        let animationFrameId;

        function drawApplicationVisualization() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Desenhar órbita elíptica
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, a, b, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.setLineDash([2, 3]);
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.setLineDash([]);

          // Desenhar Sol
          drawSun();

          // Calcular posição atual do satélite na órbita
          const satellitePos = getPositionOnOrbit(orbitAngle);

          // Desenhar linhas de distância
          drawDistanceLines(satellitePos);

          // Desenhar o satélite com painéis solares
          const panelPositions = drawSatellite(satellitePos);

          // Desenhar raios solares diretamente para os painéis
          drawSolarRays(panelPositions);

          // Atualizar ângulo para animação
          orbitAngle += 0.005;
          if (orbitAngle > Math.PI * 2) orbitAngle = 0;

          // Continuar animação
          animationFrameId = requestAnimationFrame(
            drawApplicationVisualization
          );
        }

        function drawSun() {
          // Sol no centro
          ctx.beginPath();
          ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);

          // Gradiente para o sol
          const sunGradient = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            20
          );
          sunGradient.addColorStop(0, '#FFFFFF');
          sunGradient.addColorStop(0.7, '#FFFF00');
          sunGradient.addColorStop(1, '#FFA500');
          ctx.fillStyle = sunGradient;
          ctx.fill();

          // Aura solar
          ctx.beginPath();
          ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
          ctx.fill();
        }

        function getPositionOnOrbit(angle) {
          // Equações paramétricas da elipse
          const x = centerX + a * Math.cos(angle);
          const y = centerY + b * Math.sin(angle);

          return { x, y };
        }

        function drawDistanceLines(position) {
          // Linha do satélite até o sol
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(position.x, position.y);
          ctx.strokeStyle = 'rgba(255, 255, 0, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        function drawSatellite(position) {
          // Calcular ângulo para orientar os painéis em direção ao sol
          const dx = centerX - position.x;
          const dy = centerY - position.y;
          const angle = Math.atan2(dy, dx);

          // Corpo do satélite
          ctx.beginPath();
          ctx.arc(position.x, position.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#CCCCCC';
          ctx.fill();
          ctx.strokeStyle = '#999999';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Painéis solares (sempre orientados para o sol)
          ctx.save();
          ctx.translate(position.x, position.y);
          ctx.rotate(angle);

          // Painel da esquerda
          ctx.beginPath();
          ctx.rect(-30, -5, 20, 10);
          const panelGradient = ctx.createLinearGradient(-30, 0, -10, 0);
          panelGradient.addColorStop(0, '#4fc3f7');
          panelGradient.addColorStop(1, '#1a237e');
          ctx.fillStyle = panelGradient;
          ctx.fill();
          ctx.strokeStyle = '#64b5f6';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Painel da direita
          ctx.beginPath();
          ctx.rect(10, -5, 20, 10);
          const panelGradient2 = ctx.createLinearGradient(10, 0, 30, 0);
          panelGradient2.addColorStop(0, '#1a237e');
          panelGradient2.addColorStop(1, '#4fc3f7');
          ctx.fillStyle = panelGradient2;
          ctx.fill();
          ctx.strokeStyle = '#64b5f6';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Calcular as posições dos centros dos painéis em coordenadas do mundo
          const leftPanelCenter = {
            x: position.x + Math.cos(angle) * -20,
            y: position.y + Math.sin(angle) * -20,
          };

          const rightPanelCenter = {
            x: position.x + Math.cos(angle) * 20,
            y: position.y + Math.sin(angle) * 20,
          };

          ctx.restore();

          return {
            left: leftPanelCenter,
            right: rightPanelCenter,
            angle: angle,
          };
        }

        function drawSolarRays(panelPositions) {
          // Desenhar apenas dois raios solares, um para cada painel
          const distanceFromSun = Math.sqrt(
            Math.pow(panelPositions.left.x - centerX, 2) +
              Math.pow(panelPositions.left.y - centerY, 2)
          );

          // Intensidade baseada na distância
          const normalizedIntensity = Math.min(
            1,
            (a * a) / (distanceFromSun * distanceFromSun)
          );

          // Raio para o painel esquerdo
          drawRayToPanel(panelPositions.left, normalizedIntensity);

          // Raio para o painel direito
          drawRayToPanel(panelPositions.right, normalizedIntensity);
        }

        function drawRayToPanel(panelCenter, intensity) {
          // Calcular direção do sol ao painel
          const dx = panelCenter.x - centerX;
          const dy = panelCenter.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Normalizar o vetor direção
          const dirX = dx / distance;
          const dirY = dy / distance;

          // Ponto de partida no sol
          const startX = centerX + dirX * 20; // Borda do sol
          const startY = centerY + dirY * 20;

          // Desenhar raio solar
          ctx.beginPath();
          ctx.moveTo(startX, startY);

          // Usar 5 segmentos para o raio
          for (let i = 1; i <= 4; i++) {
            const segRatio = i / 5;
            const midX = startX + dx * segRatio;
            const midY = startY + dy * segRatio;

            // Pequena variação perpendicular para efeito visual
            const perpX = -dirY * (i % 2 === 0 ? 2 : -2);
            const perpY = dirX * (i % 2 === 0 ? 2 : -2);

            ctx.lineTo(midX + perpX, midY + perpY);
          }

          // Terminar no centro do painel
          ctx.lineTo(panelCenter.x, panelCenter.y);

          // Estilo do raio
          ctx.strokeStyle = `rgba(255, 215, 0, ${0.4 + intensity * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Brilho no ponto de impacto
          ctx.beginPath();
          ctx.arc(panelCenter.x, panelCenter.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 0, ${0.5 + intensity * 0.5})`;
          ctx.fill();
        }

        // Iniciar a animação
        drawApplicationVisualization();

        // Função para limpar a animação quando o slide mudar
        Reveal.addEventListener('slidechanged', function (event) {
          // Verificar se o canvas está no slide atual
          const currentSlide = event.currentSlide;
          const canvasInCurrentSlide = currentSlide.contains(canvas);

          if (canvasInCurrentSlide) {
            // Reiniciar a animação se o slide se tornou visível
            if (!animationFrameId) {
              animationFrameId = requestAnimationFrame(
                drawApplicationVisualization
              );
            }
          } else {
            // Parar a animação se o slide não está mais visível
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
            }
          }
        });
      }

      // =============================================
      // VISUALIZAÇÃO INTERATIVA DE ORDEM DE INTEGRAÇÃO
      // =============================================
      function initIntegrationVisualization() {
        // Verificar se o canvas existe
        const canvas = document.getElementById('integrationCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Estado da visualização
        let isVerticalOrder = true;
        let isPaused = false;
        let progress = 0;
        let animationSpeed = 3;
        let animationFrameId;

        // Referências para os controles
        const btnVertical = document.getElementById('btnVertical');
        const btnHorizontal = document.getElementById('btnHorizontal');
        const btnPause = document.getElementById('btnPause');
        const btnReset = document.getElementById('btnReset');
        const speedSlider = document.getElementById('speedSlider');

        // Configurar handlers de eventos para os botões (se existirem)
        if (btnVertical) {
          btnVertical.addEventListener('click', function () {
            isVerticalOrder = true;
            btnVertical.classList.add('active');
            btnHorizontal.classList.remove('active');
          });
        }

        if (btnHorizontal) {
          btnHorizontal.addEventListener('click', function () {
            isVerticalOrder = false;
            btnVertical.classList.remove('active');
            btnHorizontal.classList.add('active');
          });
        }

        if (btnPause) {
          btnPause.addEventListener('click', function () {
            isPaused = !isPaused;
            btnPause.textContent = isPaused ? 'Continuar' : 'Pausar';
          });
        }

        if (btnReset) {
          btnReset.addEventListener('click', function () {
            progress = 0;
            isPaused = false;
            if (btnPause) btnPause.textContent = 'Pausar';
          });
        }

        if (speedSlider) {
          speedSlider.addEventListener('input', function () {
            animationSpeed = parseInt(this.value);
          });
        }

        // Configuração do espaço de coordenadas
        const margin = 50;
        const width = canvas.width - 2 * margin;
        const height = canvas.height - 2 * margin;
        const xScale = width / 1.2;
        const yScale = height / 2.4;

        // Transformação de coordenadas
        function transformX(x) {
          return margin + x * xScale;
        }

        function transformY(y) {
          return canvas.height - margin - y * yScale;
        }

        // Desenhar background e triângulo
        function drawBackground() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Desenhar eixos
          ctx.beginPath();
          ctx.strokeStyle = '#808080';
          ctx.lineWidth = 1;

          // Eixo X
          ctx.moveTo(margin, canvas.height - margin);
          ctx.lineTo(margin + width, canvas.height - margin);

          // Eixo Y
          ctx.moveTo(margin, canvas.height - margin);
          ctx.lineTo(margin, canvas.height - margin - height);

          ctx.stroke();

          // Rótulos dos eixos
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';

          // Rótulos do eixo X
          ctx.fillText('0', transformX(0), transformY(-0.15));
          ctx.fillText('1', transformX(1), transformY(-0.15));
          ctx.fillText('x', transformX(1.1), transformY(-0.15));

          // Rótulos do eixo Y
          ctx.textAlign = 'right';
          ctx.fillText('1', transformX(-0.05), transformY(1));
          ctx.fillText('2', transformX(-0.05), transformY(2));
          ctx.fillText('y', transformX(-0.05), transformY(2.2));

          // Desenhar o contorno do triângulo
          ctx.beginPath();
          ctx.moveTo(transformX(0), transformY(0)); // (0,0)
          ctx.lineTo(transformX(1), transformY(0)); // (1,0)
          ctx.lineTo(transformX(0), transformY(2)); // (0,2)
          ctx.closePath();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Rotular os vértices
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('(0,0)', transformX(0) - 15, transformY(0) + 15);
          ctx.fillText('(1,0)', transformX(1) + 15, transformY(0) + 15);
          ctx.fillText('(0,2)', transformX(0) - 15, transformY(2) - 10);

          // Equações das retas
          ctx.textAlign = 'left';
          ctx.fillStyle = '#CCCCCC';
          ctx.fillText('y = 0', transformX(0.5), transformY(0) + 20);
          ctx.fillText('x = 0', transformX(0) - 35, transformY(1));

          // Equação da reta diagonal y = 2(1-x)
          ctx.textAlign = 'center';
          const diagonalMidX = transformX(0.5);
          const diagonalMidY = transformY(1) - 25;
          ctx.fillText('y = 2(1-x)', diagonalMidX, diagonalMidY);
        }

        // Desenhar integração vertical (dy dx)
        function drawVerticalIntegration() {
          const currentX = progress;

          if (currentX <= 1) {
            // Calcular yMax para o valor atual de x
            const yMax = 2 * (1 - currentX);

            // Retângulo semi-transparente para a área restante
            ctx.fillStyle = 'rgba(255, 90, 95, 0.1)';
            ctx.beginPath();
            ctx.moveTo(transformX(currentX), transformY(0));
            ctx.lineTo(transformX(1), transformY(0));
            ctx.lineTo(transformX(0), transformY(2));
            ctx.lineTo(transformX(currentX), transformY(yMax));
            ctx.closePath();
            ctx.fill();

            // Desenhar fatia atual
            ctx.beginPath();
            ctx.moveTo(transformX(currentX), transformY(0));
            ctx.lineTo(transformX(currentX), transformY(yMax));
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(255, 90, 95, 0.8)';
            ctx.stroke();

            // Desenhar indicador de posição x
            ctx.fillStyle = '#FF5A5F';
            ctx.beginPath();
            ctx.arc(transformX(currentX), transformY(0), 5, 0, Math.PI * 2);
            ctx.fill();

            // Valor de x atual
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(
              `x = ${currentX.toFixed(2)}`,
              transformX(currentX),
              transformY(-0.25)
            );

            // Indicar y_max
            ctx.fillStyle = '#FF5A5F';
            ctx.font = '14px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(
              `y_max = 2(1-x) = ${yMax.toFixed(2)}`,
              transformX(1.02),
              transformY(yMax)
            );

            // Desenhar seta
            const arrowX = transformX(1.02);
            const arrowY = transformY(yMax);
            ctx.beginPath();
            ctx.moveTo(arrowX - 5, arrowY);
            ctx.lineTo(arrowX - 15, arrowY);
            ctx.lineTo(transformX(currentX), transformY(yMax));
            ctx.strokeStyle = '#FF5A5F';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Mostrar a integral
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`∫₀¹ ∫₀²⁽¹⁻ˣ⁾ f(x,y) dy dx`, canvas.width / 2, 30);

            // Indicar progresso da integração
            ctx.fillStyle = '#FF5A5F';
            ctx.fillText(
              `Integrando de y=0 até y=${yMax.toFixed(2)} para x=${currentX.toFixed(2)}`,
              canvas.width / 2,
              60
            );
          }
        }

        // Desenhar integração horizontal (dx dy)
        function drawHorizontalIntegration() {
          const currentY = progress * 2; // Escalar para cobrir de 0 a 2

          if (currentY <= 2) {
            // Calcular xMax para o valor atual de y
            const xMax = 1 - currentY / 2;

            // Retângulo semi-transparente para a área restante
            ctx.fillStyle = 'rgba(67, 160, 71, 0.1)';
            ctx.beginPath();
            ctx.moveTo(transformX(0), transformY(currentY));
            ctx.lineTo(transformX(0), transformY(2));
            ctx.lineTo(transformX(0), transformY(0));
            ctx.lineTo(transformX(1), transformY(0));
            if (xMax > 0) {
              ctx.lineTo(transformX(xMax), transformY(currentY));
            }
            ctx.closePath();
            ctx.fill();

            // Desenhar fatia atual
            if (xMax > 0) {
              ctx.beginPath();
              ctx.moveTo(transformX(0), transformY(currentY));
              ctx.lineTo(transformX(xMax), transformY(currentY));
              ctx.lineWidth = 3;
              ctx.strokeStyle = 'rgba(67, 160, 71, 0.8)';
              ctx.stroke();

              // Indicar x_max
              ctx.fillStyle = '#43A047';
              ctx.font = '14px Arial';
              ctx.textAlign = 'left';
              ctx.fillText(
                `x_max = 1-y/2 = ${xMax.toFixed(2)}`,
                transformX(xMax),
                transformY(currentY) - 10
              );

              // Desenhar seta
              const arrowX = transformX(xMax);
              const arrowY = transformY(currentY) - 15;
              ctx.beginPath();
              ctx.moveTo(arrowX, arrowY);
              ctx.lineTo(arrowX, arrowY + 10);
              ctx.lineTo(transformX(xMax), transformY(currentY));
              ctx.strokeStyle = '#43A047';
              ctx.lineWidth = 1;
              ctx.stroke();
            }

            // Desenhar indicador de posição y
            ctx.fillStyle = '#43A047';
            ctx.beginPath();
            ctx.arc(transformX(0), transformY(currentY), 5, 0, Math.PI * 2);
            ctx.fill();

            // Valor de y atual
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '14px Arial';
            ctx.textAlign = 'right';
            ctx.fillText(
              `y = ${currentY.toFixed(2)}`,
              transformX(-0.1),
              transformY(currentY) + 5
            );

            // Mostrar a integral
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`∫₀² ∫₀¹⁻ʸ/² f(x,y) dx dy`, canvas.width / 2, 30);

            // Indicar progresso da integração
            ctx.fillStyle = '#43A047';
            if (xMax >= 0) {
              ctx.fillText(
                `Integrando de x=0 até x=${xMax.toFixed(2)} para y=${currentY.toFixed(2)}`,
                canvas.width / 2,
                60
              );
            } else {
              ctx.fillText(
                `y=${currentY.toFixed(2)} está fora da região`,
                canvas.width / 2,
                60
              );
            }
          }
        }

        // Função de animação principal
        function animate() {
          drawBackground();

          if (isVerticalOrder) {
            drawVerticalIntegration();
          } else {
            drawHorizontalIntegration();
          }

          // Avançar progresso se não pausado
          if (!isPaused) {
            progress += 0.0005 * animationSpeed;

            // Reiniciar quando completar
            if (progress > 1.1) {
              progress = 0;
            }
          }

          animationFrameId = requestAnimationFrame(animate);
        }

        // Iniciar a animação
        animate();

        // Detectar quando o slide é visível ou não
        Reveal.addEventListener('slidechanged', function (event) {
          // Verificar se o canvas está no slide atual
          const currentSlide = event.currentSlide;
          const canvasInCurrentSlide = currentSlide.contains(canvas);

          if (canvasInCurrentSlide) {
            // Reiniciar a animação se o slide se tornou visível
            if (!animationFrameId) {
              animate();
            }
          } else {
            // Parar a animação se o slide não está mais visível
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
            }
          }
        });
      }
    