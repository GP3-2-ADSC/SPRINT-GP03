// ChartJS da KPI da CPU
const data_cpu = {
  labels: ["Disponível", "Utilizando"],
  datasets: [
    {
      data: [100 - 72, 72],
      backgroundColor: ["#d0d0d0", "#FFCD56"],
      borderColor: '#b8b8b8',
      hoverOffset: 4,
      cutout: "50%",
    },
  ],
};

const config_kpi_cpu = {
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

const myChart_kpi_cpu = new Chart(
  document.getElementById("kpi-chart-cpu"),
  config_kpi_cpu
);

// ChartJS da KPI da Memória
const data_memoria = {
  labels: ["Disponível", "Utilizando"],
  datasets: [
    {
      data: [100 - 87, 87],
      backgroundColor: ["#d0d0d0", "#e10000"],
      borderColor: '#b8b8b8',
      hoverOffset: 4,
      cutout: "50%",
    },
  ],
};

const config_kpi_memoria = {
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

const myChart_kpi_memoria = new Chart(
  document.getElementById("kpi-chart-memoria"),
  config_kpi_memoria
);

// ChartJS da KPI do Disco
const data_disco = {
  labels: ["Disponível", "Utilizando"],
  datasets: [
    {
      data: [100 - 55, 55],
      backgroundColor: ["#d0d0d0", "#3cb600"],
      borderColor: '#b8b8b8',
      hoverOffset: 4,
      cutout: "50%",
    },
  ],
};

const config_kpi_disco = {
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

const myChart_kpi_disco = new Chart(
  document.getElementById("kpi-chart-disco"),
  config_kpi_disco
);

// ChartJS da KPI da Rede
const data_rede = {
  labels: ["Disponível", "Utilizando"],
  datasets: [
    {
      data: [100 - 19, 19],
      backgroundColor: ["#d0d0d0", "#36A2EB"],
      borderColor: '#b8b8b8',
      hoverOffset: 4,
      cutout: "50%",
    },
  ],
};

const config_kpi_rede = {
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

const myChart_kpi_rede = new Chart(
  document.getElementById("kpi-chart-rede"),
  config_kpi_rede
);


// ChartJS do uso da CPU
// Criando estrutura para plotar gráfico - labels
let labels_geral_cpu = [
  "12:02",
  "12:04",
  "12:06",
  "12:08",
  "12:10",
  "12:12",
  "12:14",
  "12:16",
];

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
      data: [10, 25, 32, 24, 15, 56, 27, 38],
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
        text: "Monitoramento do uso da CPU da máquina 1",
        align: "center",
        fullSize: false,
        color: "#000",
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
let labels_geral_memoria = [
  "12:02",
  "12:04",
  "12:06",
  "12:08",
  "12:10",
  "12:12",
  "12:14",
  "12:16",
];

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
      data: [55, 58, 62, 67, 58, 62, 65, 72],
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
        text: "Monitoramento do uso da memória da máquina 1",
        align: "center",
        fullSize: false,
        color: "#000",
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
  "12:02",
  "12:04",
  "12:06",
  "12:08",
  "12:10",
  "12:12",
  "12:14",
  "12:16",
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
      data: [32, 38, 53, 65, 59, 60, 75, 82],
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
        text: "Monitoramento do uso do disco da máquina 1",
        align: "center",
        fullSize: false,
        color: "#000",
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
  "12:02",
  "12:04",
  "12:06",
  "12:08",
  "12:10",
  "12:12",
  "12:14",
  "12:16",
];

// Criando estrutura para plotar gráfico - dados
let data_geral_rede = {
  labels: labels_geral_rede,
  datasets: [
    {
      label: "Uso da Rede (%)",
      backgroundColor: "#0061BA",
      borderColor: "#0061BA",
      pointRadius: 5,
      pointBorderWidth: 1,
      data: [55, 58, 62, 67, 58, 62, 65, 72],
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
        text: "Monitoramento do uso da rede da máquina 1",
        align: "center",
        fullSize: false,
        color: "#000",
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


// Funções de plotagem da KPI

let idMaquinas = []

function getMaquinas() {

  const elements = [sessionStorage.getItem('FK_EMPRESA'), sessionStorage.getItem('ID_ADMIN')]

  console.log("idAdmin " + elements[1])
  console.log("fkEmpresaServer " + elements[0])

  fetch("/medidas/carregarMaquinas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_adminServer: sessionStorage.getItem('ID_ADMIN'),
      fk_empresaServer: sessionStorage.getItem('FK_EMPRESA'),
    })
  }).then(function (response) {

    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

        if (sessionStorage.getItem("ID_MAQUINA_0") == null) {
          for (let index = 0; index < resposta.length; index++) {
            const maquinaAtual = resposta[index];
            const idMaquinaAtual = resposta[index].id_maquina;
            sessionStorage.setItem("ID_MAQUINA_" + resposta.indexOf(maquinaAtual), idMaquinaAtual)
          }
        } else {
          console.log("Máquinas já foram carregadas!")
        }
      });
      getKpiCpu();
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getKpiCpu() {
  console.log("NA FUNÇÃO DE KPI - CPU")

  fetch("/medidas/getKpiCpu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_adminServer: sessionStorage.getItem('ID_ADMIN'),
      fk_empresaServer: sessionStorage.getItem('FK_EMPRESA'),
      emailServer: sessionStorage.getItem('EMAIL_USUARIO'),
      id_maquina_Server: sessionStorage.getItem('ID_MAQUINA_0')
    })
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO entrar()!")

    if (resposta.ok) {
      console.log(resposta);

      resposta.json().then(json => {
        // Aqui precisamos utilizar o join para puxar certinho

      });

    } else {

    }
  }).catch(function (erro) {
    console.log(erro);
  })
}

function iniciar() {
  getMaquinas();
}

