import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import styled from 'styled-components';
import { myFirebase } from '../utils/fire.js'

const Container = styled.div`
    padding-left: 25px;
`

function Login() {
    let signup=()=>{
        myFirebase.auth().createUserWithEmailAndPassword("user@gmail.com","passss").then(user=>{
            console.log("then user",user)
        })
    }
  return (
      <Container>
          <h2>signup</h2>
          <button onClick={signup}>signup</button>
      </Container>
      
  );
}

export default Login;
