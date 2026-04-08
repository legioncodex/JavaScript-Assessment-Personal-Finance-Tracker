const expenses = [];
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function addExpense(description, amount, category) {
  id = 0;
  this.id = ++id;
  this.description = `${description}`;
  this.amount = amount;
  this.category = `${category}`;
  this.date = new Date().toLocaleDateString();
  this.message = `Expense added: ${description} - ${formatter.format(amount)} [${category}]`;

  expenses.push(this);
  console.log(this.message);
}

function listExpenses() {
  count = 0;
  if (expenses.length === 0) {
    console.log("No expenses recorded.");
    return;
  }
  for (const expense of expenses) {
    console.log(
      `${++count}. ${expense.description} - ${formatter.format(expense.amount)} [${expense.category}]`,
    );
  }
}

function calculateTotal() {
  total = 0;
  for (const expense of expenses) {
    total += expense.amount;
  }
  console.log(`Total expenses: ${formatter.format(total)}`);
}

function filterExpenses(category) {
  count = 0;
  if (filtered.length === 0) {
    console.log(`No expenses found for category: ${category}`);
    return;
  }
  const filtered = expenses.filter((expense) => expense.category === category);
  for (const expense of filtered) {
    console.log(
      `${++count}. ${expense.description} - ${formatter.format(expense.amount)} [${expense.category}]`,
    );
  }
}

function deleteExpense(id) {
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index !== -1) {
    expenses.splice(index, 1);
    console.log(`Expense deleted: ID ${id}`);
  } else {
    console.log(`Expense not found: ID ${id}`);
  }
}

function updateExpense(id, description, amount, category) {
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index !== -1) {
    expenses[index].description = `${description}`;
    expenses[index].amount = amount;
    expenses[index].category = `${category}`;
    console.log(`Expense updated: ID ${id}`);
  } else {
    console.log(`Expense not found: ID ${id}`);
  }
}
