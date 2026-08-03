/*
 * visualizacoes.js — Capítulo 3 (Mudança de Variáveis na Integral Dupla)
 * Facção Soviet, 1961-1964.
 *
 * Duas visualizações em IIFE, expostas via window:
 *   window.vizPolarJacobian = { init, cleanup }  → polarJacobianCanvas
 *   window.vizBaricentro     = { init, cleanup }  → baricentroCanvas
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
