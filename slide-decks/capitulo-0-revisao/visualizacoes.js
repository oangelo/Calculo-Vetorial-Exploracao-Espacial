// Código para visualizações interativas

// Visualização Geométrica da Derivada
function criarVisualizacaoDerivada(containerId) {
  // Configuração do canvas
  const container = document.getElementById(containerId);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Ajustar tamanho do canvas ao container
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  container.appendChild(canvas);

  // Paleta de cores - seguindo as diretrizes do tema espacial
  const cores = {
    fundo: '#0a0a0f',
    funcao: '#4fc3f7', // Azul claro para a função principal
    secante: '#e53935', // Vermelho para a reta secante
    tangente: '#43A047', // Verde para a reta tangente
    ponto: '#FFB300', // Amarelo para pontos de interesse
    grid: 'rgba(79, 195, 247, 0.1)',
    texto: '#e0e0e0',
  };

  // Parâmetros da visualização
  let params = {
    x0: 2, // Ponto onde calculamos a derivada
    dx: 1, // Delta x (que pode ser ajustado pelo usuário)
    funcao: (x) => 0.5 * x * x, // Função f(x) = x²/2 (parábola)
    derivada: (x) => x, // Derivada analítica f'(x) = x
    interativo: true, // Se o usuário pode interagir
    xMin: 0, // Limites do gráfico
    xMax: 4,
    yMin: 0,
    yMax: 8,
  };

  // Sistema de coordenadas
  const toScreenX = (x) =>
    ((x - params.xMin) / (params.xMax - params.xMin)) * canvas.width;
  const toScreenY = (y) =>
    canvas.height -
    ((y - params.yMin) / (params.yMax - params.yMin)) * canvas.height;
  const toMathX = (screenX) =>
    params.xMin + (screenX / canvas.width) * (params.xMax - params.xMin);
  const toMathY = (screenY) =>
    params.yMin +
    ((canvas.height - screenY) / canvas.height) * (params.yMax - params.yMin);

  // Estado da interação
  let arrastando = false;
  let pontoArrastado = null;

  // Cálculo da inclinação da secante
  function calcularInclinacaoSecante() {
    const x0 = params.x0;
    const x1 = x0 + params.dx;
    const y0 = params.funcao(x0);
    const y1 = params.funcao(x1);
    return (y1 - y0) / (x1 - x0);
  }

  // Desenhar grade de fundo
  function desenharGrid() {
    ctx.strokeStyle = cores.grid;
    ctx.lineWidth = 0.5;

    // Linhas verticais
    for (let x = params.xMin; x <= params.xMax; x += 0.5) {
      ctx.beginPath();
      ctx.moveTo(toScreenX(x), toScreenY(params.yMin));
      ctx.lineTo(toScreenX(x), toScreenY(params.yMax));
      ctx.stroke();
    }

    // Linhas horizontais
    for (let y = params.yMin; y <= params.yMax; y += 0.5) {
      ctx.beginPath();
      ctx.moveTo(toScreenX(params.xMin), toScreenY(y));
      ctx.lineTo(toScreenX(params.xMax), toScreenY(y));
      ctx.stroke();
    }
  }

  // Desenhar eixos
  function desenharEixos() {
    ctx.strokeStyle = cores.texto;
    ctx.lineWidth = 2;

    // Eixo X
    ctx.beginPath();
    ctx.moveTo(toScreenX(params.xMin), toScreenY(0));
    ctx.lineTo(toScreenX(params.xMax), toScreenY(0));
    ctx.stroke();

    // Eixo Y
    ctx.beginPath();
    ctx.moveTo(toScreenX(0), toScreenY(params.yMin));
    ctx.lineTo(toScreenX(0), toScreenY(params.yMax));
    ctx.stroke();

    // Marcações nos eixos
    ctx.fillStyle = cores.texto;
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';

    // Marcações no eixo X
    for (let x = params.xMin; x <= params.xMax; x += 1) {
      if (x !== 0) {
        // Evita sobreposição na origem
        ctx.fillText(x.toString(), toScreenX(x), toScreenY(0) + 20);
      }
    }

    // Marcações no eixo Y
    ctx.textAlign = 'right';
    for (let y = params.yMin; y <= params.yMax; y += 1) {
      if (y !== 0) {
        // Evita sobreposição na origem
        ctx.fillText(y.toString(), toScreenX(0) - 10, toScreenY(y) + 5);
      }
    }

    // Origem
    ctx.fillText('0', toScreenX(0) - 10, toScreenY(0) + 20);
  }

  // Desenhar função
  function desenharFuncao() {
    ctx.strokeStyle = cores.funcao;
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let screenX = 0; screenX <= canvas.width; screenX++) {
      const x = toMathX(screenX);
      const y = params.funcao(x);

      if (screenX === 0) {
        ctx.moveTo(screenX, toScreenY(y));
      } else {
        ctx.lineTo(screenX, toScreenY(y));
      }
    }

    ctx.stroke();
  }

  // Desenhar secante
  function desenharSecante() {
    const x0 = params.x0;
    const x1 = x0 + params.dx;
    const y0 = params.funcao(x0);
    const y1 = params.funcao(x1);

    // Linha secante
    ctx.strokeStyle = cores.secante;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(
      toScreenX(params.xMin),
      toScreenY(y0 - ((x0 - params.xMin) * (y1 - y0)) / (x1 - x0))
    );
    ctx.lineTo(
      toScreenX(params.xMax),
      toScreenY(y0 + ((params.xMax - x0) * (y1 - y0)) / (x1 - x0))
    );
    ctx.stroke();

    // Pontos de interseção com a função
    ctx.fillStyle = cores.ponto;
    ctx.beginPath();
    ctx.arc(toScreenX(x0), toScreenY(y0), 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(toScreenX(x1), toScreenY(y1), 6, 0, Math.PI * 2);
    ctx.fill();

    // Linha vertical mostrando Δx
    ctx.strokeStyle = cores.texto;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(toScreenX(x0), toScreenY(y0));
    ctx.lineTo(toScreenX(x1), toScreenY(y0));
    ctx.stroke();
    ctx.setLineDash([]);

    // Linha horizontal mostrando Δy
    ctx.beginPath();
    ctx.moveTo(toScreenX(x1), toScreenY(y0));
    ctx.lineTo(toScreenX(x1), toScreenY(y1));
    ctx.stroke();

    // Texto para Δx e Δy
    ctx.fillStyle = cores.texto;
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Δx', toScreenX((x0 + x1) / 2), toScreenY(y0) + 20);
    ctx.textAlign = 'left';
    ctx.fillText('Δy', toScreenX(x1) + 10, toScreenY((y0 + y1) / 2));
  }

  // Desenhar tangente
  function desenharTangente() {
    const x0 = params.x0;
    const y0 = params.funcao(x0);
    const m = params.derivada(x0); // Inclinação da tangente (derivada analítica)

    // Linha tangente
    ctx.strokeStyle = cores.tangente;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(toScreenX(params.xMin), toScreenY(y0 - (x0 - params.xMin) * m));
    ctx.lineTo(toScreenX(params.xMax), toScreenY(y0 + (params.xMax - x0) * m));
    ctx.stroke();
  }

  // Desenhar painel de informações
  function desenharInfoPanel() {
    const x0 = params.x0;
    const inclinacaoSecante = calcularInclinacaoSecante();
    const inclinacaoTangente = params.derivada(x0);

    ctx.fillStyle = 'rgba(10, 10, 15, 0.8)';
    ctx.fillRect(10, 10, 280, 130);
    ctx.strokeStyle = cores.funcao;
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, 280, 130);

    ctx.fillStyle = cores.texto;
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Função: f(x) = x²/2`, 20, 35);
    ctx.fillText(`Ponto x₀ = ${x0.toFixed(2)}`, 20, 60);
    ctx.fillText(`Δx = ${params.dx.toFixed(2)}`, 20, 85);

    ctx.fillStyle = cores.secante;
    ctx.fillText(
      `Inclinação da Secante: ${inclinacaoSecante.toFixed(2)}`,
      20,
      110
    );

    ctx.fillStyle = cores.tangente;
    ctx.fillText(
      `Derivada f'(${x0.toFixed(2)}) = ${inclinacaoTangente.toFixed(2)}`,
      20,
      135
    );
  }

  // Desenhar cursor de arraste quando o mouse está sobre um ponto arrastável
  function desenharCursorArraste(x, y, raio = 6) {
    // Círculo com contorno pontilhado
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.strokeStyle = cores.ponto;
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(x, y, raio + 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.setLineDash([]);
  }

  // Verificar se o mouse está sobre um ponto arrastável
  function isSobrePonto(mouseX, mouseY) {
    const x0 = params.x0;
    const x1 = x0 + params.dx;
    const y0 = params.funcao(x0);
    const y1 = params.funcao(x1);

    const distX0 = Math.hypot(mouseX - toScreenX(x0), mouseY - toScreenY(y0));
    const distX1 = Math.hypot(mouseX - toScreenX(x1), mouseY - toScreenY(y1));

    if (distX0 < 10) return 'x0';
    if (distX1 < 10) return 'x1';
    return null;
  }

  // Renderizar tudo
  function renderizar() {
    // Limpar canvas
    ctx.fillStyle = cores.fundo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    desenharGrid();
    desenharEixos();
    desenharFuncao();
    desenharSecante();
    desenharTangente();
    desenharInfoPanel();

    // Se o mouse estiver sobre um ponto, mostrar cursor de arraste
    if (pontoArrastado) {
      const x0 = params.x0;
      const x1 = x0 + params.dx;
      const y0 = params.funcao(x0);
      const y1 = params.funcao(x1);

      if (pontoArrastado === 'x0') {
        desenharCursorArraste(toScreenX(x0), toScreenY(y0));
      } else if (pontoArrastado === 'x1') {
        desenharCursorArraste(toScreenX(x1), toScreenY(y1));
      }
    }
  }

  // Declarar variáveis para slider e valueDisplay no escopo do objeto
  let slider, valueDisplay;

  // Gerenciar eventos de mouse
  function inicializarInteratividade() {
    canvas.style.cursor = 'default';

    canvas.addEventListener('mousedown', (e) => {
      if (!params.interativo) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      pontoArrastado = isSobrePonto(mouseX, mouseY);

      if (pontoArrastado) {
        arrastando = true;
        canvas.style.cursor = 'grabbing';
      }
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!params.interativo) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Verificar se está sobre um ponto quando não está arrastando
      if (!arrastando) {
        const sobrePonto = isSobrePonto(mouseX, mouseY);
        if (sobrePonto) {
          canvas.style.cursor = 'grab';
          pontoArrastado = sobrePonto;
        } else {
          canvas.style.cursor = 'default';
          pontoArrastado = null;
        }
      }

      // Lógica de arraste
      if (arrastando && pontoArrastado) {
        const novoX = Math.max(
          params.xMin,
          Math.min(params.xMax, toMathX(mouseX))
        );

        if (pontoArrastado === 'x0') {
          // Limitar x0 para não ficar muito próximo de x1
          const minX0 = params.xMin;
          const maxX0 = params.x0 + params.dx - 0.1;
          params.x0 = Math.max(minX0, Math.min(maxX0, novoX));
        } else if (pontoArrastado === 'x1') {
          // Atualiza dx baseado na nova posição de x1
          const minDx = 0.1; // Evita divisão por zero e mantém os pontos separados
          const novoDx = Math.max(minDx, novoX - params.x0);
          params.dx = novoDx;
        }

        renderizar();
      }
    });

    // Eventos para finalizar o arraste
    canvas.addEventListener('mouseup', () => {
      arrastando = false;
      if (pontoArrastado) {
        canvas.style.cursor = 'grab';
      } else {
        canvas.style.cursor = 'default';
      }
    });

    canvas.addEventListener('mouseleave', () => {
      arrastando = false;
      pontoArrastado = null;
      canvas.style.cursor = 'default';
    });

    // Adicionar slider para ajustar Δx dinamicamente
    const sliderContainer = document.createElement('div');
    sliderContainer.style.position = 'absolute';
    sliderContainer.style.bottom = '10px';
    sliderContainer.style.left = '50%';
    sliderContainer.style.transform = 'translateX(-50%)';
    sliderContainer.style.width = '80%';
    sliderContainer.style.textAlign = 'center';
    sliderContainer.style.color = cores.texto;

    const label = document.createElement('label');
    label.textContent = 'Δx: ';
    label.style.marginRight = '10px';

    // Usar variáveis declaradas no escopo superior
    slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0.01';
    slider.max = '2';
    slider.step = '0.01';
    slider.value = params.dx.toString();
    slider.style.width = '60%';

    valueDisplay = document.createElement('span');
    valueDisplay.textContent = params.dx.toFixed(2);
    valueDisplay.style.marginLeft = '10px';

    slider.addEventListener('input', (e) => {
      params.dx = parseFloat(e.target.value);
      valueDisplay.textContent = params.dx.toFixed(2);
      renderizar();
    });

    sliderContainer.appendChild(label);
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(valueDisplay);
    container.appendChild(sliderContainer);
  }

  // Inicialização
  function inicializar() {
    renderizar();
    if (params.interativo) {
      inicializarInteratividade();
    }
  }

  inicializar();

  // Redimensionar o canvas se o tamanho da janela mudar
  window.addEventListener('resize', () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    renderizar();
  });

  // Retornar API pública
  return {
    renderizar,
    atualizarParametros: (novosParams) => {
      Object.assign(params, novosParams);
      renderizar();
    },
  };
}

// Visualização Geométrica da Integral
function criarVisualizacaoIntegral(containerId) {
  // Configuração do canvas
  const container = document.getElementById(containerId);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Ajustar tamanho do canvas ao container
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  container.appendChild(canvas);

  // Paleta de cores - seguindo as diretrizes do tema espacial
  const cores = {
    fundo: '#0a0a0f',
    funcao: '#4fc3f7', // Azul claro para a função principal
    retangulos: '#8BC34A', // Verde para retângulos
    areaExata: '#7E57C2', // Roxo para área exata
    limites: '#FB8C00', // Laranja para os limites de integração
    grid: 'rgba(79, 195, 247, 0.1)',
    texto: '#e0e0e0',
  };

  // Parâmetros da visualização
  let params = {
    funcao: (x) => 2 * Math.sin(x) + 3, // Função f(x) = 2sin(x) + 3
    a: 0.5, // Limite inferior de integração
    b: 5, // Limite superior de integração
    n: 5, // Número de retângulos (subintervalos)
    metodo: 'ponto_medio', // Método de aproximação: ponto_medio, esquerda, direita
    interativo: true, // Se o usuário pode interagir
    xMin: 0, // Limites do gráfico
    xMax: 6,
    yMin: 0,
    yMax: 6,
  };

  // Sistema de coordenadas
  const toScreenX = (x) =>
    ((x - params.xMin) / (params.xMax - params.xMin)) * canvas.width;
  const toScreenY = (y) =>
    canvas.height -
    ((y - params.yMin) / (params.yMax - params.yMin)) * canvas.height;
  const toMathX = (screenX) =>
    params.xMin + (screenX / canvas.width) * (params.xMax - params.xMin);
  const toMathY = (screenY) =>
    params.yMin +
    ((canvas.height - screenY) / canvas.height) * (params.yMax - params.yMin);

  // Estado da interação
  let arrastando = false;
  let pontoArrastado = null;

  // Cálculo da integral utilizando métodos numéricos
  function calcularAreaRetangulos() {
    const { a, b, n, funcao, metodo } = params;
    const dx = (b - a) / n;
    let soma = 0;

    for (let i = 0; i < n; i++) {
      let x;
      switch (metodo) {
        case 'esquerda':
          x = a + i * dx;
          break;
        case 'direita':
          x = a + (i + 1) * dx;
          break;
        case 'ponto_medio':
        default:
          x = a + (i + 0.5) * dx;
          break;
      }
      soma += funcao(x) * dx;
    }

    return soma;
  }

  // Cálculo da integral "exata" (usando muitos retângulos)
  function calcularAreaExata() {
    const { a, b, funcao } = params;
    const n = 1000; // Número grande de subintervalos para boa aproximação
    const dx = (b - a) / n;
    let soma = 0;

    for (let i = 0; i < n; i++) {
      const x = a + (i + 0.5) * dx;
      soma += funcao(x) * dx;
    }

    return soma;
  }

  // Desenhar grade de fundo
  function desenharGrid() {
    ctx.strokeStyle = cores.grid;
    ctx.lineWidth = 0.5;

    // Linhas verticais
    for (let x = params.xMin; x <= params.xMax; x += 0.5) {
      ctx.beginPath();
      ctx.moveTo(toScreenX(x), toScreenY(params.yMin));
      ctx.lineTo(toScreenX(x), toScreenY(params.yMax));
      ctx.stroke();
    }

    // Linhas horizontais
    for (let y = params.yMin; y <= params.yMax; y += 0.5) {
      ctx.beginPath();
      ctx.moveTo(toScreenX(params.xMin), toScreenY(y));
      ctx.lineTo(toScreenX(params.xMax), toScreenY(y));
      ctx.stroke();
    }
  }

  // Desenhar eixos
  function desenharEixos() {
    ctx.strokeStyle = cores.texto;
    ctx.lineWidth = 2;

    // Eixo X
    ctx.beginPath();
    ctx.moveTo(toScreenX(params.xMin), toScreenY(0));
    ctx.lineTo(toScreenX(params.xMax), toScreenY(0));
    ctx.stroke();

    // Eixo Y
    ctx.beginPath();
    ctx.moveTo(toScreenX(0), toScreenY(params.yMin));
    ctx.lineTo(toScreenX(0), toScreenY(params.yMax));
    ctx.stroke();

    // Marcações nos eixos
    ctx.fillStyle = cores.texto;
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';

    // Marcações no eixo X
    for (let x = params.xMin; x <= params.xMax; x += 1) {
      if (x !== 0) {
        // Evita sobreposição na origem
        ctx.fillText(x.toString(), toScreenX(x), toScreenY(0) + 20);
      }
    }

    // Marcações no eixo Y
    ctx.textAlign = 'right';
    for (let y = params.yMin; y <= params.yMax; y += 1) {
      if (y !== 0) {
        // Evita sobreposição na origem
        ctx.fillText(y.toString(), toScreenX(0) - 10, toScreenY(y) + 5);
      }
    }

    // Origem
    ctx.fillText('0', toScreenX(0) - 10, toScreenY(0) + 20);
  }

  // Desenhar função
  function desenharFuncao() {
    ctx.strokeStyle = cores.funcao;
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let screenX = 0; screenX <= canvas.width; screenX++) {
      const x = toMathX(screenX);
      const y = params.funcao(x);

      if (screenX === 0) {
        ctx.moveTo(screenX, toScreenY(y));
      } else {
        ctx.lineTo(screenX, toScreenY(y));
      }
    }

    ctx.stroke();
  }

  // Desenhar os limites de integração
  function desenharLimitesIntegracao() {
    const { a, b } = params;
    const ya = params.funcao(a);
    const yb = params.funcao(b);

    // Linhas verticais nos limites
    ctx.strokeStyle = cores.limites;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    // Limite inferior
    ctx.beginPath();
    ctx.moveTo(toScreenX(a), toScreenY(0));
    ctx.lineTo(toScreenX(a), toScreenY(ya));
    ctx.stroke();

    // Limite superior
    ctx.beginPath();
    ctx.moveTo(toScreenX(b), toScreenY(0));
    ctx.lineTo(toScreenX(b), toScreenY(yb));
    ctx.stroke();

    ctx.setLineDash([]);

    // Pontos nos limites
    ctx.fillStyle = cores.limites;

    // Ponto a
    ctx.beginPath();
    ctx.arc(toScreenX(a), toScreenY(0), 6, 0, Math.PI * 2);
    ctx.fill();

    // Ponto b
    ctx.beginPath();
    ctx.arc(toScreenX(b), toScreenY(0), 6, 0, Math.PI * 2);
    ctx.fill();

    // Rótulos
    ctx.fillStyle = cores.texto;
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';

    ctx.fillText('a', toScreenX(a), toScreenY(0) + 25);
    ctx.fillText('b', toScreenX(b), toScreenY(0) + 25);
  }

  // Desenhar retângulos de aproximação da integral
  function desenharRetangulos() {
    const { a, b, n, funcao, metodo } = params;
    const dx = (b - a) / n;

    ctx.fillStyle = cores.retangulos + '80'; // 50% de opacidade
    ctx.strokeStyle = cores.retangulos;
    ctx.lineWidth = 1;

    for (let i = 0; i < n; i++) {
      let x, altura;
      const xi = a + i * dx;

      switch (metodo) {
        case 'esquerda':
          x = xi;
          altura = funcao(x);
          break;
        case 'direita':
          x = xi + dx;
          altura = funcao(x);
          break;
        case 'ponto_medio':
        default:
          x = xi + dx / 2;
          altura = funcao(x);
          break;
      }

      // Desenhar retângulo
      ctx.fillRect(
        toScreenX(xi),
        toScreenY(altura),
        toScreenX(dx) - toScreenX(0),
        toScreenY(0) - toScreenY(altura)
      );
      ctx.strokeRect(
        toScreenX(xi),
        toScreenY(altura),
        toScreenX(dx) - toScreenX(0),
        toScreenY(0) - toScreenY(altura)
      );

      // Se for método do ponto médio, marcar o ponto médio
      if (metodo === 'ponto_medio') {
        const xMedio = xi + dx / 2;
        const yMedio = funcao(xMedio);

        ctx.fillStyle = cores.texto;
        ctx.beginPath();
        ctx.arc(toScreenX(xMedio), toScreenY(yMedio), 3, 0, Math.PI * 2);
        ctx.fill();

        // Restaurar cor dos retângulos para próximo
        ctx.fillStyle = cores.retangulos + '80';
      }
    }
  }

  // Desenhar área exata sob a curva
  function desenharAreaExata() {
    const { a, b, funcao } = params;

    ctx.fillStyle = cores.areaExata + '40'; // 25% de opacidade
    ctx.beginPath();

    // Iniciar no ponto (a, 0)
    ctx.moveTo(toScreenX(a), toScreenY(0));

    // Traçar a curva da função
    const numPontos = 100;
    const dx = (b - a) / numPontos;

    for (let i = 0; i <= numPontos; i++) {
      const x = a + i * dx;
      const y = funcao(x);
      ctx.lineTo(toScreenX(x), toScreenY(y));
    }

    // Fechar o caminho voltando para o eixo x e depois para o início
    ctx.lineTo(toScreenX(b), toScreenY(0));
    ctx.lineTo(toScreenX(a), toScreenY(0));

    ctx.fill();
  }

  // Desenhar painel de informações
  function desenharInfoPanel() {
    const areaRetangulos = calcularAreaRetangulos();
    const areaExata = calcularAreaExata();
    const erro = Math.abs(areaExata - areaRetangulos);

    ctx.fillStyle = 'rgba(10, 10, 15, 0.8)';
    ctx.fillRect(10, 10, 300, 150);
    ctx.strokeStyle = cores.funcao;
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, 300, 150);

    ctx.fillStyle = cores.texto;
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Função: f(x) = 2sin(x) + 3`, 20, 35);
    ctx.fillText(
      `Intervalo: [${params.a.toFixed(2)}, ${params.b.toFixed(2)}]`,
      20,
      60
    );
    ctx.fillText(`Número de retângulos: ${params.n}`, 20, 85);
    ctx.fillText(`Método: ${formatarMetodo(params.metodo)}`, 20, 110);

    ctx.fillStyle = cores.retangulos;
    ctx.fillText(`Aproximação: ${areaRetangulos.toFixed(4)}`, 20, 135);

    ctx.fillStyle = cores.areaExata;
    ctx.fillText(
      `Valor "exato": ${areaExata.toFixed(4)} (erro: ${erro.toFixed(4)})`,
      20,
      160
    );
  }

  // Formatar nome do método para exibição
  function formatarMetodo(metodo) {
    switch (metodo) {
      case 'esquerda':
        return 'Retângulos à Esquerda';
      case 'direita':
        return 'Retângulos à Direita';
      case 'ponto_medio':
        return 'Ponto Médio';
      default:
        return metodo;
    }
  }

  // Desenhar cursor de arraste quando o mouse está sobre um ponto arrastável
  function desenharCursorArraste(x, y, raio = 6) {
    // Círculo com contorno pontilhado
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.strokeStyle = cores.limites;
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(x, y, raio + 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.setLineDash([]);
  }

  // Verificar se o mouse está sobre um ponto arrastável (limites a ou b)
  function isSobrePonto(mouseX, mouseY) {
    const { a, b } = params;

    const distA = Math.hypot(mouseX - toScreenX(a), mouseY - toScreenY(0));
    const distB = Math.hypot(mouseX - toScreenX(b), mouseY - toScreenY(0));

    if (distA < 10) return 'a';
    if (distB < 10) return 'b';
    return null;
  }

  // Renderizar tudo
  function renderizar() {
    // Limpar canvas
    ctx.fillStyle = cores.fundo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ordem de desenho importa para sobreposições corretas
    desenharGrid();
    desenharEixos();
    desenharAreaExata();
    desenharRetangulos();
    desenharFuncao();
    desenharLimitesIntegracao();
    desenharInfoPanel();

    // Se o mouse estiver sobre um ponto, mostrar cursor de arraste
    if (pontoArrastado) {
      const { a, b } = params;

      if (pontoArrastado === 'a') {
        desenharCursorArraste(toScreenX(a), toScreenY(0));
      } else if (pontoArrastado === 'b') {
        desenharCursorArraste(toScreenX(b), toScreenY(0));
      }
    }
  }

  // Declarar variáveis no escopo superior para acessibilidade
  let slider, valueDisplay, metodoSelect;

  // Gerenciar eventos de mouse
  function inicializarInteratividade() {
    canvas.style.cursor = 'default';

    canvas.addEventListener('mousedown', (e) => {
      if (!params.interativo) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      pontoArrastado = isSobrePonto(mouseX, mouseY);

      if (pontoArrastado) {
        arrastando = true;
        canvas.style.cursor = 'grabbing';
      }
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!params.interativo) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Verificar se está sobre um ponto quando não está arrastando
      if (!arrastando) {
        const sobrePonto = isSobrePonto(mouseX, mouseY);
        if (sobrePonto) {
          canvas.style.cursor = 'grab';
          pontoArrastado = sobrePonto;
        } else {
          canvas.style.cursor = 'default';
          pontoArrastado = null;
        }
      }

      // Lógica de arraste
      if (arrastando && pontoArrastado) {
        const novoX = Math.max(
          params.xMin,
          Math.min(params.xMax, toMathX(mouseX))
        );

        if (pontoArrastado === 'a') {
          // Limitar a para não ultrapassar b
          params.a = Math.min(params.b - 0.1, novoX);
        } else if (pontoArrastado === 'b') {
          // Limitar b para não ficar menor que a
          params.b = Math.max(params.a + 0.1, novoX);
        }

        renderizar();
      }
    });

    // Eventos para finalizar o arraste
    canvas.addEventListener('mouseup', () => {
      arrastando = false;
      if (pontoArrastado) {
        canvas.style.cursor = 'grab';
      } else {
        canvas.style.cursor = 'default';
      }
    });

    canvas.addEventListener('mouseleave', () => {
      arrastando = false;
      pontoArrastado = null;
      canvas.style.cursor = 'default';
    });

    // Adicionar controles para ajustar parâmetros
    const controlsContainer = document.createElement('div');
    controlsContainer.style.position = 'absolute';
    controlsContainer.style.bottom = '10px';
    controlsContainer.style.left = '50%';
    controlsContainer.style.transform = 'translateX(-50%)';
    controlsContainer.style.width = '90%';
    controlsContainer.style.textAlign = 'center';
    controlsContainer.style.color = cores.texto;
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexDirection = 'column';
    controlsContainer.style.gap = '10px';

    // Controle de número de retângulos
    const sliderContainer = document.createElement('div');
    sliderContainer.style.display = 'flex';
    sliderContainer.style.alignItems = 'center';
    sliderContainer.style.justifyContent = 'center';
    sliderContainer.style.gap = '10px';

    const sliderLabel = document.createElement('label');
    sliderLabel.textContent = 'Número de retângulos: ';

    slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '1';
    slider.max = '50';
    slider.step = '1';
    slider.value = params.n.toString();
    slider.style.width = '200px';

    valueDisplay = document.createElement('span');
    valueDisplay.textContent = params.n.toString();
    valueDisplay.style.minWidth = '30px';

    slider.addEventListener('input', (e) => {
      params.n = parseInt(e.target.value, 10);
      valueDisplay.textContent = params.n.toString();
      renderizar();
    });

    sliderContainer.appendChild(sliderLabel);
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(valueDisplay);

    // Controle do método de aproximação
    const metodoContainer = document.createElement('div');
    metodoContainer.style.display = 'flex';
    metodoContainer.style.alignItems = 'center';
    metodoContainer.style.justifyContent = 'center';
    metodoContainer.style.gap = '10px';

    const metodoLabel = document.createElement('label');
    metodoLabel.textContent = 'Método: ';

    metodoSelect = document.createElement('select');
    metodoSelect.style.backgroundColor = cores.fundo;
    metodoSelect.style.color = cores.texto;
    metodoSelect.style.border = `1px solid ${cores.funcao}`;
    metodoSelect.style.padding = '5px';
    metodoSelect.style.borderRadius = '4px';

    const options = [
      { value: 'ponto_medio', text: 'Ponto Médio' },
      { value: 'esquerda', text: 'Retângulos à Esquerda' },
      { value: 'direita', text: 'Retângulos à Direita' },
    ];

    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.text;
      metodoSelect.appendChild(optionElement);
    });

    metodoSelect.value = params.metodo;

    metodoSelect.addEventListener('change', (e) => {
      params.metodo = e.target.value;
      renderizar();
    });

    metodoContainer.appendChild(metodoLabel);
    metodoContainer.appendChild(metodoSelect);

    // Botão de redefinir
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Redefinir';
    resetButton.style.padding = '5px 10px';
    resetButton.style.backgroundColor = cores.fundo;
    resetButton.style.color = cores.texto;
    resetButton.style.border = `1px solid ${cores.funcao}`;
    resetButton.style.borderRadius = '4px';
    resetButton.style.cursor = 'pointer';
    resetButton.style.marginLeft = 'auto';
    resetButton.style.marginRight = '10px';

    resetButton.addEventListener('click', () => {
      // Redefinir parâmetros
      params.a = 0.5;
      params.b = 5;
      params.n = 5;
      params.metodo = 'ponto_medio';

      // Atualizar controles
      if (slider && valueDisplay && metodoSelect) {
        slider.value = params.n.toString();
        valueDisplay.textContent = params.n.toString();
        metodoSelect.value = params.metodo;
      }

      renderizar();
    });

    controlsContainer.appendChild(sliderContainer);
    controlsContainer.appendChild(metodoContainer);
    container.appendChild(controlsContainer);
    container.appendChild(resetButton);
  }

  // Inicialização
  function inicializar() {
    renderizar();
    if (params.interativo) {
      inicializarInteratividade();
    }
  }

  inicializar();

  // Redimensionar o canvas se o tamanho da janela mudar
  window.addEventListener('resize', () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    renderizar();
  });

  // Retornar API pública
  return {
    renderizar,
    atualizarParametros: (novosParams) => {
      Object.assign(params, novosParams);
      renderizar();
    },
  };
}

// =============================================
// VISUALIZAÇÕES DE CURVAS DE NÍVEL
// =============================================

// Visualização 1: Esfera - Curvas de Nível
(function () {
  let canvas, ctx, slider;

  function init() {
    canvas = document.getElementById('esfera-niveis');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    slider = document.getElementById('esfera-z');

    if (slider) {
      slider.addEventListener('input', draw);
    }

    draw();
  }

  function draw() {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const z = parseFloat(slider ? slider.value : 0);
    const r = 3;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) / 8;

    // Desenhar eixos
    ctx.strokeStyle = 'rgba(224, 224, 224, 0.3)';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // Labels dos eixos
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '12px Arial';
    ctx.fillText('x', canvas.width - 15, centerY - 5);
    ctx.fillText('y', centerX + 5, 15);

    // Calcular raio da curva de nível
    const z2 = z * z;
    const rPrime = Math.sqrt(Math.max(0, r * r - z2));
    const screenRadius = rPrime * scale;

    // Desenhar círculo de nível (se válido)
    if (rPrime > 0.01) {
      ctx.strokeStyle = '#4fc3f7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, screenRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Desenhar centro (origem)
    ctx.fillStyle = '#64b5f6';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Label da equação
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`z = ${z.toFixed(1)}`, 10, 20);
    if (rPrime > 0.01) {
      ctx.fillText(
        `r' = √(9 - ${z.toFixed(1)}²) = ${rPrime.toFixed(2)}`,
        10,
        40
      );
    } else {
      ctx.fillText('Ponto (origem)', 10, 40);
    }

    // Atualizar span do valor
    const zValueSpan = document.getElementById('esfera-z-value');
    if (zValueSpan) zValueSpan.textContent = z.toFixed(1);
  }

  function cleanup() {
    if (slider) {
      slider.removeEventListener('input', draw);
    }
  }

  window.vizEsferaNiveis = { init, cleanup };
})();

// Visualização 2: Paraboloide Elíptico - Curvas de Nível
(function () {
  let canvas, ctx, slider;

  function init() {
    canvas = document.getElementById('paraboloide-niveis');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    slider = document.getElementById('paraboloide-z');

    if (slider) {
      slider.addEventListener('input', draw);
    }

    draw();
  }

  function draw() {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const z = parseFloat(slider ? slider.value : 0);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) / 14;

    // Desenhar eixos
    ctx.strokeStyle = 'rgba(224, 224, 224, 0.3)';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // Labels dos eixos
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '12px Arial';
    ctx.fillText('x', canvas.width - 15, centerY - 5);
    ctx.fillText('y', centerX + 5, 15);

    // Desenhar múltiplas curvas de nível com opacidade variável
    const levels = [1, 2, 3, 4, 5];
    levels.forEach((c) => {
      const rPrime = Math.sqrt(c);
      const screenRadius = rPrime * scale;

      ctx.strokeStyle =
        c === Math.round(z)
          ? '#4fc3f7'
          : `rgba(79, 195, 247, ${0.2 + c * 0.1})`;
      ctx.lineWidth = c === Math.round(z) ? 3 : 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, screenRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Label do nível
      if (screenRadius > 20) {
        ctx.fillStyle =
          c === Math.round(z) ? '#4fc3f7' : 'rgba(224, 224, 224, 0.5)';
        ctx.font = '10px Arial';
        ctx.fillText(`z=${c}`, centerX + screenRadius - 20, centerY - 5);
      }
    });

    // Desenhar curva atual destacada
    const currentR = Math.sqrt(Math.max(0, z));
    if (currentR > 0.01 && !levels.includes(Math.round(z))) {
      const screenRadius = currentR * scale;
      ctx.strokeStyle = '#64b5f6';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, screenRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Centro
    ctx.fillStyle = '#64b5f6';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`z = ${z.toFixed(1)}`, 10, 20);
    if (z > 0) {
      ctx.fillText(`r' = √${z.toFixed(1)} = ${currentR.toFixed(2)}`, 10, 40);
    }

    // Atualizar span do valor
    const zValueSpan = document.getElementById('paraboloide-z-value');
    if (zValueSpan) zValueSpan.textContent = z.toFixed(1);
  }

  function cleanup() {
    if (slider) {
      slider.removeEventListener('input', draw);
    }
  }

  window.vizParaboloideNiveis = { init, cleanup };
})();

// Visualização 3: Paraboloide Hiperbólico (Sela) - Curvas de Nível
(function () {
  let canvas, ctx, slider;

  function init() {
    canvas = document.getElementById('sela-niveis');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    slider = document.getElementById('sela-z');

    if (slider) {
      slider.addEventListener('input', draw);
    }

    draw();
  }

  function draw() {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const z = parseFloat(slider ? slider.value : 0);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) / 10;

    // Desenhar eixos com destaque
    ctx.strokeStyle = 'rgba(224, 224, 224, 0.5)';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // Labels dos eixos
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '12px Arial';
    ctx.fillText('x', canvas.width - 15, centerY - 5);
    ctx.fillText('y', centerX + 5, 15);

    ctx.strokeStyle = '#4fc3f7';
    ctx.lineWidth = 2.5;

    if (Math.abs(z) < 0.1) {
      // z ≈ 0: desenhar duas retas x = ±y
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width, 0);
      ctx.lineTo(0, canvas.height);
      ctx.stroke();
    } else if (z > 0) {
      // z > 0: hipérbole x² - y² = c (abre em x)
      const c = z;
      ctx.beginPath();

      for (let branch = -1; branch <= 1; branch += 2) {
        const startX = branch * 0.1;
        ctx.moveTo(centerX + startX * scale, centerY);

        for (let x = 0.1; x <= 4; x += 0.05) {
          const xVal = branch * x;
          const ySquared = xVal * xVal - c;
          if (ySquared >= 0) {
            const y = Math.sqrt(ySquared);
            ctx.lineTo(centerX + xVal * scale, centerY - y * scale);
          }
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX + startX * scale, centerY);
        for (let x = 0.1; x <= 4; x += 0.05) {
          const xVal = branch * x;
          const ySquared = xVal * xVal - c;
          if (ySquared >= 0) {
            const y = -Math.sqrt(ySquared);
            ctx.lineTo(centerX + xVal * scale, centerY - y * scale);
          }
        }
        ctx.stroke();
      }
    } else {
      // z < 0: hipérbole y² - x² = |c| (abre em y)
      const c = Math.abs(z);
      ctx.beginPath();

      for (let branch = -1; branch <= 1; branch += 2) {
        const startY = branch * 0.1;
        ctx.moveTo(centerX, centerY - startY * scale);

        for (let y = 0.1; y <= 4; y += 0.05) {
          const yVal = branch * y;
          const xSquared = yVal * yVal - c;
          if (xSquared >= 0) {
            const x = Math.sqrt(xSquared);
            ctx.lineTo(centerX + x * scale, centerY - yVal * scale);
          }
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY - startY * scale);
        for (let y = 0.1; y <= 4; y += 0.05) {
          const yVal = branch * y;
          const xSquared = yVal * yVal - c;
          if (xSquared >= 0) {
            const x = -Math.sqrt(xSquared);
            ctx.lineTo(centerX + x * scale, centerY - yVal * scale);
          }
        }
        ctx.stroke();
      }
    }

    // Centro (ponto de sela)
    ctx.fillStyle = '#64b5f6';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Labels
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`z = ${z.toFixed(1)}`, 10, 20);

    if (Math.abs(z) < 0.1) {
      ctx.fillText('Retas: x = ±y', 10, 40);
    } else if (z > 0) {
      ctx.fillText(`x² - y² = ${z.toFixed(1)}`, 10, 40);
    } else {
      ctx.fillText(`y² - x² = ${Math.abs(z).toFixed(1)}`, 10, 40);
    }

    // Atualizar span do valor
    const zValueSpan = document.getElementById('sela-z-value');
    if (zValueSpan) zValueSpan.textContent = z.toFixed(1);
  }

  function cleanup() {
    if (slider) {
      slider.removeEventListener('input', draw);
    }
  }

  window.vizSelaNiveis = { init, cleanup };
})();

// Visualização 4: Hiperboloide - Curvas de Nível
(function () {
  let canvas, ctx, slider;

  function init() {
    canvas = document.getElementById('hiperboloide-niveis');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    slider = document.getElementById('hiperboloide-z');

    if (slider) {
      slider.addEventListener('input', draw);
    }

    draw();
  }

  function draw() {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const z = parseFloat(slider ? slider.value : 0);
    const a = 2,
      b = 1.5,
      c = 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) / 8;

    // Desenhar eixos
    ctx.strokeStyle = 'rgba(224, 224, 224, 0.3)';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // Labels dos eixos
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '12px Arial';
    ctx.fillText('x', canvas.width - 15, centerY - 5);
    ctx.fillText('y', centerX + 5, 15);

    // Calcular semi-eixos da elipse
    const z2_c2 = (z * z) / (c * c);
    const fator = 1 + z2_c2;
    const aLinha = a * Math.sqrt(fator);
    const bLinha = b * Math.sqrt(fator);

    // Desenhar elipse
    ctx.strokeStyle = '#4fc3f7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(
      centerX,
      centerY,
      aLinha * scale,
      bLinha * scale,
      0,
      0,
      Math.PI * 2
    );
    ctx.stroke();

    // Desenhar elipse mínima (z=0) como referência
    ctx.strokeStyle = 'rgba(100, 181, 246, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, a * scale, b * scale, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Centro
    ctx.fillStyle = '#64b5f6';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fill();

    // Labels
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`z = ${z.toFixed(1)}`, 10, 20);
    ctx.fillText(
      `a' = ${aLinha.toFixed(2)}, b' = ${bLinha.toFixed(2)}`,
      10,
      40
    );

    // Equação
    ctx.font = '12px Arial';
    ctx.fillText(
      `x²/${(a * a * fator).toFixed(1)} + y²/${(b * b * fator).toFixed(1)} = 1`,
      10,
      canvas.height - 15
    );

    // Atualizar span do valor
    const zValueSpan = document.getElementById('hiperboloide-z-value');
    if (zValueSpan) zValueSpan.textContent = z.toFixed(1);
  }

  function cleanup() {
    if (slider) {
      slider.removeEventListener('input', draw);
    }
  }

  window.vizHiperboloideNiveis = { init, cleanup };
})();

// =============================================
// VISUALIZAÇÕES DE GEOMETRIA ANALÍTICA
// =============================================

// Cores padrão
const COR_POSICAO = '#1E88E5';
const COR_VELOCIDADE = '#43A047';
const COR_ACELERACAO = '#E53935';
const COR_FORCA = '#FFB300';
const COR_UNITARIO = '#FFFFFF';

// 0. Coordenadas 3D - sistema de eixos simples
(function () {
  let canvas, ctx, slider;

  function init() {
    canvas = document.getElementById('coordenadas-3d');
    if (!canvas) { console.log('canvas coordenadas-3d não encontrado'); return; }
    ctx = canvas.getContext('2d');
    if (!ctx) { console.log('context 2d não disponível'); return; }
    slider = document.getElementById('coord3d-rot');
    if (slider) {
      slider.addEventListener('input', function() {
        draw();
      });
    }
    console.log('coordenadas-3d init OK, canvas:', canvas.width, 'x', canvas.height);
    draw();
  }

  function draw() {
    if (!ctx || !canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const angle = slider ? parseFloat(slider.value) : 30;
    const rad = (angle * Math.PI) / 180;
    const cx = w / 2;
    const cy = h / 2 + 40;

    // Projeção simples
    function proj(x, y, z) {
      return {
        x: cx + (x - y) * Math.cos(rad) * 60,
        y: cy - z * 50 + (x + y) * Math.sin(rad) * 20
      };
    }

    // Fundo escuro
    ctx.fillStyle = 'rgba(10, 10, 20, 0.9)';
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(79,195,247,0.15)';
    ctx.lineWidth = 0.5;
    for (let i = -3; i <= 3; i++) {
      let s = proj(i, -3, 0), e = proj(i, 3, 0);
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(e.x, e.y); ctx.stroke();
      s = proj(-3, i, 0); e = proj(3, i, 0);
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(e.x, e.y); ctx.stroke();
    }

    const o = proj(0, 0, 0);

    // Eixo X - azul
    let p = proj(2.5, 0, 0);
    ctx.strokeStyle = '#1E88E5'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    ctx.fillStyle = '#1E88E5'; ctx.font = 'bold 20px Arial';
    ctx.fillText('x', p.x + 8, p.y + 5);

    // Eixo Y - verde
    p = proj(0, 2.5, 0);
    ctx.strokeStyle = '#43A047';
    ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    ctx.fillStyle = '#43A047';
    ctx.fillText('y', p.x + 8, p.y + 5);

    // Eixo Z - vermelho
    p = proj(0, 0, 2.5);
    ctx.strokeStyle = '#E53935';
    ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    ctx.fillStyle = '#E53935';
    ctx.fillText('z', p.x + 5, p.y - 10);

    // Ponto P(2,1,1.5)
    const pp = proj(2, 1, 1.5);
    ctx.fillStyle = '#FFB300';
    ctx.beginPath(); ctx.arc(pp.x, pp.y, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '14px Arial';
    ctx.fillText('P(2,1,1.5)', pp.x + 12, pp.y - 5);

    // Linhas pontilhadas até eixos
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(255,179,0,0.5)'; ctx.lineWidth = 1;
    const pxy = proj(2, 1, 0);
    ctx.beginPath(); ctx.moveTo(pp.x, pp.y); ctx.lineTo(pxy.x, pxy.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pxy.x, pxy.y); ctx.lineTo(proj(2,0,0).x, proj(2,0,0).y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pxy.x, pxy.y); ctx.lineTo(proj(0,1,0).x, proj(0,1,0).y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pp.x, pp.y); ctx.lineTo(proj(0,0,1.5).x, proj(0,0,1.5).y); ctx.stroke();
    ctx.setLineDash([]);

    const span = document.getElementById('coord3d-rot-value');
    if (span) span.textContent = angle + '°';
  }

  function cleanup() {
    if (slider) slider.removeEventListener('input', draw);
  }

  window.vizCoordenadas3D = { init, cleanup };
})();

// 1. Vetor básico com slider
(function () {
  let canvas, ctx, sliderX, sliderY;

  function init() {
    canvas = document.getElementById('vetor-basico');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    sliderX = document.getElementById('vetor-x');
    sliderY = document.getElementById('vetor-y');

    if (sliderX) sliderX.addEventListener('input', draw);
    if (sliderY) sliderY.addEventListener('input', draw);
    draw();
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const vx = parseFloat(sliderX ? sliderX.value : 2);
    const vy = parseFloat(sliderY ? sliderY.value : 1);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = 40;

    // Grid
    ctx.strokeStyle = 'rgba(224,224,224,0.1)';
    ctx.lineWidth = 0.5;
    for (let x = -5; x <= 5; x++) {
      ctx.beginPath(); ctx.moveTo(cx + x * scale, 0); ctx.lineTo(cx + x * scale, canvas.height); ctx.stroke();
    }
    for (let y = -3; y <= 3; y++) {
      ctx.beginPath(); ctx.moveTo(0, cy - y * scale); ctx.lineTo(canvas.width, cy - y * scale); ctx.stroke();
    }

    // Eixos
    ctx.strokeStyle = 'rgba(224,224,224,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(canvas.width, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, canvas.height); ctx.stroke();

    // Vetor
    const endX = cx + vx * scale;
    const endY = cy - vy * scale;
    ctx.strokeStyle = COR_POSICAO;
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(endX, endY); ctx.stroke();

    // Seta
    const angle = Math.atan2(cy - endY, endX - cx);
    ctx.fillStyle = COR_POSICAO;
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - 10 * Math.cos(angle - 0.4), endY + 10 * Math.sin(angle - 0.4));
    ctx.lineTo(endX - 10 * Math.cos(angle + 0.4), endY + 10 * Math.sin(angle + 0.4));
    ctx.closePath(); ctx.fill();

    // Labels
    const mag = Math.sqrt(vx * vx + vy * vy);
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`v⃗ = ⟨${vx}, ${vy}⟩`, 10, 25);
    ctx.fillText(`|v⃗| = ${mag.toFixed(2)}`, 10, 45);

    const spanX = document.getElementById('vetor-x-value');
    const spanY = document.getElementById('vetor-y-value');
    if (spanX) spanX.textContent = vx;
    if (spanY) spanY.textContent = vy;
  }

  function cleanup() {
    if (sliderX) sliderX.removeEventListener('input', draw);
    if (sliderY) sliderY.removeEventListener('input', draw);
  }

  window.vizVetorBasico = { init, cleanup };
})();

// 2. Reta paramétrica no espaço
(function () {
  let canvas, ctx, slider;

  function init() {
    canvas = document.getElementById('reta-espaco');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    slider = document.getElementById('reta-t');
    if (slider) slider.addEventListener('input', draw);
    draw();
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = parseFloat(slider ? slider.value : 1);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = 40;

    // Grid
    ctx.strokeStyle = 'rgba(224,224,224,0.1)';
    ctx.lineWidth = 0.5;
    for (let x = -5; x <= 5; x++) {
      ctx.beginPath(); ctx.moveTo(cx + x * scale, 0); ctx.lineTo(cx + x * scale, canvas.height); ctx.stroke();
    }
    for (let y = -4; y <= 4; y++) {
      ctx.beginPath(); ctx.moveTo(0, cy - y * scale); ctx.lineTo(canvas.width, cy - y * scale); ctx.stroke();
    }

    // Eixos
    ctx.strokeStyle = 'rgba(224,224,224,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(canvas.width, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, canvas.height); ctx.stroke();

    // Reta: r(t) = r0 + t*d, com r0=(1,1), d=(2,1)
    const r0x = 1, r0y = 1;
    const dx = 2, dy = 1;

    // Desenhar reta completa (linha tracejada)
    ctx.strokeStyle = 'rgba(79,195,247,0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(cx + (r0x - 3 * dx) * scale, cy - (r0y - 3 * dy) * scale);
    ctx.lineTo(cx + (r0x + 5 * dx) * scale, cy - (r0y + 5 * dy) * scale);
    ctx.stroke();
    ctx.setLineDash([]);

    // Ponto r0
    ctx.fillStyle = COR_VELOCIDADE;
    ctx.beginPath();
    ctx.arc(cx + r0x * scale, cy - r0y * scale, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '13px Arial';
    ctx.fillText('r₀', cx + r0x * scale + 8, cy - r0y * scale - 8);

    // Ponto r(t)
    const rx = r0x + t * dx;
    const ry = r0y + t * dy;
    ctx.fillStyle = COR_FORCA;
    ctx.beginPath();
    ctx.arc(cx + rx * scale, cy - ry * scale, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e0e0e0';
    ctx.fillText(`r(${t.toFixed(1)})`, cx + rx * scale + 8, cy - ry * scale - 8);

    // Vetor direção
    ctx.strokeStyle = COR_ACELERACAO;
    ctx.lineWidth = 2;
    const dEndX = cx + (r0x + dx) * scale;
    const dEndY = cy - (r0y + dy) * scale;
    ctx.beginPath();
    ctx.moveTo(cx + r0x * scale, cy - r0y * scale);
    ctx.lineTo(dEndX, dEndY);
    ctx.stroke();
    const angle = Math.atan2(-(dy), dx);
    ctx.fillStyle = COR_ACELERACAO;
    ctx.beginPath();
    ctx.moveTo(dEndX, dEndY);
    ctx.lineTo(dEndX - 8 * Math.cos(angle - 0.4), dEndY - 8 * Math.sin(angle - 0.4));
    ctx.lineTo(dEndX - 8 * Math.cos(angle + 0.4), dEndY - 8 * Math.sin(angle + 0.4));
    ctx.closePath(); ctx.fill();
    ctx.fillText('d⃗', dEndX + 5, dEndY - 5);

    // Labels
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`t = ${t.toFixed(1)}`, 10, 25);
    ctx.fillText(`r(t) = (1,1) + t·(2,1)`, 10, 45);

    const span = document.getElementById('reta-t-value');
    if (span) span.textContent = t.toFixed(1);
  }

  function cleanup() {
    if (slider) slider.removeEventListener('input', draw);
  }

  window.vizRetaEspaco = { init, cleanup };
})();

// 3. Plano com vetor normal - VERSÃO 3D INTERATIVA
(function () {
  let canvas, ctx, sliderA, sliderB, sliderC;
  let rotationAngle = 0;
  let isDragging = false;
  let lastMouseX = 0;

  function init() {
    canvas = document.getElementById('plano-espaco');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    
    sliderA = document.getElementById('plano-a');
    sliderB = document.getElementById('plano-b');
    sliderC = document.getElementById('plano-c');
    
    if (sliderA) sliderA.addEventListener('input', draw);
    if (sliderB) sliderB.addEventListener('input', draw);
    if (sliderC) sliderC.addEventListener('input', draw);
    
    // Controles de rotação com mouse
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    
    // Instrução visível
    canvas.title = 'Clique e arraste para rotacionar a vista 3D';
    
    draw();
  }

  function onMouseDown(e) {
    isDragging = true;
    lastMouseX = e.clientX;
    e.preventDefault();
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMouseX;
    rotationAngle += deltaX * 0.01;
    lastMouseX = e.clientX;
    draw();
    e.preventDefault();
  }

  function onMouseUp() {
    isDragging = false;
  }

  function draw() {
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    
    // Fundo
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, w, h);
    
    const a = parseFloat(sliderA ? sliderA.value : 1);
    const b = parseFloat(sliderB ? sliderB.value : 1);
    const c = parseFloat(sliderC ? sliderC.value : 1);
    
    const cx = w / 2;
    const cy = h / 2;
    const scale = 40;
    
    // Projeção 3D
    function proj(x, y, z) {
      return {
        x: cx + (x - y) * Math.cos(rotationAngle) * scale,
        y: cy - z * scale * 0.8 + (x + y) * Math.sin(rotationAngle) * scale * 0.3
      };
    }
    
    // Grid de fundo no plano XY
    ctx.strokeStyle = 'rgba(79,195,247,0.08)';
    ctx.lineWidth = 0.5;
    for (let i = -5; i <= 5; i++) {
      for (let j = -5; j <= 5; j++) {
        const p1 = proj(i, j, 0);
        const p2 = proj(i+1, j, 0);
        const p3 = proj(i, j+1, 0);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.stroke();
      }
    }
    
    const origin = proj(0, 0, 0);
    
    // Eixos 3D
    // Eixo X - azul
    const xAxis = proj(3, 0, 0);
    ctx.strokeStyle = '#1E88E5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(xAxis.x, xAxis.y);
    ctx.stroke();
    ctx.fillStyle = '#1E88E5';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('x', xAxis.x + 8, xAxis.y + 5);
    
    // Eixo Y - verde
    const yAxis = proj(0, 3, 0);
    ctx.strokeStyle = '#43A047';
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(yAxis.x, yAxis.y);
    ctx.stroke();
    ctx.fillStyle = '#43A047';
    ctx.fillText('y', yAxis.x + 8, yAxis.y + 5);
    
    // Eixo Z - vermelho
    const zAxis = proj(0, 0, 3);
    ctx.strokeStyle = '#E53935';
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(zAxis.x, zAxis.y);
    ctx.stroke();
    ctx.fillStyle = '#E53935';
    ctx.fillText('z', zAxis.x + 5, zAxis.y - 10);
    
    // Calcular vetor normal normalizado
    const normMag = Math.sqrt(a*a + b*b + c*c);
    if (normMag < 0.001) return; // Evitar divisão por zero
    
    const nx = a / normMag;
    const ny = b / normMag;
    const nz = c / normMag;
    
    // Encontrar dois vetores perpendiculares ao normal (tangent vectors)
    let t1x, t1y, t1z;
    let t2x, t2y, t2z;
    
    if (Math.abs(nz) > 0.9) {
      // Normal quase paralela ao eixo Z
      t1x = 1; t1y = 0; t1z = 0;
      t2x = 0; t2y = 1; t2z = 0;
    } else {
      // Normal não paralela ao Z
      t1x = ny; t1y = -nx; t1z = 0;
      const t1Mag = Math.sqrt(t1x*t1x + t1y*t1y);
      t1x /= t1Mag; t1y /= t1Mag;
      
      // Produto vetorial para o segundo vetor tangente
      t2x = ny*t1z - nz*t1y;
      t2y = nz*t1x - nx*t1z;
      t2z = nx*t1y - ny*t1x;
      const t2Mag = Math.sqrt(t2x*t2x + t2y*t2y + t2z*t2z);
      t2x /= t2Mag; t2y /= t2Mag; t2z /= t2Mag;
    }
    
    // Desenhar o plano como um grid rotacionado
    const planeSize = 3;
    const gridLines = 5;
    
    // Cor do plano
    ctx.fillStyle = 'rgba(79,195,247,0.15)';
    ctx.strokeStyle = 'rgba(79,195,247,0.4)';
    ctx.lineWidth = 1;
    
    // Desenhar grid no plano
    for (let i = -gridLines; i <= gridLines; i++) {
      for (let j = -gridLines; j <= gridLines; j++) {
        // Linhas na direção t1
        const p1 = proj(
          (i/gridLines)*planeSize*t1x + (j/gridLines)*planeSize*t2x,
          (i/gridLines)*planeSize*t1y + (j/gridLines)*planeSize*t2y,
          (i/gridLines)*planeSize*t1z + (j/gridLines)*planeSize*t2z
        );
        const p2 = proj(
          ((i+1)/gridLines)*planeSize*t1x + (j/gridLines)*planeSize*t2x,
          ((i+1)/gridLines)*planeSize*t1y + (j/gridLines)*planeSize*t2y,
          ((i+1)/gridLines)*planeSize*t1z + (j/gridLines)*planeSize*t2z
        );
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        
        // Linhas na direção t2
        const p3 = proj(
          (i/gridLines)*planeSize*t1x + ((j+1)/gridLines)*planeSize*t2x,
          (i/gridLines)*planeSize*t1y + ((j+1)/gridLines)*planeSize*t2y,
          (i/gridLines)*planeSize*t1z + ((j+1)/gridLines)*planeSize*t2z
        );
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.stroke();
      }
    }
    
    // Desenhar o contorno do plano (losango)
    const corners = [
      proj(planeSize*t1x + planeSize*t2x, planeSize*t1y + planeSize*t2y, planeSize*t1z + planeSize*t2z),
      proj(planeSize*t1x - planeSize*t2x, planeSize*t1y - planeSize*t2y, planeSize*t1z - planeSize*t2z),
      proj(-planeSize*t1x - planeSize*t2x, -planeSize*t1y - planeSize*t2y, -planeSize*t1z - planeSize*t2z),
      proj(-planeSize*t1x + planeSize*t2x, -planeSize*t1y + planeSize*t2y, -planeSize*t1z + planeSize*t2z)
    ];
    
    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    for (let i = 1; i < 4; i++) {
      ctx.lineTo(corners[i].x, corners[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Vetor normal (partindo do centro do plano)
    const normalScale = 2.5;
    const normalEnd = proj(nx*normalScale, ny*normalScale, nz*normalScale);
    
    // Cor do vetor normal - AMARELO para destaque
    const corNormal = '#FFB300';
    
    ctx.strokeStyle = corNormal;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(normalEnd.x, normalEnd.y);
    ctx.stroke();
    
    // Seta no vetor normal
    const angle = Math.atan2(origin.y - normalEnd.y, normalEnd.x - origin.x);
    ctx.fillStyle = corNormal;
    ctx.beginPath();
    ctx.moveTo(normalEnd.x, normalEnd.y);
    ctx.lineTo(normalEnd.x - 12 * Math.cos(angle - 0.4), normalEnd.y + 12 * Math.sin(angle - 0.4));
    ctx.lineTo(normalEnd.x - 12 * Math.cos(angle + 0.4), normalEnd.y + 12 * Math.sin(angle + 0.4));
    ctx.closePath();
    ctx.fill();
    
    // Label do vetor normal no topo da seta
    ctx.fillStyle = corNormal;
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('n⃗', normalEnd.x + 15 * Math.cos(angle), normalEnd.y - 15 * Math.sin(angle));
    
    // Labels informativos
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`n⃗ = ⟨${a.toFixed(1)}, ${b.toFixed(1)}, ${c.toFixed(1)}⟩`, 10, 25);
    ctx.fillText(`Plano: ${a.toFixed(1)}x + ${b.toFixed(1)}y + ${c.toFixed(1)}z = 0`, 10, 45);
    
    // Instrução
    ctx.fillStyle = 'rgba(224,224,224,0.5)';
    ctx.font = '12px Arial';
    ctx.fillText('Clique e arraste para rotacionar', 10, h - 10);
    
    // Atualizar spans dos sliders
    const spanA = document.getElementById('plano-a-value');
    const spanB = document.getElementById('plano-b-value');
    const spanC = document.getElementById('plano-c-value');
    if (spanA) spanA.textContent = a.toFixed(1);
    if (spanB) spanB.textContent = b.toFixed(1);
    if (spanC) spanC.textContent = c.toFixed(1);
  }

  function cleanup() {
    if (sliderA) sliderA.removeEventListener('input', draw);
    if (sliderB) sliderB.removeEventListener('input', draw);
    if (sliderC) sliderC.removeEventListener('input', draw);
    if (canvas) {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
    }
  }

  window.vizPlanoEspaco = { init, cleanup };
})();

// 4. Produto vetorial (cross product) - 2D simplificado
(function () {
  let canvas, ctx, animId;
  let angle = 0;

  function init() {
    canvas = document.getElementById('produto-vetorial');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    animate();
  }

  function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = 50;

    // Grid
    ctx.strokeStyle = 'rgba(224,224,224,0.1)';
    ctx.lineWidth = 0.5;
    for (let x = -4; x <= 4; x++) {
      ctx.beginPath(); ctx.moveTo(cx + x * scale, 0); ctx.lineTo(cx + x * scale, canvas.height); ctx.stroke();
    }
    for (let y = -2; y <= 2; y++) {
      ctx.beginPath(); ctx.moveTo(0, cy - y * scale); ctx.lineTo(canvas.width, cy - y * scale); ctx.stroke();
    }

    // Eixos
    ctx.strokeStyle = 'rgba(224,224,224,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(canvas.width, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, canvas.height); ctx.stroke();

    // Vetor u (fixo)
    const ux = 2, uy = 0.5;
    desenharVetor(ctx, cx, cy, ux, uy, scale, COR_VELOCIDADE, 'u⃗');

    // Vetor v (girando)
    const vx = 1.5 * Math.cos(angle);
    const vy = 1.5 * Math.sin(angle);
    desenharVetor(ctx, cx, cy, vx, vy, scale, COR_ACELERACAO, 'v⃗');

    // Produto vetorial (área do paralelogramo)
    const cross = ux * vy - uy * vx;
    ctx.fillStyle = 'rgba(255,179,0,0.2)';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + ux * scale, cy - uy * scale);
    ctx.lineTo(cx + (ux + vx) * scale, cy - (uy + vy) * scale);
    ctx.lineTo(cx + vx * scale, cy - vy * scale);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#e0e0e0';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`|u⃗ × v⃗| = ${Math.abs(cross).toFixed(2)}`, 10, 25);
    ctx.fillText('(área do paralelogramo)', 10, 45);

    angle += 0.015;
    animId = requestAnimationFrame(animate);
  }

  function desenharVetor(ctx, cx, cy, vx, vy, scale, cor, label) {
    const endX = cx + vx * scale;
    const endY = cy - vy * scale;
    ctx.strokeStyle = cor;
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(endX, endY); ctx.stroke();
    const a = Math.atan2(cy - endY, endX - cx);
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - 8 * Math.cos(a - 0.4), endY + 8 * Math.sin(a - 0.4));
    ctx.lineTo(endX - 8 * Math.cos(a + 0.4), endY + 8 * Math.sin(a + 0.4));
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = cor;
    ctx.font = '14px Arial';
    ctx.fillText(label, endX + 5, endY - 5);
  }

  function cleanup() {
    if (animId) cancelAnimationFrame(animId);
  }

  window.vizProdutoVetorial = { init, cleanup };
})();

// 3. Elipse com excentricidade ajustável
(function () {
  let canvas, ctx, slider;

  function init() {
    canvas = document.getElementById('elipse-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    slider = document.getElementById('elipse-e');
    if (slider) slider.addEventListener('input', draw);
    draw();
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const e = parseFloat(slider ? slider.value : 0.5);
    const a = 3; // semi-eixo maior
    const c = e * a;
    const b = Math.sqrt(a * a - c * c);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) / 8;

    // Grid
    ctx.strokeStyle = 'rgba(224,224,224,0.1)';
    ctx.lineWidth = 0.5;
    for (let x = -4; x <= 4; x++) {
      ctx.beginPath(); ctx.moveTo(cx + x * scale, 0); ctx.lineTo(cx + x * scale, canvas.height); ctx.stroke();
    }
    for (let y = -3; y <= 3; y++) {
      ctx.beginPath(); ctx.moveTo(0, cy - y * scale); ctx.lineTo(canvas.width, cy - y * scale); ctx.stroke();
    }

    // Eixos
    ctx.strokeStyle = 'rgba(224,224,224,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(canvas.width, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, canvas.height); ctx.stroke();

    // Elipse
    ctx.strokeStyle = COR_VELOCIDADE;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(cx, cy, a * scale, b * scale, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Focos
    ctx.fillStyle = COR_ACELERACAO;
    ctx.beginPath(); ctx.arc(cx - c * scale, cy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + c * scale, cy, 5, 0, Math.PI * 2); ctx.fill();

    // Labels
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`e = ${e.toFixed(2)}`, 10, 20);
    ctx.fillText(`a = ${a.toFixed(1)}, b = ${b.toFixed(2)}`, 10, 40);
    ctx.fillText(`c = ${c.toFixed(2)}`, 10, 60);

    // Labels focos
    ctx.fillStyle = COR_ACELERACAO;
    ctx.fillText('F₁', cx - c * scale - 15, cy + 20);
    ctx.fillText('F₂', cx + c * scale + 5, cy + 20);

    const span = document.getElementById('elipse-e-value');
    if (span) span.textContent = e.toFixed(2);
  }

  function cleanup() {
    if (slider) slider.removeEventListener('input', draw);
  }

  window.vizElipse = { init, cleanup };
})();

// 4. Parábola com foco e diretriz
(function () {
  let canvas, ctx, slider;

  function init() {
    canvas = document.getElementById('parabola-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    slider = document.getElementById('parabola-p');
    if (slider) slider.addEventListener('input', draw);
    draw();
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const p = parseFloat(slider ? slider.value : 1);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = 40;

    // Grid
    ctx.strokeStyle = 'rgba(224,224,224,0.1)';
    ctx.lineWidth = 0.5;
    for (let x = -4; x <= 4; x++) {
      ctx.beginPath(); ctx.moveTo(cx + x * scale, 0); ctx.lineTo(cx + x * scale, canvas.height); ctx.stroke();
    }
    for (let y = -3; y <= 3; y++) {
      ctx.beginPath(); ctx.moveTo(0, cy - y * scale); ctx.lineTo(canvas.width, cy - y * scale); ctx.stroke();
    }

    // Eixos
    ctx.strokeStyle = 'rgba(224,224,224,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(canvas.width, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, canvas.height); ctx.stroke();

    // Diretriz (linha vertical x = -p)
    ctx.strokeStyle = 'rgba(229,57,53,0.5)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(cx - p * scale, 0);
    ctx.lineTo(cx - p * scale, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Parábola y² = 4px → x = y²/(4p)
    ctx.strokeStyle = COR_FORCA;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;
    for (let py = -3; py <= 3; py += 0.05) {
      const px = (py * py) / (4 * p);
      const sx = cx + px * scale;
      const sy = cy - py * scale;
      if (!started) { ctx.moveTo(sx, sy); started = true; }
      else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Foco
    ctx.fillStyle = COR_ACELERACAO;
    ctx.beginPath(); ctx.arc(cx + p * scale, cy, 5, 0, Math.PI * 2); ctx.fill();

    // Vértice
    ctx.fillStyle = COR_VELOCIDADE;
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();

    // Labels
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`p = ${p.toFixed(2)}`, 10, 20);
    ctx.fillText('y² = 4px', 10, 40);

    ctx.fillStyle = COR_ACELERACAO;
    ctx.fillText('F', cx + p * scale + 8, cy - 8);
    ctx.fillStyle = 'rgba(229,57,53,0.8)';
    ctx.fillText('diretriz', cx - p * scale - 50, 20);

    const span = document.getElementById('parabola-p-value');
    if (span) span.textContent = p.toFixed(2);
  }

  function cleanup() {
    if (slider) slider.removeEventListener('input', draw);
  }

  window.vizParabola = { init, cleanup };
})();

// 5. Hipérbole com excentricidade ajustável
(function () {
  let canvas, ctx, slider;

  function init() {
    canvas = document.getElementById('hiperbole-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    slider = document.getElementById('hiperbole-e');
    if (slider) slider.addEventListener('input', draw);
    draw();
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const e = parseFloat(slider ? slider.value : 1.5);
    const a = 2;
    const c = e * a;
    const b = Math.sqrt(c * c - a * a);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = 35;

    // Grid
    ctx.strokeStyle = 'rgba(224,224,224,0.1)';
    ctx.lineWidth = 0.5;
    for (let x = -5; x <= 5; x++) {
      ctx.beginPath(); ctx.moveTo(cx + x * scale, 0); ctx.lineTo(cx + x * scale, canvas.height); ctx.stroke();
    }
    for (let y = -4; y <= 4; y++) {
      ctx.beginPath(); ctx.moveTo(0, cy - y * scale); ctx.lineTo(canvas.width, cy - y * scale); ctx.stroke();
    }

    // Eixos
    ctx.strokeStyle = 'rgba(224,224,224,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(canvas.width, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, canvas.height); ctx.stroke();

    // Assíntotas
    ctx.strokeStyle = 'rgba(224,224,224,0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    const slope = b / a;
    ctx.beginPath(); ctx.moveTo(0, cy + slope * cx); ctx.lineTo(canvas.width, cy - slope * (canvas.width - cx)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, cy - slope * cx); ctx.lineTo(canvas.width, cy + slope * (canvas.width - cx)); ctx.stroke();
    ctx.setLineDash([]);

    // Hipérbole (ramo direito e esquerdo)
    ctx.strokeStyle = COR_ACELERACAO;
    ctx.lineWidth = 2.5;

    // Ramo direito
    ctx.beginPath();
    let started = false;
    for (let py = -3; py <= 3; py += 0.05) {
      const px = a * Math.sqrt(1 + (py * py) / (b * b));
      const sx = cx + px * scale;
      const sy = cy - py * scale;
      if (!started) { ctx.moveTo(sx, sy); started = true; }
      else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Ramo esquerdo
    ctx.beginPath();
    started = false;
    for (let py = -3; py <= 3; py += 0.05) {
      const px = -a * Math.sqrt(1 + (py * py) / (b * b));
      const sx = cx + px * scale;
      const sy = cy - py * scale;
      if (!started) { ctx.moveTo(sx, sy); started = true; }
      else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Vértices
    ctx.fillStyle = COR_VELOCIDADE;
    ctx.beginPath(); ctx.arc(cx - a * scale, cy, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + a * scale, cy, 4, 0, Math.PI * 2); ctx.fill();

    // Focos
    ctx.fillStyle = COR_FORCA;
    ctx.beginPath(); ctx.arc(cx - c * scale, cy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + c * scale, cy, 5, 0, Math.PI * 2); ctx.fill();

    // Labels
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`e = ${e.toFixed(2)}`, 10, 20);
    ctx.fillText(`a = ${a}, b = ${b.toFixed(2)}`, 10, 40);

    const span = document.getElementById('hiperbole-e-value');
    if (span) span.textContent = e.toFixed(2);
  }

  function cleanup() {
    if (slider) slider.removeEventListener('input', draw);
  }

  window.vizHiperbole = { init, cleanup };
})();

// 6. Órbitas - visualização interativa de seções cônicas como trajetórias
(function () {
  let canvas, ctx, slider;

  function init() {
    canvas = document.getElementById('orbitas-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    slider = document.getElementById('orbita-e');
    if (slider) slider.addEventListener('input', draw);
    draw();
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const e = parseFloat(slider ? slider.value : 0.5);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = 30;

    // Sol (foco)
    const solX = cx;
    const solY = cy;

    // Grid
    ctx.strokeStyle = 'rgba(224,224,224,0.05)';
    ctx.lineWidth = 0.5;
    for (let x = -8; x <= 8; x++) {
      ctx.beginPath(); ctx.moveTo(cx + x * scale, 0); ctx.lineTo(cx + x * scale, canvas.height); ctx.stroke();
    }
    for (let y = -5; y <= 5; y++) {
      ctx.beginPath(); ctx.moveTo(0, cy - y * scale); ctx.lineTo(canvas.width, cy - y * scale); ctx.stroke();
    }

    // Desenhar órbita baseada na excentricidade
    ctx.lineWidth = 2.5;

    if (e < 1) {
      // Elipse
      const a = 5;
      const c = e * a;
      const b = Math.sqrt(a * a - c * c);
      ctx.strokeStyle = COR_VELOCIDADE;
      ctx.beginPath();
      ctx.ellipse(cx - c * scale, cy, a * scale, b * scale, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Sol no foco
      ctx.fillStyle = '#FFD700';
      ctx.beginPath(); ctx.arc(solX, solY, 10, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#e0e0e0';
      ctx.font = '12px Arial';
      ctx.fillText('Sol', solX + 12, solY + 4);

    } else if (Math.abs(e - 1) < 0.05) {
      // Parábola
      const p = 3;
      ctx.strokeStyle = COR_FORCA;
      ctx.beginPath();
      let started = false;
      for (let py = -4; py <= 4; py += 0.05) {
        const px = (py * py) / (4 * p) - p;
        const sx = cx + px * scale;
        const sy = cy - py * scale;
        if (sx < 0 || sx > canvas.width) continue;
        if (!started) { ctx.moveTo(sx, sy); started = true; }
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      ctx.fillStyle = '#FFD700';
      ctx.beginPath(); ctx.arc(cx - p * scale, cy, 10, 0, Math.PI * 2); ctx.fill();

    } else {
      // Hipérbole (ramo mais próximo)
      const a = 3;
      const c = e * a;
      const b = Math.sqrt(c * c - a * a);
      ctx.strokeStyle = COR_ACELERACAO;
      ctx.beginPath();
      let started = false;
      for (let py = -4; py <= 4; py += 0.05) {
        const px = -a * Math.sqrt(1 + (py * py) / (b * b));
        const sx = cx + px * scale;
        const sy = cy - py * scale;
        if (sx < 0 || sx > canvas.width) continue;
        if (!started) { ctx.moveTo(sx, sy); started = true; }
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      ctx.fillStyle = '#FFD700';
      ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2); ctx.fill();
    }

    // Label
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    let tipo = e < 0.95 ? 'Elipse (órbita fechada)' : e < 1.05 ? 'Parábola (vel. escape)' : 'Hipérbole (traj. aberta)';
    ctx.fillText(`e = ${e.toFixed(2)} → ${tipo}`, 10, 25);

    const span = document.getElementById('orbita-e-value');
    if (span) span.textContent = e.toFixed(2);
  }

  function cleanup() {
    if (slider) slider.removeEventListener('input', draw);
  }

  window.vizOrbitas = { init, cleanup };
})();

document.addEventListener('DOMContentLoaded', function () {
  // Inicializar as visualizações apenas após a inicialização completa do Reveal.js
  Reveal.on('ready', function () {
    console.log('Reveal.js está pronto, inicializando visualizações...');

    // Verificar se os elementos existem antes de criar as visualizações
    if (document.getElementById('derivada-geometrica')) {
      console.log('Inicializando visualização da derivada');
      window.derivadaVisual = criarVisualizacaoDerivada('derivada-geometrica');
    } else {
      console.warn('Elemento derivada-geometrica não encontrado');
    }

    if (document.getElementById('integral-geometrica')) {
      console.log('Inicializando visualização da integral');
      window.integralVisual = criarVisualizacaoIntegral('integral-geometrica');
    } else {
      console.warn('Elemento integral-geometrica não encontrado');
    }

    // Inicializar visualizações de curvas de nível
    if (window.vizEsferaNiveis) window.vizEsferaNiveis.init();
    if (window.vizParaboloideNiveis) window.vizParaboloideNiveis.init();
    if (window.vizSelaNiveis) window.vizSelaNiveis.init();
    if (window.vizHiperboloideNiveis) window.vizHiperboloideNiveis.init();

    // Inicializar visualizações de geometria analítica
    if (window.vizCoordenadas3D) window.vizCoordenadas3D.init();
    if (window.vizVetorBasico) window.vizVetorBasico.init();
    if (window.vizProdutoVetorial) window.vizProdutoVetorial.init();
    if (window.vizRetaEspaco) window.vizRetaEspaco.init();
    if (window.vizPlanoEspaco) window.vizPlanoEspaco.init();
    if (window.vizElipse) window.vizElipse.init();
    if (window.vizParabola) window.vizParabola.init();
    if (window.vizHiperbole) window.vizHiperbole.init();
    if (window.vizOrbitas) window.vizOrbitas.init();
  });

  // Atualizar visualizações quando os slides mudarem
  Reveal.on('slidechanged', function (event) {
    console.log('Slide mudou, verificando visualizações...');

    // Verificar cada visualização quando o slide mudar
    setTimeout(function () {
      // Usar um pequeno atraso para garantir que o DOM foi atualizado
      if (
        event.currentSlide.contains(
          document.getElementById('derivada-geometrica')
        ) &&
        window.derivadaVisual
      ) {
        console.log('Renderizando visualização da derivada');
        window.derivadaVisual.renderizar();
      }

      if (
        event.currentSlide.contains(
          document.getElementById('integral-geometrica')
        ) &&
        window.integralVisual
      ) {
        console.log('Renderizando visualização da integral');
        window.integralVisual.renderizar();
      }

      // Reinicializar visualizações de curvas de nível se necessário
      if (
        event.currentSlide.querySelector('#esfera-niveis') &&
        window.vizEsferaNiveis
      ) {
        window.vizEsferaNiveis.init();
      }
      if (
        event.currentSlide.querySelector('#paraboloide-niveis') &&
        window.vizParaboloideNiveis
      ) {
        window.vizParaboloideNiveis.init();
      }
      if (
        event.currentSlide.querySelector('#sela-niveis') &&
        window.vizSelaNiveis
      ) {
        window.vizSelaNiveis.init();
      }
      if (
        event.currentSlide.querySelector('#hiperboloide-niveis') &&
        window.vizHiperboloideNiveis
      ) {
        window.vizHiperboloideNiveis.init();
      }

      // Reinicializar visualizações de geometria analítica
      if (
        event.currentSlide.querySelector('#coordenadas-3d') &&
        window.vizCoordenadas3D
      ) {
        window.vizCoordenadas3D.init();
      }
      if (
        event.currentSlide.querySelector('#vetor-basico') &&
        window.vizVetorBasico
      ) {
        window.vizVetorBasico.init();
      }
      if (
        event.currentSlide.querySelector('#produto-vetorial') &&
        window.vizProdutoVetorial
      ) {
        window.vizProdutoVetorial.init();
      }
      if (
        event.currentSlide.querySelector('#reta-espaco') &&
        window.vizRetaEspaco
      ) {
        window.vizRetaEspaco.init();
      }
      if (
        event.currentSlide.querySelector('#plano-espaco') &&
        window.vizPlanoEspaco
      ) {
        window.vizPlanoEspaco.init();
      }
      if (
        event.currentSlide.querySelector('#elipse-canvas') &&
        window.vizElipse
      ) {
        window.vizElipse.init();
      }
      if (
        event.currentSlide.querySelector('#parabola-canvas') &&
        window.vizParabola
      ) {
        window.vizParabola.init();
      }
      if (
        event.currentSlide.querySelector('#hiperbole-canvas') &&
        window.vizHiperbole
      ) {
        window.vizHiperbole.init();
      }
      if (
        event.currentSlide.querySelector('#orbitas-canvas') &&
        window.vizOrbitas
      ) {
        window.vizOrbitas.init();
      }
    }, 100);
  });
});
