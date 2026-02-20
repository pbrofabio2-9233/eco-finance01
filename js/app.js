let lancamentos = carregarDados();

function adicionarLancamento(){

    const data = document.getElementById("data").value;
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const tipo = document.getElementById("tipo").value;
    const valor = parseFloat(document.getElementById("valor").value);

    const novo = {
        status: "OK",
        data,
        descricao,
        categoria,
        tipo,
        valor
    };

    lancamentos.push(novo);
    salvarDados(lancamentos);
    atualizarTabela();
}

function atualizarTabela(){
    const tabela = document.getElementById("tabelaLancamentos");
    tabela.innerHTML = "";

    lancamentos.forEach(l => {
        tabela.innerHTML += `
        <tr>
            <td>${l.status}</td>
            <td>${formatarData(l.data)}</td>
            <td>${l.descricao}</td>
            <td>${l.categoria}</td>
            <td>${l.tipo}</td>
            <td>R$ ${l.valor.toFixed(2)}</td>
        </tr>`;
    });
}

function formatarData(data){
    const d = new Date(data);
    return d.toLocaleDateString("pt-BR");
}

atualizarTabela();