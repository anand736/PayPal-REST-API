# Node.js PayPal REST SDK Sample

Example showing how to use the PayPal REST SDK with Node.js to take a payment
To create shopping cart,invoice etc.Documentation is not that great, lot of samples spread out on the web
but doesn't provides a streamline workflow.
Step 1- Create sandbox accounts for buyer and merchant to test your app on sandbox.paypal.com.Check for the client id and client secret for config paramters.Check your profile by logging in one of the accounts.
Step II - Set up the environment by installing the nodeJS and npm.Create a package json file with npm init.
Step III - Set up the express server ,dependencies and view in the app.js file.
Step IV- Replace your client id and secret in from your app credentials.Change the mode to live from sandbox when your app goes live.
Step V - Create the pay route.It's a post request.Create a json object for an item.(can be multiple items).With the cancel and return url.Include the json object in our pay route.Edit the item info.
The item details can be included as part of fiels in the form in view.
Step VI- Pass the json object in payment.create method
Test it with res.send('test').
We can check the console and will find payment id, transaction info ,array links and approval url where user will be directed given by the payment object.
Step VII- A loop through the links array and find the approval URL to send the user to it
Try to initiate the payment, and it will redirect to the success page but will throw an error CANNOT GET Success(where we can see the payment id, token and the payer id in the URL)
Step VIII- We will create an execute object and will extract the payer id fromthe URL
and call the paypal.payment method .Set the cancel route
Step IX- Console will display the transaction info with details like shipping address, transid etc
### Version
1.0.0

## Usage

### Installation

Install the dependencies
$ npm install --save paypal-rest-sdk express ejs

npm install --nodemon

### Serve
To serve in the browser

```sh
$ npm start
```

## App Info

### Author

Anand Jain


### Version

1.0.0

### License

This project is licensed under the MIT License