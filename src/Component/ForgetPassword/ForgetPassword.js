import React, { useRef } from 'react'

const ForgetPassword = () => {
   const inputEmail=useRef();
   function onForgetPassword(){

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB5buSelaweKxG7lYB7jVRdR7v-NJY-_DE',{
        method:'POST',
        body:JSON.stringify({
            requestType:"PASSWORD_RESET",
            email:inputEmail.current.value
        }),
        headers:{
            'Content-Type': 'application/json' 
        }
    })
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    
   }
  return (
    <div>
        <h4>Enter the eamil with which you have registered</h4>
        <input type='email'placeholder='Email' ref={inputEmail}/>
        <button onClick={onForgetPassword}>Send Link</button>
    </div>
  )
}

export default ForgetPassword