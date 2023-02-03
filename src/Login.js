import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        signInWithEmailAndPassword(auth,email,password)
            .then((auth) => {
                navigate('/');
            })
            .catch(error => alert(error.message))
        //  FIREBASE
    }

    const register = e => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth,email,password)
            .then((auth) => {
                //  it successfully created a new user with email and password
                if(auth){
                    navigate('/');
                }
            })
            .catch(error => alert(error.message)); 

        //  FIREBASE
    }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
            <h5>E-mail</h5>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

            <h5>Password</h5>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

            <button className="login__signInButton" onClick={signIn}>Sign In</button>
            <p className="terms">By continuing, you agree to AMAZON FAKE CLONE'S Conditions of Use and Privacy Notice.</p>

            <button className="login__registerButton" onClick={register}>Create your Amazon account</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
