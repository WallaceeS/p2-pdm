# OndePassa

Nome: Wallace Silva de Souza RA: 2040482422005

# Como executar

Para executar o OndePassa, é necessário configurar e iniciar o backend e, em seguida, iniciar o aplicativo.


# Backend
- 1 Entre na pasta backend 
- 2 Instale as dependências com o comando npm install no terminal
- 3 Crie um arquivo chamado .env a partir do .env.example
- 4 Abra o arquivo .env e informe o seu token de acesso da API do TMDB:
    Para obter o token, Crie uma conta gratuita em https://www.themoviedb.org e confirme o e-mail.
    Nas configurações da conta, abra a seção API, solicite uma chave para uso pessoal e não comercial e
    preencha o formulário. entre nas configurações da sua conta e procure a opção API. Utilize o API Read Access Token.
- 5 inicie o servidor com o comando: npm run dev, a mesagem O backend estará disponível na porta 3000, deve aparecer no terminal


# Aplicativo
- 1 Entre na pasta mobile
- 2 Instale as dependências com o comando npm install no terminal
- 3 Abra o arquvio backendClient.js e ajuste o endereço de IP 
    Para encontrar o seu endereço de IP, abra o prompt de comando e execute: ipconfig
    Procure por IPv4 e susbtitua o IP antigo pelo endereço encontrado, mantendo a porta 3000
    http://(Seu IP aqui):3000
- 4 Inicie o aplicativo com o comando: npx expo start
- 5 Abra o app Expo Go no celular e leia o QR code exibido no terminal

# Observação: 
 O computador e o celular devem estar conectados á mesma rede WI-FI