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
    }, 100);
  });
});
