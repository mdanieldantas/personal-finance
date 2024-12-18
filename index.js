// criando o container da transação div com a classe transaction e id transaction-1
function createTransactionContainer(id) {
    const container = document.createElement('div')
    container.classList.add('transaction')
    container.id = `transaction-${id}`
    return container
}

// criando o span de nome da transação class transaction-title e passando o nome da transação como parametro  
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

// função para renderizar uma transação na tela
function renderTransaction(transaction) {
    const container = createTransactionContainer(transaction.id)
    const title = createTransactionTitle(transaction.name)
    const amount = createTransactionAmount(transaction.amount)
    const editBtn = createEditTransactionBtn(transaction)
    const deleteBtn = createDeleteTransactionButton(transaction.id)

    container.appendChild(title)
    container.appendChild(amount)
    container.appendChild(editBtn)
    container.appendChild(deleteBtn)

    document.querySelector('main').appendChild(container)
}

// função assíncrona para buscar as transações do backend
async function fetchTransactions() {
    return await fetch('http://localhost:3000/transactions').then(res => res.json())
}

// array para armazenar as transações  
let transactions = []

// função assíncrona para buscar as transações do backend e atualizar o saldo
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

// função setup para buscar as transações do backend e atualizar o saldo
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

// função para renderizar as transações na tela quando o DOM for carregado 
document.addEventListener('DOMContentLoaded', setup)

// função para salvar a transação no backend
async function saveTransaction(ev) {
    // previnindo o comportamento padrão do formulário de enviar o formulário e recarregar a página limpando o formulário 
    ev.preventDefault()
    // pegando os dados do formulário
    const id = document.querySelector('#id').value
    const name = document.querySelector('#name').value
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
        const transaction = await response.json()
        const indexToRemove = transactions.findIndex((t) => t.id === id)
        transactions.splice(indexToRemove, 1, transaction)
        document.querySelector(`#transaction-${id}`).remove()
        renderTransaction(transaction)
    } else {
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
    }

    // limpando o formulário
    ev.target.reset()
    // atualizando o saldo da conta
    updateBalance()
}

// função para editar a transação no backend com botão de editar 
function createEditTransactionBtn(transaction) {
    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-btn')
    editBtn.textContent = 'Editar'
    editBtn.addEventListener('click', () => {
        document.querySelector('#id').value = transaction.id
        document.querySelector('#name').value = transaction.name
        document.querySelector('#amount').value = transaction.amount
    })
    return editBtn
}

// função para excluir a transação no backend com botão de excluir
function createDeleteTransactionButton(id) {
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.textContent = 'Excluir'
    deleteBtn.addEventListener('click', async () => {
        await fetch(`http://localhost:3000/transactions/${id}`, { method: 'DELETE' })
        deleteBtn.parentElement.remove()
        const indexToRemove = transactions.findIndex((t) => t.id === id)
        transactions.splice(indexToRemove, 1)
        updateBalance()
    })
    return deleteBtn
}

// função para salvar a transação no backend quando o formulário for submetido
document.querySelector('form').addEventListener('submit', saveTransaction)