# loginWithDeploy
Sistema de Login Simples com validação de CNPJ, PASSWORD etc...
Aplicação em NODEJS e Deploy no Redux
Banco Postgres com Docker 
O serviço esta hospedado e permanecerá ativo por ate 01/08/2023

Para conseguir testar a aplicação sera nescessário utilizar o insomnia ou postman

----------------------------------------------

CRIANDO USUÁRIO:
crie um metodo no insomnia POST com a url: https://loginnodedeploy1-api.onrender.com/users
crie no body um JSON ex:

{
	      "nome": "nome",
        "email": "email@email.com",
        "bairro": "",
        "CEP": "1988797",
        "CNPJ": "15311755000184",
        "complemento": "compl",
        "endereco": "end",
        "incricaoEstadual": "insc",
        "incricaoMunicipal": "muni",
        "nomeFantasia": "fant",
        "numero": "151",
        "password":"#3Aa1234a",
        "razaoSocial": "social",
        "telefone": "tel",
        "tipo": "CLIENTE"
}


---------------------------------------------------
FAZENDO LOGIN:
crie um metodo no insomnia POST com a url e passando no ultimo parametro o email ou cnpj :
https://loginnodedeploy1-api.onrender.com/users/login/SEU EMAIL OU CNPJ AQUI
crie no body um JSON com password ex:

{
	"password":"#3Aa1234a"
}


---------------------------------------------------
RESETANDO SENHA ENVIANDO EMAIL:
crie um metodo no insomnia POST com url: https://loginnodedeploy1-api.onrender.com/users/resetpassword
crie no body um JSON confirmando o email ex:
{
	"email":"email@email.com"
}


---------------------------------------------------
PEGANDO TODOS USUÁRIOS - FUNÇÃO ADMINISTRADOR:
crie um metodo no insomnia GET com a url: https://loginnodedeploy1-api.onrender.com/users


--------------------------------------------------
DELETANDO USUÁRIO - FUNÇÃO ADMINISTRADOR:
crie um metodo no insomnia DELETE  e passe o ID no Final com a url:
https://loginnodedeploy1-api.onrender.com/users/delete/login/ID AQUI



