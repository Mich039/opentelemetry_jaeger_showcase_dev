
var express = require('express');
const bp = require('body-parser')

// constants
const DEFAULT_PORT = 7777;
const DEFAULT_WAIT_TIME = 5000;

// variables
var app = express();
var counter = -1;

// configure json body
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }))


app.post('/pay', function (req, res) {
    counter += 1
    // pick random outcome of the payment
    if (counter % 4 == 0) {
        //success and quick
        res.status(200).send(`Payment successful for ${req.body.amount} euros!`)
    } else if (counter % 4 == 1) {
        // unsuccessful payment (bad request) and quick
        res.status(400).send("Payment failed!")
    } else if (counter % 4 == 2) {
        //success and slow
        setTimeout(function () {
            res.status(200).send(`Payment successful for ${req.body.amount} with long response time!`)
        }, DEFAULT_WAIT_TIME);
    } else {
        // unsuccessful payment (bad request) and slow
        setTimeout(function () {
            res.status(400).send("Payment failed with long response time!")
        }, DEFAULT_WAIT_TIME);

    }
});


app.listen(process.env.PAYMENT_SERVICE_PORT || DEFAULT_PORT, () => {
    console.log("payment service up and running!");
});