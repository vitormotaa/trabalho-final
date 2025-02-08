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

    if (!localStorage.tentativas) {
        var tentativas = 0
        localStorage.setItem('tentativas', JSON.stringify(tentativas))
    } else {
        tentativas = JSON.parse(localStorage.getItem('tentativas'))
        tentativas = 0
        localStorage.setItem('tentativas', JSON.stringify(tentativas))
    }

    if (!localStorage.ref) {
        var ref = 0
        localStorage.setItem('ref', JSON.stringify(ref))
    } else {
        ref = JSON.parse(localStorage.getItem('ref'))
        ref = 0
        localStorage.setItem('ref', JSON.stringify(ref))
    }

    if (!localStorage.letras) {
        var letras = []
        localStorage.setItem('letras', JSON.stringify(letras))
    }

    if (!localStorage.contagem) {
        var contagem = []
        localStorage.setItem('contagem', JSON.stringify(contagem))
    }

    if (!localStorage.backup) {
        var backup = []
        localStorage.setItem('backup', JSON.stringify(backup))
    }

    if (!localStorage.auxPalpite) {
        var auxPalpite = []
        localStorage.setItem('auxPalpite', JSON.stringify(auxPalpite))
    }

    if (!localStorage.vitoria) {
        var vitoria = false
        localStorage.setItem('vitoria', JSON.stringify(vitoria))
    }else{
        vitoria = JSON.parse(localStorage.getItem('vitoria'))
        vitoria = false
        localStorage.setItem('vitoria', JSON.stringify(vitoria))
    }

    var palavras = JSON.parse(localStorage.getItem('palavras'))
    palavras[1] = "JANTA"
    palavras[2] = "CHAVE"
    palavras[3] = "PAPEL"
    palavras[4] = "CHUVA"
    palavras[5] = "GENTE"
    localStorage.setItem('palavras', JSON.stringify(palavras))

    novaPalavraSecreta()
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

function palpite() {
    if ($("#formulario").valid()) {
        var tentativas = JSON.parse(localStorage.getItem('tentativas'))
        if (tentativas == 25) {
            alert("Suas tentativas já acabaram. Atualize a página para jogar novamente!")
        } else {
            var vitoria = JSON.parse(localStorage.getItem('vitoria'))
            if (vitoria == true) {
                alert("Você já acertou a palavra. Atualize a página para jogar novamente!")
            } else {
                restaurar()
                var palpite = document.getElementById("palavra").value
                palpite = palpite.toUpperCase()
                var ref = JSON.parse(localStorage.getItem('ref'))
                var celulas = document.querySelectorAll(".celula")
                var palavras = JSON.parse(localStorage.getItem('palavras'))
                var palavraSecreta = palavras[0]
                var auxPalpite = JSON.parse(localStorage.getItem('auxPalpite'))
                preencherCelulas(palpite, ref)
                var contadorAcertos = verificarAcertos(palpite, celulas, tentativas, palavraSecreta, auxPalpite)
                if (contadorAcertos == 5) {
                    var x = pontos(tentativas)
                    vitoria = true
                    localStorage.setItem('vitoria', JSON.stringify(vitoria))
                    alert("Parábens, você acertou a palavra!")
                    alert("Você fez " + x + " pontos!")
                    var logado = JSON.parse(localStorage.getItem('logado'))
                    registrarPontos(logado, x)
                } else {
                    verificarMeioAcertos(palpite, celulas, tentativas, palavraSecreta, auxPalpite)
                    verificarErros(palpite, celulas, tentativas, palavraSecreta, auxPalpite)
                    tentativas += 5
                    if ((tentativas == 25) && (contadorAcertos != 5)) {
                        alert("Suas tentativas acabaram!")
                        alert("A palavra secreta era: " + palavraSecreta)
                    }
                    localStorage.setItem('tentativas', JSON.stringify(tentativas))
                    document.getElementById("palavra").value = ""
                }
            }
        }
    }
}

function pontos(tentativas) {
    if (tentativas == 0) {
        return 5
    } else {
        if (tentativas == 5) {
            return 4
        } else {
            if (tentativas == 10) {
                return 3
            } else {
                if (tentativas == 15) {
                    return 2
                } else {
                    return 1
                }
            }
        }
    }
}

function registrarPontos(logado, x) {
    var usuarios = JSON.parse(localStorage.getItem('usuarios'))
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].login == logado) {
            usuarios[i].pontuacao += x
        }
    }
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
}

function preencherCelulas(palpite, ref) {
    var celulas = document.querySelectorAll(".celula")
    var i = 0
    var auxPalpite = ref
    var max = ref + 4
    for (ref = auxPalpite; ref <= max; ref++) {
        celulas[ref].textContent = palpite[i]
        i++
    }
    localStorage.setItem('ref', JSON.stringify(ref))
}

function verificarAcertos(palpite, celulas, tentativas, palavraSecreta, auxPalpite) {
    var contagem = JSON.parse(localStorage.getItem('contagem'))
    var contadorAcertos = 0
    for (var i = 0; i < 5; i++) {
        if (palpite[i] == palavraSecreta[i]) {
            var x = descobrirPosicao(palpite[i])
            contagem[x] = contagem[x] - 1
            //celulas[i + tentativas].setAttribute("class", "certo")
            celulas[i + tentativas].classList.add("certo")
            auxPalpite[i] = 1 //estado de uso
            contadorAcertos = contadorAcertos + 1
        }
    }
    localStorage.setItem('contagem', JSON.stringify(contagem))
    return contadorAcertos
}

function verificarMeioAcertos(palpite, celulas, tentativas, palavraSecreta, auxPalpite) {
    var contagem = JSON.parse(localStorage.getItem('contagem'))
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            if ((palpite[i] == palavraSecreta[j]) && (i != j)) {
                var x = descobrirPosicao(palpite[i])
                if ((contagem[x] > 0) && (auxPalpite[i] == 0)) {
                    contagem[x] = contagem[x] - 1
                    celulas[i + tentativas].classList.add("fora")
                    auxPalpite[i] = 1 //estado de uso
                }
            }
        }
    }
    localStorage.setItem('contagem', JSON.stringify(contagem))
}

function verificarErros(palpite, celulas, tentativas, palavraSecreta, auxPalpite) {
    var contagem = JSON.parse(localStorage.getItem('contagem'))
    for (var i = 0; i < 5; i++) {
        var cont = 0
        for (var j = 0; j < 5; j++) {
            if (palpite[i] != palavraSecreta[j]) {
                cont++
            } else {
                var x = descobrirPosicao(palpite[i])
                if (contagem[x] == 0) {
                    cont++
                }
            }
        }
        if (cont == 5) {
            celulas[i + tentativas].classList.add("ausente")
        }
    }
}

function descobrirPosicao(letra) {
    var letras = JSON.parse(localStorage.getItem('letras'))
    var x = ""
    for (var i = 0; i < letras.length; i++) {
        if (letra == letras[i]) {
            x = i
        }
    }
    return x
}


function restaurar() {
    var contagem = JSON.parse(localStorage.getItem('contagem'))
    var backup = JSON.parse(localStorage.getItem('backup'))
    for (var i = 0; i < 5; i++) {
        contagem[i] = backup[i]
    }
    localStorage.setItem('contagem', JSON.stringify(contagem))

    var auxPalpite = JSON.parse(localStorage.getItem('auxPalpite'))
    for (var i = 0; i < 5; i++) {
        auxPalpite[i] = 0
    }
    localStorage.setItem('auxPalpite', JSON.stringify(auxPalpite))
}

function novaPalavraSecreta() {
    var palavras = JSON.parse(localStorage.getItem('palavras'))
    maximo = palavras.length
    minimo = 1
    var posicao = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo
    palavras[0] = palavras[posicao]
    separacaoLetras(palavras[0])
    localStorage.setItem('palavras', JSON.stringify(palavras))
    var palavras = JSON.parse(localStorage.getItem('palavras'))
}


function separacaoLetras(palavra) {
    var letras = JSON.parse(localStorage.getItem('letras'))
    for (var i = 0; i < 5; i++) {
        letras[i] = ""
    }
    letras[0] = palavra[0]
    for (i = 1; i < 5; i++) {
        var cont = 0
        for (var j = 0; j < 5; j++) {
            if (palavra[i] != letras[j]) {
                cont++
            }
        }
        if (cont == 5) {
            letras[i] = palavra[i]
        }
    }
    localStorage.setItem('letras', JSON.stringify(letras))
    contagemLetras(palavra, letras)
}

function contagemLetras(palavra, letras) {
    var contagem = JSON.parse(localStorage.getItem('contagem'))
    var backup = JSON.parse(localStorage.getItem('backup'))
    for (var i = 0; i < 5; i++) {
        contagem[i] = 0
        for (var j = 0; j < 5; j++) {
            if (letras[i] == palavra[j]) {
                contagem[i]++
            }
        }
    }
    for (i = 0; i < 5; i++) {
        backup[i] = contagem[i]
    }
    localStorage.setItem('contagem', JSON.stringify(contagem))
    localStorage.setItem('backup', JSON.stringify(backup))
}