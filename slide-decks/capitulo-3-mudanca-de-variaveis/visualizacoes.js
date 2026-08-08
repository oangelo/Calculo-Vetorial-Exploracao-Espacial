/*
 * visualizacoes.js — Capítulo 3 (Mudança de Variáveis na Integral Dupla)
 * Facção Soviet, 1961-1964.
 *
 * Visualizações em IIFE, expostas via window:
 *   window.vizPolarJacobian = { init, cleanup }  → polarJacobianCanvas
 *   window.vizBaricentro    = { init, cleanup }  → baricentroCanvas
 *   window.vizAreaCartesiana= { init, cleanup }  → areaCartesianaCanvas
 *   window.vizDuasMassas    = { init, cleanup }  → duasMassasCanvas
 *
 * requestAnimationFrame (nunca timers de intervalo). cleanup cancela o loop
 * quando o slide deixa de estar visível (Reveal 'slidechanged').
 */

function hookVizToReveal(canvasId, onEnter, onLeave) {
  function onSlide(e) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    if (e.currentSlide && e.currentSlide.contains(canvas)) {
      onEnter(canvas);
    } else if (e.previousSlide && e.previousSlide.contains(canvas)) {
      onLeave(canvas);
    }
  }

  function attach() {
    if (typeof window.Reveal === 'undefined' || !Reveal.on) return false;
    if (!document.getElementById('slides-container')) return false;
    Reveal.on('slidechanged', onSlide);
    Reveal.on('ready', onSlide);
    var cur = Reveal.getCurrentSlide && Reveal.getCurrentSlide();
    if (cur) onSlide({ currentSlide: cur, previousSlide: null });
    return true;
  }

  if (attach()) return;
  var tries = 0;
  (function poll() {
    tries++;
    if (attach()) return;
    if (tries < 200) setTimeout(poll, 50);
  })();
}

/* ------------------------------------------------------------------ *
 * vizPolarJacobian — elementos de área em coordenadas polares.
 * Mostra como dA = r dr dθ cresce com o raio. Clique para animar.
 * ------------------------------------------------------------------ */
(function () {
  var canvas = null;
  var ctx = null;
  var W = 0;
  var H = 0;
  var cx = 0;
  var cy = 0;
  var animId = null;
  var frame = 0;
  var isAnimating = false;
  var inited = false;

  function draw(f) {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(10, 10, 15, 0.7)';
    ctx.fillRect(0, 0, W, H);

    var gridBounds = Math.min(cx, cy) - 20;

    ctx.strokeStyle = 'rgba(79, 195, 247, 0.1)';
    ctx.lineWidth = 0.5;
    for (var y = cy - gridBounds; y <= cy + gridBounds; y += 20) {
      ctx.beginPath();
      ctx.moveTo(cx - gridBounds, y);
      ctx.lineTo(cx + gridBounds, y);
      ctx.stroke();
    }
    for (var x = cx - gridBounds; x <= cx + gridBounds; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, cy - gridBounds);
      ctx.lineTo(x, cy + gridBounds);
      ctx.stroke();
    }

    ctx.strokeStyle = '#4fc3f7';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - gridBounds, cy);
    ctx.lineTo(cx + gridBounds, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy - gridBounds);
    ctx.lineTo(cx, cy + gridBounds);
    ctx.stroke();

    var maxR = gridBounds;
    ctx.strokeStyle = 'rgba(79, 195, 247, 0.3)';
    for (var r = 20; r <= maxR; r += 20) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#e0e0e0';
      ctx.font = '10px Arial';
      ctx.fillText(String(r), cx + 5, cy - r - 5);
    }
    for (var th = 0; th < Math.PI * 2; th += Math.PI / 6) {
      var ex = cx + maxR * Math.cos(th);
      var ey = cy - maxR * Math.sin(th);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      var ang = Math.round((th * 180) / Math.PI);
      if (ang % 60 === 0 && ang < 360) {
        var lr = maxR + 15;
        ctx.fillStyle = '#e0e0e0';
        ctx.font = '10px Arial';
        ctx.fillText(ang + '\u00B0', cx + lr * Math.cos(th) - 10, cy - lr * Math.sin(th) + 5);
      }
    }

    var dr = 20;
    var dtheta = Math.PI / 12;
    for (var r2 = 0; r2 <= maxR - dr; r2 += dr) {
      for (var t2 = 0; t2 < Math.PI * 2 - dtheta / 2; t2 += dtheta) {
        var pf = isAnimating
          ? 1 + 0.1 * Math.sin(f * 0.05 + r2 / 30 + t2 * 2)
          : 1;
        var cDr = dr * pf;
        var colorIndex = (Math.floor(r2 / dr) + Math.floor(t2 / dtheta)) % 2;
        var baseAlpha = Math.max(0.1, Math.min(0.7, ((r2 + dr / 2) / maxR) * 0.8));
        ctx.fillStyle =
          colorIndex === 0
            ? 'rgba(30, 136, 229, ' + baseAlpha + ')'
            : 'rgba(255, 179, 0, ' + baseAlpha + ')';

        var rInner = r2;
        var rOuter = r2 + cDr;
        var thStart = t2;
        var thEnd = t2 + dtheta;
        var midA = (thStart + thEnd) / 2;

        ctx.beginPath();
        ctx.moveTo(cx + rInner * Math.cos(thStart), cy - rInner * Math.sin(thStart));
        ctx.lineTo(cx + rOuter * Math.cos(thStart), cy - rOuter * Math.sin(thStart));
        ctx.quadraticCurveTo(
          cx + rOuter * Math.cos(midA),
          cy - rOuter * Math.sin(midA),
          cx + rOuter * Math.cos(thEnd),
          cy - rOuter * Math.sin(thEnd)
        );
        ctx.lineTo(cx + rInner * Math.cos(thEnd), cy - rInner * Math.sin(thEnd));
        ctx.quadraticCurveTo(
          cx + rInner * Math.cos(midA),
          cy - rInner * Math.sin(midA),
          cx + rInner * Math.cos(thStart),
          cy - rInner * Math.sin(thStart)
        );
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    ctx.fillStyle = '#e0e0e0';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('dA = |J| dr d\u03B8 = r dr d\u03B8', W / 2, 28);
    ctx.fillText('o elemento de \u00E1rea cresce com o raio r', W / 2, 50);
    ctx.font = '12px Arial';
    ctx.fillStyle = isAnimating ? '#FFB300' : '#81C784';
    ctx.fillText(
      isAnimating ? 'clique para pausar' : 'clique para animar',
      W / 2,
      H - 18
    );
    ctx.textAlign = 'start';
  }

  function animate() {
    frame++;
    draw(frame);
    animId = requestAnimationFrame(animate);
  }

  function toggle() {
    if (!canvas) return;
    if (isAnimating) {
      isAnimating = false;
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      draw(frame);
    } else {
      isAnimating = true;
      if (!animId) {
        frame = 0;
        animate();
      }
    }
  }

  function init(c) {
    if (!canvas) canvas = c || document.getElementById('polarJacobianCanvas');
    if (!canvas || inited) return;
    if (!ctx) {
      ctx = canvas.getContext('2d');
      W = canvas.width;
      H = canvas.height;
      cx = W / 2;
      cy = H / 2;
    }
    inited = true;
    canvas.addEventListener('click', toggle);
    draw(0);
  }

  function cleanup() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    isAnimating = false;
    frame = 0;
    if (canvas && inited) {
      canvas.removeEventListener('click', toggle);
      inited = false;
    }
  }

  hookVizToReveal('polarJacobianCanvas', init, cleanup);

  window.vizPolarJacobian = { init: init, cleanup: cleanup };
})();

/* ------------------------------------------------------------------ *
 * vizBaricentro — baricentro de chapa irregular por amostragem.
 * Vértices arrastáveis; o baricentro é a média ponderada dos pontos
 * amostrados dentro da região, com densidade ρ crescente em x.
 * ------------------------------------------------------------------ */
(function () {
  var canvas = null;
  var ctx = null;
  var W = 0;
  var H = 0;
  var animId = null;
  var inited = false;
  var dragging = null;

  var verts = [
    { x: 70, y: 130 },
    { x: 150, y: 55 },
    { x: 255, y: 90 },
    { x: 295, y: 185 },
    { x: 235, y: 285 },
    { x: 120, y: 255 },
    { x: 75, y: 190 },
  ];

  function insidePoly(px, py, pts) {
    var inside = false;
    for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      var xi = pts[i].x;
      var yi = pts[i].y;
      var xj = pts[j].x;
      var yj = pts[j].y;
      var intersect =
        (yi > py) !== (yj > py) &&
        px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function getPos(e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) * canvas.width) / rect.width,
      y: ((e.clientY - rect.top) * canvas.height) / rect.height,
    };
  }

  function onDown(e) {
    if (!canvas) return;
    var p = getPos(e);
    for (var i = 0; i < verts.length; i++) {
      var d = Math.sqrt(
        (p.x - verts[i].x) * (p.x - verts[i].x) +
          (p.y - verts[i].y) * (p.y - verts[i].y)
      );
      if (d < 14) {
        dragging = i;
        return;
      }
    }
  }

  function onMove(e) {
    if (!canvas || dragging === null) return;
    var p = getPos(e);
    verts[dragging].x = Math.max(8, Math.min(W - 8, p.x));
    verts[dragging].y = Math.max(8, Math.min(H - 8, p.y));
  }

  function onUp() {
    dragging = null;
  }

  function onTouchMove(e) {
    e.preventDefault();
    if (e.touches.length > 0) onMove(e.touches[0]);
  }

  function attachEvents() {
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('mouseleave', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onUp);
  }

  function detachEvents() {
    canvas.removeEventListener('mousedown', onDown);
    canvas.removeEventListener('mousemove', onMove);
    canvas.removeEventListener('mouseup', onUp);
    canvas.removeEventListener('mouseleave', onUp);
    canvas.removeEventListener('touchstart', onDown);
    canvas.removeEventListener('touchmove', onTouchMove);
    canvas.removeEventListener('touchend', onUp);
  }

  function draw(t) {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(10, 10, 15, 0.85)';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(79, 195, 247, 0.08)';
    ctx.lineWidth = 1;
    for (var g = 0; g <= H; g += 20) {
      ctx.beginPath();
      ctx.moveTo(0, g);
      ctx.lineTo(W, g);
      ctx.stroke();
    }
    for (var g2 = 0; g2 <= W; g2 += 20) {
      ctx.beginPath();
      ctx.moveTo(g2, 0);
      ctx.lineTo(g2, H);
      ctx.stroke();
    }

    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;
    for (var i = 0; i < verts.length; i++) {
      var v = verts[i];
      if (v.x < minX) minX = v.x;
      if (v.x > maxX) maxX = v.x;
      if (v.y < minY) minY = v.y;
      if (v.y > maxY) maxY = v.y;
    }
    var spanX = Math.max(1, maxX - minX);

    function density(x) {
      return 1 + 0.6 * ((x - minX) / spanX);
    }

    var sx = 0;
    var sy = 0;
    var sw = 0;
    var step = 4;
    for (var px = minX; px <= maxX; px += step) {
      for (var py = minY; py <= maxY; py += step) {
        if (!insidePoly(px, py, verts)) continue;
        var rho = density(px);
        sx += px * rho;
        sy += py * rho;
        sw += rho;
        ctx.fillStyle =
          'rgba(30, 136, 229, ' + (0.08 + 0.18 * ((rho - 1) / 0.6)) + ')';
        ctx.fillRect(px - 1, py - 1, 2, 2);
      }
    }

    var c;
    if (sw > 0) {
      c = { x: sx / sw, y: sy / sw };
    } else {
      var ax = 0;
      var ay = 0;
      for (var k = 0; k < verts.length; k++) {
        ax += verts[k].x;
        ay += verts[k].y;
      }
      c = { x: ax / verts.length, y: ay / verts.length };
    }

    ctx.beginPath();
    ctx.moveTo(verts[0].x, verts[0].y);
    for (var p2 = 1; p2 < verts.length; p2++) {
      ctx.lineTo(verts[p2].x, verts[p2].y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(30, 136, 229, 0.08)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(144, 202, 249, 0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();

    for (var h = 0; h < verts.length; h++) {
      ctx.beginPath();
      ctx.arc(verts[h].x, verts[h].y, 5, 0, Math.PI * 2);
      ctx.fillStyle = h === dragging ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(30, 136, 229, 0.9)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    var pulse = 0.5 + 0.5 * Math.sin(t / 300);
    ctx.beginPath();
    ctx.arc(c.x, c.y, 9 + 4 * pulse, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(229, 57, 53, ' + (0.25 + 0.35 * pulse) + ')';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(c.x - 8, c.y);
    ctx.lineTo(c.x + 8, c.y);
    ctx.moveTo(c.x, c.y - 8);
    ctx.lineTo(c.x, c.y + 8);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(c.x, c.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#E53935';
    ctx.fill();

    var wx = (c.x - 20) / (W - 40);
    var wy = 1 - (c.y - 20) / (H - 40);
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      'baricentro (x\u0304, \u0233) \u2248 (' + wx.toFixed(2) + ', ' + wy.toFixed(2) + ')',
      W / 2,
      H - 34
    );
    ctx.font = '11px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText('densidade \u03C1 cresce com x — arraste os v\u00E9rtices', W / 2, H - 12);
    ctx.textAlign = 'start';
  }

  function animate() {
    draw(performance.now ? performance.now() : Date.now());
    animId = requestAnimationFrame(animate);
  }

  function init(c) {
    if (!canvas) canvas = c || document.getElementById('baricentroCanvas');
    if (!canvas || inited) return;
    if (!ctx) {
      ctx = canvas.getContext('2d');
      W = canvas.width;
      H = canvas.height;
    }
    inited = true;
    attachEvents();
    animate();
  }

  function cleanup() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    dragging = null;
    if (canvas && inited) {
      detachEvents();
      inited = false;
    }
  }

  hookVizToReveal('baricentroCanvas', init, cleanup);

  window.vizBaricentro = { init: init, cleanup: cleanup };
})();

/* ------------------------------------------------------------------ *
 * vizAreaCartesiana — elementos de área em coordenadas cartesianas.
 * Mesmo círculo da viz polar, mas com retângulos dA = dx dy (área
 * constante). Clique para animar: as células respiram suavemente e os
 * retângulos cortados pela borda revelam o contorno em "escada".
 * ------------------------------------------------------------------ */
(function () {
  var canvas = null;
  var ctx = null;
  var W = 0;
  var H = 0;
  var cx = 0;
  var cy = 0;
  var animId = null;
  var frame = 0;
  var isAnimating = false;
  var inited = false;

  var SCALE = 100; // px por unidade (círculo de raio 2 → 200px)
  var R = 2;
  var CELL = 0.25; // tamanho da célula em unidades

  function pxX(u) {
    return cx + u * SCALE;
  }

  function pxY(v) {
    return cy - v * SCALE;
  }

  function inside(u, v) {
    return u * u + v * v <= R * R;
  }

  function cellClass(u0, v0) {
    var u1 = u0 + CELL;
    var v1 = v0 + CELL;
    var corners = [
      [u0, v0],
      [u1, v0],
      [u0, v1],
      [u1, v1],
    ];
    var hits = 0;
    for (var i = 0; i < corners.length; i++) {
      if (inside(corners[i][0], corners[i][1])) hits++;
    }
    if (hits === 4) return 'full';
    if (hits > 0) return 'partial';
    var cu = (u0 + u1) / 2;
    var cv2 = (v0 + v1) / 2;
    if (inside(cu, cv2)) return 'partial';
    return 'outside';
  }

  function draw(f) {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(10, 10, 15, 0.7)';
    ctx.fillRect(0, 0, W, H);

    var half = 2.2;
    for (var u = -half; u < half; u += CELL) {
      for (var v = -half; v < half; v += CELL) {
        var cls = cellClass(u, v);
        if (cls === 'outside') continue;
        var pf = isAnimating
          ? 1 + 0.05 * Math.sin(f * 0.05 + u * 1.2 + v * 1.2)
          : 1;
        var size = CELL * SCALE * pf;
        var x = pxX(u) + (CELL * SCALE - size) / 2;
        var y = pxY(v + CELL) + (CELL * SCALE - size) / 2;
        ctx.fillStyle =
          cls === 'full'
            ? 'rgba(30, 136, 229, 0.55)'
            : 'rgba(255, 179, 0, 0.55)';
        ctx.fillRect(x, y, size, size);
      }
    }

    ctx.strokeStyle = '#4fc3f7';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(W, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, H);
    ctx.stroke();

    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, R * SCALE, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#e0e0e0';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('dA = dx dy — \u00E1rea constante', W / 2, 26);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '12px Arial';
    ctx.fillText('ret\u00E2ngulos inteiros: azul \u00B7 cortados pela borda: amarelo', W / 2, 46);
    ctx.fillStyle = isAnimating ? '#FFB300' : '#81C784';
    ctx.fillText(
      isAnimating ? 'clique para pausar' : 'clique para animar',
      W / 2,
      H - 18
    );
    ctx.textAlign = 'start';
  }

  function animate() {
    frame++;
    draw(frame);
    animId = requestAnimationFrame(animate);
  }

  function toggle() {
    if (!canvas) return;
    if (isAnimating) {
      isAnimating = false;
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      draw(frame);
    } else {
      isAnimating = true;
      if (!animId) {
        frame = 0;
        animate();
      }
    }
  }

  function init(c) {
    if (!canvas) canvas = c || document.getElementById('areaCartesianaCanvas');
    if (!canvas || inited) return;
    if (!ctx) {
      ctx = canvas.getContext('2d');
      W = canvas.width;
      H = canvas.height;
      cx = W / 2;
      cy = H / 2;
    }
    inited = true;
    canvas.addEventListener('click', toggle);
    draw(0);
  }

  function cleanup() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    isAnimating = false;
    frame = 0;
    if (canvas && inited) {
      canvas.removeEventListener('click', toggle);
      inited = false;
    }
  }

  hookVizToReveal('areaCartesianaCanvas', init, cleanup);

  window.vizAreaCartesiana = { init: init, cleanup: cleanup };
})();

/* ------------------------------------------------------------------ *
 * vizDuasMassas — duas massas no espaço e o centro de massa.
 * Cubos arrastáveis no plano XY (chão); arrastar fora rotaciona a
 * vista. As massas vêm dos sliders m1/m2: o cubo maior pesa mais e o
 * ponto vermelho — a média ponderada das posições — puxa para o lado
 * da massa maior.
 * ------------------------------------------------------------------ */
(function () {
  var canvas = null;
  var ctx = null;
  var W = 0;
  var H = 0;
  var cx = 0;
  var cy = 0;
  var animId = null;
  var inited = false;

  var SCALE = 48;
  var GROUND = 3;

  var rot = 0;
  var dragMode = null; // 'a' | 'b' | 'rot'
  var lastX = 0;

  var cubeA = { x: -2, y: -1 };
  var cubeB = { x: 2, y: 1 };

  function mass(id) {
    var s = document.getElementById(id);
    if (!s) return 1;
    var v = parseFloat(s.value);
    return isNaN(v) ? 1 : v;
  }

  function side(m) {
    return 0.55 + 0.5 * Math.cbrt(m);
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  function rotXY(x, y) {
    var c = Math.cos(rot);
    var s = Math.sin(rot);
    return { x: x * c - y * s, y: x * s + y * c };
  }

  function proj(x, y, z) {
    var r = rotXY(x, y);
    return {
      x: cx + r.x * SCALE,
      y: cy - z * SCALE * 0.8 + r.y * SCALE * 0.35,
    };
  }

  function groundAt(mx, my) {
    var rx = (mx - cx) / SCALE;
    var ry = (my - cy) / (SCALE * 0.35);
    var c = Math.cos(rot);
    var s = Math.sin(rot);
    return {
      x: rx * c + ry * s,
      y: -rx * s + ry * c,
    };
  }

  function getPos(e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) * canvas.width) / rect.width,
      y: ((e.clientY - rect.top) * canvas.height) / rect.height,
    };
  }

  function drawCube(x, y, m, color, highlight) {
    var s = side(m);
    var h = s / 2;
    var v = [];
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 2; j++) {
        for (var k = 0; k < 2; k++) {
          v.push(proj(x + (i ? h : -h), y + (j ? h : -h), k ? s : 0));
        }
      }
    }
    var faces = [
      [0, 1, 3, 2],
      [4, 5, 7, 6],
      [0, 1, 5, 4],
      [2, 3, 7, 6],
      [0, 2, 6, 4],
      [1, 3, 7, 5],
    ];
    ctx.globalAlpha = highlight ? 0.3 : 0.16;
    for (var f = 0; f < faces.length; f++) {
      var q = faces[f];
      ctx.beginPath();
      ctx.moveTo(v[q[0]].x, v[q[0]].y);
      for (var w = 1; w < q.length; w++) {
        ctx.lineTo(v[q[w]].x, v[q[w]].y);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = highlight ? '#FFFFFF' : color;
      ctx.lineWidth = highlight ? 2 : 1.2;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    return { x: x, y: y, z: s / 2, s: s };
  }

  function cubeInfo(x, y, m) {
    var s = side(m);
    var h = s / 2;
    var corners = [
      proj(x - h, y - h, s),
      proj(x + h, y - h, s),
      proj(x + h, y + h, s),
      proj(x - h, y + h, s),
    ];
    var cx2 = 0;
    var cy2 = 0;
    for (var i = 0; i < 4; i++) {
      cx2 += corners[i].x;
      cy2 += corners[i].y;
    }
    cx2 /= 4;
    cy2 /= 4;
    var maxd = 0;
    for (var j = 0; j < 4; j++) {
      var dx = corners[j].x - cx2;
      var dy = corners[j].y - cy2;
      var d = dx * dx + dy * dy;
      if (d > maxd) maxd = d;
    }
    var r = Math.sqrt(maxd) + 8;
    return { x: cx2, y: cy2, r2: r * r };
  }

  function hoverCube(p) {
    var iA = cubeInfo(cubeA.x, cubeA.y, mass('massa1Slider'));
    var iB = cubeInfo(cubeB.x, cubeB.y, mass('massa2Slider'));
    var dA = (p.x - iA.x) * (p.x - iA.x) + (p.y - iA.y) * (p.y - iA.y);
    var dB = (p.x - iB.x) * (p.x - iB.x) + (p.y - iB.y) * (p.y - iB.y);
    if (dA <= iA.r2 || dB <= iB.r2) {
      return dA <= iA.r2 && (dB > iB.r2 || dA <= dB) ? 'a' : 'b';
    }
    return null;
  }

  function onDown(e) {
    if (!canvas) return;
    var hit = hoverCube(getPos(e));
    if (hit) {
      dragMode = hit;
      canvas.style.cursor = 'grabbing';
      return;
    }
    dragMode = 'rot';
    lastX = getPos(e).x;
  }

  function onMove(e) {
    if (!canvas) return;
    var p = getPos(e);
    if (!dragMode) {
      canvas.style.cursor = hoverCube(p) ? 'grab' : 'default';
      return;
    }
    if (dragMode === 'rot') {
      rot += (p.x - lastX) * 0.01;
      lastX = p.x;
      return;
    }
    var g = groundAt(p.x, p.y);
    var tgt = dragMode === 'a' ? cubeA : cubeB;
    tgt.x = clamp(g.x, -GROUND + 0.4, GROUND - 0.4);
    tgt.y = clamp(g.y, -GROUND + 0.4, GROUND - 0.4);
  }

  function onUp() {
    dragMode = null;
    if (canvas) canvas.style.cursor = 'default';
  }

  function onTouchMove(e) {
    e.preventDefault();
    if (e.touches.length > 0) onMove(e.touches[0]);
  }

  function attachEvents() {
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('mouseleave', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onUp);
  }

  function detachEvents() {
    canvas.removeEventListener('mousedown', onDown);
    canvas.removeEventListener('mousemove', onMove);
    canvas.removeEventListener('mouseup', onUp);
    canvas.removeEventListener('mouseleave', onUp);
    canvas.removeEventListener('touchstart', onDown);
    canvas.removeEventListener('touchmove', onTouchMove);
    canvas.removeEventListener('touchend', onUp);
  }

  function draw(t) {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(10, 10, 15, 0.85)';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(79, 195, 247, 0.1)';
    ctx.lineWidth = 1;
    for (var g = -GROUND; g <= GROUND; g += 1) {
      var p1 = proj(g, -GROUND, 0);
      var p2 = proj(g, GROUND, 0);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      var q1 = proj(-GROUND, g, 0);
      var q2 = proj(GROUND, g, 0);
      ctx.beginPath();
      ctx.moveTo(q1.x, q1.y);
      ctx.lineTo(q2.x, q2.y);
      ctx.stroke();
    }

    var o = proj(0, 0, 0);
    function axis(e, color, label, dx, dy) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(o.x, o.y);
      ctx.lineTo(e.x, e.y);
      ctx.stroke();
      var ang = Math.atan2(e.y - o.y, e.x - o.x);
      var ah = 11;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(e.x + Math.cos(ang) * 3, e.y + Math.sin(ang) * 3);
      ctx.lineTo(e.x - Math.cos(ang - 0.45) * ah, e.y - Math.sin(ang - 0.45) * ah);
      ctx.lineTo(e.x - Math.cos(ang + 0.45) * ah, e.y - Math.sin(ang + 0.45) * ah);
      ctx.closePath();
      ctx.fill();
      ctx.font = 'bold 14px Arial';
      ctx.fillText(label, e.x + dx, e.y + dy);
    }
    axis(proj(3.2, 0, 0), '#1E88E5', 'x', 9, 4);
    axis(proj(0, 3.2, 0), '#43A047', 'y', 9, 4);
    axis(proj(0, 0, 2.8), '#E53935', 'z', 9, -6);

    var m1 = mass('massa1Slider');
    var m2 = mass('massa2Slider');
    var infoA = drawCube(cubeA.x, cubeA.y, m1, 'rgba(30, 136, 229, 1)', dragMode === 'a');
    var infoB = drawCube(cubeB.x, cubeB.y, m2, 'rgba(255, 179, 0, 1)', dragMode === 'b');

    var labA = proj(infoA.x, infoA.y, infoA.s + 0.35);
    ctx.fillStyle = '#90CAF9';
    ctx.font = 'bold 13px Arial';
    ctx.fillText('m\u2081', labA.x - 8, labA.y);
    var labB = proj(infoB.x, infoB.y, infoB.s + 0.35);
    ctx.fillStyle = '#FFD54F';
    ctx.fillText('m\u2082', labB.x - 8, labB.y);

    var denom = m1 + m2;
    var com = {
      x: (m1 * infoA.x + m2 * infoB.x) / denom,
      y: (m1 * infoA.y + m2 * infoB.y) / denom,
      z: (m1 * infoA.z + m2 * infoB.z) / denom,
    };
    var pc = proj(com.x, com.y, com.z);
    var ca = proj(infoA.x, infoA.y, infoA.z);
    var cb = proj(infoB.x, infoB.y, infoB.z);

    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = 'rgba(224, 224, 224, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ca.x, ca.y);
    ctx.lineTo(pc.x, pc.y);
    ctx.moveTo(cb.x, cb.y);
    ctx.lineTo(pc.x, pc.y);
    ctx.stroke();
    ctx.setLineDash([]);

    var pulse = 0.5 + 0.5 * Math.sin(t / 300);
    ctx.beginPath();
    ctx.arc(pc.x, pc.y, 9 + 4 * pulse, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(229, 57, 53, ' + (0.3 + 0.4 * pulse) + ')';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pc.x - 8, pc.y);
    ctx.lineTo(pc.x + 8, pc.y);
    ctx.moveTo(pc.x, pc.y - 8);
    ctx.lineTo(pc.x, pc.y + 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(pc.x, pc.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#E53935';
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '14px Arial';
    ctx.fillText(
      'm\u2081 = ' + m1 + ' kg \u00B7 m\u2082 = ' + m2 + ' kg',
      W / 2,
      24
    );
    ctx.font = '13px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillText(
      'centro de massa (x\u0304, \u0233, z\u0304) \u2248 (' +
        com.x.toFixed(2) +
        ', ' +
        com.y.toFixed(2) +
        ', ' +
        com.z.toFixed(2) +
        ')',
      W / 2,
      H - 30
    );
    ctx.font = '11px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText(
      'arraste um cubo para mov\u00EA-lo \u00B7 arraste fora para girar a vista',
      W / 2,
      H - 12
    );
    ctx.textAlign = 'start';
  }

  function animate() {
    draw(performance.now ? performance.now() : Date.now());
    animId = requestAnimationFrame(animate);
  }

  function init(c) {
    if (!canvas) canvas = c || document.getElementById('duasMassasCanvas');
    if (!canvas || inited) return;
    if (!ctx) {
      ctx = canvas.getContext('2d');
      W = canvas.width;
      H = canvas.height;
      cx = W / 2;
      cy = H / 2;
    }
    inited = true;
    attachEvents();
    animate();
  }

  function cleanup() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    dragMode = null;
    if (canvas && inited) {
      detachEvents();
      inited = false;
    }
  }

  hookVizToReveal('duasMassasCanvas', init, cleanup);

  window.vizDuasMassas = { init: init, cleanup: cleanup };
})();
