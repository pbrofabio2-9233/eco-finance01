const dados = carregarDados();

const receitas = dados.filter(d => d.tipo === "receita")
                      .reduce((acc, d) => acc + d.valor, 0);

const despesas = dados.filter(d => d.tipo === "despesa")
                      .reduce((acc, d) => acc + d.valor, 0);

new Chart(document.getElementById("graficoPizza"), {
    type: 'pie',
    data: {
        labels: ["Receitas", "Despesas"],
        datasets: [{
            data: [receitas, despesas]
        }]
    }
});