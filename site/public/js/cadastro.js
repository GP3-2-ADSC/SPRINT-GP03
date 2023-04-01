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

            mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de cadastro do adiministrador...";

            setTimeout(() => {
                carregarFkempresa(empresaStorage[1]);
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

function carregarFkempresa(cnpj) {
    let cnpjVar = cnpj;

    fetch(`/usuarios/carregarFkempresa/${cnpjVar}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                sessionStorage.FK_EMPRESA = resposta[0].idEmpresa;
            });
            window.location = "cadastro-admin.html";
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function cadastrarAdmin() {
    aguardar();

    var nomeAdm = in_nomeAdm.value;
    var cargoVar = in_cargo.value;
    var telVar = in_telefone.value;
    var emailVar = in_email.value;
    var senhaVar = in_senha.value;

    var campovazio = nomeAdm == "" || cargoVar == "" || telVar == "" || emailVar == "" || senhaVar == "";


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
    fetch("/usuarios/cadastrarAdmin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeAdmServer: nomeAdm,
            cargoServer: cargoVar,
            telServer: telVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            serialKeyServer: gerarChaveDeSeguranca(),
            fkEmpresaServer: sessionStorage.getItem("FK_EMPRESA")
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            getSerialKey(emailVar);

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;
}

function gerarChaveDeSeguranca() {
    let serialKey = ``;
    const caracteres = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/*!@#$%&{}[]`;

    for (let i = 0; serialKey.length < 25; i++) {
        serialKey += caracteres.charAt(parseInt(Math.random() * caracteres.length + 1))
    }

    return serialKey;
}

function getSerialKey(emailVar) {
    console.log("O email que veio é: " + emailVar);
    let emailAdm = emailVar;
    fetch(`/usuarios/getSerialKey/${emailAdm}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                cardErro.style.display = "block";
                mensagem_erro.innerHTML = "Cadastro de admin realizado com sucesso!<br>"
                mensagem_erro.innerHTML += "Seu código de acesso é: " + resposta[0].chaveSegurancaAdministrador;


                setTimeout(() => {
                    window.location = "login.html";
                }, "4000")

                limparFormulario();
                finalizarAguardar();
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
