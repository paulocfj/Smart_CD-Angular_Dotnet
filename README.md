# Smart CD
 - Este  é um projeto realizado para  o processo seletivo que participei na empresa: Smart Innovation.
Ao qual o objetivo era realizar uma aplicação que fizesse o gerenciamento ( cadastrar, alterar e excluir) de cd e usuários, uma pequena loja virtual que possibilita o usuário visualizar os seus cds, criar novos , alterar e excluir os existentes,  além de modificar usuário, exclui-los e cria-los.

## Aplicação:
### BackEnd (Server)
	Server é responsável pelo o envio do dados do servidor ao cliente, utilizando rest Api.

 - Utilizado a linguagem C# com o auxilio do Asp Net core 3.1
 - Bcrypt, biblioteca para auxilio de incriptação.
 - jwt, para criação e manipulação de tokens.
 - Entity FrameWork, utilizado para persistência de dados, utilizando sql server.

### FrontEnd (Client)
	Client é responsável por exibir as funcionalidades da aplicação ao usuário, fazendo a comunicação entre usuário e servidor.

- Utilizado a linguagem TypeScript.
- Plataforma Angular 11, utilizando Node.js para execução.
- jwt, para criação e manipulação de tokens.
- BootStrap e Ngx Bootstrap utilizado para estilização dos componentes.

## Estrutura
### BackEnd (Server)

- Controllers, responsável pelo o controle das rotas e do manipulação dos dados.
- Models, modelos das classes.
- ViewModels, views dos modelos das classes.
- Migrations,  modelos das classes para o banco de dados 

### FrontEnd (Client)

- Components, componentes da interface.
- service,  controladora da requisição  de informação entre o client e o server.
- interface, interface das classes para utilização nos tópicos acimas.
- guard, utilizado para criar a manipulação de autorização conforme o token, liberação de acesso.
- helpers, pasta onde fica os arquivos com os métodos globais.

## Observações 

	Para rodar  o backEnd, primeiro adicionar um arquivo chamado Settings.cs  na raiz do projeto, e colocar os seguintes códigos.

```csharp
namespace Server
{
    public static class Settings 
    {
        public static string Secret ="sua secrete aqui";
        
    }
}
```
- Também alterar o caminho de conexão com o seu banco:
Em appsettings.json na raiz, modificar a string de conexão em ConnectionStrings-StringConnections utilizando a sua string de conexão.

Como o exemplo a abaixo:
```csharp

```csharp
{
  //arquivo appsettings.json
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "StringConnection" : "sua string de conexão aqui"
  }
}
```

- Após feitos estes passos realizar os comandos dotnet migration, nesse caso as migrations já existem, apenas utilizem o comando update-database para criar as tabelas no banco de dados.

	dotnet ef migrations update-database
	
	
## Agradecimentos
	
	Obrigado por lerem até o final espero que não tenham problemas em rodar  o aplicativo,  agradeço a oportunidade de realizar estes  testes, foi um bom aprendizado.
	Meu primeiro aplicativo em Angular espero que gostem.



