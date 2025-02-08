function criarJSON() {
    if (!localStorage.usuarios) {
        var usuarios = []
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }

    if (!localStorage.logado) {
        var logado = ""
        localStorage.setItem('logado', JSON.stringify(logado))
    }
}

$("#formulario").validate({
    rules: {
        login: {
            required: true
        },
        senha: {
            required: true
        }
    },
    messages: {
        login: {
            required: "Campo obrigatório"
        },
        senha: {
            required: "Campo obrigatório"
        }
    }
});

function entrar() {
    if ($("#formulario").valid()) {
        var login = document.getElementById("login").value 
        var senha = document.getElementById("senha").value 
        if (verificarLogin(login, senha)){
            window.location.href = "termo.html"
        }else{
           alert ("Usuário e/ou senha incorretos")
        }
    
    }
}

function verificarLogin(login, senha) {
    var usuarios = JSON.parse(localStorage.getItem('usuarios'));
    var aprovado = false
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].login == login) {
            if (usuarios[i].senha == senha){
                aprovado = true
                var logado = JSON.parse(localStorage.getItem('logado'));
                logado = usuarios[i].login 
                localStorage.setItem('logado', JSON.stringify(logado))
            }
        }
    }
    return aprovado
}