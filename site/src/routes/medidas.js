var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/carregarMaquinas/:elements", function (req, res) {
    medidaController.carregarMaquinas(req, res);
});

router.put("/getKpiCpu", function (req, res) {
    medidaController.getKpiCpu(req, res);
})

module.exports = router;