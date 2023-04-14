
function pegarEndereco() {
    var cep = document.getElementById('in_cep')
    var script = document.createElement('script')
    console.log(cep)
    script.src = 'https://viacep.com.br/ws/' + cep.value + '/json/?callback=retornarEndereco';
    // script.src = `https://viacep.com.br/ws/${cep.value}/json/?callback=retornarEndereco`;

    document.body.appendChild(script);
}

function retornarEndereco(endereco) {
    console.log(endereco)
    var logradouro = document.getElementById('in_logradouro')
    var bairro = document.getElementById('in_bairro')
    var cidade = document.getElementById('in_cidade')
    var estado = document.getElementById('in_estado')
    var complemento = document.getElementById('in_complemento')
    logradouro.value = (endereco.logradouro);
    bairro.value = (endereco.bairro);
    cidade.value = (endereco.localidade);
    estado.value = (endereco.uf);
    complemento.value = complemento.value == ""?"Não possui":(endereco.complemento);

}
