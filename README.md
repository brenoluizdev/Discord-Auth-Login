# Discord-Auth-Login

![Node.js](https://img.shields.io/badge/Node.js-%3E=%2020.17.0-blue?style=for-the-badge)

**Discord-Auth-Login** é a sua porta de entrada para uma experiência de autenticação moderna e descomplicada. Com esta aplicação, você pode integrar facilmente o login via Discord em seu site, oferecendo aos seus usuários uma maneira rápida e segura de se autenticar com suas contas do Discord. Ideal para comunidades, plataformas de jogos e qualquer site que deseja aproveitar a popularidade e segurança do Discord.

## 🚀 Funcionalidades

- **Autenticação Instantânea**: Deixe seus usuários entrarem no seu site com um clique usando suas credenciais do Discord.
- **Dashboard Personalizado**: Após o login, mostre informações do usuário, como avatar, nome e ID, em um painel personalizável.
- **Sessões Seguras**: Mantenha a segurança e integridade das sessões dos usuários com gerenciamento eficaz de tokens.
- **Integração Simples**: Fácil de configurar e adaptar ao seu backend existente.

## 📦 Tecnologias Utilizadas

- **OAuth2**: O protocolo padrão para autenticação segura e confiável.
- **Express.js**: Um framework leve e rápido para criar a API de autenticação e gerenciar sessões.
- **Axios**: Para realizar requisições HTTP e interagir com a API do Discord.

## 🛠️ Como Começar

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/seu-usuario/Discord-Auth-Login.git
   cd Discord-Auth-Login
Instale as Dependências

```npm install```

### Configure as Credenciais

Crie um arquivo .env na raiz do projeto e adicione suas credenciais do Discord:

```
CLIENT_ID='client_id'
CLIENT_SECRET='client_secret'
REDIRECT_URI='http://localhost:3000/auth/discord/callback'
```

### Inicie o Servidor

```npm start```

### Acesse o Site

Navegue até http://localhost:3000 e experimente o login via Discord!

## 📚 Exemplos

🤔 Como Funciona
Redirecionamento para o Discord: Quando o usuário clica em "Login", ele é redirecionado para o Discord para autenticação. <br><br>
Autorização e Callback: Após o login, o Discord redireciona o usuário de volta para seu site com um código de autorização. <br><br>
Troca de Código por Token: O backend troca o código de autorização por um token de acesso.
Exibição de Dados: O token é usado para obter informações do usuário, que são então exibidas no dashboard. <br><br>
🤝 Contribua
Gostou do projeto? Envie suas sugestões e melhorias! Abra um issue ou envie um pull request.

### 📄 Licença
> Distribuído sob a MIT License. Veja LICENSE para mais detalhes.