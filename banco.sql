-- Criar a tabela produtos

create table equipe (
codigo serial not null primary key, 
nome varchar(50) not null, 
fundacao integer not null, 
esporte varchar(50) not null,
estado varchar(50) not null);

-- inserir alguns registros
insert into equipe (nome, fundacao, esporte, estado) values ('gremio', 1903, 'futebol', 'rs'), ('internacional', 1909, 'futebol', 'rs');
