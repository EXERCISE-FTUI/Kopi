document.getElementById('check-status').addEventListener('click', async () => {
    const statusElement = document.getElementById('status');
    
    try {
        const response = await fetch('/api/check-status');
        const data = await response.json();
        const status = data.transaction_status;
        
        if (status === 'settlement') {
            statusElement.textContent = 'Status: Transaction settled';
            document.getElementById('check-status').disabled = true;
        } else {
            statusElement.textContent = `Status: ${status}`;
        }
    } catch (error) {
        console.error('Error fetching transaction status:', error);
        statusElement.textContent = 'Status: Error checking transaction status';
    }
});
