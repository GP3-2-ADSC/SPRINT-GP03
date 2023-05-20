var maquinaModel = require("../models/maquinaModel");

function carregarMaquinaEspec(req, res) {
    let fkEmpresa = req.body.id_adminServer;
    let idAdmin = req.body.fk_empresaServer;

    if (idAdmin == null) {
        res.status(400).send("Seu idAdmin está undefined!");
    } else if (fkEmpresa == null) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {

        maquinaModel.carregarMaquinaEspec(fkEmpresa, idAdmin).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as máquinas do adm!", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function obterDadosIniciaisCpu(req, res) {
    console.log("NA CONTROLLER DO OBTER DADOS");
    let idMaquina = req.params.idMaquina;

    if (idMaquina == null) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else {
        console.log(`Recuperando medidas em tempo real`);

        maquinaModel.obterDadosIniciaisCpu(idMaquina).then(function (resultado) {

            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function atualizarGraficoCpu(req, res) {
    console.log("NA CONTROLLER DO ATUALIZAR DADOS");
    let idMaquina = req.params.idMaquina;
    console.log(idMaquina);
    if (idMaquina == null) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else {
        console.log(`Recuperando medidas em tempo real`);

        maquinaModel.atualizarGraficoCpu(idMaquina).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function obterDadosIniciaisRam(req, res) {
    console.log("NA CONTROLLER DO OBTER DADOS");
    let idMaquina = req.params.idMaquina;

    if (idMaquina == null) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else {
        console.log(`Recuperando medidas em tempo real`);

        maquinaModel.obterDadosIniciaisRam(idMaquina).then(function (resultado) {

            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function atualizarGraficoRam(req, res) {
    console.log("NA CONTROLLER DO ATUALIZAR DADOS");
    let idMaquina = req.params.idMaquina;
    console.log(idMaquina);
    if (idMaquina == null) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else {
        console.log(`Recuperando medidas em tempo real`);

        maquinaModel.atualizarGraficoRam(idMaquina).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function obterDadosIniciaisDisco(req, res) {
    console.log("NA CONTROLLER DO OBTER DADOS");
    let idMaquina = req.params.idMaquina;

    if (idMaquina == null) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else {
        console.log(`Recuperando medidas em tempo real`);

        maquinaModel.obterDadosIniciaisDisco(idMaquina).then(function (resultado) {

            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function atualizarGraficoDisco(req, res) {
    console.log("NA CONTROLLER DO ATUALIZAR DADOS");
    let idMaquina = req.params.idMaquina;
    console.log(idMaquina);
    if (idMaquina == null) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else {
        console.log(`Recuperando medidas em tempo real`);
        maquinaModel.atualizarGraficoDisco(idMaquina).then(function (resultado) {

            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function obterAlertas(req, res) {
    console.log("NA CONTROLLER DO OBTER ALERTAS");
    let idMaquina = req.params.idMaquina;

    if (idMaquina == null) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else {
        console.log(`Recuperando medidas em tempo real`);

        maquinaModel.obterAlertas(idMaquina).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function obterEspecificacaoComponentes(req, res) {
    console.log("ENTREI NA *CONSOLE* DO ESPECIFICAÇÃO COMPONENTES");
    console.log("ID DA MÁQUINA: " + idMaquina);
    console.log(`--------------------------------------------------`);

    var idMaquina = req.params.idMaquina;
    var idEspecificacaoComponente = req.params.idEspecificacaoComponente;

    maquinaModel.obterEspecificacaoComponentes(idMaquina, idEspecificacaoComponente).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



module.exports = {
    carregarMaquinaEspec,
    obterDadosIniciaisCpu,
    obterDadosIniciaisRam,
    obterDadosIniciaisDisco,
    obterEspecificacaoComponentes,
    obterAlertas,
    atualizarGraficoCpu,
    atualizarGraficoRam,
    atualizarGraficoDisco

}