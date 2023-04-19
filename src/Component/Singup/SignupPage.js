import React, { useRef, useState } from "react";
import classes from "./SignupPage.module.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmInputPasswordRef = useRef();
  const [IsValid, setIsValid] = useState(true);
  const [IsLogedin, setIsLogedin] = useState(false);
  const Navigate = useNavigate();
  function onLogedIn() {
    setIsLogedin((prev) => !prev);
  }
  //********************************* form Validation       ***********==>START HERE<==
  function onEmailValidation(e) {
    if (e.target.value.trim().length > 12) {
      setIsValid(true);
    }
  }
  function onPasswordHandler(e) {
    if (e.target.value.trim().length > 7) {
      setIsValid(true);
    }
  }
  //******************************** form Validation        *************==>END HERE<==
  async function onSubmitHandler(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmInputPasswordRef.current.value;
    if (email.trim().length < 12 || !email.includes("@")) {
      setIsValid(false);
      alert("Please fill Correct Email Id");
      return;
    }
    if (password.trim().length < 8) {
      setIsValid(false);
      alert("Please Create a Strong password");
      return;
    }
    if (password === confirmPassword) {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwbCcow5NRjnP0jrgWCCdR_g0UiZX-vVI";
      if (IsLogedin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwbCcow5NRjnP0jrgWCCdR_g0UiZX-vVI";
      }

      try {
        const postApi = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (postApi.ok) {
          const responseData = await postApi.json();
          alert(
            IsLogedin ? "Login Successfull" : "Account Successfully created"
          );
          localStorage.setItem("token", responseData.idToken);
          Navigate("/Dummy");
        } else {
          const responseData = await postApi.json();
          throw responseData.error;
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Password and Confirm Password is not some");
    }
  }
  // ***************************** forget Page *******==> START HERE <==
  function onForgetPage() {
    Navigate("/forgetpage");
  }
  // ***************************** forget Page*******==> START HERE <==
  return (
    <>
      <div className={classes.maindiv}>
        <form onSubmit={onSubmitHandler}>
          <h1>{IsLogedin ? "Login" : "SignUp"}</h1>
          <input
            type="text"
            style={{
              background: `${IsValid ? "" : "#ffd7d7"}`,
              borderColor: `${IsValid ? "" : "red"}`,
            }}
            placeholder="Email"
            ref={emailInputRef}
            onChange={onEmailValidation}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
            onChange={onPasswordHandler}
            style={{
              background: `${IsValid ? "" : "#ffd7d7"}`,
              borderColor: `${IsValid ? "" : "red"}`,
            }}
          />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmInputPasswordRef}
            style={{
              background: `${IsValid ? "" : "#ffd7d7"}`,
              borderColor: `${IsValid ? "" : "red"}`,
            }}
          />
          <br />
          <button>{IsLogedin ? "Login" : "SignUP"}</button>
          <br />
          {IsLogedin && <button onClick={onForgetPage}>forget Password</button>}
        </form>
      </div>
      <div className={classes.seconddiv}>
        <button className={classes.loginbtn} onClick={onLogedIn}>
          {IsLogedin
            ? "Don't have an account? Signup"
            : "Have an account? Login"}
        </button>
      </div>
    </>
  );
};

export default SignupPage;
