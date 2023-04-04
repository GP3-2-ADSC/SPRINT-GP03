function mostrarEsconderDiv() {
    const details_1 = document.getElementById("details-1");
    
    const p_more_details = document.getElementById("p-more-details");
    const p_less_details = document.getElementById("p-less-details");

    const arrow_down_1 = document.getElementById("arrow-down-1");
    const arrow_up_1 = document.getElementById("arrow-up-1");

    if (p_more_details.style.display !== "none") {
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

function mostrarEsconderDiv2() {
    const details_2 = document.getElementById("details-2");
    
    const p_more_details = document.getElementById("p-more-details-2");
    const p_less_details = document.getElementById("p-less-details-2");

    const arrow_down_2 = document.getElementById("arrow-down-2");
    const arrow_up_2 = document.getElementById("arrow-up-2");

    if (p_more_details.style.display !== "none") {
        details_2.style.display = "flex";

        p_more_details.style.display = "none";
        p_less_details.style.display = "flex";

        arrow_down_2.style.display = "none";
        arrow_up_2.style.display = "flex";
    } else {
        details_2.style.display = "none";

        p_more_details.style.display = "flex";
        p_less_details.style.display = "none";

        arrow_down_2.style.display = "flex";
        arrow_up_2.style.display = "none";
    }
}

function mostrarEsconderDiv3() {
    const details_3 = document.getElementById("details-3");
    
    const p_more_details = document.getElementById("p-more-details-3");
    const p_less_details = document.getElementById("p-less-details-3");

    const arrow_down_3 = document.getElementById("arrow-down-3");
    const arrow_up_3 = document.getElementById("arrow-up-3");

    if (p_more_details.style.display !== "none") {
        details_3.style.display = "flex";

        p_more_details.style.display = "none";
        p_less_details.style.display = "flex";

        arrow_down_3.style.display = "none";
        arrow_up_3.style.display = "flex";
    } else {
        details_3.style.display = "none";

        p_more_details.style.display = "flex";
        p_less_details.style.display = "none";

        arrow_down_3.style.display = "flex";
        arrow_up_3.style.display = "none";
    }
}

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