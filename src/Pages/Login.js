import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { firebaseLogin, firebaseSignup } from "../_actions";
import styled from "styled-components";
import { MdEmail, MdVpnKey } from "react-icons/md";
import Loading from "../Components/Loading";
import { Anchor } from "../utils/globalStyledComponents";

const Container = styled.div`
  display:flex;
  height:100vh;
`
const SplashContainer = styled.div`
  background:url("/images/login-splash.jpg");
  width: 500px;
  max-width:500px;
  min-width:500px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;
  h1{
    padding: 15px 0px;
  }
`;
const Form = styled.form`
  width: 335px;
  .header-text-container{
    margin: 20px 0;
  }
  input {
    border: none;
    width: 100%;
    padding: 10px;
    height: 100%;
  }
  input:focus {
    outline: none;
  }
  svg {
    padding-left: 10px;
    height: 25px;
    width: 25px;
    color: #828282;
  }
  .input-container {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 5px 0;
    border: 1px solid #ddd;
  }

  .form-btn {
    display: block;
    padding: 10px;
    cursor: pointer;
    background: ${props => props.theme.blue};
    color: white;
    text-align:center;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .form-btn:hover {
    background: ${props => props.theme.blueHover};
  }
  .login-switch-btn {
    margin-left: 5px;
  }
`;

function Login() {
  const dispatch = useDispatch();

  const [signupEmailInput, setSignupEmailInput] = useState("");
  const [signupPasswordInput, setSignupPasswordInput] = useState("");
  const [loginEmailInput, setLoginEmailInput] = useState("");
  const [loginPasswordInput, setLoginPasswordInput] = useState("");
  const [showSignup, toggleLoginOrSignup] = useState(true);

  const isLoggingIn = useSelector(state => state.auth.isLoggingIn);
  const loginError = useSelector(state => state.auth.loginError);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isVerifying = useSelector(state => state.auth.isVerifying);

  const signupUser = e => {
    e.preventDefault();
    dispatch(firebaseSignup(signupEmailInput, signupPasswordInput));
  };

  const loginUser = e => {
    e.preventDefault();
    dispatch(firebaseLogin(loginEmailInput, loginPasswordInput));
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;
  else if (isVerifying || isLoggingIn) return <Loading />;
  else
    return (
      <Container>
        <SplashContainer>

        </SplashContainer>
        <LoginContainer>

          <h1>
            Welcome to <span>Freelancify</span>
          </h1>

          <Form>
            <div className="header-text-container">
              <div>Log in to your Freelancify account to get started.</div>
              {
                showSignup
                  ? <div>If you already have an account, <Anchor onClick={() => toggleLoginOrSignup(false)}>Log In </Anchor></div>
                  : <div>If you are a new user, <Anchor onClick={() => toggleLoginOrSignup(true)}>Sign Up </Anchor></div>
              }
            </div>

            <div className="input-container">
              <MdEmail />
              <input
                type="email"
                placeholder="E-Mail"
                onChange={e =>
                  showSignup
                    ? setSignupEmailInput(e.target.value)
                    : setLoginEmailInput(e.target.value)
                }
              />
            </div>
            <div className="input-container">
              <MdVpnKey />
              <input
                type="password"
                placeholder="Password"
                onChange={e =>
                  showSignup
                    ? setSignupPasswordInput(e.target.value)
                    : setLoginPasswordInput(e.target.value)
                }
              />
            </div>



            {showSignup ? (

              <a className="form-btn" onClick={signupUser}>Sign up</a>)
              : (<a className="form-btn" onClick={loginUser}>Login</a>)
            }
            <Anchor href="#">Forgot password?</Anchor>
          </Form>

        </LoginContainer>
      </Container>

    );
}

export default Login;
