create database retria;

use retria;

create table empresa(
	id_empresa int auto_increment,
    nome_mpresa varchar(45),
    cnpj char(14),
    telefone_01 varchar(11),
    telefone_02 varchar(11),
    email varchar(45),
    senha varchar(256),
    responsavel_empresa varchar(45),
    fk_matriz int default null,
    primary key(id_empresa),
    foreign key(fk_matriz) references empresa(id_empresa)
);
    
create table endereco(
	id_endereco int auto_increment,
    cep char(8),
    numero varchar(8),
    complemento varchar(45) NOT NULL,
    fk_empresa int,
    primary key (id_endereco),
    foreign key (fk_empresa) references empresa(id_empresa)
);

create table administrador(
	id_administrador int auto_increment,
	nome_administrador varchar(45),
    email_administrador varchar(90),
    senha_administrador varchar(256),
    telefone_administrador varchar(11),
    ocupacao varchar(45),
    chave_seguranca_administrador varchar(45),
    fk_empresa int,
    primary key (id_administrador, fk_empresa),
    unique (fk_empresa),
    foreign key (fk_empresa) references empresa(id_empresa)
);
ALTER TABLE `administrador` 
ADD CONSTRAINT `user.email_validation` 
    CHECK (`email_administrador` REGEXP "^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]*?[a-zA-Z0-9._-]?@[a-zA-Z0-9][a-zA-Z0-9._
    -]*?[a-zA-Z0-9]?\\.[a-zA-Z]{2,63}$");

create table maquina_ultrassom(
	id_maquina int auto_increment,
    nome_fornecedor varchar(45),
    tipo_maquina varchar(45),
    sistema_operacional varchar(45),
    setor varchar(45),
    andar int,
    fk_administrador int,
    fk_empresa int,
    primary key(id_maquina, fk_administrador, fk_empresa),
    foreign key (fk_administrador) references administrador(id_administrador),
    foreign key (fk_empresa) references empresa(id_empresa)
);

create table especificacao_componente(
	id_especificacao_componente int auto_increment,
    tipo varchar(45),
    nome_fabricante varchar(45),
    primary key (id_especificacao_componente)
);
    
create table maquina_ultrassom_especificada(
    id_especificacao_componente_maquina int AUTO_INCREMENT,
    numero_serial varchar(45),
    uso_maximo double,
    frequencia_maxima double,
    fk_maquina int,
    fk_administrador int,
    fk_empresa int,
    fk_especificacao_componente int,
    primary key (id_especificacao_componente_maquina, fk_maquina, fk_administrador, fk_empresa, fk_especificacao_componente),
    foreign key (fk_maquina) references maquina_ultrassom(id_maquina),
    foreign key (fk_administrador) references administrador(id_administrador),
    foreign key (fk_empresa) references empresa(id_empresa),
    foreign key (fk_especificacao_componente) references especificacao_componente(id_especificacao_componente)
);

create table metrica_componente(
	id_metrica_componente int auto_increment,
	dt_metrica datetime,
    uso double,
    frequencia double,
    fk_maquina int,
    fk_administrador int,
    fk_empresa int,
    fk_especificacao_componente int,
    primary key (id_metrica_componente,fk_maquina,fk_administrador,fk_empresa,fk_especificacao_componente),
    foreign key (fk_maquina) references maquina_ultrassom(id_maquina),
    foreign key (fk_administrador) references administrador(id_administrador),
    foreign key (fk_empresa) references empresa(id_empresa),
    foreign key (fk_especificacao_componente) references especificacao_componente(id_especificacao_componente)
);

create table alerta(
	id_alerta int auto_increment,
    dt_alerta datetime,
    tipo_alerta varchar(255),
    fk_metrica_componente int,
    fk_maquina int,
    fk_administrador int, 
    fk_empresa int, 
    fk_especificacao_componente int,
    primary key (id_alerta, tipo_alerta, fk_metrica_componente,fk_maquina,fk_administrador,fk_empresa,fk_especificacao_componente),
	foreign key (fk_maquina) references maquina_ultrassom(id_maquina),
    foreign key (fk_administrador) references administrador(id_administrador),
    foreign key (fk_empresa) references empresa(id_empresa),
    foreign key (fk_especificacao_componente) references especificacao_componente(id_especificacao_componente),
    foreign key (fk_metrica_componente) references  metrica_componente(id_metrica_componente)
);

-- Script AZURE
/*
create table empresa(
	idEmpresa int identity(1,1) unique,
    nomeEmpresa varchar(45),
    cnpj char(14),
    telefone01 varchar(11),
    telefone02 varchar(11),
    email varchar(45),
    senha varchar(256),
    responsavelEmpresa varchar(45),
    fkMatriz int unique,
    constraint fk_Matriz foreign key(fkMatriz) references empresa(idEmpresa)
);
alter table [dbo].[empresa] add constraint fk_Matriz foreign key(fkMatriz) 
references empresa(idEmpresa);

create table endereco(
	idEndereco int identity(1,1) unique,
    cep char(8),
    logradouro varchar(100),
    numero varchar(8),
    bairro varchar(45),
    cidade varchar(40),
    complemento varchar(45),
    fkEmpresa int,
    foreign key (fkEmpresa) references empresa(idEmpresa)
);

create table administrador(
	idAdministrador int identity(1,1) unique,
	nomeAdministrador varchar(45),
    emailAdministrador varchar(90),
	senhaAdministrador varchar(256),
    telefoneAdministrador varchar(11),
    cargo varchar(45),
    chaveSegurancaAdministrador varchar(45),
    fkEmpresa int,
    foreign key (fkEmpresa) references empresa(idEmpresa)
);
alter table [dbo].[administrador] add constraint chk_email check (emailAdministrador like '%_@__%.__%');

create table maquinaUltrassonografica(
    idMaquina int identity(1,1) unique,
    fornecedor varchar(45),
    numeroSerial int,
    tipoMaquina varchar(45),
    setor varchar(45),
    andar int,
    fkAdministrador int unique,
    fkEmpresa int unique,
    foreign key (fkAdministrador) references administrador(idAdministrador),
    foreign key (fkEmpresa) references empresa(idEmpresa)
);

create table especificacaoComponente(
    idEspecificacaoComponente int identity(1,1) unique,
    sistemaOperacional Varchar(45),
    modeloCpu varchar(80),
    fabricanteCpu varchar(40),
    modeloMemoria varchar(50),
    fabricanteMemoria varchar(50),
    modeloDisco varchar(50),
    fabricanteDisco varchar(40),
    serialNumberCpu int,
    serialNumberDisco int,
    serialNumberMemoria int,
);

create table maquinaUtrassonomatograficaEspecificada(
	idEspecificacaoComponenteMaquina int unique,
    fkMaquina int unique,
    fkAdministrador int unique,
    fkEmpresa int unique,
    fkEspecificacaoComponente int unique,
    primary key (fkMaquina, fkAdministrador, fkEmpresa, fkEspecificacaoComponente, idEspecificacaoComponenteMaquina),
    foreign key (fkMaquina) references maquinaUltrassonografica(idMaquina),
    foreign key (fkAdministrador) references administrador(idAdministrador),
    foreign key (fkEmpresa) references empresa(idEmpresa),
    foreign key (fkEspecificacaoComponente) references especificacaoComponente(idEspecificacaoComponente)
);

create table metricasComponentes(
    idMetricasComponentes int identity(1,1) unique,
    fkMaquina int unique,
    fkAdministrador int unique,
    fkEmpresa int unique,
    fkEspecificacaoComponente int unique,
    dtMetrica datetime,
    usoCpu Decimal(4,2),
    usoMemoria Decimal(4,2),
    usoDisco Decimal(4,2),
    usoRede Decimal(4,2),
    foreign key (fkMaquina) references maquinaUltrassonografica(idMaquina),
    foreign key (fkAdministrador) references administrador(idAdministrador),
    foreign key (fkEmpresa) references empresa(idEmpresa),
    foreign key (fkEspecificacaoComponente) references especificacaoComponente(idEspecificacaoComponente)
);

create table alerta(
    idAlerta int identity(1,1) unique,
    tipoAlerta varchar(100),
    fkMetricasComponentes int unique,
    fkMaquina int unique,
    fkAdministrador int unique, 
    fkEmpresa int unique, 
    fkEspecificacaoComponente int unique,
    foreign key (fkMaquina) references maquinaUltrassonografica(idMaquina),
    foreign key (fkAdministrador) references administrador(idAdministrador),
    foreign key (fkEmpresa) references empresa(idEmpresa),
    foreign key (fkEspecificacaoComponente) references especificacaoComponente(idEspecificacaoComponente),
    foreign key (fkMetricasComponentes) references  metricasComponentes(idmetricasComponentes)
);
 
 alter table empresa modify column fkmatriz int default null;
  
 select * from empresa;
 select * from endereco;
 select * from administrador;
 
 SELECT 
    emailAdministrador
FROM
    administrador
WHERE
    emailAdministrador = 'resende@adm.com';

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
*/