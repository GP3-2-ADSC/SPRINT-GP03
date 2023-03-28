// ChartJS da KPI da CPU
const data_cpu = {
  labels: ["Disponível", "Utilizando"],
  datasets: [
    {
      data: [100 - 72, 72],
      backgroundColor: ["#d0d0d0", "#FFCD56"],
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
        display: false
      }
    }
  }
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
        display: false
      }
    }
  }
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
        display: false
      }
    }
  }
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
        display: false
      }
    }
  }
};

const myChart_kpi_rede = new Chart(
  document.getElementById("kpi-chart-rede"),
  config_kpi_rede
);



// ChartJS do uso da CPU
// Criando estrutura para plotar gráfico - labels
let labels_geral = [
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
let data_geral = {
  labels: labels_geral,
  datasets: [
    {
      label: "Uso da CPU (%)",
      backgroundColor: "#E0211B",
      borderColor: "#E0211B",
      pointRadius: 5,
      pointBorderWidth: 1,
      data: [10, 25, 32, 24, 15, 56, 27, 38],
    },
    {
      label: "Uso ideal",
      backgroundColor: "rgba(112, 255, 99, 0.25)",
    },
  ],
};

// Linha horizontal de parâmetro
yAxes: [
  {
    display: true,
    gridLines: {
      color: "#fff",
    },
    ticks: {
      fontColor: "black",
    },
  },
];

let config_geral = {
  type: "line",
  data: data_geral,
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
            yMin: 23,
            yMax: 26,
            xMin: 0,
            xMax: 18,
            backgroundColor: "rgba(112, 255, 99, 0.25)",
          },
        },
      },
      title: {
        display: true,
        text: "Monitoramento do uso da CPU da máquina  1",
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

let myChart_geral = new Chart(
  document.getElementById("chart-geral-uso"),
  config_geral
);

// TESTE WIP - Integração da ferramenta de Help Desk com o Site (Chat Box)
//<![CDATA[
var ttChatLoaderS = document.createElement("script");
document.tomticketChatLoaderScriptVersion = 2;
ttChatLoaderS.src =
  "https://ondata.tomticket.com/scripts-chat/chat.min.js" +
  "?id=EP59760" +
  "&account=3824640P16112022101310" +
  "&autoOpen=0" +
  "&hideWhenOffline=0" +
  "&d=ondata" +
  "&ts=" +
  new Date().getTime() +
  "&ref=" +
  encodeURIComponent(document.URL);
document.body.appendChild(ttChatLoaderS);
//]]>
