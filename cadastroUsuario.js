function criarJSON() {
    if (!localStorage.usuarios) {
        var usuarios = []
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
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

function cadastrar() {
    if ($("#formulario").valid()) {
        var usuarios = JSON.parse(localStorage.getItem('usuarios'));
        var usuario = new Object()
        usuario.login = document.getElementById("login").value 
        if (verificarLogin(usuario.login, usuarios)){
            alert ("Esse login já está em uso, escolha outro")
            document.getElementById("login").value = ""
        }else{
            alert ("Cadastrado com sucesso!")
            usuario.senha = document.getElementById("senha").value
            usuario.pontuacao = 0 
            usuarios[usuarios.length] = usuario
            localStorage.setItem('usuarios', JSON.stringify(usuarios))
            window.location.href = "autenticacaoUsuario.html"
        }
    
    }
}

function verificarLogin(login, usuarios) {
    var repetiu = false
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].login == login) {
            repetiu = true
        }
    }
    return repetiu
}