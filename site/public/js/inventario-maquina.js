function getMaquinasUltrassom() {

    fetch("/maquinas/carregarMaquinaUltra", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_adminServer: sessionStorage.getItem('ID_USUARIO'),
            fk_empresaServer: sessionStorage.getItem('FK_EMPRESA')
        })
    }).then(function (response) {
            
        if (response.ok) {
            response.json().then(function (resposta) {
                let cont = 0;
                let situacao = "";
                let cor ="";
                for (let index = 0; index < resposta.length; index++) {
                    const element = resposta[index];

                    if (element.status_maquina == "true") {
                        situacao = "Operante"
                        cor = "green"
                    } else {
                        situacao = "Bloqueada"
                        cor = "red"
                    }

                    if (index % 2 == 0) {
                        containerContentRight.innerHTML += `                
                <div class="container-gray">
                    <div class="container-detalhes-especificacao">
                  
                        <h2 class="titulo-maquina">Maquina ${element.id_maquina}</h2>
                        
                        <p>
                            <strong>Sistema operacional:</strong>
                            <span id="dadoEspecSo">${element.sistema_operacional}</span>
                        </p>
    
                        <p>
                            <strong>Número serial:</strong>
                            <span id="dadoEspecCpu">${element.numero_serial_maquina}</span>
                        </p>

                        <p>
                            <strong>Administrador:</strong>
                            <span id="dadoEspecAdmin">${element.nome_administrador}</span>
                        </p>

                        <p>
                            <strong>Status da máquina:</strong>
                            <span id="dadoEspecStatus${element.id_maquina}" style="color:${cor}">${situacao}</span>
                        </p>
                        <div class="botoes">
                            <button class="bt-maquina" onclick="bloquearMaquina(${element.id_maquina})">Bloquear máquina</button>
                            <button class="bt-maquina" onclick="autorizarMaquina(${element.id_maquina})">Autorizar máquina</button>
                        </div>
                    </div>
                </div>`
                    } else {

                    containerContent.innerHTML += `
                <div class="container-gray">
                    <div class="container-detalhes-especificacao">
                        <h2 class="titulo-maquina">Maquina ${element.id_maquina}</h2>

                        <p>
                            <strong>Sistema operacional:</strong>
                            <span id="dadoEspecSo">${element.sistema_operacional}</span>
                        </p>
    
                        <p>
                            <strong>Número serial:</strong>
                            <span id="dadoEspecCpu">${element.numero_serial_maquina}</span>
                        </p>

                        <p>
                            <strong>Administrador:</strong>
                            <span id="dadoEspecAdmin">${element.nome_administrador}</span>
                        </p>

                        <p>
                            <strong>Status da máquina:</strong>
                            <span id="dadoEspecStatus${element.id_maquina}" style="color:${cor}">${situacao}</span>
                        </p>
                        <div class="botoes">
                            <button class="bt-maquina" onclick="bloquearMaquina(${element.id_maquina})">Bloquear máquina</button>
                            <button class="bt-maquina" onclick="autorizarMaquina(${element.id_maquina})">Autorizar máquina</button>
                        </div>
                    </div>
                </div>`

                }
            }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function bloquearMaquina(idMaquina) {
    fetch(`/maquinas/bloquearMaquina`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_adminServer: sessionStorage.getItem('ID_USUARIO'),
            fk_empresaServer: sessionStorage.getItem('FK_EMPRESA'),
            id_maquinaServer: idMaquina
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            alert(`Maquina ${idMaquina} foi bloqueada da operação!`)
            const element = document.getElementById("dadoEspecStatus"+idMaquina)
            element.style.color="red";
            element.innerHTML = "Bloqueada"
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a atualização!! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function autorizarMaquina(idMaquina) {
    fetch(`/maquinas/autorizarMaquina`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_adminServer: sessionStorage.getItem('ID_USUARIO'),
            fk_empresaServer: sessionStorage.getItem('FK_EMPRESA'),
            id_maquinaServer: idMaquina
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            alert(`Maquina ${idMaquina} foi autorizada a operar!`)
            const element = document.getElementById("dadoEspecStatus"+idMaquina)
            element.style.color="green";
            element.innerHTML = "Operante"
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a atualização!! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function iniciar() {
    getMaquinasUltrassom();
}