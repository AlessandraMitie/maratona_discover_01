const Modal = {
    open(){
        document
            .querySelector('.modal-overlay')
            .classList.add('active')
    },
    close(){
        document
            .querySelector('.modal-overlay')
            .classList.remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
]

const Transaction = {
    incomes() {
        //somar as entradas
    },

    expenses() {
        //somar as saídas
    },

    total() {
        //entradas - saídas
    }
}

// substituir os dados do html com os dados do js
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description"> ${transaction.description} </td>
            <td class="${CSSclass}"> ${amount} </td>
            <td class="date"> ${transaction.date} </td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        `
        return html
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")
        // regex: tudo que vem entre / / é um regex
        // \D significa que vai pegar tudo que nao for número
        //g significa que a busca é global

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            //estilo de formatação: moeda
            style: "currency",
            //que tipo de moeda:
            currency: "BRL"
        })

        return signal + value
    }
}

//para cada elemento dentro de transactions, vai rodar a função transaction, que vai rodar a funcionalidade e passar a transaction do momento
transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})