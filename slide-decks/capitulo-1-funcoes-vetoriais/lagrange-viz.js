// Visualização dos Pontos de Lagrange L1-L5 para campo vetorial
(function() {
  const canvas = document.getElementById('lagrangeField');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const cx = width / 2;
  const cy = height / 2;
  
  const massRatio = 0.012;
  const separation = 140;
  
  const body1Pos = { x: cx - separation/2, y: cy }; // Sol (maior)
  const body2Pos = { x: cx + separation/2, y: cy }; // Terra (menor)
  
  let showVectors = true;
  let showLagrangePoints = true;
  let showContours = false;
  let gridSize = 55;
  
  const vectorToggle = document.getElementById('vectorToggle');
  const lagrangeToggle = document.getElementById('lagrangeToggle');
  const contoursToggle = document.getElementById('contoursToggle');
  const densitySlider = document.getElementById('densitySlider');
  
  if (vectorToggle) {
    vectorToggle.addEventListener('change', e => { 
      showVectors = e.target.checked; draw(); 
    });
  }
  if (lagrangeToggle) {
    lagrangeToggle.addEventListener('change', e => { 
      showLagrangePoints = e.target.checked; draw(); 
    });
  }
  if (contoursToggle) {
    contoursToggle.addEventListener('change', e => { 
      showContours = e.target.checked; draw(); 
    });
  }
  if (densitySlider) {
    densitySlider.addEventListener('input', e => { 
      gridSize = parseInt(e.target.value); draw(); 
    });
  }
  
  function drawGrid() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 25) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y <= height; y += 25) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
  }
  
  function drawArrow(fromX, fromY, toX, toY, color) {
    const headLen = 4;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI/6), toY - headLen * Math.sin(angle - Math.PI/6));
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI/6), toY - headLen * Math.sin(angle + Math.PI/6));
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
  
  function drawStar(px, py, spikes, outerRadius, innerRadius, color) {
    let rot = Math.PI / 2 * 3;
    let x = px, y = py;
    const step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(px, py - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = px + Math.cos(rot) * outerRadius;
      y = py + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y); 
      rot += step;
      x = px + Math.cos(rot) * innerRadius;
      y = py + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y); 
      rot += step;
    }
    ctx.lineTo(px, py - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  
  function calculateLagrangePoints() {
    const mu = massRatio / (1 + massRatio);
    const L1 = { x: body2Pos.x - separation * Math.pow(mu/3, 1/3), y: cy };
    const L2 = { x: body2Pos.x + separation * Math.pow(mu/3, 1/3) * (1 + mu/3), y: cy };
    const L3 = { x: body1Pos.x - separation * (1 + 7/12 * mu), y: cy };
    const L4 = { x: cx + separation * Math.cos(-Math.PI/3), y: cy + separation * Math.sin(-Math.PI/3) };
    const L5 = { x: cx + separation * Math.cos(Math.PI/3), y: cy + separation * Math.sin(Math.PI/3) };
    return [
      { point: L1, label: 'L1', stable: false },
      { point: L2, label: 'L2', stable: false },
      { point: L3, label: 'L3', stable: false },
      { point: L4, label: 'L4', stable: true },
      { point: L5, label: 'L5', stable: true }
    ];
  }
  
  function drawVectorField() {
    if (!showVectors) return;
    ctx.strokeStyle = 'rgba(102, 187, 106, 0.6)';
    ctx.lineWidth = 1.2;
  
    for (let x = gridSize/2; x < width; x += gridSize) {
      for (let y = gridSize/2; y < height; y += gridSize) {
        const distToBody1 = Math.sqrt((x - body1Pos.x) * (x - body1Pos.x) + (y - body1Pos.y) * (y - body1Pos.y));
        const distToBody2 = Math.sqrt((x - body2Pos.x) * (x - body2Pos.x) + (y - body2Pos.y) * (y - body2Pos.y));
  
        if (distToBody1 < 18 || distToBody2 < 10) continue;
  
        const G = 1.0, M1 = 1.0, M2 = massRatio;
  
        const dx1 = body1Pos.x - x, dy1 = body1Pos.y - y;
        const r1 = Math.sqrt(dx1*dx1 + dy1*dy1);
        const fx1 = G * M1 * dx1 / (r1*r1*r1);
        const fy1 = G * M1 * dy1 / (r1*r1*r1);
  
        const dx2 = body2Pos.x - x, dy2 = body2Pos.y - y;
        const r2 = Math.sqrt(dx2*dx2 + dy2*dy2);
        const fx2 = G * M2 * dx2 / (r2*r2*r2);
        const fy2 = G * M2 * dy2 / (r2*r2*r2);
  
        const fx = fx1 + fx2, fy = fy1 + fy2;
        const magnitude = Math.sqrt(fx*fx + fy*fy);
        if (magnitude < 1e-6) continue;
  
        const maxLen = gridSize * 0.9;
        let scale = maxLen / (gridSize * magnitude);
        scale = Math.min(scale, 2);
  
        drawArrow(x, y, x + fx*scale, y + fy*scale, '#43A047');
      }
    }
  }
  
  function drawContours() {
    if (!showContours) return;
    const numContours = 6;
    for (let level = 1; level <= numContours; level++) {
      ctx.beginPath();
      ctx.arc(body1Pos.x, body1Pos.y, 25 + level*18, 0, Math.PI*2);
      ctx.arc(body2Pos.x, body2Pos.y, 12 + level*6, 0, Math.PI*2);
      ctx.strokeStyle = `rgba(30, 136, 229, ${0.4 - level*0.05})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  
  function draw() {
    ctx.clearRect(0, 0, width, height);
    drawGrid();
    drawContours();
    drawVectorField();
  
    ctx.beginPath();
    ctx.arc(body1Pos.x, body1Pos.y, 20, 0, Math.PI*2);
    ctx.fillStyle = '#ffd54f';
    ctx.fill();
    ctx.strokeStyle = '#ff6f00';
    ctx.lineWidth = 2;
    ctx.stroke();
  
    ctx.beginPath();
    ctx.arc(body2Pos.x, body2Pos.y, 8, 0, Math.PI*2);
    ctx.fillStyle = '#80cbc4';
    ctx.fill();
    ctx.strokeStyle = '#26a69a';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  
    if (showLagrangePoints) {
      const lagrangePoints = calculateLagrangePoints();
      lagrangePoints.forEach(lp => {
        drawStar(lp.point.x, lp.point.y, 5, 8, 4, '#e53935');
        ctx.fillStyle = lp.stable ? '#76ff03' : '#b71c1c';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(lp.label, lp.point.x + 12, lp.point.y - 15);
      });
    }
  }
  
  let initialized = false;

  function init() {
    if (initialized) return;
    initialized = true;
    
    // Adiciona classe ao canvas para estilização correta
    canvas.classList.add('visualization-canvas');
    
    // Inicializa e desenha
    draw();
  }

  // Executa imediatamente se o canvas já estiver visível
  if (canvas.offsetParent !== null) {
    init();
  } else {
    // Aguarda que o DOM esteja pronto
    setTimeout(init, 100);
  }

  // Hook Reveal.js: re-desenha quando o slide se torna ativo
  function handleSlideChange(event) {
    if (event.currentSlide && canvas.closest('section') === event.currentSlide) {
      requestAnimationFrame(draw);
    }
  }

  // Tenta registrar o listener do Reveal.js após ser inicializado
  setTimeout(function() {
    if (typeof Reveal !== 'undefined' && Reveal.on) {
      Reveal.on('slidechanged', handleSlideChange);
      Reveal.on('fragmentshown', function() {
        if (canvas.offsetParent !== null) draw();
      });
    }
  }, 200);

  // Cleanup quando o slide deixa de ser visto
  window.lagrangeViz = { init: init, cleanup: function() { 
    if (typeof Reveal !== 'undefined' && Reveal.off) {
      Reveal.off('slidechanged', handleSlideChange);
    } 
  }};
})();
