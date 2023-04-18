import React, { useRef } from 'react'

const SignupPage = () => {
   const emailInputRef=useRef()
   const passwordInputRef=useRef()
   const confirmInputPasswordRef=useRef()
function onSubmitHandler(e){
    e.preventDefault()
    const email=emailInputRef.current.value;
    const password=passwordInputRef.current.value;
    const confirmPassword=confirmInputPasswordRef.current.value;
    if(password===confirmPassword){
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwbCcow5NRjnP0jrgWCCdR_g0UiZX-vVI',{
            method:'POST',
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>res.json())
        .then(res=>alert('Account Successfully created',res))
        .catch(err=>alert('err'))
    }
}
  return (
    <div>
        <form onSubmit={onSubmitHandler}>
        <h1>SignUp</h1>
        <input type='text' placeholder='Email' ref={emailInputRef}/>
        <input type='password' placeholder='Password' ref={passwordInputRef}/>
        <input type='password' placeholder='Confirm Password' ref={confirmInputPasswordRef}/>
        <button >SignUP</button>
        </form>
        
    </div>
  )
}

export default SignupPage