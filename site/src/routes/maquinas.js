var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.post("/carregarMaquinaEspec", function (req, res) {
    maquinaController.carregarMaquinaEspec(req, res);
});

router.get("/getKpiCpu/:idMaquina", function (req, res) {
    maquinaController.getKpiCpu(req, res);
});

router.get("/getKpiRam/:idMaquina", function (req, res) {
    maquinaController.getKpiRam(req, res);
});

router.get("/getQtdDisco/:idMaquina", function (req, res) {
    maquinaController.getQtdDisco(req, res);
});


router.post("/getKpiDisco", function (req, res) {
    maquinaController.getKpiDisco(req, res);
});


module.exports = router;