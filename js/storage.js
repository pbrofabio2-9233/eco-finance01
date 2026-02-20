function salvarDados(dados){
    localStorage.setItem("ecoFinance", JSON.stringify(dados));
}

function carregarDados(){
    return JSON.parse(localStorage.getItem("ecoFinance")) || [];
}