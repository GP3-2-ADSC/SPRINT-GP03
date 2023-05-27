let dadosEmpresa = [];
let dadosAdmin = [];
let empresaCheckedList = [];
let adminCheckedList = [];

function iniciar() {
    getEmpresa();
    getAdministrador()
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

function mascaraTelefoneRetorno(telefone) {
    let telefone01 = telefone.replace(/\D+/g, '').trim();

    return telefoneModificado = telefone01.replace(patterns.TELEFONE_11, "($1) $2-$3");
}

function mascaraCNPJ(cnpjEmpresa) {
    let cnpj = cnpjEmpresa.replace(/\D+/g, '').trim();

    cnpj = cnpj.replace(patterns.CNPJ, "$1.$2.$3/$4-$5");

    return cnpj;
}

function getEmpresa() {

    console.log("Entrando na função obter dados iniciais");
    fetch(`/usuarios/getInformacaoEmpresa/${sessionStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log("DADOS DO OBTER DADOS INICIAIS");
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                nomeEmpresa.innerHTML = resposta[0].nome_empresa;
                cnpjEmpresa.innerHTML = mascaraCNPJ(resposta[0].cnpj);
                telefone_1Empresa.innerHTML = mascaraTelefoneRetorno(resposta[0].telefone_01);
                telefone_2Empresa.innerHTML = resposta[0].telefone_02 == null ? 'Não possui' : mascaraTelefoneRetorno(resposta[0].telefone_02);
                emailEmpresa.innerHTML = resposta[0].email;
                responsavelEmpresa.innerHTML = resposta[0].responsavel_empresa;

                dadosEmpresa.push(resposta[0])

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function getAdministrador() {

    console.log("Entrando na função obter dados iniciais");
    fetch(`/usuarios/getInformacaoAdministrador/${sessionStorage.ID_USUARIO}/${sessionStorage.FK_EMPRESA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log("DADOS DO OBTER DADOS INICIAIS");
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                nomeAdmin.innerHTML = resposta[0].nome_administrador;
                cargoAdmin.innerHTML = resposta[0].cargo;
                telefoneAdmin.innerHTML = mascaraTelefoneRetorno(resposta[0].telefone_administrador);
                emailAdmin.innerHTML = resposta[0].email_administrador;

                dadosAdmin.push(resposta[0])
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function editarInformacoes(n) {
    alert("Apenas algumas informações podem ser alteradas!")
    alert("Escolha qual deseja alterar e clique em ok!")
    document.getElementById('checklist').style.display = 'grid'
    document.getElementById('containerAll').style.filter = 'blur(10px)'
    document.getElementById('containerAll').style.pointerEvents = 'none'
    document.getElementById('containerMenu').style.filter = 'blur(10px)'
    document.getElementById('containerMenu').style.pointerEvents = 'none'
    document.getElementById('containerTitle').style.filter = 'blur(10px)'
    document.getElementById('containerTitle').style.pointerEvents = 'none'

    if (n == 1) {
        document.getElementById('01').style.display = 'grid'
        document.getElementById('02').style.display = 'grid'
        document.getElementById('03').style.display = 'grid'
        document.getElementById('l01').style.display = 'grid'
        document.getElementById('l02').style.display = 'grid'
        document.getElementById('l03').style.display = 'grid'
        document.getElementById('bt-checkbox').style.display = 'grid'
    } else {
        document.getElementById('04').style.display = 'grid'
        document.getElementById('05').style.display = 'grid'
        document.getElementById('06').style.display = 'grid'
        document.getElementById('07').style.display = 'grid'
        document.getElementById('l04').style.display = 'grid'
        document.getElementById('l05').style.display = 'grid'
        document.getElementById('l06').style.display = 'grid'
        document.getElementById('l07').style.display = 'grid'
        document.getElementById('bt-checkboxAdmin').style.display = 'grid'
        document.getElementById('checklist').style.width = '300px'
        document.getElementById('checklist').style.height = '220px'
    }
}

function alterarInformacoes(n) {
    if (n == 1) {
        const emailCh = document.getElementById('01');
        const telefone1Ch = document.getElementById('02');
        const telefone2Ch = document.getElementById('03');

        if (emailCh.checked || telefone1Ch.checked || telefone2Ch.checked) {

            if (emailCh.checked) {
                PEmailEmpresa.innerHTML = `
            <strong>Email para contato</strong><br>
            <input required="" type="text" name="text" autocomplete="off" class="input" id="emailEmpresa">
            `
                empresaCheckedList.push(emailCh.value)
            }

            if (telefone1Ch.checked) {
                PTelefone1Empresa.innerHTML = `
            <strong>Telefone 1</strong><br>
            <input required="" type="text" name="text" autocomplete="off" class="input" id="telefone_1Empresa" >
            `
                empresaCheckedList.push(telefone1Ch.value)
            }

            if (telefone2Ch.checked) {
                PTelefone2Empresa.innerHTML = `
            <strong>Telefone 2</strong><br>
            <input required="" type="text" name="text" autocomplete="off" class="input" id="telefone_2Empresa" >
            `
                empresaCheckedList.push(telefone2Ch.value)
            }

            buttonsUp.innerHTML =
                `
                <button class="bt-maquina" onclick="cancelar()">Cancelar</button>
                <button class="bt-maquina" onclick="salvarAlteracaoEmpresa()">Salvar</button>
            `
        } else {
            alert('Você precisa selecionar pelo menos um item para continuar!')
        }

    } else {
        const nomeCh = document.getElementById('04');
        const cargoCh = document.getElementById('05');
        const emailCh = document.getElementById('06');
        const telefoneCh = document.getElementById('07');

        if (nomeCh.checked || cargoCh.checked || emailCh.checked || senhaCh.checked || telefoneCh.checked) {

            if (nomeCh.checked) {
                PNomeAdmin.innerHTML = `
            <strong>Nome</strong><br>
            <input required="" type="text" name="text" autocomplete="off" class="input" id="nomeAdmin">
            `
                adminCheckedList.push(nomeCh.value)
            }

            if (cargoCh.checked) {
                PCargoAdmin.innerHTML = `
            <strong>Cargo</strong><br>
            <select required="" type="text" name="text" autocomplete="off" class="input" id="in_cargo">
                            <option value="">-SELECIONE UM CARGO--</option>
                            <option value="1">Engenheiro de Operações de TI</option>
                            <option value="2">Engenheiro de NOC</option>
                            <option value="3">Administrador de Sistemas</option>
                            <option value="4">Administrador de Sistemas de Monitoramento</option>
                            <option value="5">Analista de Operações de TI</option>
            </select>
            `
                adminCheckedList.push(cargoCh.value)
            }

            if (emailCh.checked) {
                PEmailAdmin.innerHTML = `
            <strong>Email</strong><br>
            <input required="" type="text" name="text" autocomplete="off" class="input" id="emailAdmin">
            `
                adminCheckedList.push(emailCh.value)
            }

            if (telefoneCh.checked) {
                PTelefoneAdmin.innerHTML = `
            <strong>Telefone</strong><br>
            <input required="" type="text" name="text" autocomplete="off" class="input" id="telefoneAdmin">
            `
                adminCheckedList.push(telefoneCh.value)
            }
            buttonsDown.innerHTML =
                `
                <button class="bt-maquina" onclick="cancelar()">Cancelar</button>
                <button class="bt-maquina" onclick="salvarAlteracaoAdmin()">Salvar</button>
            `
        } else {
            alert('Você precisa selecionar pelo menos um item para continuar!')
        }
    }

    esconderMenu();
}

function esconderMenu() {
    document.getElementById('checklist').style.display = 'none'
    document.getElementById('containerAll').style.filter = 'blur(0px)'
    document.getElementById('containerAll').style.pointerEvents = 'initial'
    document.getElementById('containerMenu').style.filter = 'blur(0px)'
    document.getElementById('containerMenu').style.pointerEvents = 'initial'
    document.getElementById('containerTitle').style.filter = 'blur(0px)'
    document.getElementById('containerTitle').style.pointerEvents = 'initial'
    document.getElementById('01').style.display = 'none'
    document.getElementById('02').style.display = 'none'
    document.getElementById('03').style.display = 'none'
    document.getElementById('l01').style.display = 'none'
    document.getElementById('l02').style.display = 'none'
    document.getElementById('l03').style.display = 'none'
    document.getElementById('04').style.display = 'none'
    document.getElementById('05').style.display = 'none'
    document.getElementById('06').style.display = 'none'
    document.getElementById('07').style.display = 'none'
    document.getElementById('l04').style.display = 'none'
    document.getElementById('l05').style.display = 'none'
    document.getElementById('l06').style.display = 'none'
    document.getElementById('l07').style.display = 'none'
    document.getElementById('bt-checkboxAdmin').style.display = 'none'
    document.getElementById('bt-checkbox').style.display = 'none'
}

function cancelar() {
    window.location = "configuracoes-conta.html";
}

function salvarAlteracaoEmpresa() {
    const emailCh = document.getElementById('01');
    const telefone1Ch = document.getElementById('02');
    const telefone2Ch = document.getElementById('03');

    fetch(`/usuarios/salvarAlteracaoEmpresa`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEmpresa: sessionStorage.getItem('FK_EMPRESA'),
            telefone_01Server: telefone1Ch.checked ? telefone_1Empresa.value : dadosEmpresa[0].telefone_01,
            telefone_02Server: telefone2Ch.checked ? telefone_2Empresa.value : dadosEmpresa[0].telefone_02,
            emailEmpresaServer: emailCh.checked ? emailEmpresa.value : dadosEmpresa[0].email,
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            alert("Alterações da empresa foram salvas com sucesso!")
            window.location = "configuracoes-conta.html";
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a atualização!! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}


function salvarAlteracaoAdmin() {
    const nomeCh = document.getElementById('04');
    const cargoCh = document.getElementById('05');
    const emailCh = document.getElementById('06');
    const telefoneCh = document.getElementById('07');


    fetch(`/usuarios/salvarAlteracaoAdmin`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idAdminServer: sessionStorage.getItem('ID_USUARIO'),
            fkEmpresaServer: sessionStorage.getItem('FK_EMPRESA'),
            nomeAdminServer: nomeCh.checked ? nomeAdmin.value : dadosAdmin[0].nome_administrador,
            cargoServer: cargoCh.checked ? in_cargo.value : dadosAdmin[0].fk_ocupacao,
            telefoneServer: telefoneCh.checked ? telefoneAdmin.value : dadosAdmin[0].telefone_administrador,
            emailAdminServer: emailCh.checked ? emailAdmin.value : dadosAdmin[0].email_administrador
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            alert("Alterações do administrador foram salvas com sucesso!")
            window.location = "configuracoes-conta.html";
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a atualização!! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}
