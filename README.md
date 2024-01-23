# to-do


Esse é o backend da minha aplicação de listagem de tarefas, eu fiz algo simples, mas me esforcei para estruturar a aplicação de maneira profissional (dentro das minhas habilidades atuais). 

Nessa aplicação eu aprendi sobre:
* como estruturar um projeto em NodeJS 📂
* usar postgresql com NodeJS 🐘
* critpografia de dados 🔒
* autenticação com JWT 🔑
* utilizei um midlleware para tratar os erros ❌
* aprendi a lidar com os Objetos para Transferência de Dados (DTOs) 🎲

Para rodar a aplicação precisamos de algumas variáveis de ambiente: 
```env 
# Database
POSTGRES_DB_USER= 
POSTGRES_DB_PASSWORD=
POSTGRES_DB_NAME=
POSTGRES_DB_HOST=
POSTGRES_DB_PORT=

# JWT
JWT_SECRET_KEY=

# server 
PORT=
```

Além disso o banco de dados utilizado foi o  PostgreSQL, portanto, é necessário configurar um banco de dados e, após isso, rodar o seguinte comando: 

```
npm migrate
```

Esse comando será responsável por criar as tabelas no banco.

Se tiver alguma dúvida ou uma melhoria para fazer na aplicação, fique à vontade para entrar em contato. Você pode abrir uma issue ou até mesmo fazer um pull request com melhorias. Eu agradeço bastante. 😄

