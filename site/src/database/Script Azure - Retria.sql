-- Script da Azure
CREATE TABLE empresa (
    id_empresa INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_empresa),
    nome_empresa VARCHAR(45),
    cnpj CHAR(14),
    telefone_01 VARCHAR(11),
    telefone_02 VARCHAR(11),
    email VARCHAR(45),
    responsavel_empresa VARCHAR(45),
    fk_matriz INT DEFAULT NULL,
        FOREIGN KEY (fk_matriz) REFERENCES empresa(id_empresa)
);

CREATE TABLE endereco (
    id_endereco INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_endereco),
    cep CHAR(8),
    numero VARCHAR(8),
    complemento VARCHAR(45) NOT NULL,
    fk_empresa INT,
        FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE ocupacao (
    id_ocupacao INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_ocupacao),
    nome_ocupacao VARCHAR(45),
);  

INSERT INTO [dbo].[ocupacao] (nome_ocupacao) VALUES 
	('Engenheiro de Operações de TI'),
	('Engenheiro de NOC'),
	('Administrador de Sistemas'),
	('Administrador de Sistemas de Monitoramento'),
	('Analista de Operações de TI');

CREATE TABLE administrador (
    id_administrador INT IDENTITY(1,1) UNIQUE,
    nome_administrador VARCHAR(45),
    email_administrador VARCHAR(90),
        CONSTRAINT chkEmail CHECK (email_administrador LIKE '%@%.%' AND email_administrador NOT LIKE '@%' and email_administrador NOT LIKE '%.'), 
    senha_administrador VARCHAR(256),
    telefone_administrador VARCHAR(11),
    chave_seguranca_administrador VARCHAR(45),
    fk_ocupacao INT, 
        FOREIGN KEY (fk_ocupacao) REFERENCES ocupacao(id_ocupacao),
    fk_empresa INT,
        PRIMARY KEY (id_administrador, fk_empresa),
        UNIQUE (fk_empresa),
        FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE maquina_ultrassom (
    id_maquina INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_maquina),
    sistema_operacional VARCHAR(45),
    numero_serial_maquina VARCHAR(45),
    status_maquina VARCHAR(5) default 'false',
    status_conexao VARCHAR(45) 
        CONSTRAINT chkStatusConexao 
            CHECK (status_conexao IN ('Sucesso', 'Parcial', 'Erro')),
    fk_administrador INT,
        FOREIGN KEY (fk_administrador) REFERENCES administrador(id_administrador),
    fk_empresa INT,
        FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE especificacao_componente (
    id_especificacao_componente INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_especificacao_componente),
    tipo_componente VARCHAR(45),
    descricao_componente VARCHAR(255),
    nome_fabricante VARCHAR(45),
    numero_serial VARCHAR(45)
);

CREATE TABLE maquina_ultrassom_especificada (
    id_especificacao_componente_maquina INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_especificacao_componente_maquina),
    uso_maximo FLOAT,
    fk_maquina INT,
        FOREIGN KEY (fk_maquina) REFERENCES maquina_ultrassom(id_maquina),
    fk_especificacao_componente INT,
        FOREIGN KEY (fk_especificacao_componente) REFERENCES especificacao_componente(id_especificacao_componente)
);

CREATE TABLE metrica_componente (
    id_metrica_componente INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_metrica_componente),
    dt_metrica DATETIME,
    uso FLOAT,
    fk_especificacao_componente_maquina INT,
        FOREIGN KEY (fk_especificacao_componente_maquina) REFERENCES maquina_ultrassom_especificada(id_especificacao_componente_maquina)
);

CREATE TABLE tipo_alerta (
    id_tipo_alerta INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_tipo_alerta),
    nome_tipo_alerta VARCHAR(45),
    descricao_alerta VARCHAR(255)
);

INSERT INTO [dbo].[tipo_alerta] (nome_tipo_alerta, descricao_alerta) VALUES 
    ('Alerta', 'O uso do componente está se aproximando da zona de perigo de 70 a 80% do uso máximo aceitável. Isso pode gerar desgastes do componente, instabilidade e lentidão dos processos da sua máquina.'),
    ('Perigo', 'O uso do componente está de 80% a 90% do limite de consumo aceitável. A sua permanência pode acarretar na diminuição da sua eficiência e da sua vida útil.'),
    ('Crítico', 'O uso do componente está entre 90 e 100% do limite do consumo aceitável. Isso pode causar danos irreparáveis e falhas graves no sistema. Recomenda-se análise do componente e sua resolução imediata.');

CREATE TABLE alerta (
    id_alerta INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_alerta),
    dt_alerta DATETIME,
    fk_tipo_alerta INT,
        FOREIGN KEY (fk_tipo_alerta) REFERENCES tipo_alerta(id_tipo_alerta),    
    fk_metrica_componente INT,
        FOREIGN KEY (fk_metrica_componente) REFERENCES metrica_componente(id_metrica_componente)
);

CREATE TABLE webhook (
	id_web INT IDENTITY(1,1) UNIQUE,
	link VARCHAR(255)
);

INSERT INTO [dbo].[Webhook] VALUES 
('https://hooks.slack.com/services/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');



-- Comando de insert
insert into empresa (nome_empresa, cnpj, telefone_01, telefone_02, email, responsavel_empresa) values( 'Polmed Centro Médico & Ultrassom12', '14548758985879', '11985878562', '11985636987', 'polmedclinica@gmail.com', 'Carlos Barbosa');

 INSERT INTO administrador (
    nome_administrador, email_administrador, senha_administrador, 
    telefone_administrador, fk_ocupacao, 
    chave_seguranca_administrador, fk_empresa
    ) VALUES ('Lucas Silva', 'lucas@gmail.com', '123', '11985623014', 'aaaa',1 , 1);

-- Drop tables 
drop table [dbo].[alerta];
drop table [dbo].[tipo_alerta];
drop table [dbo].[metrica_componente];
drop table [dbo].[maquina_ultrassom_especificada];
drop table [dbo].[maquina_ultrassom];
drop table [dbo].[especificacao_componente];
drop table [dbo].[administrador];
drop table [dbo].[ocupacao];
drop table [dbo].[endereco];
drop table [dbo].[empresa];
drop table [dbo].[webhook];