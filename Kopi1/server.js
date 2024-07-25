const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/check-status', async (req, res) => {
    try {
        const response = await axios.get('https://api.sandbox.midtrans.com/v2/fdbf876f-af86-4dc5-a172-2800165b9bb5/status', {
            headers: {
                'Authorization': 'Basic ' + Buffer.from('SB-Mid-server-zhLE5e-C3OLyt87SIvjadNRl:').toString('base64'),
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching transaction status:', error);
        res.status(500).json({ error: 'Error fetching transaction status' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
