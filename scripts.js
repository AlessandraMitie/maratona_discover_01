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

const Transaction = {
    all: [
        {
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021',
        },
        {
            description: 'Website',
            amount: 500000,
            date: '23/01/2021',
        },
        {
            description: 'Internet',
            amount: -20000,
            date: '23/01/2021',
        },
    ],

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)
        //splice vai esperar o número do index do array, e quantos elementos será deletados

        App.reload()
    },

    incomes() {
        let income = 0;
        //pegar todas as transações
        //para cada transacação,
        Transaction.all.forEach(transaction => {
            //se for maior que zero
            if(transaction.amount > 0) {
                //somar a uma variável e retornar a variável
                income += transaction.amount;
            }
        })
        return income;
    },

    expenses() {
        //somar as saídas
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense;
    },

    total() {
        //entradas - saídas
        return Transaction.incomes() + Transaction.expenses()
    }
}

// substituir os dados do html com os dados do js
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description"> ${transaction.description} </td>
            <td class="${CSSclass}"> ${amount} </td>
            <td class="date"> ${transaction.date} </td>
            <td>
                <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
            </td>
        `
        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value) {
        value = Number(value) * 100

        return value;
    },

    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

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

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date:document.querySelector('input#date'),

    //pegar os valores e deixar guardado na função getValues
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    // formatData() {
    //     console.log('formatar os dados')
    // },

    validateFields() {
        const { description, amount, date } = Form.getValues()

        // console.log(description)
        //verificar se os campos estão vazios
        if( description.trim() === "" || amount.trim() === "" || date.trim() === "") {
                throw new Error("Por favor, preencha todos os campos")
        }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        //para não fazer o evento padrão de enviar as informações na url
        event.preventDefault()

        try {
            //verificar se todas as innformações foram preenchidas
            Form.validateFields()

            //formatar os dados para salvar
            const transaction = Form.formatValues()

            //salvar
            Transaction.add(transaction)

            //apagar os dados do formulário
            Form.clearFields()

            //modal feche
            Modal.close()
        } catch (error) {
            console.log(error.message)
            alert(error.message)
        }
        
    }

}


const App = {
    init() {
        //para cada elemento dentro de transactions, vai rodar a função transaction, que vai rodar a funcionalidade e passar a transaction do momento
        Transaction.all.forEach((transaction, index) => {
            DOM.addTransaction(transaction, index)
        })

        DOM.updateBalance()

    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()