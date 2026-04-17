
          // Linhas horizontais e verticais
          for (let y = 0; y <= height; y += 20) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }

          for (let x = 0; x <= width; x += 20) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }

          // Eixos principais
          ctx.strokeStyle = '#4fc3f7';
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.moveTo(0, centerY);
          ctx.lineTo(width, centerY);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(centerX, 0);
          ctx.lineTo(centerX, height);
          ctx.stroke();

          // Desenha o paralelogramo
          ctx.fillStyle = 'rgba(79, 195, 247, 0.3)';
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX + vector1.x, centerY - vector1.y);
          ctx.lineTo(
            centerX + vector1.x + vector2.x,
            centerY - vector1.y - vector2.y
          );
          ctx.lineTo(centerX + vector2.x, centerY - vector2.y);
          ctx.closePath();
          ctx.fill();

          // Desenha os vetores
          ctx.strokeStyle = '#ff5722'; // Cor do vetor 1 (ex: posição)
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX + vector1.x, centerY - vector1.y);
          ctx.stroke();

          // Desenha ponta da seta para vetor 1
          const angle1 = Math.atan2(-vector1.y, vector1.x);
          ctx.beginPath();
          ctx.moveTo(centerX + vector1.x, centerY - vector1.y);
          ctx.lineTo(
            centerX + vector1.x - 8 * Math.cos(angle1 - Math.PI / 6),
            centerY - vector1.y + 8 * Math.sin(angle1 - Math.PI / 6)
          );
          ctx.lineTo(
            centerX + vector1.x - 8 * Math.cos(angle1 + Math.PI / 6),
            centerY - vector1.y + 8 * Math.sin(angle1 + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fillStyle = '#ff5722';
          ctx.fill();

          ctx.strokeStyle = '#4caf50'; // Cor do vetor 2 (ex: velocidade)
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX + vector2.x, centerY - vector2.y);
          ctx.stroke();

          // Desenha ponta da seta para vetor 2
          const angle2 = Math.atan2(-vector2.y, vector2.x);
          ctx.beginPath();
          ctx.moveTo(centerX + vector2.x, centerY - vector2.y);
          ctx.lineTo(
            centerX + vector2.x - 8 * Math.cos(angle2 - Math.PI / 6),
            centerY - vector2.y + 8 * Math.sin(angle2 - Math.PI / 6)
          );
          ctx.lineTo(
            centerX + vector2.x - 8 * Math.cos(angle2 + Math.PI / 6),
            centerY - vector2.y + 8 * Math.sin(angle2 + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fillStyle = '#4caf50';
          ctx.fill();

          // Desenho de produto vetorial
          const crossProduct = vector1.x * vector2.y - vector1.y * vector2.x;
          const crossCenterX = centerX + (vector1.x + vector2.x) / 2;
          const crossCenterY = centerY - (vector1.y + vector2.y) / 2;
          const crossDir = crossProduct >= 0 ? 1 : -1; // 1 for positive (out), -1 for negative (in)

          // Círculo base para indicar a origem do vetor produto vetorial (opcional)
          ctx.beginPath();
          ctx.arc(crossCenterX, crossCenterY, 5, 0, Math.PI * 2);
          ctx.fillStyle =
            crossProduct >= 0
              ? 'rgba(255, 215, 0, 0.6)'
              : 'rgba(255, 105, 180, 0.6)'; // Amarelo para fora, Rosa para dentro
          ctx.fill();
          ctx.strokeStyle = crossProduct >= 0 ? '#ffd700' : '#ff69b4';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Representação simplificada da direção (ponto ou X)
          if (crossProduct >= 0) {
            // Saindo do plano (ponto no centro)
            ctx.beginPath();
            ctx.arc(crossCenterX, crossCenterY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#000000'; // Ponto preto
            ctx.fill();
          } else {
            // Entrando no plano (X)
            ctx.strokeStyle = '#000000'; // X preto
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(crossCenterX - 3, crossCenterY - 3);
            ctx.lineTo(crossCenterX + 3, crossCenterY + 3);
            ctx.moveTo(crossCenterX + 3, crossCenterY - 3);
            ctx.lineTo(crossCenterX - 3, crossCenterY + 3);
            ctx.stroke();
          }

          // Adiciona etiquetas de vetores
          ctx.fillStyle = '#ff5722';
          ctx.font = '14px Arial';
          ctx.fillText(
            `\u{1D4CF}\u{20D7}₁ = (${vector1.x.toFixed(0)}, ${vector1.y.toFixed(0)})`,
            centerX + vector1.x / 2 - 10,
            centerY - vector1.y / 2 - 15
          );

          ctx.fillStyle = '#4caf50';
          ctx.fillText(
            `\u{1D4CF}\u{20D7}₂ = (${vector2.x.toFixed(0)}, ${vector2.y.toFixed(0)})`,
            centerX + vector2.x / 2 + 10,
            centerY - vector2.y / 2 + 25
          );

          // Infos sobre o produto vetorial
          ctx.fillStyle = '#e0e0e0';
          ctx.font = '14px Arial';
          ctx.fillText(
            `Produto vetorial (escalar em 2D): \u{1D4CF}\u{20D7}₁ × \u{1D4CF}\u{20D7}₂ = ${crossProduct.toFixed(0)}`,
            20,
            30
          );
          ctx.fillText(
            `Área do paralelogramo: | \u{1D4CF}\u{20D7}₁ × \u{1D4CF}\u{20D7}₂ | = ${Math.abs(crossProduct).toFixed(0)}`,
            20,
            50
          );

          ctx.fillStyle =
            crossProduct >= 0
              ? 'rgba(255, 215, 0, 0.8)'
              : 'rgba(255, 105, 180, 0.8)';
          ctx.fillText(
            `Orientação: ${crossProduct >= 0 ? 'Positiva (anti-horária)' : 'Negativa (horária)'}`,
            20,
            70
          );

          // Adiciona texto explicativo
          ctx.fillStyle = '#e0e0e0';
          ctx.font = '12px Arial';
          ctx.fillText(
            'O produto vetorial (escalar em 2D) dá a área orientada',
            20,
            height - 40
          );
          ctx.fillText(
            'do paralelogramo. O sinal indica a orientação.',
            20,
            height - 20
          );

          // Pontos para arrastar
          const point1X = centerX + vector1.x;
          const point1Y = centerY - vector1.y;
          const point2X = centerX + vector2.x;
          const point2Y = centerY - vector2.y;

          // Destacar pontos arrastáveis
          ctx.fillStyle = 'rgba(255, 87, 34, 0.3)';
          ctx.beginPath();
          ctx.arc(point1X, point1Y, 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ff5722';
          ctx.beginPath();
          ctx.arc(point1X, point1Y, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
          ctx.beginPath();
          ctx.arc(point2X, point2Y, 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#4caf50';
          ctx.beginPath();
          ctx.arc(point2X, point2Y, 8, 0, Math.PI * 2);
          ctx.fill();
        }

        function updateDeterminantVisualization() {
          drawDeterminantVisualization();
        }

        // Implementação de arrastar vetores
        function getMousePos(canvas, evt) {
          const rect = canvas.getBoundingClientRect();
          const scaleX = canvas.width / rect.width;
          const scaleY = canvas.height / rect.height;

          return {
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY,
          };
        }

        canvas.addEventListener('mousedown', function (e) {
          const pos = getMousePos(canvas, e);
          const mouseX = pos.x;
          const mouseY = pos.y;

          const point1X = centerX + vector1.x;
          const point1Y = centerY - vector1.y;
          const point2X = centerX + vector2.x;
          const point2Y = centerY - vector2.y;

          const dist1 = Math.sqrt(
            Math.pow(mouseX - point1X, 2) + Math.pow(mouseY - point1Y, 2)
          );
          const dist2 = Math.sqrt(
            Math.pow(mouseX - point2X, 2) + Math.pow(mouseY - point2Y, 2)
          );

          if (dist1 < 15) {
            draggingVector = 1;
            canvas.style.cursor = 'grabbing';
          } else if (dist2 < 15) {
            draggingVector = 2;
            canvas.style.cursor = 'grabbing';
          }
        });

        canvas.addEventListener('mousemove', function (e) {
          const pos = getMousePos(canvas, e);
          const mouseX = pos.x;
          const mouseY = pos.y;

          const point1X = centerX + vector1.x;
          const point1Y = centerY - vector1.y;
          const point2X = centerX + vector2.x;
          const point2Y = centerY - vector2.y;

          const dist1 = Math.sqrt(
            Math.pow(mouseX - point1X, 2) + Math.pow(mouseY - point1Y, 2)
          );
          const dist2 = Math.sqrt(
            Math.pow(mouseX - point2X, 2) + Math.pow(mouseY - point2Y, 2)
          );

          // Atualiza cursor apenas se não estiver arrastando
          if (!draggingVector) {
            if (dist1 < 15 || dist2 < 15) {
              canvas.style.cursor = 'grab';
            } else {
              canvas.style.cursor = 'default'; // Ou 'none' se definido no CSS
            }
          }

          if (draggingVector) {
            canvas.style.cursor = 'grabbing'; // Garante cursor enquanto arrasta
            if (draggingVector === 1) {
              vector1.x = mouseX - centerX;
              vector1.y = -(mouseY - centerY);
            } else if (draggingVector === 2) {
              vector2.x = mouseX - centerX;
              vector2.y = -(mouseY - centerY);
            }

            updateDeterminantVisualization();
          }
        });

        canvas.addEventListener('mouseup', function () {
          if (draggingVector) {
            draggingVector = null;
            // Reavalia o cursor baseado na posição atual do mouse
            const pos = getMousePos(canvas, event); // 'event' está disponível no handler
            const mouseX = pos.x;
            const mouseY = pos.y;
            const point1X = centerX + vector1.x;
            const point1Y = centerY - vector1.y;
            const point2X = centerX + vector2.x;
            const point2Y = centerY - vector2.y;
            const dist1 = Math.sqrt(
              Math.pow(mouseX - point1X, 2) + Math.pow(mouseY - point1Y, 2)
            );
            const dist2 = Math.sqrt(
              Math.pow(mouseX - point2X, 2) + Math.pow(mouseY - point2Y, 2)
            );
            if (dist1 < 15 || dist2 < 15) {
              canvas.style.cursor = 'grab';
            } else {
              canvas.style.cursor = 'default'; // Ou 'none'
            }
          }
        });

        canvas.addEventListener('mouseleave', function () {
          if (!draggingVector) {
            // Só reseta se não estiver arrastando para fora
            canvas.style.cursor = 'default'; // Ou 'none'
          }
        });

        // Inicialização
        drawDeterminantVisualization();
      }

      // Visualização da distorção em coordenadas polares (REVISADA - Elemento Polar Alinhado com Vetores)
      function initDistortionCanvas() {
        const canvas = document.getElementById('distortionCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        let pointerX = centerX + 100;
        let pointerY = centerY - 50;

        // Opções de visualização
        let showCartesianElement = true;
        let showPolarElement = true;
        let showTangentVectors = true;

        // Adicionar controles interativos
        let controlsContainer = canvas.parentNode.querySelector(
          '.controls-container.distortion-controls'
        );
        if (!controlsContainer) {
          controlsContainer = document.createElement('div');
          controlsContainer.className =
            'controls-container distortion-controls';
          controlsContainer.style.marginTop = '10px';

          const cartesianToggle = document.createElement('button');
          cartesianToggle.className = 'control-button';
          cartesianToggle.textContent = 'Elem Cartesiano: ON';
          cartesianToggle.onclick = function () {
            showCartesianElement = !showCartesianElement;
            this.textContent = `Elem Cartesiano: ${showCartesianElement ? 'ON' : 'OFF'}`;
            updateDistortionVisualization();
          };

          const polarToggle = document.createElement('button');
          polarToggle.className = 'control-button';
          polarToggle.textContent = 'Elem Polar: ON';
          polarToggle.onclick = function () {
            showPolarElement = !showPolarElement;
            this.textContent = `Elem Polar: ${showPolarElement ? 'ON' : 'OFF'}`;
            updateDistortionVisualization();
          };

          const vectorsToggle = document.createElement('button');
          vectorsToggle.className = 'control-button';
          vectorsToggle.textContent = 'Vetores Tang: ON';
          vectorsToggle.onclick = function () {
            showTangentVectors = !showTangentVectors;
            this.textContent = `Vetores Tang: ${showTangentVectors ? 'ON' : 'OFF'}`;
            updateDistortionVisualization();
          };

          controlsContainer.appendChild(cartesianToggle);
          controlsContainer.appendChild(polarToggle);
          controlsContainer.appendChild(vectorsToggle);
          canvas.parentNode.insertBefore(controlsContainer, canvas.nextSibling);
        }

        function drawDistortionVisualization() {
          ctx.clearRect(0, 0, width, height);

          // --- Desenhos de fundo ---
          ctx.fillStyle = 'rgba(10, 10, 15, 0.7)';
          ctx.fillRect(0, 0, width, height);
          ctx.strokeStyle = 'rgba(79, 195, 247, 0.2)';
          ctx.lineWidth = 0.5;
          for (let y = 0; y <= height; y += 20) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }
          for (let x = 0; x <= width; x += 20) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }
          ctx.strokeStyle = '#4fc3f7';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, centerY);
          ctx.lineTo(width, centerY);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(centerX, 0);
          ctx.lineTo(centerX, height);
          ctx.stroke();
          ctx.strokeStyle = 'rgba(79, 195, 247, 0.3)';
          for (
            let rGrid = 20;
            rGrid <= Math.max(width, height) / 2;
            rGrid += 20
          ) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, rGrid, 0, Math.PI * 2);
            ctx.stroke();
          }
          for (
            let thetaGrid = 0;
            thetaGrid < Math.PI * 2;
            thetaGrid += Math.PI / 12
          ) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
              centerX + (Math.max(width, height) / 2) * Math.cos(thetaGrid),
              centerY - (Math.max(width, height) / 2) * Math.sin(thetaGrid)
            );
            ctx.stroke();
          }
          // --- Fim Fundo ---

          // --- Cálculos ---
          const dx = pointerX - centerX;
          const dy = -(pointerY - centerY);
          let r = Math.sqrt(dx * dx + dy * dy);
          let theta = Math.atan2(dy, dx);
          if (theta < 0) theta += 2 * Math.PI;
          const drFactor = 0.1;
          const dthetaFactor = 0.15;
          const dr = Math.max(5, r * drFactor);
          const dtheta = dthetaFactor;
          const arcLength = r * dtheta;
          // --- Fim Cálculos ---

          // --- Elemento Cartesiano ---
          if (showCartesianElement) {
            const dxy = 10;
            ctx.strokeStyle = '#64b5f6';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.rect(pointerX - dxy / 2, pointerY - dxy / 2, dxy, dxy);
            ctx.stroke();
            ctx.fillStyle = 'rgba(100, 181, 246, 0.2)';
            ctx.fill();
            ctx.fillStyle = '#64b5f6';
            ctx.font = '11px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('dx dy', pointerX, pointerY - dxy / 2 - 5);
            ctx.textAlign = 'start';
          }

          // --- Vetores Tangentes (Origem no PONTO) ---
          // Calculate vector endpoints first, as they are needed for the polar element shape too
          let vec_dr_endX, vec_dr_endY, vec_rdtheta_endX, vec_rdtheta_endY;
          let angle_tangent;

          if (r > 1) {
            // Only calculate if r is valid
            vec_dr_endX = pointerX + dr * Math.cos(theta);
            vec_dr_endY = pointerY - dr * Math.sin(theta);

            angle_tangent = theta + Math.PI / 2; // Tangential direction
            vec_rdtheta_endX = pointerX + arcLength * Math.cos(angle_tangent);
            vec_rdtheta_endY = pointerY - arcLength * Math.sin(angle_tangent);
          }

          if (showTangentVectors && r > 1) {
            // Desenhar Vetor dr
            ctx.beginPath();
            ctx.moveTo(pointerX, pointerY);
            ctx.lineTo(vec_dr_endX, vec_dr_endY);
            ctx.strokeStyle = '#e57373';
            ctx.lineWidth = 2;
            ctx.stroke();
            drawArrowhead(ctx, vec_dr_endX, vec_dr_endY, theta, '#e57373');
            ctx.fillStyle = '#e57373';
            ctx.font = '11px Arial';
            ctx.fillText(
              'dr',
              (pointerX + vec_dr_endX) / 2 + 5 * Math.cos(theta + Math.PI / 2),
              (pointerY + vec_dr_endY) / 2 - 5 * Math.sin(theta + Math.PI / 2)
            );

            // Desenhar Vetor r*dtheta
            ctx.beginPath();
            ctx.moveTo(pointerX, pointerY);
            ctx.lineTo(vec_rdtheta_endX, vec_rdtheta_endY);
            ctx.strokeStyle = '#81c784';
            ctx.lineWidth = 2;
            ctx.stroke();
            drawArrowhead(
              ctx,
              vec_rdtheta_endX,
              vec_rdtheta_endY,
              angle_tangent,
              '#81c784'
            );
            ctx.fillStyle = '#81c784';
            ctx.font = '11px Arial';
            ctx.fillText(
              'r dθ',
              (pointerX + vec_rdtheta_endX) / 2 +
                5 * Math.cos(angle_tangent + Math.PI / 2),
              (pointerY + vec_rdtheta_endY) / 2 -
                5 * Math.sin(angle_tangent + Math.PI / 2)
            );
          }

          // --- Elemento Polar (ALINHADO com Vetores) ---
          if (showPolarElement && r > 1) {
            // Vértices do elemento polar começando no ponto (pointerX, pointerY)
            // v1: O próprio ponto
            const v1x = pointerX;
            const v1y = pointerY;

            // v2: Ponta do vetor dr
            const v2x = vec_dr_endX;
            const v2y = vec_dr_endY;

            // v4: Ponto (r, theta + dtheta) - calculado a partir da origem
            const theta_end = theta + dtheta;
            const v4x = centerX + r * Math.cos(theta_end);
            const v4y = centerY - r * Math.sin(theta_end); // Y invertido

            // v3: Ponto (r + dr, theta + dtheta) - calculado a partir da origem
            const r_outer = r + dr;
            const v3x = centerX + r_outer * Math.cos(theta_end);
            const v3y = centerY - r_outer * Math.sin(theta_end); // Y invertido

            // Desenhar forma do elemento polar
            ctx.beginPath();
            ctx.moveTo(v1x, v1y); // Começa no ponto
            ctx.lineTo(v2x, v2y); // Vai até a ponta do dr
            ctx.lineTo(v3x, v3y); // Vai para (r+dr, theta+dtheta)
            ctx.lineTo(v4x, v4y); // Vai para (r, theta+dtheta)
            ctx.closePath(); // Fecha de volta para v1 (implicitamente)
            ctx.strokeStyle = '#ffb74d';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.fillStyle = 'rgba(255, 183, 77, 0.3)';
            ctx.fill();

            // Rótulo (posicionado perto do centro do *novo* elemento)
            ctx.fillStyle = '#ffb74d';
            ctx.font = '11px Arial';
            // Centro aproximado do novo elemento
            const centerElemX = (v1x + v2x + v3x + v4x) / 4;
            const centerElemY = (v1y + v2y + v3y + v4y) / 4;
            ctx.fillText('r dr dθ', centerElemX + 5, centerElemY + 5);
          }

          // --- Informações e Ponteiro ---
          const jacobian = r;
          ctx.fillStyle = '#e0e0e0';
          ctx.font = '13px Arial';
          ctx.fillText(
            `Cartesianas: (x=${dx.toFixed(0)}, y=${dy.toFixed(0)})`,
            20,
            30
          );
          ctx.fillText(
            `Polares: (r=${r.toFixed(1)}, θ=${((theta * 180) / Math.PI).toFixed(1)}°)`,
            20,
            50
          );
          ctx.fillText(`Jacobiano: |J| = r = ${jacobian.toFixed(1)}`, 20, 70);
          const areaElementValue = r * dr * dtheta;
          ctx.fillText(
            `Área dA ≈ |J| dr dθ ≈ ${areaElementValue.toFixed(1)}`,
            20,
            90
          );

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(pointerX, pointerY);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.beginPath();
          ctx.arc(pointerX, pointerY, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 0.5;
          ctx.stroke();

          ctx.fillStyle = '#e0e0e0';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(
            'Vetores tangentes: dr (vermelho, radial) e r dθ (verde, tangencial) originados no ponto.',
            width / 2,
            height - 35
          );
          ctx.fillText(
            'Elemento de área polar (laranja) definido pelos vetores.',
            width / 2,
            height - 15
          ); // Texto ajustado
          ctx.textAlign = 'start';
        }

        // Função auxiliar para desenhar pontas de seta (sem alterações)
        function drawArrowhead(ctx, x, y, angle, color) {
          const headLength = 8;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x - headLength * Math.cos(angle - Math.PI / 6),
            y + headLength * Math.sin(angle - Math.PI / 6)
          );
          ctx.lineTo(
            x - headLength * Math.cos(angle + Math.PI / 6),
            y + headLength * Math.sin(angle + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fill();
        }

        function updateDistortionVisualization() {
          drawDistortionVisualization();
        }

        function getMousePosDistortion(canvas, evt) {
          const rect = canvas.getBoundingClientRect();
          const scaleX = canvas.width / rect.width;
          const scaleY = canvas.height / rect.height;
          return {
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY,
          };
        }

        // Eventos de mouse e toque (sem alterações)
        canvas.addEventListener('mousemove', function (e) {
          const pos = getMousePosDistortion(canvas, e);
          pointerX = pos.x;
          pointerY = pos.y;
          const dist = Math.sqrt(
            Math.pow(pointerX - centerX, 2) + Math.pow(pointerY - centerY, 2)
          );
          if (dist < 5) {
            const angle = Math.atan2(pointerY - centerY, pointerX - centerX);
            pointerX = centerX + 5 * Math.cos(angle);
            pointerY = centerY + 5 * Math.sin(angle);
          }
          updateDistortionVisualization();
        });
        canvas.addEventListener(
          'touchmove',
          function (e) {
            e.preventDefault();
            if (e.touches.length > 0) {
              const touch = e.touches[0];
              const pos = getMousePosDistortion(canvas, touch);
              pointerX = pos.x;
              pointerY = pos.y;
              const dist = Math.sqrt(
                Math.pow(pointerX - centerX, 2) +
                  Math.pow(pointerY - centerY, 2)
              );
              if (dist < 5) {
                const angle = Math.atan2(
                  pointerY - centerY,
                  pointerX - centerX
                );
                pointerX = centerX + 5 * Math.cos(angle);
                pointerY = centerY + 5 * Math.sin(angle);
              }
              updateDistortionVisualization();
            }
          },
          { passive: false }
        );

        // Inicialização
        updateDistortionVisualization();
      }

      // Visualização do Jacobiano em coordenadas polares (Mantida - Código Idêntico)
      function initPolarJacobianCanvas() {
        const canvas = document.getElementById('polarJacobianCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        let animationFrameId = null; // Para controlar a animação
        let animationFrameCounter = 0;
        let isAnimating = false;

        function drawPolarJacobianVisualization(frame) {
          ctx.clearRect(0, 0, width, height);

          // Background
          ctx.fillStyle = 'rgba(10, 10, 15, 0.7)';
          ctx.fillRect(0, 0, width, height);

          // Grade cartesiana (suave)
          ctx.strokeStyle = 'rgba(79, 195, 247, 0.1)';
          ctx.lineWidth = 0.5;
          const gridBounds = Math.min(centerX, centerY) - 20; // Limitar grade
          for (
            let y = centerY - gridBounds;
            y <= centerY + gridBounds;
            y += 20
          ) {
            ctx.beginPath();
            ctx.moveTo(centerX - gridBounds, y);
            ctx.lineTo(centerX + gridBounds, y);
            ctx.stroke();
          }
          for (
            let x = centerX - gridBounds;
            x <= centerX + gridBounds;
            x += 20
          ) {
            ctx.beginPath();
            ctx.moveTo(x, centerY - gridBounds);
            ctx.lineTo(x, centerY + gridBounds);
            ctx.stroke();
          }

          // Eixos principais
          ctx.strokeStyle = '#4fc3f7';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(centerX - gridBounds, centerY);
          ctx.lineTo(centerX + gridBounds, centerY);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(centerX, centerY - gridBounds);
          ctx.lineTo(centerX, centerY + gridBounds);
          ctx.stroke();

          // Grade polar
          ctx.strokeStyle = 'rgba(79, 195, 247, 0.3)';
          const maxR = gridBounds;
          for (let r = 20; r <= maxR; r += 20) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
            ctx.stroke();
            // Rótulos de raio
            ctx.fillStyle = '#e0e0e0';
            ctx.font = '10px Arial';
            ctx.fillText(`${r}`, centerX + 5, centerY - r - 5); // Y invertido
          }

          // Linhas radiais
          for (let theta = 0; theta < Math.PI * 2; theta += Math.PI / 6) {
            const endX = centerX + maxR * Math.cos(theta);
            const endY = centerY - maxR * Math.sin(theta); // Y invertido

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            // Rótulos de ângulo
            const angle = Math.round((theta * 180) / Math.PI);
            if (angle % 60 === 0 && angle < 360) {
              // Evita sobrepor 0 e 360
              const labelR = maxR + 15;
              const labelX = centerX + labelR * Math.cos(theta);
              const labelY = centerY - labelR * Math.sin(theta); // Y invertido
              ctx.fillStyle = '#e0e0e0';
              ctx.font = '10px Arial';
              ctx.fillText(`${angle}°`, labelX - 10, labelY + 5);
            }
          }

          // Elementos de área
          const dr = 20;
          const dtheta = Math.PI / 12; // Mais elementos angulares

          for (let r = 0; r <= maxR - dr; r += dr) {
            // Começar do r=0
            for (
              let theta = 0;
              theta < Math.PI * 2 - dtheta / 2;
              theta += dtheta
            ) {
              // Evitar sobreposição no final
              // Fator de animação (pulso suave)
              const pulseFactor = isAnimating
                ? 1 + 0.1 * Math.sin(frame * 0.05 + r / 30 + theta * 2)
                : 1;
              const currentDr = dr * pulseFactor; // dr pulsa

              // Cores alternadas baseadas em r e theta
              const colorIndex =
                (Math.floor(r / dr) + Math.floor(theta / dtheta)) % 2;
              const baseAlpha = Math.max(
                0.1,
                Math.min(0.7, ((r + dr / 2) / maxR) * 0.8)
              ); // Alpha aumenta com r
              ctx.fillStyle =
                colorIndex === 0
                  ? `rgba(100, 181, 246, ${baseAlpha})` // Azul claro
                  : `rgba(255, 183, 77, ${baseAlpha})`; // Laranja claro

              // Vértices do elemento (Y invertido)
              const r_inner = r;
              const r_outer = r + currentDr;
              const theta_start = theta;
              const theta_end = theta + dtheta;

              const v1x = centerX + r_inner * Math.cos(theta_start);
              const v1y = centerY - r_inner * Math.sin(theta_start);
              const v2x = centerX + r_outer * Math.cos(theta_start);
              const v2y = centerY - r_outer * Math.sin(theta_start);
              const v3x = centerX + r_outer * Math.cos(theta_end);
              const v3y = centerY - r_outer * Math.sin(theta_end);
              const v4x = centerX + r_inner * Math.cos(theta_end);
              const v4y = centerY - r_inner * Math.sin(theta_end);

              ctx.beginPath();
              ctx.moveTo(v1x, v1y);
              ctx.lineTo(v2x, v2y);
              // Aproximação de arco para bordas curvas (melhora visual)
              const midAngleOuter = (theta_start + theta_end) / 2;
              const midAngleInner = midAngleOuter;
              ctx.quadraticCurveTo(
                centerX + r_outer * Math.cos(midAngleOuter),
                centerY - r_outer * Math.sin(midAngleOuter),
                v3x,
                v3y
              );
              ctx.lineTo(v4x, v4y);
              ctx.quadraticCurveTo(
                centerX + r_inner * Math.cos(midAngleInner),
                centerY - r_inner * Math.sin(midAngleInner),
                v1x,
                v1y
              );
              ctx.closePath();
              ctx.fill();

              // Contorno (opcional, pode poluir)
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }

          // Informações
          ctx.fillStyle = '#e0e0e0';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(
            'Jacobiano em Coordenadas Polares: dA = |J| dr dθ = r dr dθ',
            width / 2,
            30
          );
          ctx.fillText(
            'Elementos de área (dA) aumentam proporcionalmente ao raio (r)',
            width / 2,
            55
          );

          // Instruções
          ctx.font = '12px Arial';
          ctx.fillStyle = isAnimating ? '#ffb74d' : '#81c784'; // Muda cor se animando
          ctx.fillText(
            isAnimating
              ? 'Clique para PARAR a animação'
              : 'Clique para INICIAR a animação',
            width / 2,
            height - 20
          );
          ctx.textAlign = 'start'; // Resetar
        }

        function animateLoop() {
          animationFrameCounter++;
          drawPolarJacobianVisualization(animationFrameCounter);
          animationFrameId = requestAnimationFrame(animateLoop);
        }

        function toggleAnimation() {
          isAnimating = !isAnimating;
          if (isAnimating) {
            if (!animationFrameId) {
              // Evita iniciar múltiplos loops
              animationFrameCounter = 0; // Reinicia contador ao iniciar
              animateLoop();
            }
          } else {
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
              // Redesenha no estado estático ao parar
              drawPolarJacobianVisualization(animationFrameCounter);
            }
          }
        }

        // Evento de clique para animar/parar
        canvas.addEventListener('click', toggleAnimation);

        // Inicialização - desenha estado estático
        drawPolarJacobianVisualization(0);

        // Limpeza ao sair do slide (importante para RAF)
        // Isso deve ser tratado pelo gerenciador de slides principal
        // window.polarJacobianCleanup = function() {
        //    if (animationFrameId) {
        //        cancelAnimationFrame(animationFrameId);
        //        animationFrameId = null;
        //        isAnimating = false;
        //    }
        // }
      }

      // REMOVIDO: initThermalShieldCanvas()

      // Visualização de placa circular (Mantida - Código Idêntico)
      function initPlateVisualization() {
        const canvas = document.getElementById('plateVisualization');
        if (!canvas) {
          // console.log('Plate visualization canvas not found'); // Comentado para produção
          return;
        }

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        let animationFrameIdPlate = null; // ID específico
        let animationTime = 0;

        function drawPlateVisualization() {
          ctx.clearRect(0, 0, width, height);

          // Background
          ctx.fillStyle = 'rgba(10, 10, 15, 0.7)';
          ctx.fillRect(0, 0, width, height);

          // Parâmetros da placa
          const plateRadius = Math.min(width, height) * 0.4; // Ajusta ao canvas

          // Desenhar placa circular (vista de topo)
          ctx.beginPath();
          ctx.arc(centerX, centerY, plateRadius, 0, Math.PI * 2);
          ctx.strokeStyle = '#e0e0e0';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Animação de densidade
          animationTime += 0.02; // Ritmo mais lento

          // Desenhar a densidade variável com gradiente radial
          const densityGradient = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            plateRadius
          );

          // Efeito pulsante de densidade (mais sutil)
          const pulseFactor = 0.5 + 0.5 * Math.sin(animationTime); // Varia entre 0 e 1
          densityGradient.addColorStop(
            0,
            `rgba(255, 165, 0, ${0.4 + 0.4 * pulseFactor})`
          ); // Centro mais denso/opaco
          densityGradient.addColorStop(
            0.6,
            `rgba(255, 120, 0, ${0.3 + 0.3 * pulseFactor})`
          );
          densityGradient.addColorStop(
            1,
            `rgba(255, 80, 0, ${0.2 + 0.2 * pulseFactor})`
          ); // Borda menos densa/opaca

          ctx.beginPath();
          ctx.arc(centerX, centerY, plateRadius, 0, Math.PI * 2);
          ctx.fillStyle = densityGradient;
          ctx.fill();

          // Círculos concêntricos para representar níveis de densidade
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; // Mais suave
          ctx.lineWidth = 1;
          for (let r = plateRadius / 4; r < plateRadius; r += plateRadius / 4) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
            ctx.stroke();

            // Valores de densidade (exemplo simplificado)
            const densityValue =
              800 +
              50 *
                Math.pow(r / (plateRadius / 2), 2) *
                (0.8 + 0.4 * pulseFactor); // Exemplo de cálculo
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '10px Arial';
            ctx.fillText(
              `${Math.round(densityValue)}`,
              centerX + 5,
              centerY - r - 5
            ); // Y invertido
          }

          // Centro de massa (fixo na origem pela simetria)
          ctx.beginPath();
          ctx.arc(centerX, centerY, 5, 0, Math.PI * 2); // Menor
          ctx.fillStyle = '#ff5a5f'; // Vermelho destaque
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Cruz do centro de massa (mais fina)
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(centerX - 6, centerY);
          ctx.lineTo(centerX + 6, centerY);
          ctx.moveTo(centerX, centerY - 6);
          ctx.lineTo(centerX, centerY + 6);
          ctx.stroke();

          // Informações (Contextual)
          ctx.fillStyle = '#e0e0e0';
          ctx.font = '11px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('Placa com Densidade Variável ρ(r)', centerX, 20);
          ctx.fillText(
            'Centro de Massa (0,0) por simetria',
            centerX,
            height - 15
          );
          ctx.textAlign = 'start';

          animationFrameIdPlate = requestAnimationFrame(drawPlateVisualization);
        }

        // Iniciar animação
        drawPlateVisualization();

        // Limpeza ao sair do slide (importante para RAF)
        // Isso deve ser tratado pelo gerenciador de slides principal
        // window.plateVisCleanup = function() {
        //     if (animationFrameIdPlate) {
        //         cancelAnimationFrame(animationFrameIdPlate);
        //         animationFrameIdPlate = null;
        //     }
        // }
      }
    </script>
  </body>
</html>
