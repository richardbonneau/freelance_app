import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { firebaseLogin, firebaseSignup } from "../_actions";
import styled from "styled-components";
import { MdEmail, MdLock } from "react-icons/md";
import Loading from "../Components/Loading";
import { Anchor } from "../utils/globalStyledComponents";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
const Container = styled.div`
  display:flex;
  height:100vh;
`
const SplashContainer = styled.div`
  display:none;
  background:url("/images/login-splash.jpg");
  min-width: 500px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media(min-width:1000px){
    display:block;
  }
`
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  width:100%;
  background: url(/images/login-background.jpg);
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
`;
const Form = styled.form`
  width: 280px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 15px;
  background:white;
  
  @media(min-width:400px){
    width: 335px;
    padding:30px;
  }
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
  .footer{
    display:flex;
    justify-content:space-around;
  }
`;
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 5px 0;
  border-width: 1px;
  border-style: solid;

  border-color: ${({ error }) => (error ? "#940300" : "#c4c4c4")};
  transition: all 300ms ease-out 10ms;
  svg{
    color:${({ error }) => (error ? "#940300" : "#c4c4c4")};
  }
`

function Login() {
  const dispatch = useDispatch();
  const [signupEmailInput, setSignupEmailInput] = useState("");
  const [signupPasswordInput, setSignupPasswordInput] = useState("");
  const [signupRepeatPasswordInput, setSignupRepeatPasswordInput] = useState("");
  const [loginEmailInput, setLoginEmailInput] = useState("");
  const [loginPasswordInput, setLoginPasswordInput] = useState("");
  const [showSignup, toggleLoginOrSignup] = useState(false);



  const isLoggingIn = useSelector(state => state.auth.isLoggingIn);
  const loginError = useSelector(state => state.auth.loginError);
  const errorType = useSelector(state => state.auth.errorObj);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isVerifying = useSelector(state => state.auth.isVerifying);
  console.log("loginError", loginError, errorType)
  const signupUser = e => {
    e.preventDefault();
    if (signupPasswordInput === signupRepeatPasswordInput)
      dispatch(firebaseSignup(signupEmailInput, signupPasswordInput));
    else Alert.error("Passwords don't match", {
      position: 'top',
      effect: 'scale',
    })
  };

  const loginUser = e => {
    e.preventDefault();
    dispatch(firebaseLogin(loginEmailInput, loginPasswordInput));
  };

  useEffect(() => {
    Alert.error(errorType.message, {
      position: 'top',
      effect: 'scale',
    })
  }, [loginError]);

  if (isAuthenticated) return <Redirect to="/dashboard" />;
  else if (isVerifying || isLoggingIn) return <Loading />;
  else
    return (
      <Container>
        <SplashContainer>

        </SplashContainer>
        <LoginContainer>
          <Form>
            {showSignup ?

              // SIGNUP

              <>
                <h1>Sign Up</h1>
                <div>Let's create your Freelancify account to get you started.</div>

                <InputContainer error={loginError && errorType.code !== "auth/weak-password"}>
                  <MdEmail />
                  <input
                    type="email"
                    placeholder="E-Mail"
                    value={signupEmailInput}
                    onChange={e => setSignupEmailInput(e.target.value)}
                  />

                </InputContainer>
                <InputContainer error={loginError && errorType.code === "auth/weak-password"} >
                  <MdLock />
                  <input
                    type="password"
                    placeholder="Password"
                    value={signupPasswordInput}
                    onChange={e => setSignupPasswordInput(e.target.value)}
                  />
                </InputContainer>
                <InputContainer error={loginError && errorType.code === "auth/weak-password"} >
                  <MdLock />
                  <input
                    type="password"
                    placeholder="Repeat Password"
                    value={signupRepeatPasswordInput}
                    onChange={e => setSignupRepeatPasswordInput(e.target.value)}
                  />
                </InputContainer>    <a className="form-btn" onClick={signupUser}>Sign up</a>
                <div className="footer"><Anchor onClick={() => toggleLoginOrSignup(false)}>Log In </Anchor></div>
              </>



              // LOGIN
              : (<><h1>
                Welcome to <span>Freelancify</span>
              </h1>
                <div className="header-text-container">
                  <div>Log in to your Freelancify account to get started.</div>

                </div>
                <InputContainer error={loginError && errorType.code !== "auth/weak-password"}>
                  <MdEmail />
                  <input
                    type="email"
                    placeholder="E-Mail"
                    value={loginEmailInput}
                    onChange={e => setLoginEmailInput(e.target.value)}
                  />

                </InputContainer>
                <InputContainer error={loginError && errorType.code === "auth/weak-password"} >
                  <MdLock />
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginPasswordInput}
                    onChange={e => setLoginPasswordInput(e.target.value)}
                  />
                </InputContainer>


                <a className="form-btn" onClick={loginUser}>Login</a>
                <div className="footer"><Anchor href="#">Forgot password?</Anchor><Anchor onClick={() => toggleLoginOrSignup(true)}>Sign Up </Anchor></div> </>)
            }

          </Form>
          <Alert stack={{ limit: 1 }} />
        </LoginContainer>

      </Container>

    );
}

export default Login;
