const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const expense = document.querySelector("#expense");
const category = document.querySelector("#category");
const expenseItems = document.querySelector('ul')

amount.addEventListener("input", () => {
  let value = amount.value.replace(/\D*/g, "");
  value = Number(value) / 100;

  amount.value = formatCurrencyBrl(value);
});

function formatCurrencyBrl(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category: {
      id: category.value,
      name: category.options[category.selectedIndex].text,
    },
    amount: amount.value,
    created_at: new Date(),
  };

  expenseAdd(newExpense)
});

function expenseAdd(newExpense) {
  try {
    const li = document.createElement('li')
    const categoryImg = document.createElement('img')
    const expenseInfo = document.createElement('div')
    const removeIcon = document.createElement('img')
    const expenseInfoName = document.createElement('strong')
    const expenseInfoCategory = document.createElement('span')
    const expenseAmount = document.createElement('span')
    
    categoryImg.setAttribute('src', `./img/${newExpense.category.id}.svg`)
    categoryImg.setAttribute('alt', `${newExpense.category.name}`)

    expenseInfoName.innerHTML = `${newExpense.expense}`
    expenseInfoCategory.innerHTML = `${newExpense.category.name}`

    expenseInfo.classList.add('expense-info')
    expenseInfo.append(expenseInfoName, expenseInfoCategory)

    expenseAmount.classList.add('expense-amount')
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.replace('R$ ', '')}`
    
    removeIcon.src = './img/remove.svg'
    removeIcon.classList.add('remove-icon')

    li.classList.add('expense')
    li.append(categoryImg, expenseInfo, expenseAmount, removeIcon)    
    expenseItems.append(li)

    countExpenseItems(expenseItems)

  } catch (err) {
    alert("Deu erro.");
    console.log(err);
  }
}

function countExpenseItems(expenseItemsList) {
  const numberOfItems = expenseItemsList.querySelectorAll('li').length
  document.querySelector('aside header p span').innerHTML = `${numberOfItems} despesas`
}

document.addEventListener('DOMContentLoaded', () => {
  countExpenseItems(expenseItems)
})