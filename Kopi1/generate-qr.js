const midtransClient = require('midtrans-client');


let core = new midtransClient.CoreApi({
    isProduction: false, 
    serverKey: 'SB-Mid-server-zhLE5e-C3OLyt87SIvjadNRl', 
    clientKey: 'SB-Mid-client-D2MdSYuD1Gi3rlOe' 
});


function generateQrCode() {

    let parameter = {
        payment_type: 'qris',
        transaction_details: {
            order_id: 'order-id-node-' + Math.round((new Date()).getTime() / 1000),
            gross_amount: 10000 // nominal pembayaran
        }
    };


    core.charge(parameter)
        .then((transaction) => {

            let qrCodeUrl = transaction.actions.find(action => action.name === 'generate-qr-code').url;
            console.log('QR Code URL:', qrCodeUrl);
        })
        .catch((e) => {
            console.log('Error occurred:', e.message);
        });
}


generateQrCode();
