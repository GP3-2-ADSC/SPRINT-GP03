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


function getKpiCpu(req, res) {
    let idMaquina = req.params.idMaquina;

    if (idMaquina == null) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else {
        console.log(`Recuperando medidas em tempo real`);

        maquinaModel.getKpiCpu(idMaquina).then(function (resultado) {
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

function getKpiRam(req, res) {
    let idMaquina = req.params.idMaquina;

    if (idMaquina == null) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else {
        console.log(`Recuperando medidas em tempo real`);

        maquinaModel.getKpiRam(idMaquina).then(function (resultado) {
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

function getQtdDisco(req, res) {
    let idMaquina = req.params.idMaquina;

    if (idMaquina == null) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else {
        console.log(`Recuperando medidas em tempo real`);

        maquinaModel.getQtdDisco(idMaquina).then(function (resultado) {
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

function getKpiDisco(req, res) {
    let idMaquina = req.body.idMaquinaServer;
    let qtdDeDiscos= req.body.qtdDeDiscosServer

    if (idMaquina == null) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else if (qtdDeDiscos == null) {
        res.status(400).send("Sua quantidade de discos está undefined!");
    } else {
        console.log(`Recuperando medidas em tempo real`);

        maquinaModel.getKpiDisco(idMaquina,qtdDeDiscos).then(function (resultado) {
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

module.exports = {
    carregarMaquinaEspec,
    getKpiCpu,
    getKpiRam,
    getQtdDisco,
    getKpiDisco
}