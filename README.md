# LUPE CHAT — projeto Android

Este é um protótipo inicial de interface feito com Expo e React Native.

## O que já existe no protótipo
- Navegação inferior: Início, Explorar, Reels, Mensagens e Perfil.
- Feed de publicações demonstrativas.
- Stories demonstrativos.
- Curtidas locais (a contagem muda na tela).
- Pesquisa local de sugestões e conversas.
- Telas iniciais para Reels, mensagens e perfil.

## O que ainda precisa ser conectado
Este projeto ainda **não é uma rede social pronta para produção**. Ele não tem servidor, banco de dados, autenticação real, armazenamento de fotos/vídeos, chat em tempo real, notificações push ou moderação. Esses recursos precisam de backend e configuração antes de publicar para outras pessoas.

## Como abrir no computador
1. Instale Node.js (versão LTS) e Android Studio.
2. Extraia o ZIP.
3. Abra a pasta `lupe-chat-android` no terminal.
4. Execute `npm install`.
5. Execute `npx expo start`.
6. Abra no emulador Android ou use o aplicativo Expo Go para testar.

## Próxima etapa recomendada
Conectar autenticação, banco de dados e armazenamento de mídia (por exemplo, com Supabase ou Firebase), implementar upload de fotos/vídeos e chat em tempo real, depois gerar uma versão Android instalável (APK/AAB).
