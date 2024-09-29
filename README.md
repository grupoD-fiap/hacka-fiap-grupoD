## Hackthon Fiap - Curso Coding & Tech Journey From User to Creator / Pós tech - 2CTJT

Grupo D

Integrantes:

André Luiz Araújo Lemes - RM 352826 - andrelzalemes@gmail.com

Eduardo Cardoso Mendes - RM 352837 - educar.mendes@gmail.com

Nilton Soares Pinheiro - RM 352784 - nil1932003@gmail.com

# EduLearn - Plataforma de Aprendizado Digital

EduLearn é uma plataforma dedicada ao aprendizado digital que visa transformar a experiência educacional de professores e alunos, centralizando o gerenciamento de vídeos educacionais.

## Índice

- [Contexto do Problema](#contexto-do-problema)
- [Objetivo do Sistema](#objetivo-do-sistema)
- [Requisitos Funcionais](#requisitos-funcionais)
- [Requisitos Não Funcionais](#requisitos-não-funcionais)
- [User Stories](#user-stories)
- [Critérios de Avaliação do Projeto](#critérios-de-avaliação-do-projeto)
- [Documentação do Projeto](#documenta%C3%A7%C3%A3o-do-projeto)
- [Usuário de Desenvolvimento](#usuário-de-desenvolvimento)
- [Execução do Projeto](#execução-do-projeto)
- [Vídeo demonstrativo do projeto](#v%C3%ADdeo-demonstrativo-do-projeto).

## Contexto do Problema

Professores enfrentam dificuldades em gerenciar seus vídeos educacionais, distribuídos em diferentes plataformas, sem controle centralizado. Alunos têm dificuldade em encontrar vídeos específicos de seus professores, comprometendo a continuidade do aprendizado.

## Objetivo do Sistema

Criar uma plataforma onde professores possam cadastrar, editar e excluir vídeos educacionais de forma centralizada, enquanto alunos possam acessar conteúdos específicos de seus professores.

## Requisitos Funcionais

1. **Cadastro do Professor**
   - Cadastro de informações: Nome, CPF, E-mail e Senha.

2. **Autenticação do Professor**
   - Login via E-mail e Senha.

3. **Gerenciamento de Vídeos do Professor**
   - Funções CRUD para vídeos educacionais.

4. **Cadastro do Aluno**
   - Cadastro de informações: Nome, CPF, E-mail, Senha e seleção do professor vinculado.

5. **Autenticação do Aluno**
   - Login via E-mail e Senha.

6. **Visualização de Vídeos pelo Aluno**
   - Exibição de vídeos cadastrados pelo professor vinculado.

## Requisitos Não Funcionais

1. **Escalabilidade e Performance**
   - Suporte a múltiplos acessos simultâneos.

2. **Segurança**
   - Proteção das informações de login e gerenciamento de conteúdo.

3. **Conformidade com Boas Práticas**
   - Padrões arquiteturais como MVC.

## User Stories

Este documento descreve as principais User Stories para o desenvolvimento da plataforma EduLearn. Cada história de usuário representa uma funcionalidade essencial para professores e alunos.

### 1. Cadastro de Professor

**Descrição:**  
Como professor, desejo me cadastrar na plataforma para gerenciar meus vídeos educacionais.

**Critérios de Aceitação:**
- Validação de todos os campos obrigatórios.
- Armazenamento seguro das informações no banco de dados.

### 2. Autenticação de Professor

**Descrição:**  
Como professor, desejo fazer login para acessar a plataforma e gerenciar meus vídeos.

**Critérios de Aceitação:**
- Login autenticado via Firebase Authentication.
- Gestão segura de sessões de usuário.

### 3. Gerenciamento de Vídeos do Professor

**Descrição:**  
Como professor, desejo adicionar, editar ou excluir vídeos educacionais.

**Critérios de Aceitação:**
- Funções CRUD (Create, Read, Update, Delete) totalmente funcionais para vídeos.
- URLs de vídeos devem ser corretamente armazenadas e manipuladas.

### 4. Cadastro de Aluno

**Descrição:**  
Como aluno, desejo me cadastrar e ser vinculado a um professor específico.

**Critérios de Aceitação:**
- Aluno vinculado a um professor no momento do cadastro.
- Dados armazenados corretamente e de forma segura.

### 5. Autenticação de Aluno

**Descrição:**  
Como aluno, desejo fazer login para acessar vídeos do meu professor.

**Critérios de Aceitação:**
- Autenticação via Firebase Authentication.
- Sessões seguras e controle de acesso adequado.

### 6. Visualização de Vídeos pelo Aluno

**Descrição:**  
Como aluno, desejo visualizar apenas vídeos do meu professor vinculado.

**Critérios de Aceitação:**
- Filtro de vídeos por professor.
- Exibição apenas de conteúdos relevantes ao aluno.

## Critérios de Avaliação do Projeto

1. Implementação Completa de User Stories.
2. Segurança e Validação.
3. Eficiência e Escalabilidade.
4. Organização do Código.
5. Documentação e Testes.
6. Demonstração do MVP.

## Documentação do projeto

O sistema é composto por três telas, sendo:

1. Tela - Autenticação:

A tela de login onde é feita a autenticação dos usuários, a autenticação é feita via integração com Firebase, onde o usuário somente consegue logar com o usuário e senhas corretas.

Na tentativa de login em caso de sucesso o usuário o sistema valida o perfil do usuario e o direciona para tela correspondente de Professor ou de Aluno, e em caso de tentativa de login com algum dado invalido o sistema retorna uma mensagem informando que os dados estão incorretos e solicitando que o usuário tente novamente.

Nesta tela o usuario tambem poderá utilizar a funcção "Esqueci minha senha" onde o mesmo receberá um e-mail para poder alterar redefinr sua senha.

E tambem utilizar a função de cadastre-se onde o usuário será enviado para tela de Cadastro da plataforma.

Nesta tela os arquivos utilizados são:

index.html

index.css

index.js

2. Tela - Cadastro:

Na tela de Cadstro serve o usuario deverá preencher seus cados cadastrais e selecionar sua categoria Professor ou Aluno, no caso do Aluno deverá selecionar um professor vinculate, o qual o aluno conseguirá assistir os videos vinculados a este professor na plataforma.

Esta tela tem integração com Firebade Authentication e com o Firestone Database no banco de dados de usuários, desta forma via o ID o sistema consegue alem de autenticar o usuario tambem determinar seu perfil e para qual tela será enviado após login. 

Nesta tela os arquivos utilizados são:

cadastro.html

cadastro.css

cadastro.js

3. Tela - Professor:

Na tela de Professor, o usuário com perfil de Professor poderá consultar, cadastrar, editar ou excluir os videos na plataforma.

Os link dos videos são cadastrados são slavos no Firestone Database no banco de dados videoAulas.

Nesta tela os arquivos utilizados são:

professor.html

styles.css está dentro pasta css

professor.js está dentro pasta js

4. Tela - Aluno:

Na tela de Alunos, o usuário com perfil de PAluno poderá Assistir os videos cadastrados na plataforma pelo professor vinculado que ele selecionou no seu cadastro.

Nesta tela os arquivos utilizados são:

aluno.html

styles.css está dentro pasta css

aluno.js está dentro pasta js

## Usuário de Desenvolvimento

Logins utilizados para desenvolvimento e testes:

- **E-mail:** teste@fiap.com, **Senha:** 123456
- **E-mail:** andre@fiap.com, **Senha:** 123456
- **E-mail:** professor@fiap.com, **Senha:** 123456
- **E-mail:** prof@fiap.com, **Senha:** 123456

## Execução do Projeto

Para executar o sistema é preciso seguir os passos abaixos:

1 - Fazer o download no node.js

2 - Criar uma pasta local e salvar os arquivos deste trabalho

3 - Iniciar o Visual Studio Code e abrir a pasta em que os arquivos foram salvos

4 - Abrir o terminal e executar os comandos abaixo para poder integrar o projeto com o Firebase:

npm init -y

npm i -D firebase-tools

npx firebase login

npx firebase experiments:enable webframeworks

npx firebase init hosting

npm install firebase

## Vídeo demonstrativo do Projeto

Link do Youtube com a demontração do projeto

https://www.youtube.com/watch?v=WraHzKQgn7k






