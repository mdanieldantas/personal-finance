### Personal Finance

**Personal Finance** é uma aplicação web de página única que permite aos usuários gerenciar suas finanças pessoais através de um controle simples e intuitivo das transações financeiras.

<!-- - **Veja Online:** [Link para a aplicação](#)

![Projeto](./path/to/image1.png)
![Projeto](./path/to/image2.png) -->

## Funcionalidades

- **Exibição de transações:** Exibe todas as transações financeiras salvas no backend.
- **Adição de transações:** Permite adicionar novas transações através de um formulário, com envio de dados por uma requisição POST sem atualizar a página.
- **Edição de transações:** Permite editar transações existentes utilizando uma requisição PUT.
- **Exclusão de transações:** Permite excluir transações através de uma requisição DELETE.
- **Cálculo de saldo:** Calcula e exibe o saldo total com base nas transações, atualizando automaticamente ao criar, editar ou excluir transações.
- **Tratamento de erros:** Utiliza `try...catch` para capturar e exibir erros de forma amigável.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript
- [JSON Server](https://github.com/typicode/json-server) (para simulação de backend)

## Como Executar o Projeto

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/personal-finance.git
    cd personal-finance
    ```

2. **Instale o JSON Server:**

    ```bash
    npm install -g json-server
    ```

3. **Inicie o JSON Server:**

    ```bash
    json-server --watch db.json
    ```

4. **Abra o arquivo `index.html` em seu navegador.**

## Estrutura do Projeto

- `index.html`: Página principal com o formulário e a exibição de transações.
- `style.css`: Estilos CSS para a página.
- `script.js`: Lógica JavaScript para manipulação de transações e atualização do saldo.

## Validações

- **Transação:**
  - **Nome:** Deve ser preenchido.
  - **Valor:** Deve ser um número válido (pode ser positivo ou negativo).

## Exemplo de Código (script.js)

```javascript
function criarTransacao(transacao) {
  // Implementação da lógica para criar nova transação
}

function editarTransacao(id, transacao) {
  // Implementação da lógica para editar transação existente
}

function excluirTransacao(id) {
  // Implementação da lógica para excluir uma transação
}

function atualizarSaldo() {
  // Implementação da lógica para atualizar o saldo total
}

function handleSubmit(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const valor = document.getElementById('valor').value;

  try {
    criarTransacao({ nome, valor });
    atualizarSaldo();
  } catch (error) {
    alert(error.message);
  }
}
```

## Melhorias

- **Interface amigável:** Melhorar a interface do usuário para torná-la mais intuitiva e visualmente atraente.
- **Feedback visual:** Destacar os campos inválidos com uma cor diferente ou exibir um ícone de erro.
- **Mensagens de erro personalizadas:** Fornecer mensagens de erro mais específicas para cada tipo de erro.
- **Testes unitários:** Criar testes unitários para garantir a qualidade do código.
- **Autenticação:** Implementar um sistema de autenticação para proteger os dados do usuário.

## Observações

- **Adapte o código:** Este é apenas um exemplo básico. Você pode personalizar a interface, as mensagens de erro e adicionar mais funcionalidades conforme necessário.
- **Segurança:** Para aplicações reais, considere utilizar bibliotecas de validação de formulários e criptografar os dados sensíveis antes de armazená-los.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Contato

**M Daniel Dantas**

- **GitHub:** [mdanieldantas](https://github.com/mdanieldantas)
- **LinkedIn:** [mdanieldantas](https://www.linkedin.com/in/mdanieldantas)
- **Portfólio:** [Portfólio de Daniel Dantas](https://danieldantasdev.vercel.app)
- **Email:** [contatomarcosdgomes@gmail.com](mailto:contatomarcosdgomes@gmail.com)
- **Currículo:** [Baixar Currículo](https://drive.google.com/file/d/1Z_tqBv6kg4wkDAQHAvY3lcuVSq3rabTt/view?usp=drive_link)