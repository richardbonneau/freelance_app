import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import styled from 'styled-components';
import { myFirebase } from '../utils/fire.js'

const Container = styled.div`
    padding-left: 25px;
`

function Login() {
    const [signupEmailInput, setSignupEmailInput] = useState("");
    const [signupPasswordInput, setSignupPasswordInput] = useState("");
    const [loginEmailInput, setLoginEmailInput] = useState("");
    const [loginPasswordInput, setLoginPasswordInput] = useState("");

    const firebaseSignup=(e)=>{
        e.preventDefault();
        myFirebase.auth().createUserWithEmailAndPassword(signupEmailInput,signupPasswordInput).then(user=>{
            console.log("then user",user)
        })
    }
    const firebaseLogin=(e)=>{
        e.preventDefault();
        myFirebase.auth().signInWithEmailAndPassword(loginEmailInput,loginPasswordInput).then(user=>{
            console.log("then user",user)
        })
    }
    
  return (
      <Container>
          <h2>signup</h2>
          <form onSubmit={firebaseSignup}>
              <input type="text" onChange={(e)=>setSignupEmailInput(e.target.value)} />
              <input type="text" onChange={(e)=>setSignupPasswordInput(e.target.value)} />
              <input type="submit" />
          </form>
          <h2>login</h2>
          <form onSubmit={firebaseLogin}>
              <input type="text" onChange={(e)=>setLoginEmailInput(e.target.value)} />
              <input type="text" onChange={(e)=>setLoginPasswordInput(e.target.value)} />
              <input type="submit" />
          </form>
      </Container>
      
  );
}

export default Login;
