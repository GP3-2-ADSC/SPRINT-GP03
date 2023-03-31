create database retria;
use retria;
create table empresa(
	idEmpresa int auto_increment,
    nomeEmpresa varchar(45),
    cnpj char(14),
    telefone01 varchar(11),
    telefone02 varchar(11),
    email varchar(45),
    responsavelEmpresa varchar(45),
    fkMatriz int,
    primary key(idEmpresa, fkMatriz),
    foreign key(fkMatriz) references empresa(idEmpresa));
    
create table endereco(
	idEndereco int auto_increment,
    cep char(8),
    logradouro varchar(100),
    numero varchar(8),
    bairro varchar(45),
    cidade varchar(40),
    complemento varchar(45) NOT NULL,
    fkEmpresa int,
    primary key (idEndereco),
    foreign key (fkEmpresa) references empresa(idEmpresa)
);

create table administrador(
	idAdministrador int auto_increment,
	nomeAdministrador varchar(45),
    emailAdministrador varchar(90),
	senhaAdministrador varchar(256),
    telefoneAdministrador varchar(11),
    cargo varchar(45),
    chaveSegurancaAdministrador varchar(45),
    fkEmpresa int,
    primary key (idAdministrador, fkEmpresa),
    foreign key (fkEmpresa) references empresa(idEmpresa)
);
ALTER TABLE `administrador` 
ADD CONSTRAINT `user.email_validation` 
    CHECK (`emailAdministrador` REGEXP "^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]*?[a-zA-Z0-9._-]?@[a-zA-Z0-9][a-zA-Z0-9._
    -]*?[a-zA-Z0-9]?\\.[a-zA-Z]{2,63}$");

create table maquinaUltrassonografica(
	idMaquina int auto_increment,
    fornecedor varchar(45),
    numeroSerial int,
    tipoMaquina varchar(45),
    setor varchar(45),
    andar int,
    fkAdministrador int,
    fkEmpresa int,
    primary key(idMaquina, fkAdministrador, fkEmpresa),
    foreign key (fkAdministrador) references administrador(idAdministrador),
    foreign key (fkEmpresa) references empresa(idEmpresa)
);

create table especificacaoComponente(
	idEspecificacaoComponente int auto_increment,
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
    primary key (idEspecificacaoComponente)
);
    
create table maquinaUtrassonomatograficaEspecificada(
	fkMaquina int,
    fkAdministrador int,
    fkEmpresa int,
    fkEspecificacaoComponente int,
    primary key (fkMaquina, fkAdministrador, fkEmpresa, fkEspecificacaoComponente),
    foreign key (fkMaquina) references maquinaUltrassonografica(idMaquina),
    foreign key (fkAdministrador) references administrador(idAdministrador),
    foreign key (fkEmpresa) references empresa(idEmpresa),
    foreign key (fkEspecificacaoComponente) references especificacaoComponente(idEspecificacaoComponente)
);

create table metricasComponentes(
	idMetricasComponentes int auto_increment,
    fkMaquina int,
    fkAdministrador int,
    fkEmpresa int,
    fkEspecificacaoComponente int,
    dtMetrica datetime,
    usoCpu Decimal(4,2),
    usoMemoria Decimal(4,2),
    usoDisco Decimal(4,2),
    usoRede Decimal(4,2),
    primary key (idMetricasComponentes,fkMaquina,fkAdministrador,fkEmpresa,fkEspecificacaoComponente),
    foreign key (fkMaquina) references maquinaUltrassonografica(idMaquina),
    foreign key (fkAdministrador) references administrador(idAdministrador),
    foreign key (fkEmpresa) references empresa(idEmpresa),
    foreign key (fkEspecificacaoComponente) references especificacaoComponente(idEspecificacaoComponente)
);

create table alerta(
	idAlerta int auto_increment,
    tipoAlerta varchar(100),
    fkMetricasComponentes int,
    fkMaquina int,
    fkAdministrador int, 
    fkEmpresa int, 
    fkEspecificacaoComponente int,
    primary key (idAlerta, tipoAlerta, fkMetricasComponentes,fkMaquina,fkAdministrador,fkEmpresa,fkEspecificacaoComponente),
	foreign key (fkMaquina) references maquinaUltrassonografica(idMaquina),
    foreign key (fkAdministrador) references administrador(idAdministrador),
    foreign key (fkEmpresa) references empresa(idEmpresa),
    foreign key (fkEspecificacaoComponente) references especificacaoComponente(idEspecificacaoComponente),
    foreign key (fkMetricasComponentes) references  metricasComponentes(idmetricasComponentes)
);

-- Script AZURE

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
    fkMaquina int unique,
    fkAdministrador int unique,
    fkEmpresa int unique,
    fkEspecificacaoComponente int unique,
    primary key (fkMaquina, fkAdministrador, fkEmpresa, fkEspecificacaoComponente),
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
 
 select * from empresa;
 select * from endereco;

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';



  




