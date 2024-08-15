//esse programa faz o calculo de juros composto,com a opção de retiradas parciais do valor que sera reinvestido
/*
let valorFinal, recebidoNoMes, investindo, reinvestir, parcelaRetirada,juros, jurosmes, auxiliar,reinvest,fica, aplicacaoMensal


investindo = (  4000  )// valor
juros = (  8.5  ) //porcentagem
jurosmes = (juros/100)/12.0
meses = (  30  ) * 12 // digite em anos

/////Habilitar qunado for retirar parcelar mensais
//reinvest = (  1  ) //razao
//fica = (  0  ) //razao    
aplicacaoMensal = (  4000  )
// aporter mensal. Se nao for fazer, so colocar 0
*/
class configuração{
    constructor(investindo, JurosAnual, QtdAnos , reinvest, fica, AplicacaoMensal = 0){
        this.investindo = investindo;
        this.JurosAnual = JurosAnual;
        this.QtdAnos = QtdAnos;
        this.AplicacaoMensal = AplicacaoMensal;
        this.reinvest = reinvest; 
        this.fica = fica ;
        this.JurosMensal = this.JurosAnual/1200;
        this.QtdMeses = this.QtdAnos * 12;
    };

}
let conta = new configuração( 6000000, 7.5, 20, 6/10, 4/10);


for (let i = 1; i <= conta.QtdMeses; i++) {
    conta.investindo += conta.AplicacaoMensal
    let recebidoNoMes = conta.investindo*conta.JurosMensal
    let reinvestir = recebidoNoMes*conta.reinvest
    let parcelaRetirada = recebidoNoMes*conta.fica
    let auxiliar = conta.investindo
    conta.investindo += reinvestir

    console.log(`Mes: ${i} -->  (Juros: ${conta.JurosAnual}/ano --- ${conta.JurosMensal.toFixed(7)}/ mes)
        Montante Geral: ${(auxiliar.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}
        Valor aplicação mensal: ${conta.AplicacaoMensal}
        Valor a receber: ${recebidoNoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ( Reinvetir: ${reinvestir.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} -- "Salario": ${parcelaRetirada.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} )
        !! A aplicação mensal é além do que ja vai aplicar do retorno !!
        --------------------------------------------------------------------------------------- `)
}
