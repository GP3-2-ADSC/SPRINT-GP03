// ChartJS da KPI da CPU
const data_grafico1 = {
  labels: ["Rede disponível", "Uso da rede"],
  datasets: [
    {
      data: [100 - 72, 72],
      backgroundColor: ["#d0d0d0", "#F44336"],
      borderColor: "#b8b8b8",
      hoverOffset: 4,
      cutout: "50%",
    },
  ],
};

const config_grafico1= {
  type: "doughnut",
  data: data_grafico1,
  options: {
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

const myChart_kpi1 = new Chart(
  document.getElementById("grafico1"),
  config_grafico1
);



const data_grafico2 = {
    labels: ["RAM disponível", "Uso da RAM"],
    datasets: [
      {
        data: [34, 100 - 34],
        backgroundColor: ["#d0d0d0", "#F44336"],
        borderColor: "#b8b8b8",
        hoverOffset: 4,
        cutout: "50%",
      },
    ],
  };

  const config_grafico2 = {
    type: "doughnut",
    data: data_grafico2,
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };
  
  const myChart_kpi2 = new Chart(
    document.getElementById("grafico2"),
    config_grafico2
  );

  

  const data_grafico3 = {
    labels: ["CPU disponível", "Uso da CPU"],
    datasets: [
      {
        data: [20,92],
        backgroundColor: ["#d0d0d0", "#F44336"],
        borderColor: "#b8b8b8",
        hoverOffset: 4,
        cutout: "50%",
      },
    ],
  };
  
  const config_grafico3 = {
    type: "doughnut",
    data: data_grafico3,
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };
  
  const myChart_kpi3 = new Chart(
    document.getElementById("grafico3"),
    config_grafico3
  );


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
