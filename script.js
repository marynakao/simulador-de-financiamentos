document.querySelector('#formSimulacao').addEventListener('submit', (e) => {
    e.preventDefault();
    
    function simulaFinanciamento() {

    const valorSaldo = document.querySelector('#simulaValor').valueAsNumber;
    const prazoAno = document.querySelector('#simulaPrazo').valueAsNumber;
    const jurosAno = document.querySelector('#simulaJuros').valueAsNumber;

    let prazoMeses = prazoAno * 12;
    let jurosAoMes = (1 + jurosAno) ** (1/12) - 1;
    let amortizacao = valorSaldo / prazoMeses;
    

    document.querySelector("#resultadoPrazo").valueAsNumber = prazoMeses;
    document.querySelector("#resultadoJurosMes").valueAsNumber = jurosAoMes;

    for (let i = 0; i < 5; i++) {

        let tr = document.querySelector('#tabelaCorpo').insertRow();

        let prestacao = i + 1;
        let saldoDevedor = valorSaldo - i * amortizacao;
        let jurosPrestacao = saldoDevedor * jurosAoMes;
        let totalPrestacao = jurosPrestacao + amortizacao;

        let td_prestacao = tr.insertCell();
        let td_amortizacao = tr.insertCell();
        let td_juros = tr.insertCell();
        let td_total = tr.insertCell();

        td_prestacao.innerHTML = prestacao;
        td_amortizacao.innerHTML = amortizacao.toFixed(2);
        td_juros.innerHTML = jurosPrestacao.toFixed(2);
        td_total.innerHTML = totalPrestacao.toFixed(2);
    }

    let totalJuros = 0;
    for (let i = 0; i < prazoMeses; i++) {
        let saldoDevedor = valorSaldo - i * amortizacao;
        let jurosPrestacao = saldoDevedor * jurosAoMes;
        totalJuros += jurosPrestacao;
    }

    document.querySelector("#resultadoJuroaAc").valueAsNumber = totalJuros.toFixed(2);
    }

    simulaFinanciamento();
});

document.querySelector('#limpar').addEventListener('click', novaSimulacao);

function novaSimulacao() {
    document.querySelector('#simulaValor').value = '';
    document.querySelector('#simulaPrazo').value  = '';
    document.querySelector('#simulaJuros').value  = '';

    document.querySelector("#resultadoPrazo").value  = '';
    document.querySelector("#resultadoJurosMes").value  = '';
    document.querySelector("#resultadoJuroaAc").value  = '';

    for (let i = 0; i < 5; i++) {

        document.querySelector('#tabelaCorpo').innerHTML = '';
    }
}