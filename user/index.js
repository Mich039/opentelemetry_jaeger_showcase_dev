
var express = require('express');
var bp = require('body-parser')

// constants
const DEFAULT_PORT = 8888;
const DEFAULT_HOST_PAYMENT_SERVICE = 'localhost';
const DEFAULT_PORT_PAYMENT_SERVICE = 7777;
const PAYMENT_PATH = '/pay'

// variables
var app = express();
var users = []
users.push({
    user_id: 0,
    user_name: "admin",
    IBAN: "admin"
})

// configure json body
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }))


async function contact_payment_service(credit_amount) {
    var amount = credit_amount / 100;
    const response = await fetch('http://payment:7777/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "amount": amount })
    });

    return response.status
}

async function contact_rating_service(user_id) {
    const response = await fetch('http://localhost:7777/pay', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response
}



function create_new_user(req) {
    console.log("creating user from req body: ", req.body)
    var new_user = {
        "user_id": users.length,
        "user_name": req.body.user_name,
        "IBAN": req.body.IBAN
    }
    users.push(new_user)
    return new_user;
}


app.post('/user', function (req, res) {

    try {
        var new_user = create_new_user(req)
        res.status(201).send(new_user)
    } catch (error) {
        console.log(error)
        res.status(400).send("Server error: Could not create user!")
    }


});

app.post('/buy_credits', async function (req, res) {
    try {
        resp = contact_payment_service(req.body.credit_amount)
        const status_c = await resp;

        if (status_c == 200) {
            res.status(200).send("Payment successful!");
        } else {
            res.status(400).send("Payment not successful!");
        }

    } catch (error) {
        res.status(400).send("Payment not successful!");
    }
})

app.get('/:user_id', (req, res) => {
    console.log("getting user with id: ", parseInt(req.params.user_id))
    console.log("\t current user count:", users.length)
    if (parseInt(req.params.user_id) >= users.length) {
        res.status(400).send("User does not exist!")
    } else {
        const user = users[parseInt(req.params.user_id)]
        console.log("\t found user:", user)
        res.status(200).send(user)
    }
})

app.get('/ratings/:user_id', async function (req, res) {
    console.log("getting all ratings for user with id: ", parseInt(req.params.user_id))
    if (parseInt(req.params.user_id) >= users.length) {
        res.status(400).send("User does not exist!")
    } else {
        const user = users[parseInt(req.params.user_id)]
        console.log("\t found user:", user)

        try {
            resp = contact_rating_service(req.params.user_id)
            const re = await resp;

            if (re.status == 200) {
                res.status(200).send(re.body);
            } else {
                res.status(400).send("Rating search not successful");
            }

        } catch (error) {
            res.status(400).send("Rating search not successful");
        }


    }
})


app.listen(process.env.PORT || DEFAULT_PORT, () => {
    console.log("user service up and running!");
});