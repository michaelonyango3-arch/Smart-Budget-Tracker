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
