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

async function saveTransaction(ev) {
    ev.preventDefault()
  
    const name = document.querySelector('#name').value
    const amount = parseFloat(document.querySelector('#amount').value)
  
    const response = await fetch('http://localhost:3000/transactions', {
      method: 'POST',
      body: JSON.stringify({ name, amount }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const transaction = await response.json()
    transactions.push(transaction)
    renderTransaction(transaction)
  
    ev.target.reset()
    updateBalance()
  }
  
  // ...
  
  document.addEventListener('DOMContentLoaded', setup)
  document.querySelector('form').addEventListener('submit', saveTransaction)