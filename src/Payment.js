import { Card } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import axios from './axios';
import { db } from './firebase';

function Payment() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded , setSucceeded] = useState(false);
  const [processing , setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret , setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        //  Stripe expects the total currency in subunits
        url: `/payments/create?total=${ getBasketTotal(basket) }`
      }); 
      setClientSecret(response.data.clientSecret);
    }

    getClientSecret();
  } , [basket]);

  console.log('THE SECRET IS >>>> ' , clientSecret); 

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff .....
    event.preventDefault();
    setProcessing(true); 

    const payload = await stripe.confirmCardPayment(clientSecret , {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {
      //  paymentIntent = payment Confirmation

      console.log("it is NOT working  .....!!");

      db
        .collection('users')
        .doc(user.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
           basket: basket,
           amount: paymentIntent.amount,
           created: paymentIntent.created,
          }).then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        
      
      console.log("helllooowwwuuuuuuuu");
      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type: 'EMPTY_BASKET'
      });
      
      navigate('/orders' , {replace: true});
    }); 

  };

  const handleChange = (event) => {
    //  Listen for the changes in the CardElement
    //  and display any error as the customers type their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : ""); 
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket.length} items</Link>)
        </h1>

        {/* Payment Section ->  Delivery Address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user && user.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment Section ->  Reviewing Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment Section ->  Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will go */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                        <h3>Order Total: {value}</h3>
                  )} 
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* Error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
