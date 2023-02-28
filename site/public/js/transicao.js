window.addEventListener('scroll', () => {
    const background = document.getElementById("background")
    let posicoes = background.getBoundingClientRect();

    if (posicoes.top <= 220) {
        console.log("Na condicional");
        const element = document.getElementsByClassName("link");
        for (let index = 0; index < element.length; index++) {
            element[index].classList.add("after");
        }
        for (let index = 0; index < element.length; index++) {
            element[index].classList.remove("link");
        }
    } else {
        console.log("Na condicional de volta");
        const element = document.getElementsByClassName("after");
        for (let index = 0; index < element.length; index++) {
            element[index].classList.add("link");
        }
        for (let index = 0; index < element.length; index++) {
            element[index].classList.remove("after");
        }
    }

})