function mostrarEsconderDiv() {
    var div = document.getElementById("container-button-details");
    if (div.style.display === "none") {
        div.style.display = "flex";

        document.getElementById("details-button").innerHTML = "Menos detalhes"
        document.getElementById("arrow-down").style.display = "none";
        document.getElementById("arrow-up").style.display = "flex"
    }
    else {
        div.style.display = "none";
        document.getElementById("details-button").innerHTML = "Ver detalhes"
        document.getElementById("arrow-up").style.display = "none";
        document.getElementById("arrow-down").style.display = "flex";
    }
}

function mostrarEsconderDiv2(){
    var div2 = document.getElementById("container-button-details2");
    if (div2.style.display === "none") {
        div2.style.display = "flex";

        document.getElementById("details-button2").innerHTML = "Menos detalhes"
        document.getElementById("arrow-down2").style.display = "none";
        document.getElementById("arrow-up2").style.display = "flex"
    }
    else {
        div2.style.display = "none";
        document.getElementById("details-button2").innerHTML = "Ver detalhes"
        document.getElementById("arrow-up2").style.display = "none";
        document.getElementById("arrow-down2").style.display = "flex";
    }
}

function mostrarEsconderDiv3(){
    var div3 = document.getElementById("container-button-details3");
    if (div3.style.display === "none") {
        div3.style.display = "flex";

        document.getElementById("details-button3").innerHTML = "Menos detalhes"
        document.getElementById("arrow-down3").style.display = "none";
        document.getElementById("arrow-up3").style.display = "flex"
    }
    else {
        div3.style.display = "none";
        document.getElementById("details-button3").innerHTML = "Ver detalhes"
        document.getElementById("arrow-up3").style.display = "none";
        document.getElementById("arrow-down3").style.display = "flex";
    }
}





