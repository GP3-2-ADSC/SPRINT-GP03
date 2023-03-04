window.addEventListener('scroll', () => {
    const background = document.getElementById("background")
    let posicoes = background.getBoundingClientRect();

    if (posicoes.top <= 70) {

        const element = document.getElementsByClassName("link");
        for (let index = 0; index < element.length; index++) {
            element[index].classList.add("after");
        }
        for (let index = 0; index < element.length; index++) {
            element[index].classList.remove("link");
        }
    } else {

        const element = document.getElementsByClassName("after");
        for (let index = 0; index < element.length; index++) {
            element[index].classList.add("link");
        }
        for (let index = 0; index < element.length; index++) {
            element[index].classList.remove("after");
        }
    }

})

window.addEventListener('resize', (event) => {

    const element = document.getElementById("header")
    console.log(element);
    if (window.innerWidth < 1000) {
        element.classList.add("row-reverse");
        element.classList.remove("row");

    } else {
        element.classList.add("row");
        element.classList.remove("row-reverse");

    }
})

function redimensionar() {
    const element = document.getElementById("header")
    console.log(element);
    if (window.innerWidth < 1201) {
        element.classList.add("row-reverse");
        element.classList.remove("row");

    } else {
        element.classList.add("row");
        element.classList.remove("row-reverse");
    }
}

function openClose(n) {
    if (n == 1) {
        document.getElementById("myNav").style.width = "100%";
        document.getElementById("myNav").style.height = "40%";
    } else {
        document.getElementById("myNav").style.width = "100%";
        document.getElementById("myNav").style.height = "0%";
    }
}