let serialKeyBanco = "";

function entrar() {
    aguardar();

    var emailVar = in_email.value;
    var senhaVar = in_senha.value;

    if (emailVar == "" || senhaVar == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "Necessário preencher todos os campos.";
        finalizarAguardar();
        setInterval(sumirMensagem, 5000);
        return false;
    }

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

                sessionStorage.EMAIL_USUARIO = json.email_administrador;
                sessionStorage.NOME_USUARIO = json.nome_administrador;
                sessionStorage.ID_USUARIO = json.id_administrador;
                sessionStorage.FK_EMPRESA = json.fk_empresa;
                serialKeyBanco = json.chave_seguranca_administrador

            });
            plotarValidacaoDeSerialKey();

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                cardErro.style.display = "block"
                mensagem_erro.innerHTML = texto;
                finalizarAguardar();
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function plotarValidacaoDeSerialKey() {
    container.innerHTML = ``;
    container.innerHTML = `
        <div class="card_erro" id="cardErro">
            <span id="mensagem_erro"></span>
        </div>

        <div class="caixa-formulario-validacao" id="caixaFormulario">        
            <div class="campo cmp-validacao">
                <h2>Validação de acesso!</h2>
                <h4 class="subtitulo-form">Insira a chave de acesso de administrador!
                </h4>
            </div>

            <div class="container-validacao">
                <div class="campo-validacao">
                    <label for="in_serialKey">Chave de acesso</label>
                    <input type="text" placeholder="Digite a chave de acesso" id="in_serialKey" class="ipt-validacao">
                </div>
                <button class="bt-validacao" onclick="validarSerialKey()">></button>
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

function validarSerialKey() {
    let serialKeyInserida = in_serialKey.value;
    console.log("serialKeyInseridada " + serialKeyInserida);
    console.log("do banco " + serialKeyBanco);
    serialKeyInserida == serialKeyBanco ? autorizar(1) : autorizar(2);
}

function autorizar(n) {
    if (n == 1) {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "Acesso validado! Acessando dashboard!";
        setTimeout(() => {
            window.location = "dashboardGeral.html";
        }, "2000")
    } else {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "Acesso invalido! Acesso à dashboard <b>NEGADO</b>!";
    }
}

function sumirMensagem() {
    cardErro.style.display = "none"
}


//<![CDATA[
var ttChatLoaderS = document.createElement('script');
document.tomticketChatLoaderScriptVersion = 2;
ttChatLoaderS.src = 'https://retria.tomticket.com/scripts-chat/chat.min.js'
+ '?id=EP61558'
+ '&account=3939712P05042023082156'
+ '&autoOpen=0'
+ '&hideWhenOffline=0'
+ '&d=retria'
+ '&ts=' + new Date().getTime()
+ '&ref=' + encodeURIComponent(document.URL);
document.body.appendChild(ttChatLoaderS);
//]]>