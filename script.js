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



