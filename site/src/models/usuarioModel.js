var database = require("../database/config");

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM administrador WHERE email_administrador = '${email}' AND senha_administrador = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function cadastrarEndereco(cep, numero, complemento, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", cep, numero, complemento, fkEmpresa);

    var instrucao = `
        INSERT INTO endereco (cep,numero,complemento,fk_empresa) VALUES ('${cep}','${numero}','${complemento}', ${fkEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarAdmin(nomeAdmin, cargo, tel, email, senha, serialKey, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeAdmin, cargo, tel, email, senha, serialKey, fkEmpresa);

    var instrucao = `
        INSERT INTO administrador (nome_administrador,email_administrador,senha_administrador,telefone_administrador,chave_seguranca_administrador, fk_ocupacao, fk_empresa) VALUES ('${nomeAdmin}','${email}','${senha}','${tel}','${serialKey}', '${cargo}', ${fkEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nomeEmpresa, cnpj, telefone1, telefone2, email, responsavel) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeEmpresa, cnpj, telefone1, telefone2, email, responsavel);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO empresa (nome_empresa,cnpj,telefone_01,telefone_02, email, responsavel_empresa) VALUES ('${nomeEmpresa}','${cnpj}','${telefone1}','${telefone2}', '${email}','${responsavel}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function carregarFkempresa(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cnpj)
    var instrucao = `
    SELECT 
        id_empresa
    FROM
        empresa
    WHERE
        cnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getSerialKey(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email)
    var instrucao = `
    SELECT 
        chave_seguranca_administrador
    FROM
        administrador
    WHERE
        email_administrador = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getInformacaoEmpresa(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idEmpresa)
    var instrucao = `
    SELECT 
        *
    FROM
        empresa
    WHERE
        id_empresa = '${idEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getInformacaoAdministrador(idAdmin,idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idEmpresa)
    var instrucao = `
    SELECT 
        a.*,
        oc.nome_ocupacao as cargo
    FROM
        administrador as a
    join
        ocupacao as oc
    on
        a.fk_ocupacao = oc.id_ocupacao
    WHERE
        a.fk_empresa = '${idEmpresa}'
    and
        a.id_administrador = '${idAdmin}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function salvarAlteracaoEmpresa(idEmpresa,telefone_01,telefone_02,email) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        UPDATE empresa
        SET 
            telefone_01  = '${telefone_01}',
            telefone_02  = '${telefone_02}',
            email  = '${email}'
        WHERE
            id_empresa = ${idEmpresa}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        UPDATE empresa
        SET 
            telefone_01  = '${telefone_01}',
            telefone_02  = '${telefone_02}',
            email  = '${email}'
        WHERE
            id_empresa = ${idEmpresa}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvarAlteracaoAdmin(idAdmin,fkEmpresa,nomeAdmin,cargo,email,telefone,senha) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        UPDATE 
        administrador
        SET 
            nome_administrador  = '${nomeAdmin}',
            fk_ocupacao  = ${cargo},
            email_administrador  = '${email}',
            telefone_administrador  = '${telefone}',
            senha_administrador  = '${senha}'
        WHERE
            fk_empresa = ${fkEmpresa}
        and
            id_administrador = ${idAdmin}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        UPDATE 
        administrador
        SET 
            nome_administrador  = '${nomeAdmin}',
            fk_ocupacao  = ${cargo},
            email_administrador  = '${email}',
            telefone_administrador  = '${telefone}',
            senha_administrador  = '${senha}'
        WHERE
            fk_empresa = ${fkEmpresa}
        and
            id_administrador = ${idAdmin}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    entrar,
    cadastrar,
    cadastrarEndereco,
    cadastrarAdmin,
    carregarFkempresa,
    getSerialKey,
    listar,
    getInformacaoEmpresa,
    getInformacaoAdministrador,
    salvarAlteracaoEmpresa,
    salvarAlteracaoAdmin
};