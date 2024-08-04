const express = require("express");
const cors = require("cors");
require("dotenv").config();
const midtransClient = require("midtrans-client");
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/generate-transaction", (req, res) => {
  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SERVER_KEY,
  });

  const parameter = {
    transaction_details: {
      order_id: 'order-id-node-' + Math.round((new Date()).getTime() / 1000),
      gross_amount: 10000,
    },
  };

  snap.createTransaction(parameter).then((transaction) => {
    const transactionToken = transaction.token;
    res.send({ token: transactionToken });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
