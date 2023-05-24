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
        fk_empresa = ${fkEmpresa}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
    select 
        m.*
    from 
        maquina_ultrassom as m 
    where 
        fk_administrador = ${idAdmin}
    and
        fk_empresa = ${fkEmpresa}`;
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
    console.log("ID DA MÁQUINA: " + idMaquina);
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

module.exports = {
    carregarMaquinaEspec,
    obterDadosIniciaisCpu,
    obterDadosIniciaisRam,
    obterDadosIniciaisDisco,
    obterEspecificacaoComponentes,
    obterDadosIniciaisRede,
    obterAlertas,
    atualizarGraficoCpu,
    atualizarGraficoRam,
    atualizarGraficoDisco,
    atualizarGraficoRede
}
