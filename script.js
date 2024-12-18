const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseDate = document.getElementById('expense-date');
const expenseCategory = document.getElementById('expense-category');
const expenseList = document.getElementById('expense-list');
const totalExpense = document.getElementById('total-expense');
const clearExpensesButton = document.getElementById('clear-expenses');
const filterCategory = document.getElementById('filter-category');

let total = 0;
let expenses = [];

expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value);
    const date = expenseDate.value;
    const category = expenseCategory.value;

    if (name === '' || isNaN(amount) || amount <= 0 || !date) {
        alert('Please enter a valid expense name, amount, and date.');
        return;
    }

    const expense = { name, amount, date, category };
    expenses.push(expense);

    addTransaction(expense);
    updateTotal(amount);

    expenseForm.reset();
});

function addTransaction(transaction) {
    const li = document.createElement('li');
    li.setAttribute('data-category', transaction.category);
    li.innerHTML = `${transaction.name} - ${transaction.date} (${transaction.category}) <span>$${transaction.amount.toFixed(2)}</span> <button class="delete-btn">X</button>`;

    li.querySelector('.delete-btn').addEventListener('click', function() {
        removeTransaction(li, transaction.amount);
    });

    expenseList.appendChild(li);
}

function updateTotal(amount) {
    total += amount;
    totalExpense.textContent = total.toFixed(2);
}

function removeTransaction(item, amount) {
    expenseList.removeChild(item);
    total -= amount;
    totalExpense.textContent = total.toFixed(2);
    const index = expenses.findIndex(transaction => transaction.amount === amount && transaction.name === item.textContent.split(' ')[0]);
    if (index !== -1) expenses.splice(index, 1);
}

clearExpensesButton.addEventListener('click', function() {
    expenseList.innerHTML = '';
    total = 0;
    totalExpense.textContent = total.toFixed(2);
    expenses = [];
});

filterCategory.addEventListener('change', function() {
    const category = filterCategory.value;
    const items = expenseList.querySelectorAll('li');

    items.forEach(item => {
        if (category === 'All' || item.getAttribute('data-category') === category) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});
