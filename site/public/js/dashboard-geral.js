function iniciar() {
// setInterval(function () {
  console.log("Entrando na função iniciar()");
  exibirTotalSinalizacoes();
// }, 2000);
}

function exibirTotalSinalizacoes() {
  totalSinalizacoes = document.getElementById("total-sinalizacoes");
  idEmpresa = sessionStorage.FK_EMPRESA;
  console.log(`ID_EMPRESA -> ${idEmpresa}`);

  console.log("Entrando na função obter COUNT de sinalizações");
  
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
