import "./App.css";
import React, { useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Checkout from "./Checkout";
import Payment from "./Payment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe('pk_test_51LjavgSGUnr5PdwaULmjEv956civKOR6n8tMtOwpfoDDwIxwm83YK3bbET2O1tQ6FaLXW7mupfazLRyNArjCdgXU00lAnIc5S1')

function App() {
  const [{} , dispatch] = useStateValue ();

  useEffect(() => {
    // will only run once when the app component loads....   (This is like a dynamic IF statement)
    
    auth.onAuthStateChanged(authUser => {
      console.log("THE USER IS >>>> ",authUser);

      if(authUser){
        //  the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //  the user is logged out
         dispatch({
          type: 'SET_USER',
          user: null
         })
      }
    })
  }, [])

  //   BEM
  return (
    <Router>
    <div className="app">
    
      <Routes>

        <Route 
          path="/login"
          element={<div>
            <Login />
          </div>}>
        </Route>
        <Route 
          path="/checkout" 
          element={<div>
            <Header/>
            <Checkout />
          </div>}>
        </Route> 
        <Route 
          path="/payment" 
          element={<div>
            <Header/>
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </div>}>
        </Route>
        <Route 
          path="/orders"  
          element={<div>
            <Header />
            <Orders   />
          </div>}>
        </Route>
        <Route 
          path="/" 
          element={<div>
            <Header/>
            <Home/>
          </div>}>
        </Route> 

      </Routes>

      </div>
    </Router>
  );
}

export default App;
