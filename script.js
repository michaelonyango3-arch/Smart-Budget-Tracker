// Get transactions from localStorage
function getTransactions() {
    return JSON.parse(localStorage.getItem("transactions")) || [];
}

// Save transactions
function saveTransactions(transactions) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add Transaction
const form = document.getElementById("transactionForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const description = document.getElementById("description").value.trim();
        const amount = parseFloat(document.getElementById("amount").value);
        const type = document.getElementById("type").value;
        const category = document.getElementById("category").value.trim();
        const date = document.getElementById("date").value;
        const error = document.getElementById("formError");

        if (!description || !amount || amount <= 0 || !category || !date) {
            error.textContent = "Please fill all fields correctly.";
            return;
        }

        const transactions = getTransactions();

        const newTransaction = {
            id: Date.now(),
            description,
            amount,
            type,
            category,
            date
        };

        transactions.push(newTransaction);
        saveTransactions(transactions);

        window.location.href = "index.html";
    });
}

// Display Transactions on Dashboard
function displayDashboard() {
    const list = document.getElementById("transactionList");
    if (!list) return;

    const transactions = getTransactions();
    const noMsg = document.getElementById("noTransactions");

    list.innerHTML = "";

    if (transactions.length === 0) {
        noMsg.textContent = "No transactions yet.";
        return;
    }

    noMsg.textContent = "";

    let income = 0;
    let expenses = 0;

    transactions.forEach(t => {
        const li = document.createElement("li");
        li.textContent = `${t.description} - $${t.amount} (${t.type})`;
        list.appendChild(li);

        if (t.type === "income") {
            income += t.amount;
        } else {
            expenses += t.amount;
        }
    });

    document.getElementById("income").textContent = "$" + income;
    document.getElementById("expenses").textContent = "$" + expenses;
    document.getElementById("balance").textContent = "$" + (income - expenses);
}

// Reports Page
function displayReports() {
    const incomeEl = document.getElementById("reportIncome");
    if (!incomeEl) return;

    const transactions = getTransactions();

    let income = 0;
    let expenses = 0;

    transactions.forEach(t => {
        if (t.type === "income") {
            income += t.amount;
        } else {
            expenses += t.amount;
        }
    });

    document.getElementById("reportIncome").textContent = "$" + income;
    document.getElementById("reportExpenses").textContent = "$" + expenses;
    document.getElementById("reportBalance").textContent = "$" + (income - expenses);
}

// Run functions
displayDashboard();
displayReports();
