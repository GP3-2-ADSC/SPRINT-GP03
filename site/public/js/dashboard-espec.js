let listaMaquinas = []
let contador = 0;
var posicao_maquina_atual = 0;


// ChartJS da KPI da CPU
let data_cpu = {
  labels: ["Disponível", "Utilizando"],
  datasets: [
    {
      data: [100 - 72, 72],
      backgroundColor: ["#f1f1f1", "#178959"],
      borderColor: '#dee2e6',
      hoverOffset: 4,
      cutout: "50%",
    },
  ],
};

let config_kpi_cpu = {
  type: "doughnut",
  data: data_cpu,
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

let myChart_kpi_cpu = new Chart(
  document.getElementById("kpi-chart-cpu"),
  config_kpi_cpu
);

// ChartJS da KPI da Memória
let data_memoria = {
  labels: ["Disponível", "Utilizando"],
  datasets: [
    {
      data: [100 - 87, 87],
      backgroundColor: ["#f1f1f1", "#178959"],
      borderColor: '#dee2e6',
      hoverOffset: 4,
      cutout: "50%",
    },
  ],
};

let config_kpi_memoria = {
  type: "doughnut",
  data: data_memoria,
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

let myChart_kpi_memoria = new Chart(
  document.getElementById("kpi-chart-memoria"),
  config_kpi_memoria
);

// ChartJS da KPI do Disco
let data_disco = {
  labels: ["Disponível", "Utilizando"],
  datasets: [
    {
      data: [100 - 55, 55],
      backgroundColor: ["#f1f1f1", "#178959"],
      borderColor: '#dee2e6',
      hoverOffset: 4,
      cutout: "50%",
    },
  ],
};

let config_kpi_disco = {
  type: "doughnut",
  data: data_disco,
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

let myChart_kpi_disco = new Chart(
  document.getElementById("kpi-chart-disco"),
  config_kpi_disco
);

// ChartJS da KPI da Rede
let data_rede = {
  labels: ["Disponível", "Utilizando"],
  datasets: [
    {
      data: [100 - 19, 19],
      backgroundColor: ["#f1f1f1", "#178959"],
      borderColor: '#dee2e6',
      hoverOffset: 4,
      cutout: "50%",
    },
  ],
};

let config_kpi_rede = {
  type: "doughnut",
  data: data_rede,
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

let myChart_kpi_rede = new Chart(
  document.getElementById("kpi-chart-rede"),
  config_kpi_rede
);


// ChartJS do uso da CPU
// Criando estrutura para plotar gráfico - labels
let labels_geral_cpu = [];

// Criando estrutura para plotar gráfico - dados
let data_geral_cpu = {
  labels: labels_geral_cpu,
  datasets: [
    {
      label: "Uso da CPU (%)",
      backgroundColor: "#0061BA",
      borderColor: "#0061BA",
      pointRadius: 5,
      pointBorderWidth: 1,
      data: [],
    },
    {
      label: "Uso ideal",
      backgroundColor: "rgba(0, 255, 51, 0.452)",
    },
  ],
};
let config_geral_cpu = {
  type: "line",
  data: data_geral_cpu,
  options: {
    scales: {
      y: {
        ticks: {
          color: "#000",
        },
        beginAtZero: true,
        type: "linear",
        grid: {
          color: "#FFF",
        },
      },
      x: {
        ticks: {
          color: "#000",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      autocolors: false,
      annotation: {
        annotations: {
          box1: {
            type: "box",
            yMin: 40,
            yMax: 45,
            xMin: 0,
            xMax: 100,
            backgroundColor: "rgba(0, 255, 51, 0.452)",
          },
        },
      },
      title: {
        display: true,
        text: "Monitoramento do uso da CPU da máquina ",
        align: "center",
        fullSize: false,
        color: "#0061BA",
        font: {
          size: 20,
          weight: 600,
          lineHeight: 1.0,
        },
      },
    },
  },
};

let myChart_geral_cpu = new Chart(
  document.getElementById("chart-geral-cpu"),
  config_geral_cpu
);


// ChartJS do uso da Memória
let labels_geral_memoria = [];

// Criando estrutura para plotar gráfico - dados
let data_geral_memoria = {
  labels: labels_geral_memoria,
  datasets: [
    {
      label: "Uso da Memória (%)",
      backgroundColor: "#0061BA",
      borderColor: "#0061BA",
      pointRadius: 5,
      pointBorderWidth: 1,
      data: [],
    },
    {
      label: "Uso ideal",
      backgroundColor: "rgba(0, 255, 51, 0.452)",
    },
  ],
};

let config_geral_memoria = {
  type: "line",
  data: data_geral_memoria,
  options: {
    scales: {
      y: {
        ticks: {
          color: "#000",
        },
        beginAtZero: true,
        type: "linear",
        grid: {
          color: "#FFF",
        },
      },
      x: {
        ticks: {
          color: "#000",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      autocolors: false,
      annotation: {
        annotations: {
          box1: {
            type: "box",
            yMin: 55,
            yMax: 65,
            xMin: 0,
            xMax: 100,
            backgroundColor: "rgba(0, 255, 51, 0.452)",
          },
        },
      },
      title: {
        display: true,
        text: "Monitoramento do uso da memória da máquina ",
        align: "center",
        fullSize: false,
        color: "#0061BA",
        font: {
          size: 20,
          weight: 600,
          lineHeight: 1.0,
        },
      },
    },
  },
};

let myChart_geral_memoria = new Chart(
  document.getElementById("chart-geral-memoria"),
  config_geral_memoria
);


// ChartJS do Uso do Disco
let labels_geral_disco = [

];

// Criando estrutura para plotar gráfico - dados
let data_geral_disco = {
  labels: labels_geral_disco,
  datasets: [
    {
      label: "Uso do Disco (%)",
      backgroundColor: "#0061BA",
      borderColor: "#0061BA",
      pointRadius: 5,
      pointBorderWidth: 1,
      data: [],
    },
    {
      label: "Uso ideal",
      backgroundColor: "rgba(0, 255, 51, 0.452)",
    },
  ],
};

let config_geral_disco = {
  type: "line",
  data: data_geral_disco,
  options: {
    scales: {
      y: {
        ticks: {
          color: "#000",
        },
        beginAtZero: true,
        type: "linear",
        grid: {
          color: "#FFF",
        },
      },
      x: {
        ticks: {
          color: "#000",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      autocolors: false,
      annotation: {
        annotations: {
          box1: {
            type: "box",
            yMin: 40,
            yMax: 50,
            xMin: 0,
            xMax: 100,
            backgroundColor: "rgba(0, 255, 51, 0.452)",
          },
        },
      },
      title: {
        display: true,
        text: "Monitoramento do uso do disco da máquina ",
        align: "center",
        fullSize: false,
        color: "#0061BA",
        font: {
          size: 20,
          weight: 600,
          lineHeight: 1.0,
        },
      },
    },
  },
};

let myChart_geral_disco = new Chart(
  document.getElementById("chart-geral-disco"),
  config_geral_disco
);


// ChartJS do Uso do Rede
let labels_geral_rede = [
];

// Criando estrutura para plotar gráfico - dados
let data_geral_rede = {
  labels: labels_geral_rede,
  datasets: [
    {
      label: "Velocidade de download (mbps)",
      backgroundColor: "#0061BA",
      borderColor: "#0061BA",
      pointRadius: 5,
      pointBorderWidth: 1,
      data: [],
    },
    {
      label: "Uso ideal",
      backgroundColor: "rgba(0, 255, 51, 0.452)",
    },
  ],
};

let config_geral_rede = {
  type: "line",
  data: data_geral_rede,
  options: {
    scales: {
      y: {
        ticks: {
          color: "#000",
        },
        beginAtZero: true,
        type: "linear",
        grid: {
          color: "#FFF",
        },
      },
      x: {
        ticks: {
          color: "#000",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      autocolors: false,
      annotation: {
        annotations: {
          box1: {
            type: "box",
            yMin: 60,
            yMax: 70,
            xMin: 0,
            xMax: 100,
            backgroundColor: "rgba(0, 255, 51, 0.452)",
          },
        },
      },
      title: {
        display: true,
        text: "Monitoramento do uso da rede da máquina ",
        align: "center",
        fullSize: false,
        color: "#0061BA",
        font: {
          size: 20,
          weight: 600,
          lineHeight: 1.0,
        },
      },
    },
  },
};

let myChart_geral_rede = new Chart(
  document.getElementById("chart-geral-rede"),
  config_geral_rede
);

var chartCPU = document.getElementById("chart-geral-cpu");
var chartMemoria = document.getElementById("chart-geral-memoria");
var chartDisco = document.getElementById("chart-geral-disco");
var chartRede = document.getElementById("chart-geral-rede");

var btnCPU = document.getElementById("btn-menu-cpu");
var btnMemoria = document.getElementById("btn-menu-memoria");
var btnDisco = document.getElementById("btn-menu-disco");
var btnRede = document.getElementById("btn-menu-rede");

function plotarGraficoCPU() {
  chartCPU.style.display = "flex";
  btnCPU.style.backgroundColor = "#0070ba";

  btnMemoria.style.backgroundColor = "#5eacd2";
  btnDisco.style.backgroundColor = "#5eacd2";
  btnRede.style.backgroundColor = "#5eacd2";

  chartMemoria.style.display = "none";
  chartDisco.style.display = "none";
  chartRede.style.display = "none";

}

function plotarGraficoMemoria() {
  chartMemoria.style.display = "flex";
  btnMemoria.style.backgroundColor = "#0070ba";

  btnCPU.style.backgroundColor = "#5eacd2";
  btnDisco.style.backgroundColor = "#5eacd2";
  btnRede.style.backgroundColor = "#5eacd2";

  chartCPU.style.display = "none";
  chartDisco.style.display = "none";
  chartRede.style.display = "none";

}

function plotarGraficoDisco() {
  chartDisco.style.display = "flex";
  btnDisco.style.backgroundColor = "#0070ba";

  btnCPU.style.backgroundColor = "#5eacd2";
  btnMemoria.style.backgroundColor = "#5eacd2";
  btnRede.style.backgroundColor = "#5eacd2";

  chartCPU.style.display = "none";
  chartMemoria.style.display = "none";
  chartRede.style.display = "none";

}

function plotarGraficoRede() {
  chartRede.style.display = "flex";
  btnRede.style.backgroundColor = "#0070ba";

  btnCPU.style.backgroundColor = "#5eacd2";
  btnMemoria.style.backgroundColor = "#5eacd2";
  btnDisco.style.backgroundColor = "#5eacd2";

  chartCPU.style.display = "none";
  chartMemoria.style.display = "none";
  chartDisco.style.display = "none";
}
// Funções de plotagem da KPI

function getMaquinas(idMaquina) {
  id_maquina_atual = idMaquina;

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
        resposta.forEach(element => {
          listaMaquinas.push(element);
        });

        let paraPlotar = listaMaquinas[sessionStorage.getItem("POSICAO_ATUAL")].id_maquina;
        num_maquina_atual.innerHTML = `Maquina ${parseInt(paraPlotar)}`
        nome_tabela.innerHTML = `Alertas da maquina ${parseInt(paraPlotar)}`
        plotarNomeTabelas(listaMaquinas[idMaquina].id_maquina)
        obterDadosIniciaisCpu(listaMaquinas[idMaquina].id_maquina);
        obterDadosIniciaisRam(listaMaquinas[idMaquina].id_maquina);
        obterDadosIniciaisDisco(listaMaquinas[idMaquina].id_maquina);
        obterDadosIniciaisRede(listaMaquinas[idMaquina].id_maquina);
        obterEspecificacaoComponentes(listaMaquinas[idMaquina].id_maquina);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

// Funções de atualizar dados
function obterDadosIniciaisCpu(idMaquina) {
  console.log("Entrando na função obter dados iniciais");
  fetch(`/maquinas/obterDadosIniciaisCpu/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        resposta.reverse();
        if (labels_geral_cpu.length == 0 && data_geral_cpu.datasets[0].data.length == 0) {
          resposta.forEach(element => {
            labels_geral_cpu.push(element.horario);
            data_geral_cpu.datasets[0].data.push(element.uso.toFixed(2));
          });
          myChart_geral_cpu.update()

          let usoAtual = resposta[resposta.length - 1].uso;
          data_cpu.datasets[0].data = [100 - usoAtual.toFixed(2), usoAtual.toFixed(2)]

          if (usoAtual <= 35) {
            data_cpu.datasets[0].backgroundColor.splice(1, 1);
            data_cpu.datasets[0].backgroundColor.push("#178959");

          } else if (usoAtual < 40) {
            data_cpu.datasets[0].backgroundColor.splice(1, 1);
            data_cpu.datasets[0].backgroundColor.push("#FFC107");

          } else if (usoAtual < 56) {
            data_cpu.datasets[0].backgroundColor.splice(1, 1);
            data_cpu.datasets[0].backgroundColor.push("#ff8c00");

          } else {
            data_cpu.datasets[0].backgroundColor.splice(1, 1);
            data_cpu.datasets[0].backgroundColor.push("red");
          }

          myChart_kpi_cpu.update()

        } else {
          console.log("Ja foi apertado");
        }
        atualizarGraficoCpu(idMaquina);
        obterAlertas(idMaquina)
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      obterDadosIniciaisCpu(idMaquina);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function atualizarGraficoCpu(idMaquina) {
  fetch(`/maquinas/atualizarGraficoCpu/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {
        if (novoRegistro[0].horario == labels_geral_cpu[labels_geral_cpu.length - 1]) {
          console.log("Não há dados novos!");

        } else {

          if (data_geral_cpu.datasets[0].data.length >= 8 && labels_geral_cpu.length >= 8) {
            labels_geral_cpu.shift();
            data_geral_cpu.datasets[0].data.shift();
          }

          labels_geral_cpu.push(novoRegistro[0].horario);
          data_geral_cpu.datasets[0].data.push(novoRegistro[0].uso.toFixed(2));
          data_cpu.datasets[0].data = [100 - novoRegistro[0].uso.toFixed(2), novoRegistro[0].uso.toFixed(2)]

          if (novoRegistro[0].uso <= 35) {
            data_cpu.datasets[0].backgroundColor.splice(1, 1);
            data_cpu.datasets[0].backgroundColor.push("#178959");

          } else if (novoRegistro[0].uso < 40) {
            data_cpu.datasets[0].backgroundColor.splice(1, 1);
            data_cpu.datasets[0].backgroundColor.push("#FFC107");

          } else if (novoRegistro[0].uso < 56) {
            data_cpu.datasets[0].backgroundColor.splice(1, 1);
            data_cpu.datasets[0].backgroundColor.push("#ff8c00");

          } else {
            data_cpu.datasets[0].backgroundColor.splice(1, 1);
            data_cpu.datasets[0].backgroundColor.push("red");
          }

        }
        myChart_geral_cpu.update();
        myChart_kpi_cpu.update();

        setTimeout(() => atualizarGraficoCpu(idMaquina), 5000);
      });
    } else {
      setTimeout(() => atualizarGraficoCpu(idMaquina), 5000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function obterDadosIniciaisRam(idMaquina) {
  console.log("Entrando na função obter dados iniciais");
  fetch(`/maquinas/obterDadosIniciaisRam/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        resposta.reverse();

        if (labels_geral_memoria.length == 0 && data_geral_memoria.datasets[0].data.length == 0) {
          resposta.forEach(element => {
            console.log("No foreach");
            labels_geral_memoria.push(element.horario);
            data_geral_memoria.datasets[0].data.push(element.uso.toFixed(2));
          });
          myChart_geral_memoria.update()
          let usoAtual = resposta[resposta.length - 1].uso;
          data_memoria.datasets[0].data = [100 - usoAtual.toFixed(2), usoAtual.toFixed(2)]

          if (usoAtual <= 49) {
            data_memoria.datasets[0].backgroundColor.splice(1, 1);
            data_memoria.datasets[0].backgroundColor.push("#178959");

          } else if (usoAtual < 56) {
            data_memoria.datasets[0].backgroundColor.splice(1, 1);
            data_memoria.datasets[0].backgroundColor.push("#FFC107");

          } else if (usoAtual < 63) {
            data_memoria.datasets[0].backgroundColor.splice(1, 1);
            data_memoria.datasets[0].backgroundColor.push("#ff8c00");

          } else {
            data_memoria.datasets[0].backgroundColor.splice(1, 1);
            data_memoria.datasets[0].backgroundColor.push("red");
          }

          myChart_kpi_memoria.update()
        } else {
          console.log("Já foi apertado!");
        }

        atualizarGraficoRam(idMaquina);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      obterDadosIniciaisRam(idMaquina)
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function atualizarGraficoRam(idMaquina) {
  fetch(`/maquinas/atualizarGraficoRam/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {

        if (novoRegistro[0].horario == labels_geral_memoria[labels_geral_memoria.length - 1]) {


        } else {
          console.log("TEM DADO NOVO!");

          if (data_geral_memoria.datasets[0].data.length >= 8 && labels_geral_memoria.length >= 8) {
            labels_geral_memoria.shift();
            data_geral_memoria.datasets[0].data.shift();
          }

          labels_geral_memoria.push(novoRegistro[0].horario);
          data_geral_memoria.datasets[0].data.push(novoRegistro[0].uso.toFixed(2));
          data_memoria.datasets[0].data = [100 - novoRegistro[0].uso.toFixed(2), novoRegistro[0].uso.toFixed(2)]

          if (novoRegistro[0].uso <= 49) {
            data_memoria.datasets[0].backgroundColor.splice(1, 1);
            data_memoria.datasets[0].backgroundColor.push("#178959");

          } else if (novoRegistro[0].uso < 56) {
            data_memoria.datasets[0].backgroundColor.splice(1, 1);
            data_memoria.datasets[0].backgroundColor.push("#FFC107");

          } else if (novoRegistro[0].uso < 63) {
            data_memoria.datasets[0].backgroundColor.splice(1, 1);
            data_memoria.datasets[0].backgroundColor.push("#ff8c00");

          } else {
            data_memoria.datasets[0].backgroundColor.splice(1, 1);
            data_memoria.datasets[0].backgroundColor.push("red");
          }

        }
        myChart_geral_memoria.update();
        myChart_kpi_memoria.update()

        setTimeout(() => atualizarGraficoRam(idMaquina), 5000);
      });
    } else {
      setTimeout(() => atualizarGraficoRam(idMaquina), 5000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function obterDadosIniciaisDisco(idMaquina) {
  console.log("Entrando na função obter dados iniciais");
  fetch(`/maquinas/obterDadosIniciaisDisco/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        resposta.reverse();
        resposta.forEach(element => {
          labels_geral_disco.push(element.horario);
          data_geral_disco.datasets[0].data.push(element.uso.toFixed(2));
        });
        myChart_geral_disco.update()
        let usoAtual = resposta[resposta.length - 1].uso;
        data_disco.datasets[0].data = [100 - usoAtual.toFixed(2), usoAtual.toFixed(2)]

        if (usoAtual <= 56) {
          data_disco.datasets[0].backgroundColor.splice(1, 1);
          data_disco.datasets[0].backgroundColor.push("#178959");

        } else if (usoAtual < 64) {
          data_disco.datasets[0].backgroundColor.splice(1, 1);
          data_disco.datasets[0].backgroundColor.push("#FFC107");

        } else if (usoAtual < 72) {
          data_disco.datasets[0].backgroundColor.splice(1, 1);
          data_disco.datasets[0].backgroundColor.push("#ff8c00");

        } else {
          data_disco.datasets[0].backgroundColor.splice(1, 1);
          data_disco.datasets[0].backgroundColor.push("red");
        }

        myChart_kpi_disco.update()
        atualizarGraficoDisco(idMaquina);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      obterDadosIniciaisDisco(idMaquina)
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function atualizarGraficoDisco(idMaquina) {
  fetch(`/maquinas/atualizarGraficoDisco/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {

        if (novoRegistro[0].horario == labels_geral_disco[labels_geral_disco.length - 1]) {


        } else {
          console.log("TEM DADO NOVO!");

          if (data_geral_disco.datasets[0].data.length >= 8 && labels_geral_disco.length >= 8) {
            labels_geral_disco.shift();
            data_geral_disco.datasets[0].data.shift();
          }
          
          labels_geral_disco.push(novoRegistro[0].horario);
          data_geral_disco.datasets[0].data.push(novoRegistro[0].uso.toFixed(2));
          data_disco.datasets[0].data = [100 - novoRegistro[0].uso.toFixed(2), novoRegistro[0].uso.toFixed(2)]

          if (novoRegistro[0].uso <= 56) {
            data_disco.datasets[0].backgroundColor.splice(1, 1);
            data_disco.datasets[0].backgroundColor.push("#178959");

          } else if (novoRegistro[0].uso < 64) {
            data_disco.datasets[0].backgroundColor.splice(1, 1);
            data_disco.datasets[0].backgroundColor.push("#FFC107");

          } else if (novoRegistro[0].uso < 72) {
            data_disco.datasets[0].backgroundColor.splice(1, 1);
            data_disco.datasets[0].backgroundColor.push("#ff8c00");

          } else {
            data_disco.datasets[0].backgroundColor.splice(1, 1);
            data_disco.datasets[0].backgroundColor.push("red");
          }

        }
        myChart_geral_disco.update();
        myChart_kpi_disco.update();

        setTimeout(() => atualizarGraficoDisco(idMaquina), 5000);
      });
    } else {
      setTimeout(() => atualizarGraficoDisco(idMaquina), 5000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function obterDadosIniciaisRede(idMaquina) {
  console.log("Entrando na função obter dados iniciais");
  fetch(`/maquinas/obterDadosIniciaisRede/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos na REDE: ${JSON.stringify(resposta)}`);
        resposta.reverse();
        resposta.forEach(element => {
          labels_geral_rede.push(element.horario);
          data_geral_rede.datasets[0].data.push(element.uso.toFixed(2));
        });
        myChart_geral_rede.update()
        atualizarGraficoRede(idMaquina);
        getStatusApiFornecedor(idMaquina);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      obterDadosIniciaisRede(idMaquina)
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function atualizarGraficoRede(idMaquina) {
  fetch(`/maquinas/atualizarGraficoRede/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {

        if (novoRegistro[0].horario == labels_geral_rede[labels_geral_rede.length - 1]) {

          if (contador == 5) {
            document.getElementById('wifiOn').style.display = 'none'
            document.getElementById('wifiOff').style.display = 'block'
            statusRede.innerHTML = 'Sem conexão!'
            document.getElementById('statusRede').style.color = 'red';
          }
          if (contador < 5) {
            contador++;
          }
        } else {
          console.log("TEM DADO NOVO!");
          
          if (data_geral_rede.datasets[0].data.length >= 8 && labels_geral_rede.length >= 8) {
            labels_geral_rede.shift();
            data_geral_rede.datasets[0].data.shift();
          }
          
          labels_geral_rede.push(novoRegistro[0].horario);
          data_geral_rede.datasets[0].data.push(novoRegistro[0].uso.toFixed(2));

          if (contador > 0) {
            document.getElementById('wifiOff').style.display = 'none'
            document.getElementById('wifiOn').style.display = 'block'
            statusRede.innerHTML = 'Conectada!'
            document.getElementById('wifiOn').style.fill = '#178959'
            document.getElementById('statusRede').style.color = '#178959';
            contador = 0;
          }
        }
        myChart_geral_rede.update();

        setTimeout(() => atualizarGraficoRede(idMaquina), 5000);
      });
    } else {
      setTimeout(() => atualizarGraficoRede(idMaquina), 5000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getStatusApiFornecedor(idMaquina) {
  fetch(`/maquinas/getStatusApiFornecedor/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {

        if (resposta[0].status_conexao == 'Sucesso') {
          const icone = document.getElementById('wifiOnFornecedor');
          document.getElementById('wifiOffFornecedor').style.display = 'none'
          icone.style.display = 'block';
          icone.style.fill = '#178959';
          document.getElementById('statusApiFornecedor').style.color = '#178959';
          statusApiFornecedor.innerHTML = 'Conexão OK!'
        } else if (resposta[0].status_conexao == 'Parcial') {
          const icone = document.getElementById('wifiOnFornecedor');
          document.getElementById('wifiOffFornecedor').style.display = 'none'
          icone.style.display = 'block';
          icone.style.fill = '#FFC107';
          document.getElementById('statusApiFornecedor').style.color = '#FFC107';
          statusApiFornecedor.innerHTML = 'Conexão Parcial!'
        } else {
          document.getElementById('wifiOffFornecedor').style.display = 'block'
          document.getElementById('wifiOnFornecedor').style.display = 'none'
          document.getElementById('statusApiFornecedor').style.color = 'red';
          statusApiFornecedor.innerHTML = 'Conexão com erro!'
        }

        setTimeout(() => getStatusApiFornecedor(idMaquina), 10000);
      });
    } else {
      setTimeout(() => getStatusApiFornecedor(idMaquina), 10000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

async function iniciar() {
  if (sessionStorage.POSICAO_ATUAL != null) {
    posicao_maquina_atual = sessionStorage.getItem("POSICAO_ATUAL")
    await getMaquinas(sessionStorage.getItem("POSICAO_ATUAL"));

  } else {
    sessionStorage.POSICAO_ATUAL = posicao_maquina_atual
    await getMaquinas(sessionStorage.getItem("POSICAO_ATUAL"));
  }
}

function proximaMaquina(acao) {
  if (acao == 1) {
    if (posicao_maquina_atual <= (listaMaquinas.length - 1) && posicao_maquina_atual > 0) {
      posicao_maquina_atual--;
      sessionStorage.setItem("POSICAO_ATUAL", posicao_maquina_atual)
      location.reload();
    }
  } else {
    if (posicao_maquina_atual < (listaMaquinas.length - 1) && posicao_maquina_atual >= 0) {
      posicao_maquina_atual++;
      sessionStorage.setItem("POSICAO_ATUAL", posicao_maquina_atual);
      location.reload();
    }
  }
}

async function obterAlertas(idMaquina) {

  console.log("Entrando na função obter alertas");
  await fetch(`/maquinas/obterAlertas/${idMaquina}`, { cache: 'no-store' }).then(async function (response) {
    if (response.ok) {
      await response.json().then(function (resposta) {
        resposta.forEach(element => {

          let cor = "";
          let alertas = ``;
          let situacao = "";
          if (element.id_tipo_alerta == 1) {
            situacao = "alerta"
            cor = "#FFC107"
          } else if (element.id_tipo_alerta == 2) {
            situacao = "perigo"
            cor = "#ff8c00"
          } else {
            situacao = "crítico"
            cor = "#e10000"
          }

          if (resposta.indexOf(element) == 0) {
            historic.innerHTML = `
            <div class="card-historic">
            <p class="historic-date">${element.dia}</p>
              <p class="historic-text">${element.tipo_componente} em <span style="color: ${cor}";>${situacao}</span> (${element.uso.toFixed(2)}%)</p>
            </div>`
          }
          alertas += `
              <div class="card-historic">
              <p class="historic-date">${element.dia}</p>
                <p class="historic-text">${element.tipo_componente} em <span style="color: ${cor}";>${situacao}</span> (${element.uso.toFixed(2)}%)</p>
              </div>`

          historic.innerHTML += alertas
        });
      });
      setTimeout(() => obterAlertas(idMaquina), 5000);
    } else {
      setTimeout(() => obterAlertas(idMaquina), 5000);
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function obterEspecificacaoComponentes(idMaquina) {
  fetch(`/maquinas/especificacao-componentes/${idMaquina}`)
    .then(resposta => {

      if (resposta.ok) {
        resposta.json().then(resposta => {

          console.log(`ESPECIFICAÇÃO RECEBIDA: ${JSON.stringify(resposta)}`);

          document.getElementById("dado-espec-serial").innerHTML = resposta[0].numero_serial_maquina;
          document.getElementById("dado-espec-so").innerHTML = resposta[0].sistema_operacional;

          document.getElementById("dado-espec-cpu").innerHTML = resposta[0].descricao_componente;
          document.getElementById("dado-espec-ram").innerHTML = resposta[1].descricao_componente;
          document.getElementById("dado-espec-disco").innerHTML = resposta[2].descricao_componente;
        });

        plotarGraficoCPU(listaMaquinas[0].id_maquina);
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
    });
}

function plotarNomeTabelas(idMaquina) {
  console.log("ID MAQUINA É " + idMaquina);
  config_geral_cpu.options.plugins.title.text = "Monitoramento do uso da CPU da máquina " + idMaquina;
  config_geral_memoria.options.plugins.title.text = "Monitoramento do uso da memória da máquina " + idMaquina;
  config_geral_disco.options.plugins.title.text = "Monitoramento do uso do disco da máquina " + idMaquina;
  config_geral_rede.options.plugins.title.text = "Monitoramento do uso da rede da máquina " + idMaquina;
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