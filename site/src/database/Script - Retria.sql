create database retria;

use retria;

create table empresa(
	id_empresa int auto_increment,
        primary key(id_empresa),
    nome_empresa varchar(45),
    cnpj char(14),
    telefone_01 varchar(11),
    telefone_02 varchar(11),
    email varchar(45),
    responsavel_empresa varchar(45),
    fk_matriz int default null,
    foreign key(fk_matriz) references empresa(id_empresa)
);
    
create table endereco(
	id_endereco int auto_increment,
        primary key (id_endereco),
    cep char(8),
    numero varchar(8),
    complemento varchar(45) not null,
    fk_empresa int,
        foreign key (fk_empresa) references empresa(id_empresa)
);

create table ocupacao (
    id_ocupacao int auto_increment,
        primary key (id_ocupacao),
    nome_ocupacao VARCHAR(45)
);

insert into ocupacao (nome_ocupacao) values 
	('Engenheiro de Operações de TI'),
	('Engenheiro de NOC'),
	('Administrador de Sistemas'),
	('Administrador de Sistemas de Monitoramento'),
	('Analista de Operações de TI');

create table administrador(
	id_administrador int auto_increment,
	nome_administrador varchar(45),
    email_administrador varchar(90),
        constraint chkEmail check (email_administrador like '%@%.%' and email_administrador not like '@%' and email_administrador not like '%.'), 
    senha_administrador varchar(256),
    telefone_administrador varchar(11),
    chave_seguranca_administrador varchar(45),
    fk_ocupacao int, 
        foreign key (fk_ocupacao) references ocupacao(id_ocupacao),
    fk_empresa int,
        primary key (id_administrador, fk_empresa),
        unique (fk_empresa),
        foreign key (fk_empresa) references empresa(id_empresa)
);

create table maquina_ultrassom(
	id_maquina int auto_increment,
        primary key (id_maquina),
    sistema_operacional varchar(45),
    numero_serial_maquina varchar(45),
    status_maquina varchar(5) default 'false',
    fk_administrador int,
        foreign key (fk_administrador) references administrador(id_administrador),
    fk_empresa int,
        foreign key (fk_empresa) references empresa(id_empresa)
);

create table especificacao_componente(
	id_especificacao_componente int auto_increment,
        primary key (id_especificacao_componente),
    tipo_componente varchar(45),
    descricao_componente VARCHAR(255),
    nome_fabricante varchar(45),
    numero_serial varchar(45)
);
    
create table maquina_ultrassom_especificada(
    id_especificacao_componente_maquina int AUTO_INCREMENT,
        primary key (id_especificacao_componente_maquina),
    uso_maximo double,
    fk_maquina int,
        foreign key (fk_maquina) references maquina_ultrassom(id_maquina),
    fk_especificacao_componente int,
        foreign key (fk_especificacao_componente) references especificacao_componente(id_especificacao_componente)
);

create table metrica_componente(
	id_metrica_componente int auto_increment,
        primary key (id_metrica_componente),
	dt_metrica datetime,
    uso double,
    fk_especificacao_componente_maquina int,
        foreign key (fk_especificacao_componente_maquina) references maquina_ultrassom_especificada(id_especificacao_componente_maquina)
);

create table tipo_alerta (
    id_tipo_alerta int auto_increment,
        primary key (id_tipo_alerta),
    nome_tipo_alerta varchar(45),
    descricao_alerta varchar(255)
);

insert into tipo_alerta (nome_tipo_alerta, descricao_alerta) values 
    ('Alerta', 'O uso do componente está se aproximando da zona de perigo de 70 a 80% do uso máximo aceitável. Isso pode gerar desgastes do componente, instabilidade e lentidão dos processos da sua máquina.'),
    ('Perigo', 'O uso do componente está de 80% a 90% do limite de consumo aceitável. A sua permanência pode acarretar na diminuição da sua eficiência e da sua vida útil.'),
    ('Crítico', 'O uso do componente está entre 90 e 100% do limite do consumo aceitável. Isso pode causar danos irreparáveis e falhas graves no sistema. Recomenda-se análise do componente e sua resolução imediata.');

create table alerta (
	id_alerta int auto_increment,
        primary key (id_alerta),
    dt_alerta datetime,
    fk_tipo_alerta int,
        foreign key (fk_tipo_alerta) references tipo_alerta(id_tipo_alerta),
    fk_metrica_componente int,
        foreign key (fk_metrica_componente) references metrica_componente(id_metrica_componente)
);


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

-- Comando de insert
 insert into administrador (nome_administrador, email_administrador, senha_administrador, telefone_administrador, fk_ocupacao, chave_seguranca_administrador, fk_empresa)values 
 ('Lucas Silva', 'lucas@gmail.com', '123', '11985623014', 'aaaa',1 , 1);

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