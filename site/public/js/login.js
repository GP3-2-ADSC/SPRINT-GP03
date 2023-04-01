function entrar() {
    aguardar();

    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        finalizarAguardar();
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                // setTimeout(function () {
                //     window.location = "./dashboard/cards.html";
                // }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function plotarValidacaoDeSerialKey(){
    container.innerHTML = ``;
    container.innerHTML = `
    <div class="alerta_erro">
                <div class="card_erro" id="cardErro">
                    <span id="mensagem_erro"></span>
                </div>
    </div>
        <div class="caixa-formulario-validacao" id="caixaFormulario">        
            <div class="campo cmp-validacao">
                <h2>Validação de acesso!</h2>
                <h4 class="subtitulo-form">Insira a chave de acesso do administrador!
                </h4>
            </div>

            <div class="container-validacao">
                <div class="campo-validacao">
                    <label for="in_serialKey">Chave de acesso</label>
                    <input type="text" placeholder="Digite a chave de acesso" id="in_serialKey" class="ipt-validacao">
                </div>
                <button class="bt-validacao">></button>
            </div>
        </div>

        <div id="div_aguardar" class="loading-div">
                <img src="./assets/circle-loading.gif" id="loading-gif">
        </div>

        <div id="div_erros_login">

        </div>
        
    </div>

    
`
}

function sumirMensagem() {
    cardErro.style.display = "none"
}