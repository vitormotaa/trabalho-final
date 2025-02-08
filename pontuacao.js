function criarJSON() {
    if (!localStorage.usuarios) {
        var usuarios = []
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }

    if (!localStorage.logado) {
        var logado = ""
        localStorage.setItem('logado', JSON.stringify(logado))
    }

    pessoaLogada()
    escreverTabela()
}

function pessoaLogada(){
    var logado = JSON.parse(localStorage.getItem('logado'))
    document.getElementById("usuario").value = logado
}

function sair() {
    window.location.href = "autenticacaoUsuario.html"
}

function apagarTabela(tabela) {
    var linhas = tabela.getElementsByTagName('tr');
    for (var i = linhas.length - 1; i >= 1; i--) {
        tabela.deleteRow(i);
    }
}

function escreverTabela() {
    var tabela = document.getElementById("tabela")
    apagarTabela(tabela)
    var usuarios = JSON.parse(localStorage.getItem('usuarios'))
    ordenarVetor(usuarios)
    for (var i = 0; i < usuarios.length; i++) {
        var numeroLinha = tabela.length
        var linha = tabela.insertRow(numeroLinha)
        var coluna1 = linha.insertCell(0)
        var coluna2 = linha.insertCell(1)
        coluna1.innerText = usuarios[i].login
        coluna2.innerText = usuarios[i].pontuacao
    }

}

function ordenarVetor(usuarios) {
    for (var i = 0; i < usuarios.length; i++) {
        for (var j = i; j < usuarios.length; j++) {
            if (usuarios[j].pontuacao > usuarios[i].pontuacao) {
                var aux = usuarios[i]
                usuarios[i] = usuarios[j]
                usuarios[j] = aux
            }
        }
    }
}