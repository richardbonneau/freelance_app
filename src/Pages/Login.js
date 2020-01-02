import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { firebaseLogin, firebaseSignup } from "../_actions";
import styled from "styled-components";
import { MdEmail, MdVpnKey } from "react-icons/md";
import Loading from "../Components/Loading";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form`
  width: 250px;
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
  .form-btn-container {
    display: flex;
    justify-content: space-between;
  }
  .form-btn {
    display: block;
    padding: 10px;
    cursor: pointer;
    background: ${props => props.theme.blue};
    color: white;
  }
  .form-btn:hover {
    background: ${props => props.theme.blueHover};
  }
  .login-switch-btn {
    margin-left: 5px;
  }
`;
const RememberMeAndForgotPassword = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 25px;
  input[type="checkbox"] {
    width: auto;
    vertical-align: bottom;
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

  function displaySignup() {
    return (
      <>
        <h2>Signup</h2>
        <Form>
          <div className="input-container">
            <MdEmail />
            <input
              type="email"
              onChange={e => setSignupEmailInput(e.target.value)}
            />
          </div>
          <div className="input-container">
            <MdVpnKey />
            <input
              type="password"
              onChange={e => setSignupPasswordInput(e.target.value)}
            />
          </div>
          <div className="form-btn-container">
            <a className="form-btn" onClick={signupUser}>
              Sign up
            </a>
            <a
              className="form-btn login-switch-btn"
              onClick={() => toggleLoginOrSignup(false)}
            >
              Create Account
            </a>
          </div>
        </Form>
      </>
    );
  }
  function displayLogin() {
    return <> </>;
  }

  if (isAuthenticated) return <Redirect to="/dashboard" />;
  else if (isVerifying || isLoggingIn) return <Loading />;
  else
    return (
      <LoginContainer>
        <h1>
          Welcome to <span>Freelancify</span>
        </h1>

        <h2>{showSignup ? "Sign Up" : "Log In"}</h2>
        <Form>
          <div className="input-container">
            <MdEmail />
            <input
              type="email"
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
              onChange={e =>
                showSignup
                  ? setSignupPasswordInput(e.target.value)
                  : setLoginPasswordInput(e.target.value)
              }
            />
          </div>

          <RememberMeAndForgotPassword>
            <div>
              <input type="checkbox" checked={true} />
              Remember me
            </div>
            <div>Forgot password?</div>
          </RememberMeAndForgotPassword>
          {showSignup ? (
            <div className="form-btn-container">
              <a className="form-btn" onClick={signupUser}>
                Sign up
              </a>
              <a
                className="form-btn login-switch-btn"
                onClick={() => toggleLoginOrSignup(false)}
              >
                Create Account
              </a>
            </div>
          ) : (
            <div className="form-btn-container">
              <a className="form-btn" onClick={loginUser}>
                Login
              </a>
              <a
                className="form-btn signup-or-login"
                onClick={() => toggleLoginOrSignup(!showSignup)}
              >
                Use existing account
              </a>
            </div>
          )}
        </Form>
      </LoginContainer>
    );
}

export default Login;
