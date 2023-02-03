import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format"; 
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer'; 
import { useNavigate } from 'react-router-dom';

function Subtotal() {
    const navigate = useNavigate();
    const [{ basket } , dispatch] = useStateValue();
    const subtotal_price = basket.reduce(function(accumulator , current){
        return accumulator+current.price;
    }, 0);

  return (
    <div className="subtotal">
        <CurrencyFormat 
            renderText={(value) => (
                <>
                    <p>
                        {/* PART OF THE HOMEWORK */}
                        Subtotal ({basket.length} items): <strong>{value}  </strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox" /> This order contains a gift
                    </small>
                </>
            )}

            decimalScale={2}
            value={getBasketTotal(basket)} // PART OF THE HOMEWORK
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
        />
        <button onClick={e => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal