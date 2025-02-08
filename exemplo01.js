//variáveis globais
var pessoas = [];
var posicao = 0;

function cadastrar(){
	if(posicao < 10){		
		var pessoa = new Object();
		pessoa.nome = document.getElementById("nome").value;
		pessoa.altura = parseFloat(document.getElementById("altura").value); 
		pessoa.peso = parseFloat(document.getElementById("peso").value);
		pessoa.imc = pessoa.peso / (pessoa.altura * pessoa.altura);
		
		var tabela = document.getElementById("tabelaDados");
		var linhas = tabela.getElementsByTagName('tr');
		var quantidadeLinhas = linhas.length;
		var linha = tabela.insertRow(quantidadeLinhas)		
		var coluna1 = linha.insertCell(0);
		var coluna2 = linha.insertCell(1); 
		var coluna3 = linha.insertCell(2); 
		var coluna4 = linha.insertCell(3); 
		coluna1.innerText = pessoa.nome;
		coluna2.innerText = pessoa.altura;
		coluna3.innerText = pessoa.peso;
		coluna4.innerText = pessoa.imc.toFixed(2);

		pessoas[posicao] = pessoa;
	
		alert("Dados armazenados com sucesso.");	

		posicao = posicao + 1;
		document.getElementById("nome").value = "";
		document.getElementById("altura").value = "";
		document.getElementById("peso").value = "";

	}else{
		alert("O vetor já foi preenchido com os dados das 10 pessoas");
	}

}

function calcular(){
	imcMinimo = parseFloat(document.getElementById("imcMinimo").value); 
	imcMaximo = parseFloat(document.getElementById("imcMaximo").value); 

	var quantidade = 0;
	for(var indice = 0; indice < pessoas.length; indice++){
		if((pessoas[indice].imc >= imcMinimo) && (pessoas[indice].imc <= imcMaximo)){
			quantidade = quantidade +1;
		}
	}

	document.getElementById("resultado").value = quantidade;  
}
