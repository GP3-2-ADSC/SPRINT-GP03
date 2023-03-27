
const formulario = document.getElementById('campo');
const campos = document.querySelectorAll('required');
const spans  = document.querySelectorAll('span-required');

var cnpjRegex=/^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/;

var senhaCaracteresRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;

var emailPadraoRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

var telefoneRegex = /^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/;


formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    nameValidate();
    cnpjValidate();
    telefoneValidate();
    emailValidate();
    PasswordValidate();
    comparePassword();
});

function setError(cadastro){
    campos[cadastro].style.border = '2px solid #e63636';
    spans[cadastro].style.display = 'block';
}

function removeError(cadastro){
    campos[cadastro].style.border = '';
    spans[cadastro].style.display = 'none';
}

function nameValidate(){
    if(campos[0].value.length <= 2)
    {
        setError(0);
    }
    else
    {
        removeError(0);
    }
}
function cnpjValidate(){
    if(!cnpjRegex.test(campos[1].value))
    {
        setError(1);
    }
    else
    {
        removeError(1);
    }
}

function telefoneValidate(){
    if(telefoneRegex.test(campos[2].value)){
        setError(2)
    }
    else{
        removeError(2);
    }
}

function telefoneValidate(){
    if(telefoneRegex.test(campos[3].value)){
        setError(3)
    }
    else{
        removeError(3);
    }
}

function emailValidate(){
    if(!emailPadraoRegex.test(campos[4].value))
    {
        setError(4);
    }
    else
    {
        removeError(4);
    }
}

function PasswordValidate(){
    if(!senhaCaracteresRegex.test(campos[6].value))
    {
        setError(6);
    }
    else
    {
        removeError(6);
        comparePassword();
    }
}

function comparePassword(){
    if(campos[6].value == campos[6].value && campos[7].value.length >= 8 && !senhaCaracteresRegex.test(campos[7].value))
    {
        removeError(7);
    }
    else
    {
        setError(7);
    }
}

function cadastrar() {
    aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeEmpresaVar = in_empresa.value;
    var cnpjVar = in_cnpj.value;
    var telefone1Var = in_telefone_1.value;
    var telefone2Var = in_telefone_2.value;
    var emailVar = email_input.value;
    var senhaVar = in_senha.value;
    var confirmacaoSenhaVar = in_confirmacao.value;
    var responsavelVar = in_resp.value;

   
    //Validar campos vazios
    var campovazio = nomeEmpresaVar == "" || cnpjVar == "" || telefone1Var == "" || telefone2Var == "" || emailVar == "" ||   senhaVar == "" || confirmacaoSenhaVar == "" || responsavelVar == "";


    var senhaErrada = senhaVar.match(senhaCaracteresRegex) == null;

    var telefoneErrado = telefone1Var.match(telefoneRegex) == null && telefone2Var .match(telefoneRegex) == null;

    var confirmarSenhaErrada = senhaVar != confirmarSenhaVar;

    var emailErrado = emailPadraoRegex.test(emailVar) == false;


    if(campovazio || telefoneErrado || emailErrado || senhaErrada || confirmarSenhaErrada){
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";

        finalizarAguardar();
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeEmpresaServer: nomeEmpresaVar,
            cnpjServer: cnpjVar,
            telefone1Server: telefone1Var,
            telefone2Server: telefone2Var,
            emailServer: emailVar,
            senhaServer: senhaVar,
            responsavelServer: responsavelVar 
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



function cadastrarEndereco(){
    aguardar();

    var cepVar = in_cep.value;
    var ruaVar = in_rua.value;
    var numeroVar = in_numero.value;
    var bairroVar = in_bairro.value;
    var cidadeVar = in_cidade.value;
    var complementoVar = in_complemento.value;


    var cepRegex = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/;

    var campovazio = cepVar == "" || ruaVar == "" || numeroVar == "" || bairroVar == "" || cidadeVar == "" || complementoVar == "" ;


    if(campovazio || cepRegex){
       cardErro.style.display = "block"
       mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";

       finalizarAguardar();
       return false;
   }
   else {
       setInterval(sumirMensagem, 5000)
   }

   // Enviando o valor da nova input
   fetch("/usuarios/cadastrar", {
       method: "POST",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify({
           // crie um atributo que recebe o valor recuperado aqui
           // Agora vá para o arquivo routes/usuario.js
           cepServer: cepVar,
           ruaServer: ruaVar,
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

