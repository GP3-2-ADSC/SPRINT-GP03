let indice = 1
slideAtual(indice)

function nextSlide(n) {
    slideAtual(indice += n)
}

function slideAtual(n) {
    let slides = document.querySelectorAll(".slide")

    if (n > slides.length) {
        indice = 1
    }

    if (n < 1) {
        indice = slides.length
    }

    for (let c = 0; c < slides.length; c++) {
        slides[c].classList.remove("proximo-slide")
    }

    slides[indice - 1].classList.add("proximo-slide")

}