document.getElementById('fetchTransactionsBtn').addEventListener('click', function() {
    console.log('Fetch Transactions button clicked');
    fetchTransactions();
});

function fetchTransactions() {
    const serverKey = 'SB-Mid-server-zhLE5e-C3OLyt87SIvjadNRl'; 
    const baseUrl = 'https://api.sandbox.midtrans.com/v1.0';
    const endpoint = '/transaction-history-list';

    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(serverKey + ':'));
    headers.append('Content-Type', 'application/json');

    console.log('Sending fetch request to Midtrans');

    fetch(baseUrl + endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "page": 1,
            "per_page": 10
        })
    })
    .then(response => {
        console.log('Response received:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
        displayTransactions(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayTransactions(data) {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';

    if (data && data.transactions) {
        data.transactions.forEach(transaction => {
            const transactionItem = document.createElement('div');
            transactionItem.textContent = `Transaction ID: ${transaction.transaction_id}, Amount: ${transaction.gross_amount}, Status: ${transaction.transaction_status}`;
            transactionList.appendChild(transactionItem);
        });
    } else {
        transactionList.textContent = 'No transactions found.';
    }
}
