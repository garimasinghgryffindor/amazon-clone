import React from 'react';
import "./Checkout.css";
import { useStateValue } from './StateProvider';
import Subtotal from "./Subtotal";
import CheckoutProduct from './CheckoutProduct';
import FlipMove from 'react-flip-move';

function Checkout() {
  const [{ basket , user } , dispatch] = useStateValue ();

  return (
    <div className="checkout">
         <div class="checkout__left">
            <img className="checkout__ad" src="https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/AUX/ILB_BrightColors_Approved._TTW_.jpg" alt="" />
            <div>
                <h3>Hello, {user &&  user.email}</h3>
                <h2 class="checkout__title">Your shopping Basket</h2>

                {basket.map(item => (
                  <CheckoutProduct 
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating }
                  />
                ))}
      
            </div>
         </div>

         <div className="checkout__right">
            <Subtotal />
         </div>
    </div>
  )
}

export default Checkout