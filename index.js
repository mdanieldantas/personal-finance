// criando o container da transação div com a classe transaction e id transaction-1
function createTransactionContainer(id) {
    const container = document.createElement('div')
    container.classList.add('transaction')
    container.id = `transaction-${id}`
    return container
  }
  
// criando o span de nome da transação class transaction-title e passando o nome da transação  como parametro  
  function createTransactionTitle(name) {
    const title = document.createElement('span')
    title.classList.add('transaction-title')
    title.textContent = name
    return title
  }


// criando o span de data e o span de valor da transação com a classe transaction-amount 
function createTransactionAmount(amount) {
    const span = document.createElement('span')
    span.classList.add('transaction-amount')

    // formatação do valor da transação para moeda brasileira com a biblioteca intl number format 
    const formater = Intl.NumberFormat('pt-BR', {
      compactDisplay: 'long',
      currency: 'BRL',
      style: 'currency',
    })

    // verificando se o valor da transação e positivo ou negativo e adicionando a classe credit ou debit
    const formatedAmount = formater.format(amount)
    if (amount > 0) {
      span.textContent = `${formatedAmount} C`
      span.classList.add('credit')
    } else {
        // verificando se o valor da transação e negativo e adicionando a classe credit ou debit
      span.textContent = `${formatedAmount} D`
      span.classList.add('debit')
    }
    // retornando o span com o valor da transação formatado e a classe credit ou debit 
    return span
  }

  // funcao assincrona para buscar as transações do backend
  async function fetchTransactions() {
    return await fetch('http://localhost:3000/transactions').then(res => res.json())
  }


  // array para armazenar as transações  
  let transactions = []

  // funcao assincrona para buscar as transações do backend e atualizar o saldo
function updateBalance() {
    // balanço da conta com base nas transações do backend 
  const balanceSpan = document.querySelector('#balance')
    // somando o valor das transações 
  const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
    // formatação do valor do balanço para moeda brasileira com a biblioteca intl number format
  const formater = Intl.NumberFormat('pt-BR', {
    compactDisplay: 'long',
    currency: 'BRL',
    style: 'currency'
  })
    // adicionando o valor do balanço na tela
  balanceSpan.textContent = formater.format(balance)
}


// funcao setup para buscar as transações do backend e atualizar o saldo
async function setup() {
    // buscando as transações do backend
    const results = await fetchTransactions()
    // adicionando as transações ao array
    transactions.push(...results)
    // renderizando as transações
    transactions.forEach(renderTransaction)
    // atualizando o saldo da conta     
    updateBalance()
  }
  
    // funcao para renderizar as transações na tela quando o DOM for carregado 
  document.addEventListener('DOMContentLoaded', setup)


  // ...
// funcao para salvar a transação no backend
async function saveTransaction(ev) {
    // previnindo o comportamento padrão do formulário de enviar o formulário  e recarregar a página limpando o formulário 
    ev.preventDefault()
  // pegando os dados do formulário
    const name = document.querySelector('#name').value
    // verificando se o valor da transação e negativo e adicionando a classe credit ou debit
    const amount = parseFloat(document.querySelector('#amount').value)
  // enviando os dados do formulário para o backend
    const response = await fetch('http://localhost:3000/transactions', {
      method: 'POST',
      body: JSON.stringify({ name, amount }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // pegando a resposta do backend
    const transaction = await response.json()
    // adicionando a transação ao array
    transactions.push(transaction)
    // renderizando a transação na tela
    renderTransaction(transaction)
    // limpando o formulário com os dados da transação usando o reset do formulário 
    ev.target.reset()
    // atualizando o saldo da conta com a funcao updateBalance 
    updateBalance()
  }
  
  // ...
    // funcao para renderizar as transações na tela quando o DOM for carregado
  document.addEventListener('DOMContentLoaded', setup)
  
  // funcao para salvar a transação no backend  quando o formulário for submetido
  document.querySelector('form').addEventListener('submit', saveTransaction)


  // ...
// funcao para editar a transação no backend com botao de editar 
function createEditTransactionBtn(transaction) {
    // criando o botão de editar com a classe edit-btn e o texto editar
    const editBtn = document.createElement('button')
    // adicionando a classe edit-btn ao botão
    editBtn.classList.add('edit-btn')
    // adicionando o texto editar ao botão
    editBtn.textContent = 'Editar'
    // adicionando o evento de click ao botão para pegar os dados da transação e preencher o formulário
    editBtn.addEventListener('click', () => {
      // preenchendo o formulário com os dados da transação
      document.querySelector('#id').value = transaction.id
      // verificando se o valor da transação e negativo e adicionando a classe credit ou debit
      document.querySelector('#name').value = transaction.name
        // verificando se o valor da transação e negativo e adicionando a classe credit ou debit
      document.querySelector('#amount').value = transaction.amount
    })
    // retornando o botão de editar
    return editBtn
  }
  

// funcao para salvar a transação no backend  quando o formulário for submetido
async function saveTransaction(ev) {
    // previnindo o comportamento padrão do formulário de enviar o formulário  e recarregar a página limpando o formulário
    ev.preventDefault()
  
    // pegando os dados do formulário
    const id = document.querySelector('#id').value
    // verificando se o valor da transação e negativo e adicionando a classe credit ou debit
    const name = document.querySelector('#name').value
    // verificando se o valor da transação e negativo e adicionando a classe credit ou debit
    const amount = parseFloat(document.querySelector('#amount').value)
  
    // enviando os dados do formulário para o backend para salvar a transação
    if (id) {
      const response = await fetch(`http://localhost:3000/transactions/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, amount }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        // pegando a resposta do backend
      const transaction = await response.json()
        // encontrando a transação no array de transações e removendo a transação antiga e adicionando a nova transação
      const indexToRemove = transactions.findIndex((t) => t.id === id)
        // encontrando a transação no array de transações e removendo a transação antiga e adicionando a nova transação
      transactions.splice(indexToRemove, 1, transaction)
        // encontrando a transação na tela e removendo a transação antiga e adicionando a nova transação
      document.querySelector(`#transaction-${id}`).remove()
        // encontrando a transação na tela e removendo a transação antiga e adicionando a nova transação
      renderTransaction(transaction)
    } else {
      const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        body: JSON.stringify({ name, amount }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // pegando a resposta do backend
      const transaction = await response.json()
      // adicionando a transação ao array
      transactions.push(transaction)
      // renderizando a transação na tela
      renderTransaction(transaction)
    }
  
    // limpando o formulário
    ev.target.reset()
  
    // atualizando o saldo da conta
    updateBalance()
  }
  
  // ...

  // ...
// funcao para excluir a transação no backend com botao de excluir
function createDeleteTransactionButton(id) {
    // criando o botão de excluir com a classe delete-btn e o texto excluir
    const deleteBtn = document.createElement('button')
    // adicionando a classe delete-btn ao botão
    deleteBtn.classList.add('delete-btn')
    // adicionando o texto excluir ao botão
    deleteBtn.textContent = 'Excluir'
    // adicionando o evento de click ao botão para excluir a transação
    deleteBtn.addEventListener('click', async () => {
        // enviando a requisição para excluir a transação no backend
      await fetch(`http://localhost:3000/transactions/${id}`, { method: 'DELETE' })
      deleteBtn.parentElement.remove()
        // encontrando a transação no array de transações e removendo a transação
      const indexToRemove = transactions.findIndex((t) => t.id === id)
        // encontrando a transação no array de transações
      transactions.splice(indexToRemove, 1)
        // atualizando o saldo da conta
      updateBalance()
    })
    // retornando o botão de excluir
    return deleteBtn
  }
  
  