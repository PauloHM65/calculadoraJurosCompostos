// Classe para configuração do investimento
class Configuracao {
    constructor(investindo, jurosAnual, qtdAnos, reinvest, fica, aplicacaoMensal = 0) {
        this.investindo = investindo;
        this.jurosAnual = jurosAnual;
        this.qtdAnos = qtdAnos;
        this.aplicacaoMensal = aplicacaoMensal;
        this.reinvest = reinvest; // Já em decimal (ex: 0.8 para 80%)
        this.fica = fica;         // Já em decimal (ex: 0.2 para 20%)
        this.jurosMensal = this.jurosAnual / 1200; // Percentual anual para decimal mensal
        this.qtdMeses = this.qtdAnos * 12;
    }
}

// Função principal de cálculo do investimento
function calcularInvestimento(investindo, jurosAnual, qtdAnos, reinvestPercentual, ficaPercentual, aplicacaoMensal = 0) {
    // Converte percentuais para decimais
    const reinvest = reinvestPercentual / 100;
    const fica = ficaPercentual / 100;

    const conta = new Configuracao(investindo, jurosAnual, qtdAnos, reinvest, fica, aplicacaoMensal);

    let respostaHTML = "";
    let dadosGrafico = []; // Array para armazenar dados do gráfico

    // Adiciona o valor inicial ao gráfico
    dadosGrafico.push({
        mes: 0,
        montante: conta.investindo,
        aplicacaoAcumulada: conta.investindo,
        jurosAcumulados: 0
    });

    let aplicacaoAcumulada = conta.investindo;
    let jurosAcumulados = 0;

    for (let i = 1; i <= conta.qtdMeses; i++) {
        // Calcula os juros recebidos no montante atual
        const recebidoNoMes = conta.investindo * conta.jurosMensal;
        
        // Determina valores a reinvestir e retirar baseado nos percentuais
        const reinvestir = recebidoNoMes * conta.reinvest;
        const parcelaRetirada = recebidoNoMes * conta.fica;

        // Armazena o montante no início do mês
        const montanteInicialDoMes = conta.investindo;

        // Adiciona a aplicação mensal
        conta.investindo += conta.aplicacaoMensal;
        aplicacaoAcumulada += conta.aplicacaoMensal;

        // Adiciona a parte reinvestida dos juros
        conta.investindo += reinvestir;
        jurosAcumulados += recebidoNoMes;

        // Adiciona dados ao gráfico
        dadosGrafico.push({
            mes: i,
            montante: conta.investindo,
            aplicacaoAcumulada: aplicacaoAcumulada,
            jurosAcumulados: jurosAcumulados
        });

        const linha = `
        <div class="month-result">
            <p><strong>Mês ${i}:</strong></p>
            <p>Montante Início do Mês: R$ ${montanteInicialDoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p>Aplicação Mensal: R$ ${conta.aplicacaoMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p>Juros Gerados no Mês: R$ ${recebidoNoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p>Reinvestido: R$ ${reinvestir.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p>Retirada (Salário): R$ ${parcelaRetirada.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p>Montante Final do Mês: R$ ${conta.investindo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>`;
        respostaHTML += linha;
    }

    return {
        respostaHTML: respostaHTML,
        montanteFinal: conta.investindo.toFixed(2),
        meses: conta.qtdMeses,
        dadosGrafico: dadosGrafico,
        totalAplicado: aplicacaoAcumulada,
        totalJuros: jurosAcumulados
    };
}

// Função para criar gráfico simples usando Canvas
function criarGrafico(dadosGrafico) {
    const chartContainer = document.getElementById('chartContainer');
    
    // Remove conteúdo anterior
    chartContainer.innerHTML = '';
    
    // Cria canvas
    const canvas = document.createElement('canvas');
    canvas.width = chartContainer.offsetWidth - 20;
    canvas.height = 180;
    canvas.style.width = '100%';
    canvas.style.height = '180px';
    chartContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Configurações do gráfico
    const padding = 40;
    const graphWidth = canvas.width - 2 * padding;
    const graphHeight = canvas.height - 2 * padding;
    
    // Encontra valores máximos para escala
    const maxMontante = Math.max(...dadosGrafico.map(d => d.montante));
    const maxMes = Math.max(...dadosGrafico.map(d => d.mes));
    
    // Limpa canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenha fundo
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Desenha grade
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    
    // Linhas horizontais
    for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding + graphWidth, y);
        ctx.stroke();
    }
    
    // Linhas verticais
    for (let i = 0; i <= 10; i++) {
        const x = padding + (graphWidth / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, padding + graphHeight);
        ctx.stroke();
    }
    
    // Desenha linha do montante
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    dadosGrafico.forEach((ponto, index) => {
        const x = padding + (ponto.mes / maxMes) * graphWidth;
        const y = padding + graphHeight - (ponto.montante / maxMontante) * graphHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Desenha pontos
    ctx.fillStyle = '#007bff';
    dadosGrafico.forEach(ponto => {
        const x = padding + (ponto.mes / maxMes) * graphWidth;
        const y = padding + graphHeight - (ponto.montante / maxMontante) * graphHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Adiciona labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'center';
    
    // Label do eixo X (meses)
    ctx.fillText('0', padding, canvas.height - 10);
    ctx.fillText(maxMes.toString(), padding + graphWidth, canvas.height - 10);
    
    // Label do eixo Y (valores)
    ctx.textAlign = 'right';
    ctx.fillText('R$ 0', padding - 5, padding + graphHeight + 5);
    ctx.fillText(`R$ ${(maxMontante / 1000).toFixed(0)}k`, padding - 5, padding + 5);
}

// Função para validar entrada
function validarEntradas() {
    const investimentoInicial = getSafeFloatValue("investimentoInicial");
    const aplicacaoMensal = getSafeFloatValue("aplicacaoMensal");
    const jurosAnual = getSafeFloatValue("jurosAnual");
    const qtdAnos = getSafeIntValue("qtdAnos");
    const reinvestimento = getSafeFloatValue("reinvestimento");
    const retirada = getSafeFloatValue("ficacao");

    const erros = [];

    if (investimentoInicial < 0) erros.push("Valor inicial não pode ser negativo");
    if (aplicacaoMensal < 0) erros.push("Aplicação mensal não pode ser negativa");
    if (jurosAnual <= 0) erros.push("Taxa de juros deve ser maior que zero");
    if (qtdAnos <= 0) erros.push("Período deve ser maior que zero");
    if (reinvestimento < 0 || reinvestimento > 100) erros.push("Reinvestimento deve estar entre 0 e 100%");
    if (retirada < 0 || retirada > 100) erros.push("Retirada deve estar entre 0 e 100%");
    if ((reinvestimento + retirada) > 100) erros.push("Soma de reinvestimento e retirada não pode exceder 100%");

    if (investimentoInicial === 0 && aplicacaoMensal === 0) {
        erros.push("Deve haver pelo menos um valor inicial ou aplicação mensal");
    }

    return erros;
}

// Função para mostrar mensagem de erro
function mostrarErro(mensagem) {
    const chartContainer = document.getElementById('chartContainer');
    chartContainer.innerHTML = `
        <div style="color: #dc3545; padding: 20px; text-align: center;">
            <p><strong>⚠️ Erro na validação:</strong></p>
            <p>${mensagem}</p>
        </div>
    `;
}

// Funções auxiliares para obter valores dos inputs
const getSafeFloatValue = (id) => {
    const value = parseFloat(document.getElementById(id).value);
    return isNaN(value) ? 0 : value;
};

const getSafeIntValue = (id) => {
    const value = parseInt(document.getElementById(id).value);
    return isNaN(value) ? 0 : value;
};

// Função para formatar números em moeda brasileira
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Event listeners quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    const calcularBtn = document.getElementById("calcularBtn");
    const toggleDetailedResultsBtn = document.getElementById("toggleDetailedResultsBtn");
    const detailedResults = document.getElementById("detailedResults");

    // Event listener para o botão calcular
    calcularBtn.addEventListener("click", () => {
        // Validar entradas
        const erros = validarEntradas();
        if (erros.length > 0) {
            mostrarErro(erros.join('<br>'));
            return;
        }

        // Obter valores dos inputs
        const investimentoInicial = getSafeFloatValue("investimentoInicial");
        const aplicacaoMensal = getSafeFloatValue("aplicacaoMensal");
        const jurosAnual = getSafeFloatValue("jurosAnual");
        const qtdAnos = getSafeIntValue("qtdAnos");
        const reinvestimento = getSafeFloatValue("reinvestimento");
        const retirada = getSafeFloatValue("ficacao");

        // Calcular investimento
        const resultado = calcularInvestimento(
            investimentoInicial,
            jurosAnual,
            qtdAnos,
            reinvestimento,
            retirada,
            aplicacaoMensal
        );

        // Atualizar resultados na interface
        document.getElementById("montanteFinal").textContent = formatarMoeda(parseFloat(resultado.montanteFinal));
        document.getElementById("periodoTotal").textContent = `${resultado.meses} meses`;

        // Criar gráfico
        criarGrafico(resultado.dadosGrafico);

        // Atualizar detalhes mensais
        detailedResults.innerHTML = "<h3>Detalhes Mês a Mês:</h3>" + resultado.respostaHTML;

        // Adicionar resumo adicional
        const resumoAdicional = `
            <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin-top: 0; color: #1976d2;">📊 Resumo do Investimento</h4>
                <p><strong>Total Aplicado:</strong> ${formatarMoeda(resultado.totalAplicado)}</p>
                <p><strong>Total em Juros:</strong> ${formatarMoeda(resultado.totalJuros)}</p>
                <p><strong>Rentabilidade:</strong> ${((resultado.totalJuros / resultado.totalAplicado) * 100).toFixed(2)}%</p>
            </div>
        `;
        
        detailedResults.innerHTML = "<h3>Detalhes Mês a Mês:</h3>" + resumoAdicional + resultado.respostaHTML;
    });

    // Event listener para toggle dos detalhes
    toggleDetailedResultsBtn.addEventListener("click", () => {
        detailedResults.classList.toggle("detailed-results-hidden");
        if (detailedResults.classList.contains("detailed-results-hidden")) {
            toggleDetailedResultsBtn.textContent = "Ver Detalhes Mensais";
        } else {
            toggleDetailedResultsBtn.textContent = "Esconder Detalhes Mensais";
        }
    });

    // Event listeners para validação em tempo real
    const inputs = ['investimentoInicial', 'aplicacaoMensal', 'jurosAnual', 'qtdAnos', 'reinvestimento', 'ficacao'];
    
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.addEventListener('input', () => {
            // Remove classes de erro anteriores
            input.classList.remove('error');
            
            // Validação básica em tempo real
            const value = parseFloat(input.value);
            if (isNaN(value) || value < 0) {
                input.classList.add('error');
            }
            
            // Validação específica para percentuais
            if ((inputId === 'reinvestimento' || inputId === 'ficacao') && value > 100) {
                input.classList.add('error');
            }
        });
    });
});

// Adiciona estilo para inputs com erro
const style = document.createElement('style');
style.textContent = `
    .input-group input.error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2) !important;
    }
`;
document.head.appendChild(style);
