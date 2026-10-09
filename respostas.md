1. Com o campo quantidade, o banco relacional precisa alterar a tabela (ALTER TABLE), e no Firestore é só gravar o novo campo nos documentos. Com dois colegas abrindo o app, no localStorage cada um vê a própria lista, e no Firestore os dois veem a mesma. As credenciais ficam no .env para não irem para o GitHub. Sem o await no criarProduto, o listarProdutos pode rodar antes da gravação e vir sem o item novo. Com duas abas abertas, a outra atualiza sozinha porque o onSnapshot avisa a cada mudança na coleção.

2. A coleção agrupa os documentos (ex.: produtos); o documento é um item, como { nome: "Arroz", comprado: false }.

3. Instala a biblioteca do Firebase no projeto. Confirmo no package.json, em dependencies.

4. O Vite só envia ao app as variáveis que começam com VITE_. No Expo o prefixo é EXPO_PUBLIC_.

5. O getDocs lê uma vez, bom para consulta pontual. O onSnapshot escuta mudanças, bom para telas que precisam atualizar sozinhas.

6. A hora do servidor é igual para todos, e a hora do computador do usuário pode estar errada.

7. Qualquer pessoa pode ler, alterar e apagar os dados, e o modo expira em cerca de 30 dias. Um app publicado precisa de regras de segurança.