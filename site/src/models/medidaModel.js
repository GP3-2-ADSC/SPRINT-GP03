var database = require("../database/config");

function carregarMaquinaEspec(fkEmpresa, idAdmin, idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
            *
        FROM
            maquina_ultrassom
        WHERE
            fk_administrador = ${idAdmin}  AND fk_empresa = ${fkEmpresa} `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
            *
        FROM
           mu.maquina_ultrassom
        WHERE
            fk_administrador = ${idAdmin} AND fk_empresa = ${fkEmpresa} AND id_maquina = ${idMaquina}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getKpiCpu(idAdmin, fkEmpresa, email, idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
            *
        FROM
            maquina_ultrassom
        WHERE
            fk_administrador = ${idAdmin}  AND fk_empresa = ${fkEmpresa} `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
            *
        FROM
            maquina_ultrassom
        WHERE
            fk_administrador = ${idAdmin}  AND fk_empresa = ${fkEmpresa} `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    carregarMaquinaEspec,
    getKpiCpu
}
