Smart Budget Tracker

A simple, fully functional budget tracking web app that allows users to manage income and expenses, view transaction history, and monitor their financial summary. Built with HTML, CSS, and JavaScript, the app uses localStorage to persist data across sessions.

Table of Contents

Features

Screenshots

Technologies Used

Installation

Usage

File Structure

Future Enhancements

License

Features

Add Transactions – Record income or expenses with description, category, and date.

Edit Transactions – Update existing transactions easily.

Delete Transactions – Remove any transaction from the list.

Dashboard Summary – View total income, expenses, and balance at a glance.

Reports Page – See a clean financial summary with total income, total expenses, and remaining balance.

Persistent Storage – All transactions are saved in the browser’s localStorage.

Responsive Design – Works well on desktop, tablet, and mobile devices.

Currency Formatting – Displays amounts in Kenyan Shillings (Ksh) with proper formatting.

Screenshots

Dashboard:


Add Transaction:


Reports:


(Replace the above with actual screenshots in your repo)

Technologies Used

HTML5 – Semantic structure and forms.

CSS3 – Flexbox, Grid, and responsive design with CSS variables.

JavaScript (ES6) – DOM manipulation, events, localStorage, and data handling.

Installation

Clone the repository:

git clone https://github.com/your-username/smart-budget-tracker.git


Navigate to the project folder:

cd smart-budget-tracker


Open index.html in your browser.

No backend or server setup is required, as all data is stored locally in the browser.

Usage

Open the app in a browser.

Navigate to Add Transaction to input income or expenses.

View transactions on the Dashboard.

Edit or delete transactions directly from the dashboard.

Check financial summaries on the Reports page.

All your transactions are saved automatically and persist between browser sessions.

File Structure
smart-budget-tracker/
│
├── index.html         # Dashboard page
├── add.html           # Add/Edit transaction page
├── reports.html       # Reports page
├── styles.css         # Main stylesheet
├── script.js          # JavaScript logic
└── README.md          # Project documentation

Future Enhancements

Add category-wise expense breakdown with charts.

Include monthly/weekly filtering for transactions.

Implement dark mode toggle.

Convert into a Single Page Application (SPA) for smoother user experience.

Add export/import CSV for backup.# Smart-Budget-Tracker