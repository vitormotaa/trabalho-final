function criarJSON() {
    if (!localStorage.usuarios) {
        var usuarios = []
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }

    if (!localStorage.logado) {
        var logado = ""
        localStorage.setItem('logado', JSON.stringify(logado))
    }

    if (!localStorage.palavras) {
        var palavras = []
        localStorage.setItem('palavras', JSON.stringify(palavras))
    }

    pessoaLogada()
}

function pessoaLogada(){
    var logado = JSON.parse(localStorage.getItem('logado'))
    document.getElementById("usuario").value = logado
}

function sair() {
    window.location.href = "autenticacaoUsuario.html"
}

$(document).ready(function () {
    $('#palavra').mask('SSSSS');
});

$("#formulario").validate({
    rules: {
        palavra: {
            required: true,
            minlength: 5
        }
    },
    messages: {
        palavra: {
            required: "Campo obrigatório",
            minlength: "A palavra precisa ter pelo menos 5 caracteres"
        }
    }
});

function cadastrar() {
    if ($("#formulario").valid()) {
        var palavra = document.getElementById('palavra').value
        var palavras = JSON.parse(localStorage.getItem('palavras'))
        alert (palavras.length)
        if (verificarPalavra(palavra, palavras) == 0) {
            palavra = palavra.toUpperCase()
            palavras[palavras.length] = palavra
            localStorage.setItem('palavras', JSON.stringify(palavras))
        } 
        alert ("Obrigado pelo cadastro!")
    }
}

function verificarPalavra(palavra, palavras) {
    var retorno = 0 //se nao foi cadastrada
    for (var i = 0; i < palavras.length; i++) {
        if (palavras[i] == palavra) {
            retorno = 1
        }
    }
    return retorno
}
