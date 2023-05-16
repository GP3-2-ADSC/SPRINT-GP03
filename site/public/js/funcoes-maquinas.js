// Funções de plotagem da KPI

let listaMaquinas = []

function getMaquinas() {

  fetch("/maquinas/carregarMaquinaEspec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_adminServer: sessionStorage.getItem('ID_ADMIN'),
      fk_empresaServer: sessionStorage.getItem('FK_EMPRESA')
    })
  }).then(function (response) {

    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        console.log("Tamanho " + resposta.length)
        resposta.forEach(element => {
          listaMaquinas.push(element);
        });
        console.log("Tamanho da lista de maquinas " + listaMaquinas.length)
        console.log("Id_maquina_1 " + listaMaquinas[0].id_maquina)
        getKpiCpu(listaMaquinas[0].id_maquina);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getKpiCpu(idMaquina) {
  console.log("NA FUNÇÃO DE KPI - CPU")

  fetch(`/maquinas/getKpiCpu/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log("Data da métrica: " + resposta[0].dt_metrica);
        console.log("Uso de CPU: " + resposta[0].uso + "%")
        getKpiRam(idMaquina);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getKpiRam(idMaquina) {
  console.log("NA FUNÇÃO DE KPI - RAM")

  fetch(`/maquinas/getKpiRam/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log("Data da métrica: " + resposta[0].dt_metrica);
        console.log("Uso de ram: " + resposta[0].uso + "%")
        getQtdDisco(idMaquina);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getQtdDisco(idMaquina) {
  console.log("NA FUNÇÃO DE QTD - DISCO")

  fetch(`/maquinas/getQtdDisco/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(resposta[0].quantidade)
        getKpiDisco(idMaquina, resposta[0].quantidade);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getKpiDisco(idMaquina, qtdDeDiscos) {
  console.log("NA FUNÇÃO DE KPI - DISCO")


  fetch("/maquinas/getKpiDisco", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idMaquinaServer: idMaquina,
      qtdDeDiscosServer: qtdDeDiscos
    })
  }).then(function (response) {

    if (response.ok) {
      response.json().then(function (resposta) {
        
        for (let index = 0; index < resposta.length; index++) {
          const element = resposta[index];
          console.log("Data da métrica: " + element.dt_metrica);
          console.log("Uso de Disco_" + index  + ": " + element.uso + "%")
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
function iniciar() {
  getMaquinas();
}