// =======================================
// SMART BUDGET TRACKER
// =======================================

const STORAGE_KEY = "smart budget transactions"

// =============================
// LOCAL STORAGE FUNCTIONS
// =============================

function getTransactions () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveTransactions(transactions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}

function formatCurrency(amount) {
    return "Ksh" + amount.toLocaleString ("en-KE", {
        minimumFractionDigits: 2
    });
}

// =============================
// DELETE TRANSACTION
// =============================

function deleteTransaction(id) {
    const transactions = getTransactions().filter(t=> t.id !== id);
    saveTransactions(transactions);
    loadDashboard();
    loadReports();
}

// =============================
// EDIT TRANSACTION
// =============================

function editTransaction(id) {
    const transactions = getTransactions();
    const transaction = transactions.find(t => t.id === id);

    if (!transaction) return;

    //Save to temporary storage for editing
    localStorage.setItem("editTransactionId", id);

    //Redirect to add page
    window.location.href = "add html";
}

// =============================
// HANDLE ADD / EDIT FORM
// =============================


const form = document.getElementById("transactionForm");

if (form) {
    const editId = localStorage.getItem("editTransactionId");
    const transactions = getTransactions();

    //If editing, pre-fill form
    if (editId) {
        const transaction = transactions.find(t => t.id == editId);
        if (transaction) {
            document.getElementById("description").value = transaction.description;
            document.getElementById("amount").value = transaction.amount;
            document.getElementById("type").value = transaction.type;
            document.getElementById("category").value = transaction.category;
            document.getElementById("date").value = transaction.date;
        }
    }

    form.addEventListener("submit", function (e){
        e.preventDefault();
        const description = document.getElementById("description").value.trim();
        const amount = parseFloat(document.getElementById("amount").value);
        cosnt type = document.getElementById("type").value;
        const category = document.getElementById("category").value.trim();
        const date = document.getElementById("date").value;
        const error = document.getElementById("formError");

        if (!description || isNaN(amount) || amount<= 0 || !category ||  !date) {
            error.textContent = "Please enter valid transaction details.";
         }

         error.textContent = "";
         if (editId) {
            // Update existing transaction
            const UpdatedTransactions = transactions.map( t => t.id == editId
                ? { ...t, description, amount, type, category, date}: t
            );

            saveTransactions(UpdatedTransactions);
            localStorage.removeItem('editTransactionId');
         } else {
            // Add new transaction
            const newTransaction = {
                id: Date.now(),
                description,
                amount,
                type,
                category,
                date,
            };
            transactions.push(newTransaction);
            saveTransactions(transactions);
         }
         window.location.href = "index.html";
        
        
    })
}

// =============================
// LOAD DASHBOARD
// =============================


function loadDashboard() {
    const transactions = getTransactions();

    const balanceEl = document.getElementById("balance");
    if (!balanceEl) return;

    const incomeEl = document.getElementById("income");
    const expenseEl = document.getElementById("expenses");
    const listEl = document.getElementById("transactionList");
    const noTransactions = document.getElementById("noTransactions");

    let income = 0;
    let expenses = 0;

    listEl.innerHTML = "";

    if (transactions.length === 0) {
        noTransactions.textContent = "No transactions yet.";
        } else {
        noTransactions.textContent = "";

        transactions.forEach(t => {
            if (t.type === "income") income += t.amount;
            else expenses += t.amount;

            const li = document.createElement("li");
            li.classList.add(t.type === "income" ? "income-item" : "expense-item");

              li.innerHTML = `
                <div>
                    <strong>${t.description}</strong><br>
                    <small>${t.category} | ${t.date}</small>
                </div>
                <div>
                    ${formatCurrency(t.amount)}
                    <br>
                    <button onclick="editTransaction(${t.id})">Edit</button>
                    <button onclick="deleteTransaction(${t.id})" style="background:#dc2626;margin-left:5px;">Delete</button>
                </div>
            `;

             listEl.appendChild(li);
        });
    }

    const balance = income - expenses;

    incomeEl.textContent = formatCurrency(income);
    expenseEl.textContent = formatCurrency(expenses);
    balanceEl.textContent = formatCurrency(balance);
}

// =============================
// LOAD REPORTS
// =============================


function loadReports() {
    const transactions = getTransactions();

    const reportIncome = document.getElementById("reportIncome");
    const reportExpenses = document.getElementById("reportExpenses");
    const reportBalance = document.getElementById("reportBalance");


     if (!reportExpenses) return;

    let income = 0;
    let expenses = 0;


    transactions.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expenses += t.amount;
    });


    const balance = income - expenses;

    if (reportIncome) reportIncome.textContent = formatCurrency(income);
    reportExpenses.textContent = formatCurrency(expenses);
    reportBalance.textContent = formatCurrency(balance);
}

