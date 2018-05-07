
const express = require('express');// setting up our dependecies
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AcC8DuZPmkZXbJfXFymLbg-GARUCrJn20FRl_RjolY_ASFLWJqY2TYGN83OQWYbMZ7C5p2kYfE4o9TSN',
  'client_secret': 'ECWpIa5byiJ-aCGQw6vOHPlNyXJK9d7_I8P6hDld7JbTzfdWL6LqVmYVT6dBM5mrBbkV2FdmkiGXUw2G'
});

const app = express();// setting up the app to express

app.set('view engine', 'ejs');  // Setting up the view to ejs


app.get('/', (req, res) =>  res.render('index')); // index route that renders the view


app.post('/pay', (req, res) => {
  // item info in the json object with redirecting urls in the payment route
    const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "All time hits of the decade",
                "sku": "001",
                "price": "400.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "400.00"
        },
        "description": "Entertainment at your doorstep.Exeperience the biggest classics of all time"
    }]
};
//passing the json object , to get payment object back.Then we will console log it
paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
     //current iteration for links array with rel attribute .Which directs towards the approval url
          if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});
//Route for success to extract the Payerid and paymentid
app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
//Create execute payment object and get the payerId
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "400.00"
        }
    }]
  };
// Call paypal.payment which will have the paymentId we have created.
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
});
});
//route for cancel the order
app.get('/cancel', (req, res) => res.send('Cancelled'));

app.listen(3000, () => console.log('Server Started')); // running our server on port 3000