import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { firebaseLogin, firebaseSignup} from "../_actions";
import styled from "styled-components";
import { myFirebase } from "../utils/fire.js";
import Loading from "../Components/Loading";

const Container = styled.div`
  padding-left: 25px;
`;

function Login() {

  const dispatch = useDispatch();

  const [signupEmailInput, setSignupEmailInput] = useState("");
  const [signupPasswordInput, setSignupPasswordInput] = useState("");
  const [loginEmailInput, setLoginEmailInput] = useState("");
  const [loginPasswordInput, setLoginPasswordInput] = useState("");

  const isLoggingIn = useSelector(state => state.auth.isLoggingIn);
  const loginError = useSelector(state => state.auth.loginError);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isVerifying = useSelector(state => state.auth.isVerifying);
  
const signupUser = (e) => {
    e.preventDefault();
    dispatch(firebaseSignup(signupEmailInput,signupPasswordInput));
  }

const loginUser = (e) => {
  e.preventDefault();
  dispatch(firebaseLogin(loginEmailInput,loginPasswordInput));
}

  

  if (isAuthenticated) return (<Redirect to="/dashboard" />);
  else if(isVerifying || isLoggingIn) return (<Loading />);
  else return (
    <Container>
      <h2>signup</h2>
      <form onSubmit={signupUser}>
        <input
          type="text"
          onChange={e => setSignupEmailInput(e.target.value)}
        />
        <input
          type="text"
          onChange={e => setSignupPasswordInput(e.target.value)}
        />
        <input type="submit" />
      </form>
      <h2>login</h2>
      <form onSubmit={loginUser}>
        <input type="text" onChange={e => setLoginEmailInput(e.target.value)} />
        <input
          type="text"
          onChange={e => setLoginPasswordInput(e.target.value)}
        />
        <input type="submit" />
      </form>
    </Container>
  );
}

export default Login;
