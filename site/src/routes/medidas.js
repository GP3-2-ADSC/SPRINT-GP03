var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.post("/carregarMaquinaEspec", function (req, res) {
    medidaController.carregarMaquinaEspec(req, res);
});

router.post("/getKpiCpu", function (req, res) {
    medidaController.getKpiCpu(req, res);
})

module.exports = router;