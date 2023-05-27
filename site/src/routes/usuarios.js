var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/carregarFkempresa/:cnpjVar", function (req, res) {
    usuarioController.carregarFkempresa(req, res);
});

router.get("/getSerialKey/:emailAdm", function (req, res) {
    usuarioController.getSerialKey(req, res);
});

router.get("/getInformacaoEmpresa/:idEmpresa", function (req, res) {
    usuarioController.getInformacaoEmpresa(req, res);
});

router.get("/getInformacaoAdministrador/:idAdmin/:idEmpresa", function (req, res) {
    usuarioController.getInformacaoAdministrador(req, res);
});

router.put("/salvarAlteracaoEmpresa", function (req, res) {
    usuarioController.salvarAlteracaoEmpresa(req, res);
});

router.put("/salvarAlteracaoAdmin", function (req, res) {
    usuarioController.salvarAlteracaoAdmin(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarEndereco", function (req, res) {
    usuarioController.cadastrarEndereco(req, res);
})

router.post("/cadastrarAdmin", function (req, res) {
    usuarioController.cadastrarAdmin(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

module.exports = router;