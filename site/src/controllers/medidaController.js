var medidaModel = require("../models/medidaModel");

function carregarMaquinaEspec(req, res) {
    let idMaquina = req.body.id_maquina_Server;
    let fkEmpresa = req.body.id_adminServer;
    let idAdmin = req.body.fk_empresaServer;

    if (idAdmin == null) {
        res.status(400).send("Seu idAdmin está undefined!");
    } else if (fkEmpresa == null) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else if (idMaquina == null) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else {

        medidaModel.carregarMaquinaEspec(fkEmpresa, idAdmin).then(function (resultado) {
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
    let idAdmin = req.body.id_adminServer;
    let fkEmpresa = req.body.fk_empresaServer;
    let email = req.body.emailServer;
    let idMaquina = req.body.id_maquina_Server;


    if (idAdmin == null) {
        res.status(400).send("Seu idAdmin está undefined!");
    } else if (fkEmpresa == null) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else if (email == null) {
        res.status(400).send("Seu email está undefined!");
    } else if (idMaquina == null) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else {
        console.log(`Recuperando medidas em tempo real`);

        medidaModel.getKpiCpu(idAdmin, fkEmpresa, email, idMaquina).then(function (resultado) {
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
    getKpiCpu

}