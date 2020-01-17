# backend para o devRadar
O backend foi feito em **Node.js**. Gravando novos DEVs, editando, apagando e listando. Agradecer ao pessoal da [RocketSeat](https://www.rocketseat.com.br/) por realizar a semana Omnistack, onde foi feito esse sistema.

Ao baixar o código, trocar o **USUARIO** e a **SENHA** da connection string do mongodb localizada no arquivo index.js.
Após isso, executar um npm install

## GET - /DEVS

Ao executar um **GET** na rota /DEVS será retornado uma lista com todos os DEVS cadastrados no sistema.

## POST - /DEVS

O **POST** é usado para gravar um novo DEV, a requisição deve enviar no body os dados do novo DEV.
ex: 
    
    {
	    "github_username": "brunogringo",
	    "techs": "Reactjs, CSharp, Javascript",
	    "latitude": -15.7888953,
	    "longitude": -47.9074467
	}

## PUT - /DEVS

O **PUT** é usado para editar as informações de um DEV, na requisição deve-se passar no body o ID do DEV que está sendo editado e as informações.
Ex:

    {
	    "id": "5e1dff59bdceeb192075b6f5",
		"latitude": -15.7962004,
		"longitude":-47.9119285
    }

## DELETE - /DEVS/ID

Ao fazer uma requisição do tipo **DELETE** passando o id na url, será removido o DEV referente ao id passado.

## GET - /SEARCH?latitude=&longitude=&techs=
Lista os DEVS de acordo com os parâmetros passados na querystring, na rota /SEARCH.
