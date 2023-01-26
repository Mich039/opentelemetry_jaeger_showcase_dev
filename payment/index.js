
var express = require('express');

// constants
const DEFAULT_PORT = 7777;

// variables
var app = express();
var counter = -1;

function _UnexpectedPaymentException(message) {
    this.message = message;
    this.name = '_UnexpectedPaymentException';
}



app.post('/pay', function (req, res) {

    counter += 1
    console.log("counter: ", counter)
    // pick random outcome of the payment
    if (counter % 4 == 0) {
        //success and quick
        res.status(200).send("Payment successful!")
    } else if (counter % 4 == 1) {
        // unsuccessful payment (unauthorized) and quick
        res.status(401).send("Payment failed!")
    } else if (counter % 4 == 2) {
        //success and slow
        setTimeout(function () {
            res.status(200).send("Payment successful with long response time!")
        }, 5000);
    } else {
        // unsuccessful payment (unauthorized) and slow
        setTimeout(function () {
            res.status(401).send("Payment failed with long response time!")
        }, 5000);

    }
});

app.listen(process.env.PORT || DEFAULT_PORT, () => {
    console.log("listen port");
});