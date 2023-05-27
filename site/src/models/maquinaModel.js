var database = require("../database/config");

function carregarMaquinaEspec(fkEmpresa, idAdmin) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
    select 
        m.*
    from 
        maquina_ultrassom as m 
    where 
        fk_administrador = ${idAdmin}
    and
        fk_empresa = ${fkEmpresa}
    and
        status_maquina = 'true'`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
    select 
        m.*
    from 
        maquina_ultrassom as m 
    where 
        fk_administrador = ${idAdmin}
    and
        fk_empresa = ${fkEmpresa}
    and
        status_maquina = 'true'`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function carregarMaquinaUltra(fkEmpresa, idAdmin) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
        m.id_maquina,
        m.sistema_operacional,
        m.numero_serial_maquina,
        m.status_maquina,
        adm.nome_administrador
    FROM
        administrador AS adm
            JOIN
        maquina_ultrassom AS m ON id_administrador = fk_administrador
    WHERE
        m.fk_administrador = ${fkEmpresa}
            AND m.fk_empresa = ${idAdmin}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        m.id_maquina,
        m.sistema_operacional,
        m.numero_serial_maquina,
        m.status_maquina,
        adm.nome_administrador
    FROM
        administrador AS adm
            JOIN
        maquina_ultrassom AS m ON id_administrador = fk_administrador
    WHERE
        m.fk_administrador = ${fkEmpresa}
            AND m.fk_empresa = ${idAdmin}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function bloquearMaquina(fkEmpresa, idAdmin, idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        UPDATE maquina_ultrassom 
        SET 
            status_maquina = 'false'
        WHERE
            id_maquina = ${idMaquina} AND fk_administrador = ${idAdmin}
                AND fk_empresa = ${fkEmpresa}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        UPDATE maquina_ultrassom 
        SET 
            status_maquina = 'false'
        WHERE
            id_maquina = ${idMaquina} AND fk_administrador = ${idAdmin}
                AND fk_empresa = ${fkEmpresa}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autorizarMaquina(fkEmpresa, idAdmin, idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        UPDATE maquina_ultrassom 
        SET 
            status_maquina = 'true'
        WHERE
            id_maquina = ${idMaquina} AND fk_administrador = ${idAdmin}
                AND fk_empresa = ${fkEmpresa}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        UPDATE maquina_ultrassom 
        SET 
            status_maquina = 'false'
        WHERE
            id_maquina = ${idMaquina} AND fk_administrador = ${idAdmin}
                AND fk_empresa = ${fkEmpresa}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function obterDadosIniciaisCpu(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
        top(8) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'CPU'))
     order by dt_metrica desc;
                `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        top(8) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'CPU'))
     order by dt_metrica desc; `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarGraficoCpu(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
         top(1) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'CPU'))
     order by dt_metrica desc;
                `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        top(1) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'CPU'))
     order by dt_metrica desc; `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDadosIniciaisRam(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
        top(8) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'RAM'))
     order by dt_metrica desc;
                `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        top(8) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'RAM'))
     order by dt_metrica desc; `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarGraficoRam(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
        top(1) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'RAM'))
     order by dt_metrica desc;
                `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        top(1) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'RAM'))
     order by dt_metrica desc; `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDadosIniciaisDisco(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
        top(8) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'DISCO'))
     order by dt_metrica desc;
                `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        top(8) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'DISCO'))
     order by dt_metrica desc; `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarGraficoDisco(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
        top(1) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'DISCO'))
     order by dt_metrica desc;
                `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        top(1) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'DISCO'))
     order by dt_metrica desc; `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDadosIniciaisRede(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
        top(8) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'REDE'))
     order by dt_metrica desc;
                `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        top(8) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'REDE'))
     order by dt_metrica desc; `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function atualizarGraficoRede(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
        top(1) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'REDE'))
     order by dt_metrica desc;
                `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        top(1) id_metrica_componente,
         uso,
         FORMAT(dt_metrica, 'dd/MM') AS dia,
         FORMAT(dt_metrica, 'HH:mm:ss') AS horario
     FROM 
         metrica_componente
     WHERE 
         fk_especificacao_componente_maquina 
     in 
         (select 
         mu.id_especificacao_componente_maquina
     from 
         maquina_ultrassom_especificada as mu
     where 
         mu.fk_maquina = ${idMaquina}
     and
         fk_especificacao_componente
     in 
         (select 
         e.id_especificacao_componente
     from 
         especificacao_componente as e
     where 
         e.id_especificacao_componente 
     in 
         ( select mu.fk_especificacao_componente 
     from 
         maquina_ultrassom as m 
     join 
         maquina_ultrassom_especificada as mu 
     on 
         m.id_maquina = mu.fk_maquina 
     where 
         mu.fk_maquina = ${idMaquina})
     and 
         e.tipo_componente = 'REDE'))
     order by dt_metrica desc; `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function obterAlertas(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
        ta.id_tipo_alerta,
        FORMAT(a.dt_alerta, 'dd/MM HH:mm:ss') AS dia,
        mc.uso,
        e.tipo_componente
    FROM
        tipo_alerta AS ta
            JOIN
        alerta AS a ON a.fk_tipo_alerta = ta.id_tipo_alerta
            JOIN
        metrica_componente AS mc ON a.fk_metrica_componente = mc.id_metrica_componente
            JOIN
        maquina_ultrassom_especificada AS mu ON mc.fk_especificacao_componente_maquina = mu.id_especificacao_componente_maquina
            JOIN
        especificacao_componente AS e ON mu.fk_especificacao_componente = e.id_especificacao_componente
    WHERE
        mu.fk_maquina = ${idMaquina}
    ORDER BY dia DESC;
                `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        ta.id_tipo_alerta,
        FORMAT(a.dt_alerta, 'dd/MM HH:mm:ss') AS dia,
        mc.uso,
        e.tipo_componente
    FROM
        tipo_alerta AS ta
            JOIN
        alerta AS a ON a.fk_tipo_alerta = ta.id_tipo_alerta
            JOIN
        metrica_componente AS mc ON a.fk_metrica_componente = mc.id_metrica_componente
            JOIN
        maquina_ultrassom_especificada AS mu ON mc.fk_especificacao_componente_maquina = mu.id_especificacao_componente_maquina
            JOIN
        especificacao_componente AS e ON mu.fk_especificacao_componente = e.id_especificacao_componente
    WHERE
        mu.fk_maquina = ${idMaquina}
    ORDER BY dia DESC;
    `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterEspecificacaoComponentes(idMaquina) {
    console.log("ENTREI NA **MODEL** DO ESPECIFICAÇÃO COMPONENTES");
    console.log(`--------------------------------------------------`);

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT espec.descricao_componente, maq.sistema_operacional, maq.numero_serial_maquina
            FROM maquina_ultrassom AS maq
                JOIN maquina_ultrassom_especificada AS maq_espec 
                    ON maq.id_maquina = maq_espec.fk_maquina
                JOIN especificacao_componente AS espec 
                    ON maq_espec.fk_especificacao_componente = espec.id_especificacao_componente
        WHERE maq.id_maquina = ${idMaquina};
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT espec.descricao_componente, maq.sistema_operacional, maq.numero_serial_maquina
            FROM maquina_ultrassom AS maq
                JOIN maquina_ultrassom_especificada AS maq_espec 
                    ON maq.id_maquina = maq_espec.fk_maquina
                JOIN especificacao_componente AS espec 
                    ON maq_espec.fk_especificacao_componente = espec.id_especificacao_componente
        WHERE maq.id_maquina = ${idMaquina};
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function exibirTotalSinalizacoes(idEmpresa) {
    console.log("ENTREI NA **MODEL** DO exibirTotalSinalizacoes");
    console.log(`--------------------------------------------------`);

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
            COUNT(id_alerta) AS total_alertas
        FROM
            alerta AS al
                JOIN
            metrica_componente AS mc ON mc.id_metrica_componente = al.fk_metrica_componente
                JOIN
            maquina_ultrassom_especificada AS mue ON mc.fk_especificacao_componente_maquina = mue.id_especificacao_componente_maquina
                JOIN
            especificacao_componente AS ec ON mue.fk_especificacao_componente = ec.id_especificacao_componente
                JOIN
            maquina_ultrassom AS mu ON mue.fk_maquina = mu.id_maquina
                JOIN
            administrador AS adm ON adm.id_administrador = mu.fk_administrador
                JOIN
            empresa AS emp ON emp.id_empresa = adm.fk_empresa
        WHERE
            emp.id_empresa = ${idEmpresa}
                AND 
            CAST(al.dt_alerta AS DATE) = CAST(GETDATE() AS DATE);   
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
            COUNT(id_alerta) AS total_alertas
        FROM
            alerta AS al
                JOIN
            metrica_componente AS mc ON mc.id_metrica_componente = al.fk_metrica_componente
                JOIN
            maquina_ultrassom_especificada AS mue ON mc.fk_especificacao_componente_maquina = mue.id_especificacao_componente_maquina
                JOIN
            especificacao_componente AS ec ON mue.fk_especificacao_componente = ec.id_especificacao_componente
                JOIN
            maquina_ultrassom AS mu ON mue.fk_maquina = mu.id_maquina
                JOIN
            administrador AS adm ON adm.id_administrador = mu.fk_administrador
                JOIN
            empresa AS emp ON emp.id_empresa = adm.fk_empresa
        WHERE
            emp.id_empresa = ${idEmpresa}
                AND 
            CAST(al.dt_alerta AS DATE) = CAST(GETDATE() AS DATE);        
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterAlertasGerais(idEmpresa) {
    console.log("ENTREI NA **MODEL** DO obterAlertasGerais");
    console.log("ID DA EMPRESA: " + idEmpresa);
    console.log(`--------------------------------------------------`);

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT mu.id_maquina,
            CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM maquina_ultrassom AS mu_inner
                    JOIN maquina_ultrassom_especificada AS mue_inner ON mu_inner.id_maquina = mue_inner.fk_maquina
                    JOIN especificacao_componente AS ec ON mue_inner.fk_especificacao_componente = ec.id_especificacao_componente
                    JOIN metrica_componente AS mc ON mue_inner.id_especificacao_componente_maquina = mc.fk_especificacao_componente_maquina
                    JOIN alerta AS al ON mc.id_metrica_componente = al.fk_metrica_componente
                    WHERE mu_inner.id_maquina = mu.id_maquina
                        AND al.fk_tipo_alerta = 3
                ) THEN 'maquinaCritica'
                WHEN EXISTS (
                    SELECT 1
                    FROM maquina_ultrassom AS mu_inner
                    JOIN maquina_ultrassom_especificada AS mue_inner ON mu_inner.id_maquina = mue_inner.fk_maquina
                    JOIN especificacao_componente AS ec ON mue_inner.fk_especificacao_componente = ec.id_especificacao_componente
                    JOIN metrica_componente AS mc ON mue_inner.id_especificacao_componente_maquina = mc.fk_especificacao_componente_maquina
                    JOIN alerta AS al ON mc.id_metrica_componente = al.fk_metrica_componente
                    WHERE mu_inner.id_maquina = mu.id_maquina
                        AND al.fk_tipo_alerta = 2
                ) THEN 'maquinaPerigo'
                WHEN EXISTS (
                    SELECT 1
                    FROM maquina_ultrassom AS mu_inner
                    JOIN maquina_ultrassom_especificada AS mue_inner ON mu_inner.id_maquina = mue_inner.fk_maquina
                    JOIN especificacao_componente AS ec ON mue_inner.fk_especificacao_componente = ec.id_especificacao_componente
                    JOIN metrica_componente AS mc ON mue_inner.id_especificacao_componente_maquina = mc.fk_especificacao_componente_maquina
                    JOIN alerta AS al ON mc.id_metrica_componente = al.fk_metrica_componente
                    WHERE mu_inner.id_maquina = mu.id_maquina
                        AND al.fk_tipo_alerta = 1
                ) THEN 'maquinaAlerta'
                ELSE ''
            END AS status,
            (
                SELECT CONCAT(ec.tipo_componente, ',') AS [text()]
                FROM maquina_ultrassom AS mu_inner
                JOIN maquina_ultrassom_especificada AS mue_inner ON mu_inner.id_maquina = mue_inner.fk_maquina
                JOIN especificacao_componente AS ec ON mue_inner.fk_especificacao_componente = ec.id_especificacao_componente
                WHERE mu_inner.id_maquina = mu.id_maquina
                FOR XML PATH('')
            ) AS tipos_componente,
            (
                SELECT CONCAT(CAST(mc.uso AS VARCHAR(10)), ',') AS [text()]
                FROM maquina_ultrassom AS mu_inner
                JOIN maquina_ultrassom_especificada AS mue_inner ON mu_inner.id_maquina = mue_inner.fk_maquina
                JOIN especificacao_componente AS ec ON mue_inner.fk_especificacao_componente = ec.id_especificacao_componente
                JOIN (
                    SELECT fk_especificacao_componente_maquina, MAX(dt_metrica) AS max_dt_metrica
                    FROM metrica_componente
                    GROUP BY fk_especificacao_componente_maquina
                ) AS max_mc ON mue_inner.id_especificacao_componente_maquina = max_mc.fk_especificacao_componente_maquina
                JOIN metrica_componente AS mc ON max_mc.fk_especificacao_componente_maquina = mc.fk_especificacao_componente_maquina
                    AND max_mc.max_dt_metrica = mc.dt_metrica
                WHERE mu_inner.id_maquina = mu.id_maquina
                FOR XML PATH('')
            ) AS usos,
            (
                SELECT CONCAT(CONVERT(VARCHAR(19), mc.dt_metrica, 120), ',') AS [text()]
                FROM maquina_ultrassom AS mu_inner
                JOIN maquina_ultrassom_especificada AS mue_inner ON mu_inner.id_maquina = mue_inner.fk_maquina
                JOIN especificacao_componente AS ec ON mue_inner.fk_especificacao_componente = ec.id_especificacao_componente
                JOIN (
                    SELECT fk_especificacao_componente_maquina, MAX(dt_metrica) AS max_dt_metrica
                    FROM metrica_componente
                    GROUP BY fk_especificacao_componente_maquina
                ) AS max_mc ON mue_inner.id_especificacao_componente_maquina = max_mc.fk_especificacao_componente_maquina
                JOIN metrica_componente AS mc ON max_mc.fk_especificacao_componente_maquina = mc.fk_especificacao_componente_maquina
                    AND max_mc.max_dt_metrica = mc.dt_metrica
                WHERE mu_inner.id_maquina = mu.id_maquina
                FOR XML PATH('')
            ) AS datas_metrica
        FROM maquina_ultrassom AS mu
        JOIN maquina_ultrassom_especificada AS mue ON mu.id_maquina = mue.fk_maquina
        JOIN especificacao_componente AS ec ON mue.fk_especificacao_componente = ec.id_especificacao_componente
        JOIN (
            SELECT fk_especificacao_componente_maquina, MAX(dt_metrica) AS max_dt_metrica
            FROM metrica_componente
            GROUP BY fk_especificacao_componente_maquina
        ) AS max_mc ON mue.id_especificacao_componente_maquina = max_mc.fk_especificacao_componente_maquina
        JOIN metrica_componente AS mc ON max_mc.fk_especificacao_componente_maquina = mc.fk_especificacao_componente_maquina
            AND max_mc.max_dt_metrica = mc.dt_metrica
        JOIN maquina_ultrassom AS mu_empresa ON mu.id_maquina = mu_empresa.id_maquina
        JOIN empresa AS emp ON mu_empresa.fk_empresa = emp.id_empresa
        JOIN alerta AS al ON mc.id_metrica_componente = al.fk_metrica_componente
        WHERE mu.id_maquina IN (
            SELECT id_maquina
            FROM (
                SELECT mu.id_maquina, ec.tipo_componente, mc.uso,
                    ROW_NUMBER() OVER (PARTITION BY mu.id_maquina, ec.tipo_componente ORDER BY mc.dt_metrica DESC) AS row_num
                FROM maquina_ultrassom AS mu
                JOIN maquina_ultrassom_especificada AS mue ON mu.id_maquina = mue.fk_maquina
                JOIN especificacao_componente AS ec ON mue.fk_especificacao_componente = ec.id_especificacao_componente
                JOIN metrica_componente AS mc ON mue.id_especificacao_componente_maquina = mc.fk_especificacao_componente_maquina
                JOIN alerta AS al ON mc.id_metrica_componente = al.fk_metrica_componente
                WHERE CAST(al.dt_alerta AS DATETIME) >= '2023-05-25'
            ) AS subquery
            WHERE row_num = 1
        )
        AND emp.id_empresa = ${idEmpresa}
        GROUP BY mu.id_maquina;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT mu.id_maquina,
            CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM maquina_ultrassom AS mu_inner
                    JOIN maquina_ultrassom_especificada AS mue_inner ON mu_inner.id_maquina = mue_inner.fk_maquina
                    JOIN especificacao_componente AS ec ON mue_inner.fk_especificacao_componente = ec.id_especificacao_componente
                    JOIN metrica_componente AS mc ON mue_inner.id_especificacao_componente_maquina = mc.fk_especificacao_componente_maquina
                    JOIN alerta AS al ON mc.id_metrica_componente = al.fk_metrica_componente
                    WHERE mu_inner.id_maquina = mu.id_maquina
                        AND al.fk_tipo_alerta = 3
                ) THEN 'maquinaCritica'
                WHEN EXISTS (
                    SELECT 1
                    FROM maquina_ultrassom AS mu_inner
                    JOIN maquina_ultrassom_especificada AS mue_inner ON mu_inner.id_maquina = mue_inner.fk_maquina
                    JOIN especificacao_componente AS ec ON mue_inner.fk_especificacao_componente = ec.id_especificacao_componente
                    JOIN metrica_componente AS mc ON mue_inner.id_especificacao_componente_maquina = mc.fk_especificacao_componente_maquina
                    JOIN alerta AS al ON mc.id_metrica_componente = al.fk_metrica_componente
                    WHERE mu_inner.id_maquina = mu.id_maquina
                        AND al.fk_tipo_alerta = 2
                ) THEN 'maquinaPerigo'
                WHEN EXISTS (
                    SELECT 1
                    FROM maquina_ultrassom AS mu_inner
                    JOIN maquina_ultrassom_especificada AS mue_inner ON mu_inner.id_maquina = mue_inner.fk_maquina
                    JOIN especificacao_componente AS ec ON mue_inner.fk_especificacao_componente = ec.id_especificacao_componente
                    JOIN metrica_componente AS mc ON mue_inner.id_especificacao_componente_maquina = mc.fk_especificacao_componente_maquina
                    JOIN alerta AS al ON mc.id_metrica_componente = al.fk_metrica_componente
                    WHERE mu_inner.id_maquina = mu.id_maquina
                        AND al.fk_tipo_alerta = 1
                ) THEN 'maquinaAlerta'
                ELSE ''
            END AS status,
            (
                SELECT CONCAT(ec.tipo_componente, ',') AS [text()]
                FROM maquina_ultrassom AS mu_inner
                JOIN maquina_ultrassom_especificada AS mue_inner ON mu_inner.id_maquina = mue_inner.fk_maquina
                JOIN especificacao_componente AS ec ON mue_inner.fk_especificacao_componente = ec.id_especificacao_componente
                WHERE mu_inner.id_maquina = mu.id_maquina
                FOR XML PATH('')
            ) AS tipos_componente,
            (
                SELECT CONCAT(CAST(mc.uso AS VARCHAR(10)), ',') AS [text()]
                FROM maquina_ultrassom AS mu_inner
                JOIN maquina_ultrassom_especificada AS mue_inner ON mu_inner.id_maquina = mue_inner.fk_maquina
                JOIN especificacao_componente AS ec ON mue_inner.fk_especificacao_componente = ec.id_especificacao_componente
                JOIN (
                    SELECT fk_especificacao_componente_maquina, MAX(dt_metrica) AS max_dt_metrica
                    FROM metrica_componente
                    GROUP BY fk_especificacao_componente_maquina
                ) AS max_mc ON mue_inner.id_especificacao_componente_maquina = max_mc.fk_especificacao_componente_maquina
                JOIN metrica_componente AS mc ON max_mc.fk_especificacao_componente_maquina = mc.fk_especificacao_componente_maquina
                    AND max_mc.max_dt_metrica = mc.dt_metrica
                WHERE mu_inner.id_maquina = mu.id_maquina
                FOR XML PATH('')
            ) AS usos,
            (
                SELECT CONCAT(CONVERT(VARCHAR(19), mc.dt_metrica, 120), ',') AS [text()]
                FROM maquina_ultrassom AS mu_inner
                JOIN maquina_ultrassom_especificada AS mue_inner ON mu_inner.id_maquina = mue_inner.fk_maquina
                JOIN especificacao_componente AS ec ON mue_inner.fk_especificacao_componente = ec.id_especificacao_componente
                JOIN (
                    SELECT fk_especificacao_componente_maquina, MAX(dt_metrica) AS max_dt_metrica
                    FROM metrica_componente
                    GROUP BY fk_especificacao_componente_maquina
                ) AS max_mc ON mue_inner.id_especificacao_componente_maquina = max_mc.fk_especificacao_componente_maquina
                JOIN metrica_componente AS mc ON max_mc.fk_especificacao_componente_maquina = mc.fk_especificacao_componente_maquina
                    AND max_mc.max_dt_metrica = mc.dt_metrica
                WHERE mu_inner.id_maquina = mu.id_maquina
                FOR XML PATH('')
            ) AS datas_metrica
        FROM maquina_ultrassom AS mu
        JOIN maquina_ultrassom_especificada AS mue ON mu.id_maquina = mue.fk_maquina
        JOIN especificacao_componente AS ec ON mue.fk_especificacao_componente = ec.id_especificacao_componente
        JOIN (
            SELECT fk_especificacao_componente_maquina, MAX(dt_metrica) AS max_dt_metrica
            FROM metrica_componente
            GROUP BY fk_especificacao_componente_maquina
        ) AS max_mc ON mue.id_especificacao_componente_maquina = max_mc.fk_especificacao_componente_maquina
        JOIN metrica_componente AS mc ON max_mc.fk_especificacao_componente_maquina = mc.fk_especificacao_componente_maquina
            AND max_mc.max_dt_metrica = mc.dt_metrica
        JOIN maquina_ultrassom AS mu_empresa ON mu.id_maquina = mu_empresa.id_maquina
        JOIN empresa AS emp ON mu_empresa.fk_empresa = emp.id_empresa
        JOIN alerta AS al ON mc.id_metrica_componente = al.fk_metrica_componente
        WHERE mu.id_maquina IN (
            SELECT id_maquina
            FROM (
                SELECT mu.id_maquina, ec.tipo_componente, mc.uso,
                    ROW_NUMBER() OVER (PARTITION BY mu.id_maquina, ec.tipo_componente ORDER BY mc.dt_metrica DESC) AS row_num
                FROM maquina_ultrassom AS mu
                JOIN maquina_ultrassom_especificada AS mue ON mu.id_maquina = mue.fk_maquina
                JOIN especificacao_componente AS ec ON mue.fk_especificacao_componente = ec.id_especificacao_componente
                JOIN metrica_componente AS mc ON mue.id_especificacao_componente_maquina = mc.fk_especificacao_componente_maquina
                JOIN alerta AS al ON mc.id_metrica_componente = al.fk_metrica_componente
                WHERE CAST(al.dt_alerta AS DATETIME) >= '2023-05-25'
            ) AS subquery
            WHERE row_num = 1
        )
        AND emp.id_empresa = ${idEmpresa}
        GROUP BY mu.id_maquina;
    `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterMaquinasAtivas(idEmpresa) {
    console.log("ENTREI NA **MODEL** do obterMaquinasAtivas");
    console.log("ID DA EMPRESA: " + idEmpresa);
    console.log(`--------------------------------------------------`);

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
            COUNT(*) AS tot
            FROM maquina_ultrassom  
                WHERE status_maquina = 'false' AND fk_empresa = ${idEmpresa}
        
        UNION
        
        SELECT 
            COUNT(*) AS tot
            FROM maquina_ultrassom
        WHERE fk_empresa = ${idEmpresa};
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
            COUNT(*)
            FROM maquina_ultrassom  
                WHERE status_maquina = 'false' AND fk_empresa = ${idEmpresa}
        
        UNION
        
        SELECT 
            COUNT(*)
            FROM maquina_ultrassom
        WHERE fk_empresa = ${idEmpresa};
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    carregarMaquinaEspec,
    carregarMaquinaUltra,
    obterDadosIniciaisCpu,
    obterDadosIniciaisRam,
    obterDadosIniciaisDisco,
    obterEspecificacaoComponentes,
    obterDadosIniciaisRede,
    obterAlertas,
    atualizarGraficoCpu,
    atualizarGraficoRam,
    atualizarGraficoDisco,
    atualizarGraficoRede,
    bloquearMaquina,
    autorizarMaquina,
    exibirTotalSinalizacoes,
    obterAlertasGerais,
    obterMaquinasAtivas
}
