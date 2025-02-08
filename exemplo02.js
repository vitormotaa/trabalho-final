//variáveis globais
var alunos = [];
var posicao = 0


$(document).ready(function () {
	$('#nota').mask('000');
});

$("#formularioArmazenar").validate({
	rules: {
		nome: {
			required: true
		},
		curso: {
			required: true
		},
		nota: {
			required: true,
			min: 0,
			max: 100
		}
	},
	messages: {
		nome: {
			required: "Campo obrigatório"
		},
		curso: {
			required: "Campo obrigatório"
		},
		nota: {
			required: "Campo obrigatório",
			min: "Valor mínimo é 0",
			max: "Valor máximo é 100"
		}
	}
});

function armazenar() {
	//verifica se um formulário com o ID formularioArmazenar atende as regras de validação do jQuery Validation.
	if ($("#formularioArmazenar").valid()) {
		if (posicao < 10) {
			//variável local
			var aluno = new Object();
			aluno.nome = document.getElementById("nome").value;
			aluno.curso = document.getElementById("curso").value;
			aluno.nota =  document.getElementById("nota").value;

			if (aluno.nota >= 60) {
				aluno.situacao = "Aprovado";
			} else {
				aluno.situacao = "Reprovado";
			}

			alunos[posicao] = aluno;
			posicao = posicao + 1;

			var tabela = document.getElementById("tabelaDados");
			var linhas = tabela.getElementsByTagName('tr');
			var quantidadeLinhas = linhas.length;
			var linha = tabela.insertRow(quantidadeLinhas)
			var coluna1 = linha.insertCell(0);
			var coluna2 = linha.insertCell(1);
			var coluna3 = linha.insertCell(2);
			var coluna4 = linha.insertCell(3);

			coluna1.innerText = aluno.nome;
			coluna2.innerText = aluno.curso;
			coluna3.innerText = aluno.nota;
			coluna4.innerText = aluno.situacao;

			alert('Os dados foram armazenados com sucesso.');

			campoNome.value = "";
			campoCurso.value = "";
			campoNota.value = "";
		} else {
			alert('Os dados dos 10 alunos já foram armazenados.');
		}
	}
}

function consultar() {
	var curso = document.getElementById("criterio").value;
	var contador = 0;
	var quantidade = 0;

	for (contador = 0; contador < posicao; contador++) {
		if ((alunos[contador].curso == curso) || (curso == "Todos os cursos")) {
			quantidade = quantidade + 1;
		}
	}

	document.getElementById("resultado").value = quantidade;
}


