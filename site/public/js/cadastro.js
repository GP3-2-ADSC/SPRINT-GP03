function cadastrar(empresaStorage) {
    console.log("estou no fetch " + empresaStorage[0],
    empresaStorage[1],
    empresaStorage[2],
    empresaStorage[3],
    empresaStorage[4],
    empresaStorage[5]);
    
    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeEmpresaServer: empresaStorage[0],
            cnpjServer: empresaStorage[1],
            telefone1Server: empresaStorage[2],
            telefone2Server: empresaStorage[3],
            emailServer: empresaStorage[4],
            responsavelServer: empresaStorage[5]
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            cardErro.style.display = "block";

            mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

            setTimeout(() => {
                window.location = "login.html";
            }, "2000")

            limparFormulario();
            finalizarAguardar();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}


function cadastrarEndereco() {
    aguardar();

    var cepVar = in_cep.value;
    var logradouroVar = in_logradouro.value;
    var numeroVar = in_numero.value;
    var bairroVar = in_bairro.value;
    var cidadeVar = in_cidade.value;
    var complementoVar = in_complemento.value;


    var campovazio = cepVar == "" || logradouroVar == "" || numeroVar == "" || bairroVar == "" || cidadeVar == "" || complementoVar == "";


    if (campovazio) {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";

        finalizarAguardar();
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000);
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrarEndereco", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            cepServer: cepVar,
            logradouroServer: logradouroVar,
            numeroServer: numeroVar,
            bairroServer: bairroVar,
            cidadeServer: cidadeVar,
            complementoServer: complementoVar,

        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            cardErro.style.display = "block";

            mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

            setTimeout(() => {
                window.location = "login.html";
            }, "2000")

            limparFormulario();
            finalizarAguardar();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}

