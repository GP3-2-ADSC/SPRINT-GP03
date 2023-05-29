create database IF NOT EXISTS retria;

use retria;

create table IF NOT EXISTS  empresa(
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
    
create table IF NOT EXISTS endereco(
	id_endereco int auto_increment,
        primary key (id_endereco),
    cep char(8),
    numero varchar(8),
    complemento varchar(45) not null,
    fk_empresa int,
        foreign key (fk_empresa) references empresa(id_empresa)
);

create table IF NOT EXISTS ocupacao (
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

create table IF NOT EXISTS administrador(
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

create table IF NOT EXISTS maquina_ultrassom(
	id_maquina int auto_increment,
        primary key (id_maquina),
    sistema_operacional varchar(45),
    numero_serial_maquina varchar(45),
    status_maquina varchar(5) default 'false',
    status_conexao varchar(45) 
        constraint chkStatus 
            check (status_conexao in ('Sucesso', 'Parcial', 'Erro')),
    fk_administrador int,
        foreign key (fk_administrador) references administrador(id_administrador),
    fk_empresa int,
        foreign key (fk_empresa) references empresa(id_empresa)
);

create table IF NOT EXISTS especificacao_componente(
	id_especificacao_componente int auto_increment,
        primary key (id_especificacao_componente),
    tipo_componente varchar(45),
    descricao_componente VARCHAR(255),
    nome_fabricante varchar(45),
    numero_serial varchar(45)
);
    
create table IF NOT EXISTS maquina_ultrassom_especificada(
    id_especificacao_componente_maquina int AUTO_INCREMENT,
        primary key (id_especificacao_componente_maquina),
    uso_maximo double,
    fk_maquina int,
        foreign key (fk_maquina) references maquina_ultrassom(id_maquina),
    fk_especificacao_componente int,
        foreign key (fk_especificacao_componente) references especificacao_componente(id_especificacao_componente)
);

create table IF NOT EXISTS metrica_componente(
	id_metrica_componente int auto_increment,
        primary key (id_metrica_componente),
	dt_metrica datetime,
    uso double,
    fk_especificacao_componente_maquina int,
        foreign key (fk_especificacao_componente_maquina) references maquina_ultrassom_especificada(id_especificacao_componente_maquina)
);

create table IF NOT EXISTS tipo_alerta (
    id_tipo_alerta int auto_increment,
        primary key (id_tipo_alerta),
    nome_tipo_alerta varchar(45),
    descricao_alerta varchar(255)
);

insert into tipo_alerta (nome_tipo_alerta, descricao_alerta) values 
    ('Alerta', 'O uso do componente está se aproximando da zona de perigo de 70 a 80% do uso máximo aceitável. Isso pode gerar desgastes do componente, instabilidade e lentidão dos processos da sua máquina.'),
    ('Perigo', 'O uso do componente está de 80% a 90% do limite de consumo aceitável. A sua permanência pode acarretar na diminuição da sua eficiência e da sua vida útil.'),
    ('Crítico', 'O uso do componente está entre 90 e 100% do limite do consumo aceitável. Isso pode causar danos irreparáveis e falhas graves no sistema. Recomenda-se análise do componente e sua resolução imediata.');

create table IF NOT EXISTS alerta (
	id_alerta int auto_increment,
        primary key (id_alerta),
    dt_alerta datetime,
    fk_tipo_alerta int,
        foreign key (fk_tipo_alerta) references tipo_alerta(id_tipo_alerta),
    fk_metrica_componente int,
        foreign key (fk_metrica_componente) references metrica_componente(id_metrica_componente)
);

create table IF NOT EXISTS webhook (
	id_web int auto_increment primary key,
	link varchar(255)
);
