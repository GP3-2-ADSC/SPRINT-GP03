var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.post("/carregarMaquinaEspec", function (req, res) {
    maquinaController.carregarMaquinaEspec(req, res);
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
    maquinaController.obterDadosIniciaisRam(req, res);
});

router.get("/atualizarGraficoDisco/:idMaquina", function (req, res) {
    maquinaController.atualizarGraficoRam(req, res);
});

router.get("/obterAlertas/:idMaquina", function (req, res) {
    maquinaController.obterAlertas(req, res);
});

router.get("/especificacao-componentes/:idMaquina", function (req, res) {
    maquinaController.obterEspecificacaoComponentes(req, res);
});

router.get("/exibirTotalSinalizacoes/:idMaquina", function (req, res) {
    maquinaController.exibirTotalSinalizacoes(req, res);
});

module.exports = router;