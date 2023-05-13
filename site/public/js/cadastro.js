let empresaStorage = [];
let enderecoStorage = [];

function getStorage() {
    console.log("Estou no storage da empresa!");
    console.log(empresaStorage);

    in_empresa.value = empresaStorage[0];
    in_cnpj.value = empresaStorage[1];
    in_telefone_1.value = empresaStorage[2];
    in_telefone_2.value = empresaStorage[3];
    in_email.value = empresaStorage[4];
    in_resp.value = empresaStorage[5];
}

function getStorageEnd() {
    console.log("Estou no storage do endereco!");
    console.log(empresaStorage);

    in_cep.value = enderecoStorage[0];
    in_logradouro.value = enderecoStorage[1];
    in_numero.value = enderecoStorage[2];
    in_bairro.value = enderecoStorage[3];
    in_cidade.value = enderecoStorage[4];
    in_complemento.value = enderecoStorage[5];
}

const patterns = {
    CNPJ: /^(\d{2})(\d{3})(\d{0,3})(\d{4})(\d{2})/,
    CNPJ_8: /^(\d{2})(\d{3})(\d{3})(\d{0,4})$/,
    CNPJ_5: /^(\d{2})(\d{3})(\d{0,3})$/,
    CNPJ_2: /^(\d{2})(\d{0,3})$/,

    TELEFONE_11: /^(\d{2})(\d{5})(\d{4})/,
    TELEFONE_6: /^(\d{2})(\d{4})/,
    TELEFONE_2: /^(\d{2})/,

    CEP: /^(\d{5})/
}

function mascaraCNPJ() {
    let cnpj = in_cnpj.value.replace(/\D+/g, '').trim();

    if (cnpj.length > 12) { 
        cnpj = cnpj.replace(patterns.CNPJ, "$1.$2.$3/$4-$5");
    } else if (cnpj.length > 8) {
        cnpj = cnpj.replace(patterns.CNPJ_8, "$1.$2.$3/$4");        
    } else if (cnpj.length > 5) {
        cnpj = cnpj.replace(patterns.CNPJ_5, "$1.$2.$3");        
    } else if (cnpj.length > 2) {
        cnpj = cnpj.replace(patterns.CNPJ_2, "$1.$2");
    }

    in_cnpj.value = cnpj;
}

function mascaraTelefone() {
    let telefone01 = in_telefone_1.value.replace(/\D+/g, '').trim();
    let telefone02 = in_telefone_2.value.replace(/\D+/g, '').trim();
    

    if (telefone01.length >= 11 || telefone02.length >= 11) {
        return false;
    }

    if (telefone01.length > 10 || telefone02.length > 10) {
        telefone01 = telefone01.replace(patterns.TELEFONE_11, "($1) $2-$3");
        telefone02 = telefone02.replace(patterns.TELEFONE_11, "($1) $2-$3");
    }  else if (telefone01.length > 6 || telefone02.length > 6) {
        telefone01 = telefone01.replace(patterns.TELEFONE_6, "($1) $2-");
        telefone02 = telefone02.replace(patterns.TELEFONE_6, "($1) $2-");
    } else if (telefone01.length > 1 || telefone02.length > 1) {
        telefone01 = telefone01.replace(patterns.TELEFONE_2, "($1)");
        telefone02 = telefone02.replace(patterns.TELEFONE_2, "($1)");
    }

    in_telefone_1.value = telefone01;
    in_telefone_2.value = telefone02;
}

function mascaraCEP() {
    let cep = in_cep.value.replace(/\D+/g, '');

    if (cep.length > 8) {
        return false;
    }

    if (cep.length > 5) {
        cep = cep.replace(patterns.CEP, "$1-");
    }

    in_cep.value = cep;
}

function nextPage(n) {
    const allInput = document.querySelectorAll('input');

    allInput.forEach(element => {
        element.classList.add('valido');
    });

    if (n == 1) {
        let nomeEmpresa = in_empresa.value;
        let cnpj = in_cnpj.value.replace(/\D/g, '');
        let tel1 = in_telefone_1.value.replace(/\D/g, '');
        let tel2 = in_telefone_2.value.replace(/\D/g, '');
        let email = in_email.value;
        let resp = in_resp.value;

        empresaStorage.push(nomeEmpresa);
        empresaStorage.push(cnpj);
        empresaStorage.push(tel1);
        empresaStorage.push(tel2);
        empresaStorage.push(email);
        empresaStorage.push(resp);

        const cnpjRegex = patterns.CNPJ;

        const telefoneRegex = patterns.TELEFONE_11;

        const emailPadrao = /\S+@\S+\.\S+/;

        let campoVazio = nomeEmpresa == "" || cnpj == "" || tel1 == "" || email == "" || resp == "";

        if (campoVazio) {
            cardErro.style.display = "flex"
            mensagem_erro.innerHTML = "É necessário preencher todos os campos.";

            finalizarAguardar();
            setInterval(sumirMensagem, 5000);
            return false;
        }
        else {
            let error = []
            if (!cnpjRegex.test(cnpj)) {
                console.log("CNPJ Incorreto")
                document.getElementById("span-cnpj").style.display = "block";

                const ipt_cnpj = document.querySelector('#in_cnpj');
                ipt_cnpj.classList.remove('valido');
                ipt_cnpj.classList.add('invalido');


                error.push(document.getElementById("span-cnpj"));
            } else {
                document.getElementById("span-cnpj").style.display = "none";

                const ipt_cnpj = document.querySelector('#in_cnpj');
                ipt_cnpj.classList.add('valido');
                ipt_cnpj.classList.remove('invalido');
            }

            if (!telefoneRegex.test(tel1)) {
                console.log("Telefone Incorreto")
                document.getElementById("span-telefone1").style.display = "block";

                const ipt_tel1 = document.querySelector('#in_telefone_1');
                ipt_tel1.classList.remove('valido');
                ipt_tel1.classList.add('invalido');

                error.push(document.getElementById("span-telefone1"));
            } else {
                document.getElementById("span-telefone1").style.display = "none";

                const ipt_tel1 = document.querySelector('#in_telefone_1');
                ipt_tel1.classList.add('valido');
                ipt_tel1.classList.remove('invalido');

            }

            if (!emailPadrao.test(email)) {
                console.log("Email Incorreto");
                document.getElementById("span-email").style.display = "block";

                const ipt_span_email = document.querySelector('#in_email');
                ipt_span_email.classList.remove('valido');
                ipt_span_email.classList.add('invalido');

                error.push(document.getElementById("span-email"));
            } else {
                document.getElementById("span-email").style.display = "none";

                const ipt_span_email = document.querySelector('#in_email');
                ipt_span_email.classList.add('valido');
                ipt_span_email.classList.remove('invalido');
            }

            if (error.length > 0) {
                return false;
            } else {
                plotarNovaPagina();
            }

        }
    } else {
        caixaFormulario.innerHTML = ``;
        caixaFormulario.innerHTML = `
        <div class="campo">
                <h2>Junte-se a nós</h2>
                <h4>Faça o cadastro e tenha acesso a todas as inovações para seu negócio</h4>
            </div>
            <div class="linha">
                <div class="campo">
                    <input required="" type="text" name="text" autocomplete="off" class="input" id="in_empresa">
                    <label class="user-label">Empresa</label>
                    <span class="span-required" id="span-empresa">É necessário inserir um nome</span>
                </div>

                <div class="campo">
                    <input required="" type="text" name="text" autocomplete="off" class="input" id="in_cnpj">
                    <label class="user-label">CPNJ</label>
                    <span class="span-required" id="span-cnpj">Necessário CNPJ com 14 dígitos</span>
                </div>
            </div>
            <div class="linha">
                <div class="campo">
                    <input required="" type="text" name="text" autocomplete="off" class="input" id="in_telefone_1">
                    <label class="user-label">Celular/Telefone (1)</label>
                    <span class="span-required" id="span-telefone1">Necessário telefone com 11 dígitos</span>
                </div>

                <div class="campo">
                    <input required="" type="text" name="text" autocomplete="off" class="input" id="in_telefone_2">
                    <label class="user-label">Celular/Telefone (2)</label>
                    <span class="span-required" id="span-telefone2">Necessário telefone com 11 dígitos</span>
                </div>
            </div>

            <div class="linha">
                <div class="campo">
                    <input required="" type="text" name="text" autocomplete="off" class="input" id="in_resp">
                    <label class="user-label">Responsável</label>
                    <span class="span-required" id="span-resp">É necessário inserir um nome</span>
                </div>
                <div class="campo">
                    <input required="" type="text" name="text" autocomplete="off" class="input" id="in_email">
                    <label class="user-label">Email do responsável</label>
                    <span class="span-required" id="span-email">Necessário inserir um e-mail válido</span>
                </div>
            </div>

            <div class="ponto">
                <span class="dot" style="background-color:#8cccf0;"></span>
                <span class="dot"></span>
            </div>
            <button class="button" onclick="nextPage(1)">Próximo</button>
        `;
        getStorage();
    }

}

function plotarNovaPagina() {
    caixaFormulario.innerHTML = "";
    caixaFormulario.innerHTML = `

    <div class="campo">
                <h2>Junte-se a nós</h2>
                <h4>Finalize o cadastro e obtenha acesso a sua tela de monitoramento</h4>
            </div>
            <div class="linha">
                <div class="campo">
                    <input required="" onkeyup="pegarEndereco(); mascaraCEP()" type="text" name="text" autocomplete="off" maxlength="9" class="input" id="in_cep">
                    <label class="user-label">CEP</label>
                    <span class="span-required">Campo inválido</span>
                </div>

                <div class="campo">
                    <input required="" type="text" name="text" autocomplete="off" class="input" id="in_logradouro">
                    <label class="user-label">Logradouro</label>
                    <span class="span-required">Campo inválido</span>
                </div>
            </div>
            <div class="linha">
                <div class="campo">
                    <input required="" type="text" name="text" autocomplete="off" class="input" id="in_numero">
                    <label class="user-label">Numero</label>
                    <span class="span-required">Campo inválido</span>
                </div>

                <div class="campo">
                    <input required="" type="text" name="text" autocomplete="off" class="input" id="in_bairro">
                    <label class="user-label">Bairro</label>
                    <span class="span-required">Campo inválido</span>
                </div>
            </div>

            <div class="linha">
                <div class="campo">
                    <input required="" type="text" name="text" autocomplete="off" class="input" id="in_cidade">
                    <label class="user-label">Cidade</label>
                    <span class="span-required">Campo inválido</span>
                </div>
                <div class="campo">
                    <input required="" type="text" name="text" autocomplete="off" class="input" id="in_estado">
                    <label class="user-label">Estado</label>
                    <span class="span-required">Campo inválido</span>
                </div>
            </div>
            <div class="linha">
                <div class="campo">
                    <input required="" type="text" name="text" autocomplete="off" class="input" id="in_complemento">
                    <label class="user-label">Complemento</label>
                    <span class="span-required">Campo inválido</span>
                </div>
            </div>

            <div class="ponto">
                <span class="dot"></span>
                <span class="dot" style="background-color:#8cccf0;"></span>
            </div>

            <div class="linha">
                <button class="buttonLogin" onclick="nextPage(2)">Voltar</button>
                <button class="buttonLogin" onclick = "cadastrarDados()">Cadastrar</button>
            </div>
       `
}

function cadastrarDados() {
    cadastrar(empresaStorage);
}

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

            carregarFkempresa(empresaStorage[1]);
            cardErro.style.display = "block";
            mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de cadastro do adiministrador...";

            setTimeout(() => {
                window.location = "cadastro-admin.html";
            }, "2000");


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
        mensagem_erro.innerHTML = "É necessário preencher todos os campos.";

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
            numeroServer: numeroVar,
            complementoServer: complementoVar,
            fkEmpresaServer: sessionStorage.getItem('FK_EMPRESA')
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
    console.log("O que veio no carregar foi " + cnpj);

    fetch(`/usuarios/carregarFkempresa/${cnpjVar}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                sessionStorage.setItem("FK_EMPRESA", resposta[0].id_empresa);
            });
            setTimeout(() => {
                cadastrarEndereco();
            }, "1000");
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
    var confirmarSenhaVar = in_confirmacao.value;

    var campovazio = nomeAdm == "" || cargoVar == "" || telVar == "" || emailVar == "" || senhaVar == "" || confirmarSenhaVar == "";

    const telefoneRegex = /^\b\d{11}\b$/;

    const senhaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z@#$%^&*]{8,20}$/;

    const emailPadrao = /\S+@\S+\.\S+/;
    
    if (campovazio) {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "É necessário preencher todos os campos.";

        finalizarAguardar();
        setInterval(sumirMensagem, 5000);
        return false;
    }
    else {
        if (telefoneRegex.test(telVar)) {
            console.log("Telefone Correto");
        } else {
            document.getElementById("span-telefone-admin").style.display = "block";

            finalizarAguardar();
            setInterval(sumirMensagem, 5000);
            return false;
        }

        if (senhaRegex.test(senhaVar)) {
            console.log("Senha Correta");
            if (!senhaVar == confirmarSenhaVar) {
                document.getElementById("span-senha-admin").style.display = "block";

                cardErro.style.display = "block"
                mensagem_erro.innerHTML += "As senhas devem ser iguais!";


                finalizarAguardar();
                setInterval(sumirMensagem, 5000);
                return false;
            }
        } else {
            document.getElementById("span-senha-admin").style.display = "block";
            document.getElementById("span-confirm-senha-admin").style.display = "block";

            console.log("Senha Incorreta");

            finalizarAguardar();
            setInterval(sumirMensagem, 5000);
            return false;
        }

        if (!emailPadrao.test(emailVar)) {
            console.log("Email Incorreto");
            document.getElementById("span-email-admin").style.display = "block";

            const ipt_span_email = document.querySelector('#in_email');
            ipt_span_email.classList.remove('valido');
            ipt_span_email.classList.add('invalido');
        } else {
            document.getElementById("span-email-admin").style.display = "none";

            const ipt_span_email = document.querySelector('#in_email');
            ipt_span_email.classList.add('valido');
            ipt_span_email.classList.remove('invalido');
        }
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
            cardErro.style.display = "block";
            mensagem_erro.innerHTML = "Cadastro de admin realizado com sucesso!";

            finalizarAguardar();

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
        getSerialKey(emailVar);
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });


    setInterval(sumirMensagem, 5000);
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
                plotarSerialKey(resposta);

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

function plotarSerialKey(resposta) {
    caixaFormulario.innerHTML = "";
    caixaFormulario.innerHTML = `
                <div class="campo center column">
                    <h2>ATENÇÃO</h2>
                    <h4 style="width: 650px; margin-bottom: 1rem; text-align: justify; font-size: 1.2em;">Abaixo, encontra-se o seu código de acesso, o qual <b style="font-weight: 600;">sempre será requerido ao acessar a dashboard de monitoramento</b>! <br> Este código é de uso exclusivo do administrador e não deve ser compartilhado com ninguém!
                    <br> <br>
                    É <b style="font-weight: 600;">necessário guardar esse código em um lugar seguro e confiável</b>.
                    </h4>
                    <h3>${resposta[0].chave_seguranca_administrador}</h3>
                    <button class="button" onclick="alterarPagina(1)">Continuar</button>
                </div>
                
           `
}

function alterarPagina(n) {
    if (n == 1) {
        window.location = "login.html";
    }
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