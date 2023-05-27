let listaMaquinas = [];


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
  }).then(function (response) {

    if (response.ok) {
      response.json().then(function (resposta) {
        console.log("MAQUINAS PUXADAS!");
        console.log(resposta);
        resposta.forEach(element => {
          listaMaquinas.push(element);
        });
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function iniciar() {
  getMaquinas();

  setTimeout(function () {
    exibirTotalSinalizacoes();
    console.log("Obtendo Alertas Gerais");
    obterAlertasGerais(sessionStorage.FK_EMPRESA);
    obterMaquinasAtivas();
  }, 5000);
}

var containerDetalhesCritico = document.getElementById("container-scroll-detalhamento-critico");
var containerDetalhesAlerta = document.getElementById("container-scroll-detalhamento-alerta");
var containerDetalhesPerigo = document.getElementById("container-scroll-detalhamento-perigo");

const semAlerta = document.getElementById("p-sem-maquinas-alerta");
const semPerigo = document.getElementById("p-sem-maquinas-perigo");
const semCritico = document.getElementById("p-sem-maquinas-critico");


var contagemCritico = document.getElementById("contagem-critico");
var contagemAlerta = document.getElementById("contagem-alerta");
var contagemPerigo = document.getElementById("contagem-perigo");

var ultimaMetrica = '0';

function redirecionarEspecifica(idMaquina) {
  for (let i = 0; i < listaMaquinas.length; i++) {
    if (listaMaquinas[i].id_maquina == idMaquina) {
      sessionStorage.setItem("POSICAO_ATUAL", i);
    }
  }

  window.location.href = "/dashboard-espec.html";
}

function exibirTotalSinalizacoes() {
  totalSinalizacoes = document.getElementById("total-sinalizacoes");
  idEmpresa = sessionStorage.FK_EMPRESA;
  
  fetch(`/maquinas/exibirTotalSinalizacoes/${idEmpresa}`, { cache: "no-store" })
    .then(function (response) {
      console.log("RESPONSE -> ", response);
      if (response.ok) {
        response
          .json()
          .then(function (resposta) {
            console.log("COUNT recebido:", resposta);
            console.log(`RESPOSTA TOTAL_ALERTAS -> ${resposta[0].total_alertas}`);

            totalSinalizacoes.innerHTML = resposta[0].total_alertas;
          });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    }
  )
    .catch(function (error) {
      console.error(`Erro na obtenção do COUNT de sinalizações: ${error.message}`);
    }
  );
}

async function obterAlertasGerais(idEmpresa) {
  console.log("Entrando na função obterAlertasGerais()");

  console.log(`ID_EMPRESA -> ${idEmpresa}`);

  try {
    const response = await fetch(`/maquinas/obterAlertasGerais/${idEmpresa}`, { cache: "no-store" });
    console.log("RESPONSE -> ", response);
    
    if (response.ok) {
      const jsonData = await response.json();
      console.log("jsonData recebido:", jsonData);
      console.log(jsonData.length);

      const arrayObjetos = [];
      for (let i = 0; i < jsonData.length; i++) {
        const objeto = {
          "id_maquina": jsonData[i].id_maquina,
          "status": jsonData[i].status,
          "componentes": []
        };
      
        const tipos_componente = jsonData[i].tipos_componente.split(",");
        const usos = jsonData[i].usos.split(",");
        const datas_metrica = jsonData[i].datas_metrica.split(",");
      
        for (let j = 0; j < tipos_componente.length; j++) {
          const componente = {
            "tipo_componente": tipos_componente[j],
            "uso": parseInt(usos[j]),
            "dt_metrica": datas_metrica[j]
          };
      
          objeto.componentes.push(componente);
        }
      
        arrayObjetos.push(objeto);
      }
      
      console.log(arrayObjetos);

      console.log("Entrando no for => " + arrayObjetos[0].componentes[0].dt_metrica);

      if (arrayObjetos[0].componentes[0].dt_metrica != ultimaMetrica) {
        ultimaMetrica = arrayObjetos[0].componentes[0].dt_metrica;
        for (let i = 0; i < arrayObjetos.length; i++) {
          if (arrayObjetos[i].status == 'maquinaCritica') {
            containerDetalhesCritico.innerHTML += `
            <div class="container-detalhammento">
            <div class="container-maquina-detalhamento">
              <div class="titulo-maquina-detalhamento">
                <p>
                  <a href="">Máquina ${arrayObjetos[i].id_maquina}</a>
                </p>
              </div>
    
              <div class="componentes">
                <p id="comp_cpu">CPU: 
                  <span>
                    ${arrayObjetos[i].componentes[0].uso}%
                  </span>
                </p>
  
                <p id="comp_ram">RAM: 
                  <span>
                    ${arrayObjetos[i].componentes[1].uso}%
                  </span>
                </p>
                
                <p id="comp_disco">Disco: 
                  <span>
                    ${arrayObjetos[i].componentes[2].uso}%
                  </span>
                </p>
              </div>
    
              <div class="btn-mais">
                <button onclick="redirecionarEspecifica(${arrayObjetos[i].id_maquina})">
                  <ion-icon name="eye-outline" id="eye-outline"></ion-icon>
              </button>
              </div>
            </div>
          </div>
            `;
          } else if (arrayObjetos[i].status == 'maquinaAlerta') {
            containerDetalhesAlerta.innerHTML += `
            <div class="container-detalhammento">
            <div class="container-maquina-detalhamento">
              <div class="titulo-maquina-detalhamento">
                <p>
                  <a href="">Máquina ${arrayObjetos[i].id_maquina}</a>
                </p>
              </div>
    
              <div class="componentes">
                <p id="comp_cpu">CPU: <span>${arrayObjetos[i].id_maquina}</span></p>
                <p id="comp_ram">RAM: <span>60%</span></p>
                <p id="comp_disco">Disco: <span>60%</span></p>
                <p id="comp_ping">PING: <span>60%</span></p>
              </div>
    
              <div class="btn-mais">
                <button onclick="redirecionarEspecifica(${arrayObjetos[i].id_maquina})">
                  <ion-icon name="eye-outline" id="eye-outline"></ion-icon>
              </button>
              </div>
            </div>
          </div>`;
          } else {
            containerDetalhesPerigo.innerHTML += `
            <div class="container-detalhammento">
            <div class="container-maquina-detalhamento">
              <div class="titulo-maquina-detalhamento">
                <p>
                  <a href="">Máquina ${arrayObjetos[i].id_maquina}</a>
                </p>
              </div>
    
              <div class="componentes">
                <p id="comp_cpu">CPU: <span>60%</span></p>
                <p id="comp_ram">RAM: <span>60%</span></p>
                <p id="comp_disco">Disco: <span>60%</span></p>
                <p id="comp_ping">PING: <span>60%</span></p>
              </div>
    
              <div class="btn-mais">
                <button onclick="redirecionarEspecifica(${arrayObjetos[i].id_maquina})">
                  <ion-icon name="eye-outline" id="eye-outline"></ion-icon>
              </button>
              </div>
            </div>
          </div>`;
          }
        }
        console.log("ATÉ AQUI TUDO OK");
        
        var contCritico = arrayObjetos.filter(objeto => objeto.status == 'maquinaCritica'); 
        console.log("CONTAGEM CRITICO -> ", contCritico.length);
        if (contCritico > 0 || !undefined) {
          contagemCritico.innerHTML = `${contCritico.length}`;
        } else {
          contagemCritico.innerHTML = `0`;
          semCritico.innerHTML = 'Não há máquinas em estado de critico';
        }
  
        var contAlerta = arrayObjetos.filter(objeto => objeto.status == 'maquinaAlerta');
        console.log("CONTAGEM ALERTA -> ", contAlerta.length);
        if (contAlerta > 0) {
          contagemAlerta.innerHTML = `${contAlerta.length}`;
        } else {
          contagemAlerta.innerHTML = `0`;
          semAlerta.innerHTML = 'Não há máquinas em estado de alerta';
        }
  
        var contPerigo = arrayObjetos.filter(objeto => objeto.status == 'maquinaPerigo');
        console.log("CONTAGEM PERIGO -> ", contPerigo.length);
        if (contPerigo > 0) {
          contagemPerigo.innerHTML = `${contPerigo.length}`;
        } else {
          contagemPerigo.innerHTML = `0`;
          semPerigo.innerHTML = 'Não há máquinas em estado de perigo'; 
        }

      }
    } else {
      console.error("Erro na API: ", response.status);
    }
  } catch (error) {
    console.error(`Erro na obtenção dos alertas gerais: ${error.message}`);
  }
}

function obterMaquinasAtivas() {
  totalAtivas = document.getElementById("total-maquinas");
  idEmpresa = sessionStorage.FK_EMPRESA;
  
  fetch(`/maquinas/obterMaquinasAtivas/${idEmpresa}`, { cache: "no-store" })
    .then(function (response) {
      console.log("RESPONSE -> ", response);
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log("RESPOSTA -> ", resposta);
          if (resposta.length > 0) {
            totalAtivas.innerHTML = `${resposta[0].tot} / ${resposta[1].tot}`;
          }
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    }
  )
    .catch(function (error) {
      console.error(`Erro na obtenção do COUNT de sinalizações: ${error.message}`);
    }
  );
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