# Calculadora de Juros Compostos com Retiradas Mensais

Este projeto é uma calculadora web simples para simular o poder dos juros compostos, com a funcionalidade adicional de considerar aplicações mensais e retiradas parciais dos rendimentos. Ideal para quem deseja planejar investimentos e entender como juros e retiradas afetam o montante final ao longo do tempo.

## Funcionalidades

* **Configuração de Investimento Flexível**:
    * **Valor Inicial (R$)**: O montante com o qual você começa seu investimento.
    * **Aplicação Mensal (R$)**: Um valor fixo que você pretende adicionar ao seu investimento a cada mês.
    * **Juros Anual (%)**: A taxa de juros anual esperada para o seu investimento.
    * **Período (Anos)**: A duração total do investimento em anos.
    * **Reinvestimento (%)**: A porcentagem dos juros gerados que você deseja reinvestir no montante principal.
    * **Retirada (%)**: A porcentagem dos juros gerados que você deseja retirar mensalmente (como um "salário" dos seus rendimentos).
* **Resultados da Simulação**:
    * **Montante Final**: O valor total acumulado ao final do período.
    * **Período Total**: O período de investimento em meses.
    * **Evolução do Investimento (Gráfico)**: Uma representação visual do crescimento do seu montante ao longo dos meses.
    * **Detalhes Mês a Mês**: Uma tabela detalhada mostrando a quebra do cálculo para cada mês, incluindo montante inicial, aplicação mensal, juros gerados, valor reinvestido, valor retirado e montante final do mês.
    * **Resumo do Investimento**: Exibe o total aplicado e o total de juros acumulados.

## Como Usar

1.  **Acesse a Calculadora**: Abra o arquivo `index.html` em seu navegador web.
2.  **Preencha os Campos**: Insira os valores desejados nos campos de entrada:
    * `Valor Inicial`
    * `Aplicação Mensal`
    * `Juros Anual`
    * `Período (Anos)`
    * `Reinvestimento (%)`
    * `Retirada (%)`
    * Certifique-se de que a soma de "Reinvestimento (%)" e "Retirada (%)" não exceda 100%.
3.  **Calcular**: Clique no botão "Calcular Investimento".
4.  **Visualize os Resultados**: Os resultados sumários e o gráfico serão atualizados.
5.  **Ver Detalhes Mensais**: Clique em "Ver Detalhes Mensais" para expandir a seção e ver a simulação mês a mês.

## Estrutura do Projeto

* `index.html`: A estrutura principal da página web.
* `index.css`: Contém os estilos para a interface da calculadora.
* `script.js`: A lógica JavaScript para os cálculos dos juros compostos, atualização da interface e geração do gráfico.
* `Dockerfile`: Permite a criação de uma imagem Docker para servir a aplicação usando Nginx.
* `requirements.txt`: (Vazio, pois o projeto é puramente front-end e não possui dependências Python).

## Desenvolvimento

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

* HTML5
* CSS3
* JavaScript (ES6+) para a lógica de cálculo e manipulação do DOM.

## Executando com Docker

Você pode facilmente executar esta aplicação em um contêiner Docker:

1.  **Certifique-se de ter o Docker instalado** em sua máquina.
2.  **Navegue até o diretório raiz do projeto** no seu terminal.
3.  **Construa a imagem Docker**:
    ```bash
    docker build -t calculadora-juros-compostos .
    ```
4.  **Execute o contêiner**:
    ```bash
    docker run -p 8080:80 calculadora-juros-compostos
    ```
    Isso mapeará a porta 8080 da sua máquina local para a porta 80 do contêiner.
5.  **Acesse a aplicação**: Abra seu navegador e vá para `http://localhost:8080`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a Licença MIT.
