function mostrarEsconderDiv(index) {
    const details_1 = document.getElementById("details-" + index);

    const p_more_details = document.getElementById("p-more-details-"+index);
    const p_less_details = document.getElementById("p-less-details-"+index);

    const arrow_down_1 = document.getElementById("arrow-down-" + index);
    const arrow_up_1 = document.getElementById("arrow-up-" + index);

    if (p_more_details.style.display != "none") {
        details_1.style.display = "flex";

        p_more_details.style.display = "none";
        p_less_details.style.display = "flex";

        arrow_down_1.style.display = "none";
        arrow_up_1.style.display = "flex";
    } else {
        details_1.style.display = "none";

        p_more_details.style.display = "flex";
        p_less_details.style.display = "none";

        arrow_down_1.style.display = "flex";
        arrow_up_1.style.display = "none";
    }
}


function getMaquinas() {
    fetch("/maquinas/carregarMaquinaEspec", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_adminServer: sessionStorage.getItem('ID_USUARIO'),
            fk_empresaServer: sessionStorage.getItem('FK_EMPRESA')
        })
    }).then( function (response) {

        if (response.ok) {
            response.json().then(async function (resposta) {
               obterAlertas(resposta)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

async function obterAlertas(maquinas) {
    for (let index = 0; index < maquinas.length; index++) {
        const idMaquina = maquinas[index].id_maquina

        console.log("Entrando na função obter alertas");
        await fetch(`/maquinas/obterAlertas/${idMaquina}`, { cache: 'no-store' }).then( async function (response) {
            if (response.ok) {
                await response.json().then(function (resposta) {
                    console.log("DADOS DO OBTER DADOS INICIAIS");
                    let alertas = ``;

                    resposta.forEach(element => {
                        let cor = "";
                        let situacao = "";
                        if (element.id_tipo_alerta == 1) {
                            situacao = "circle-kpi yellow"
                            cor="#FFC107"
                        } else if (element.id_tipo_alerta == 2) {
                            situacao = "circle-kpi orange"
                            cor="#ff8c00"
                        } else {
                            situacao = "circle-kpi red"
                            cor="red"
                        }

                        alertas += `
            <div class="details">
            <p class="log-details" style="color:${cor}">Log - ${element.dia}</p>

            <div class="container-text">
              <span class="${situacao}"></span>

              <p class="log-phrase">A máquina está tendo ${element.uso.toFixed(2)}% de uso de ${element.tipo_componente}</p>
            </div>
            <hr>
          </div>
            `
                    });

                    containerAlerts.innerHTML += `
                    <div class="alerts">
                    <span class="title-machine">Maquina ${idMaquina}</span>
            
                    <div class="container-details" id="details-${idMaquina}">
                      ${alertas}
                    </div>
            
                    <div class="details-options">
                      <p class="p-details" id="p-more-details-${idMaquina}">Mais detalhes</p>
                      <p class="p-details p-less-details" id="p-less-details-${idMaquina}">Menos detalhes</p>
            
                      <button class="details-button" onclick="mostrarEsconderDiv(${idMaquina})">
                        <ion-icon name="chevron-down-circle-outline" class="arrow-icon" id="arrow-down-${idMaquina}"></ion-icon>
            
                        <ion-icon name="chevron-up-circle-outline" class="arrow-icon arrow-up" id="arrow-up-${idMaquina}"></ion-icon>
                      </button>
                    </div>
                  </div>
            `

                });

            } else {

                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    }
}

function iniciar() {
    getMaquinas();
}

//<![CDATA[
    var ttChatLoaderS = document.createElement('script');
    document.tomticketChatLoaderScriptVersion = 2;
    ttChatLoaderS.src = 'https://retria-ms.tomticket.com/scripts-chat/chat.min.js'
    + '?id=EP62176'
    + '&account=3979264P30052023072425'
    + '&autoOpen=0'
    + '&hideWhenOffline=0'
    + '&d=retria-ms'
    + '&ts=' + new Date().getTime()
    + '&ref=' + encodeURIComponent(document.URL);
    document.body.appendChild(ttChatLoaderS);
    //]]>