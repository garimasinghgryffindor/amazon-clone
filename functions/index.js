/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51LjavgSGUnr5PdwakZ1qZniUEKYwDq8rQQNhjdDleLvbB6KlqivQo5gGJv9cCjG1aGkjUdIkj1YW8egpnV6jxnaZ00nQDUtdSf");


//  API

//  - App Config
const app = express();

//  - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

//  - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "inr",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//  - Listen Command
exports.api = functions.https.onRequest(app);

//  Example Endpoint
// http://localhost:5001/clone-e7677/us-central1/api).

