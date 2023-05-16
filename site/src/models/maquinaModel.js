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

function getKpiCpu(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
	        TOP(1) *
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
        order by dt_metrica DESC;`;
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

function getKpiRam(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
	        TOP(1) *
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
        order by dt_metrica DESC;`;
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

function getKpiDisco(idMaquina,qtdDeDiscos) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
	        TOP(2) *
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
        order by dt_metrica DESC;`;
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

function getQtdDisco(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
    select 
        COUNT(*) as quantidade
    from 
        especificacao_componente 
    where 
        id_especificacao_componente 
    in 
        ( select mu.fk_especificacao_componente 
    from 
        maquina_ultrassom as m 
    join 
        maquina_ultrassom_especificada as mu 
    on 
        m.id_maquina = mu.fk_maquina 
    where 
        mu.fk_maquina = ${idMaquina}
        )
    and
        tipo_componente = 'DISCO' ;
                `;
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
    getKpiCpu,
    getKpiRam,
    getQtdDisco,
    getKpiDisco
}
