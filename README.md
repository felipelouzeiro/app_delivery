# Projeto App Delivery

# Contexto

A distribuidora de cervejas da dona Tereza está se informatizando! 🚀 Seu negócio, antes focado em um local específico da cidade, passou a receber uma quantidade massiva de encomendas de outros pontos, expandindo sua atuação, sobretudo via delivery. Isso tudo graças ao excelente preço das bebidas e atendimento da equipe de vendas.

Agora a distribuidora possui alguns pontos de venda na cidade para agilizar no atendimento dessas áreas. Cada ponto de venda, por sua vez, possui uma pessoa vendedora responsável.

Como seu antigo sistema, que era um conjunto de planilhas, já não atende a necessidade do negócio, pois gera muita manutenção, dona Tereza procurou a **sua equipe de pessoas desenvolvedoras** com uma ideia de aplicativo que pudesse agilizar a vida de sua equipe e das pessoas que compram seus produtos. O aplicativo precisa:

- Ter acesso via login: tanto clientes como pessoas vendedoras, assim como a própria dona Tereza, que administra o sistema, devem ter acesso ao aplicativo via login, porém para funções diferentes: (1) A pessoa cliente, que compra da lista de produtos; (2) A pessoa vendedora, que aprova, prepara e entrega; (3) A pessoa administradora, que gerencia quem usa o aplicativo;
- Fazer a comunicação entre clientes e pessoas vendedoras: a pessoa cliente faz o pedido via "carrinho de compras" e a pessoa vendedora aprova, prepara e envia esse pedido. Quando o produto é recebido por quem comprou, essa pessoa marca o pedido como "recebido". Ambos devem possuir detalhes sobre seus pedidos;
- Funcionar em tempo real: as telas de pedidos/detalhes do pedido devem ser atualizadas em tempo real, à medida que essas interações acontecem. Se a pessoa cliente faz o pedido, o mesmo deve aparecer para a pessoa vendedora em seu dash de pedidos sem que ela precise atualizar a página. A pessoa cliente, por sua vez, deve ter as informações sobre seu pedido também atualizadas em tempo real, ou seja, ter informações se o pedido está sendo preparado ou se já saiu pra entrega;

Sua equipe, que já possui uma boa experiência com desenvolvimento, em pouco tempo apresentou um [protótipo](https://www.figma.com/file/cNKu41RhnPIgNqrbMTzmUI/Delivery-App-new-trybeer?node-id=0%3A1) e um [Diagrama de ER](./assets/readme/eer.png) conforme imagem:

![Diagrama de ER](./assets/readme/eer.png)

A ideia da sua equipe já pressupõe alguma escalabilidade, dado que foram estabelecidas algumas entidades genéricas no banco de dados e componentização no front-end, para que, caso o sistema cresça, não seja muito difícil mudar e ampliar essa estrutura.

**A proposta encantou, mas dona Tereza quer ver o negócio em ação! Ela está disposta a pagar por um MVP do projeto e vocês fecharam o negócio com um prazo de 10 dias para entrega.**

---

# Habilidades exercitadas nesse projeto:

- Manter aderência do código à especificação. Seu programa deve se comportar como especificado no repositório, no [protótipo](https://www.figma.com/file/cNKu41RhnPIgNqrbMTzmUI/Delivery-App-new-trybeer?node-id=0%3A1) e no [Diagrama de ER](./assets/readme/eer.png);
- Manter a organização do seu código e a arquitetura geral da aplicação (tanto da API quando do front-end);
- Manter aderência ao padrão REST na API;
- Respeitar a estrutura do banco de dados. Sua implementação não deve adicionar ou remover tabelas, campos ou relacionamentos e sua API deve estar preparada para aproveitar essa estrutura por completo;
- Manter uma cobertura de testes. Seu código deve ser testável e possuir uma suíte de testes unitários e/ou de integração robusta e com alta cobertura.
- Implementar a funcionalidade de comunicação em tempo real, utilizando o socket.io.
- Manter aderência aos princípios SOLID;

## Fluxos

- **Fluxo Comum** que compreende:

  - (1) Tela de Login (`01login.test`);
  - (2) Tela de Registro (`02register.test`).

- **Fluxo do Cliente** que compreende: :

  - (3) Tela de Produtos (`03customer_products.test`);
  - (4) Tela de Checkout (`04customer_checkout.test`);
  - (5) Tela de Pedidos (`05customer_orders.test`);
  - (6) Tela de Detalhes do Pedido (`06customer_order_details.test`).

- **Fluxo da Pessoa Vendedora** que compreende:

  - (7) Tela de Pedidos (`07seller_orders.test`);
  - (8) Tela de Detalhes/Controle do Pedido (`08seller_order_details.test`).

- **Validação do Status do Pedido** que compreende:

  - (9) Teste de status sem atualização em tempo real (`09customer_seller_status_sync.test`);
  - (10) Teste de status com atualização em tempo real (`10customer_seller_socket_status_sync.test`).

- **Fluxo da Pessoa Administradora** que compreende:

  - (11) Tela de gerenciamento de usuários (`11admin_manage_users.test`).

- **Testes da aplicação** que compreende:

  - (12) Testes de cobertura (`12coverage_tests.test`).

- A tela de login direciona para a tela principal de cada pessoa usuária, sendo as páginas:
  - Do cliente: `/customer/products`,
  - Da pessoa vendedora: `/seller/orders`,
  - Da pessoa administradora: `/admin/manage`

## Desenvolvimento

- Para o banco de dados, utilizamos a biblioteca ORM `Sequelize`, que fez interface com o `MySQL`!

- Para servir arquivos estáticos como imagens no back-end, utilizamos o seguinte path:`./back-end/public`;
  - Nosso banco de imagens em [baixado aqui](./assets/images.zip);

---

### Qual poderia ser o próximo passo?

Foi super importante que tenhamos seguido todos os princípios e boas práticas de programação (como `SOLID`, por exemplo), tal como uma boa modelagem do banco de dados que torne possível gerar **escala**.

Evidentemente, nada fica ideal num primeiro momento, mas quanto mais conseguirmos trabalhar no nosso projeto pensando a manutenção dele no longo prazo, mais fácil fica de programarmos coisas novas partindo do nosso código legado, por isso é importante sempre revisar nosso trabalho!

---

# Para testar a aplicação na sua máquina

### Depois de clonar a aplicação, instale as depedências com npm install nas pastas front-end e back-end com o comando `npm intall`;

- Certifique-se de que seu banco de dados local esteja ativade

- Dentro da pasta back-end inicie a api com o comando `npm run dev`

- Dentro da pasta front-end inicie a aplicação com o comando `npm start`

## Essa aplicação está com uma cobertura de testes de 86%

- Para rodar os testes use `npm run test` na pasta front-end e/ou back-end.
