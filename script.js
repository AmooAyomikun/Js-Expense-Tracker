const balanceEl = document.getElementById('balance')
const incomeEl = document.getElementById('income')
const expenseEl =  document.getElementById('expense')
const descriptionInputEl = document.getElementById('description-input')
const amountInputEl = document.getElementById('amount-input')
const addTransactionBtnEl = document.getElementById('add-transaction')
const historyListEl = document.getElementById('history-list')
const amountErrorMsg = document.getElementById('amountErrorMsg')
const errorMsgEl = document.getElementById('errorMsg')
const selectedError = document.getElementById('selectError')
const descriptionError = document.getElementById('descriptionError')
const categoriesEl = document.getElementById('categories')
const typeRadios = document.querySelectorAll('input[name="type"]')

let editId = null
let transactionArray = []

try {
    transactionArray = JSON.parse(localStorage.getItem('transactionArray')) || []
}catch {
    transactionArray = []
}

function updateLocalStorage(){
    localStorage.setItem('transactionArray', JSON.stringify(transactionArray))
}

function addTransaction(e){
    e.preventDefault()
    let descriptionValue = descriptionInputEl.value.trim()
    let amountValue = Number(amountInputEl.value)
    const selectedType = document.querySelector('input[name="type"]:checked')
    let selectedTypeValue = null;
    if(selectedType){
        selectedTypeValue = selectedType.value
    }

    let isValid = true
    if(!descriptionValue){
        descriptionError.style.visibility = 'visible'
        isValid=false
    }else{
        descriptionError.style.visibility = 'hidden'
    }

    if(amountValue <= 0 || isNaN(amountValue)){
        amountErrorMsg.style.visibility = 'visible'
        isValid = false
    }else {
        amountErrorMsg.style.visibility = 'hidden'
    }

    if(!selectedTypeValue){
        selectedError.style.visibility = 'visible'
        isValid = false
    }else{
        selectedError.style.visibility = 'hidden'
    }

    if(!isValid)return

    let transactionObj = {
        uniqueId: Date.now(),
        description: descriptionValue,
        amount: amountValue,
        type: selectedTypeValue,
        timeStamp: new Date().toDateString()
    }

    if(editId !== null){
        let index = transactionArray.findIndex(function(transaction){
            return transaction.uniqueId === editId
        })

        if(index !== -1){
            transactionArray[index].description = descriptionValue
            transactionArray[index].amount = amountValue
            transactionArray[index].type = selectedTypeValue
            transactionArray[index].timeStamp = new Date().toDateString()
        }
        editId = null
        addTransactionBtnEl.textContent = "Add Transaction"
    }else{
        transactionArray.push(transactionObj)
    }

    updateLocalStorage()
    categoriesEl.value = 'all'
    displayTransactionHistory()
    displayTransactionBalance()

    descriptionInputEl.value = ""
    amountInputEl.value = ""
    typeRadios.forEach(function(radio){
        radio.checked = false
    })
    descriptionError.style.visibility = 'hidden'
    amountErrorMsg.style.visibility = 'hidden'
    selectedError.style.visibility = 'hidden'
}

function displayTransactionHistory(data = transactionArray){
    historyListEl.innerHTML = ""

    if(data.length === 0){
        historyListEl.innerHTML = '<li>No transactions yet. Add your first transaction!</li>'

        return
    }

    [...data].reverse().forEach(function(transaction){
        let newList = document.createElement('li')
        newList.classList.add('transaction')
        if (transaction.type === 'income') {
            newList.classList.add('income')
        } else if (transaction.type === 'expense') {
            newList.classList.add('expense')
        }

        let leftDiv = document.createElement('div')
        leftDiv.classList.add('left')

        let paragraph = document.createElement('p')
        paragraph.textContent = transaction.description.toUpperCase()

        let small = document.createElement('small')
        small.textContent = transaction.timeStamp

        let rightDiv = document.createElement('div')
        rightDiv.classList.add('right')

        let span = document.createElement('span')
        if(transaction.type === 'income'){
            span.textContent = "+₦ " + transaction.amount.toLocaleString()
        }else if(transaction.type === 'expense'){
            span.textContent = "-₦ " + transaction.amount.toLocaleString()
        }
        
        let deleteBtn = document.createElement('button')
        deleteBtn.dataset.id = transaction.uniqueId
        deleteBtn.classList.add('delete-btn')
        deleteBtn.textContent = 'x'

        let editBtn = document.createElement('button')
        editBtn.dataset.id = transaction.uniqueId
        editBtn.classList.add('edit-btn')
        editBtn.textContent = '✏️'

        leftDiv.appendChild(paragraph)
        leftDiv.appendChild(small)

        rightDiv.appendChild(span)
        rightDiv.appendChild(editBtn)
        rightDiv.appendChild(deleteBtn)

        newList.appendChild(leftDiv)
        newList.appendChild(rightDiv)

        historyListEl.appendChild(newList)
    })
}

function displayTransactionBalance(data = transactionArray){
    let totalIncome = 0
    let totalExpense = 0

    data.forEach(function(transaction){
        if(transaction.type === 'income'){
            totalIncome += transaction.amount
        }else if(transaction.type === 'expense'){
            totalExpense += transaction.amount
        }
    })
    incomeEl.textContent = `+₦ ${totalIncome.toLocaleString()}`
    expenseEl.textContent = `-₦ ${totalExpense.toLocaleString()}`

    let totalBalance = totalIncome - totalExpense
    balanceEl.textContent = `₦ ${totalBalance.toLocaleString()}`
    if(totalBalance < 0){
        balanceEl.style.color = '#dc2626'
    }else{
        balanceEl.style.color = ''
    }
}

historyListEl.addEventListener('click', function(e){
    if(e.target.classList.contains('delete-btn')){
        const transactionId = Number(e.target.dataset.id)

        if(!confirm("Delete this transaction?")) return

        transactionArray = transactionArray.filter(function(transaction){
            return transaction.uniqueId !== transactionId
        })

        updateLocalStorage()
        displayTransactionHistory()
        displayTransactionBalance()
    }

    if(e.target.classList.contains('edit-btn')){
        const buttonId = Number(e.target.dataset.id)

        const findTransaction = transactionArray.find(function(transaction){
            return transaction.uniqueId === buttonId
        })

        if(findTransaction){
            editId = buttonId
            descriptionInputEl.value = findTransaction.description
            amountInputEl.value = findTransaction.amount

            addTransactionBtnEl.textContent = "Update Transaction" 
            typeRadios.forEach(function(radio){
                radio.checked = radio.value === findTransaction.type
            })
        }
    }
})

categoriesEl.addEventListener('change', function(){
    let filteredArray;
    let categoryValue = categoriesEl.value
    if(categoryValue === 'income'){
        filteredArray = transactionArray.filter(function(transaction){
            return transaction.type === 'income'
        })
    }else if(categoryValue === 'expense'){
        filteredArray = transactionArray.filter(function(transaction){
            return transaction.type === 'expense'
        })
    }else{
        filteredArray = transactionArray
    }

    displayTransactionHistory(filteredArray)
    displayTransactionBalance(filteredArray)
})


addTransactionBtnEl.addEventListener('click',addTransaction)
displayTransactionHistory()
displayTransactionBalance()


descriptionInputEl.addEventListener('input', function(){
    if(descriptionInputEl.value){
        descriptionError.style.visibility = 'hidden'
    }
})

typeRadios.forEach(function(radio){
    radio.addEventListener('change',function(){
        selectedError.style.visibility = 'hidden'
    })
})

amountInputEl.addEventListener('input', function(){
    if(amountInputEl.value){
        amountErrorMsg.style.visibility = 'hidden'
    }
})
