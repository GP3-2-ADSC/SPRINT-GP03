var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.post("/carregarMaquinaEspec", function (req, res) {
    maquinaController.carregarMaquinaEspec(req, res);
});

router.post("/carregarMaquinaUltra", function (req, res) {
    maquinaController.carregarMaquinaUltra(req, res);
});

router.put("/bloquearMaquina", function (req, res) {
    maquinaController.bloquearMaquina(req, res);
});

router.put("/autorizarMaquina", function (req, res) {
    maquinaController.autorizarMaquina(req, res);
});

router.get("/obterDadosIniciaisCpu/:idMaquina", function (req, res) {
    maquinaController.obterDadosIniciaisCpu(req, res);
});

router.get("/atualizarGraficoCpu/:idMaquina", function (req, res) {
    maquinaController.atualizarGraficoCpu(req, res);
});

router.get("/obterDadosIniciaisRam/:idMaquina", function (req, res) {
    maquinaController.obterDadosIniciaisRam(req, res);
});

router.get("/atualizarGraficoRam/:idMaquina", function (req, res) {
    maquinaController.atualizarGraficoRam(req, res);
});

router.get("/obterDadosIniciaisDisco/:idMaquina", function (req, res) {
    maquinaController.obterDadosIniciaisDisco(req, res);
});

router.get("/atualizarGraficoDisco/:idMaquina", function (req, res) {
    maquinaController.atualizarGraficoDisco(req, res);
});

router.get("/obterDadosIniciaisRede/:idMaquina", function (req, res) {
    maquinaController.obterDadosIniciaisRede(req, res);
});

router.get("/atualizarGraficoRede/:idMaquina", function (req, res) {
    maquinaController.atualizarGraficoRede(req, res);
});

router.get("/obterAlertas/:idMaquina", function (req, res) {
    maquinaController.obterAlertas(req, res);
});

router.get("/especificacao-componentes/:idMaquina", function (req, res) {
    maquinaController.obterEspecificacaoComponentes(req, res);
});

router.get("/exibirTotalSinalizacoes/:idEmpresa", function (req, res) {
    maquinaController.exibirTotalSinalizacoes(req, res);
});

router.get("/obterAlertasGerais/:idEmpresa", function (req, res) {
    maquinaController.obterAlertasGerais(req, res);
});

router.get("/obterMaquinasAtivas/:idEmpresa", function (req, res) {
    maquinaController.obterMaquinasAtivas(req, res);
});

module.exports = router;