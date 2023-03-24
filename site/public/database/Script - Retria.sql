create database retria;
use retria;
create table empresa(
	idEmpresa int auto_increment,
    nomeEmpresa varchar(45),
    cnpj char(14),
    telefone01 varchar(11),
    telefone02 varchar(11),
    email varchar(45),
    senha varchar(256),
    qtdMaquinas int,
    resposavelEmpresa varchar(45),
    fkMatriz int,
    primary key(idEmpresa, fkMatriz),
    foreign key(fkMatriz) references empresa(idEmpresa));
    
create table endereco(
	idEndereco int auto_increment,
    cep char(8),
    complemento varchar(45),
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



    




