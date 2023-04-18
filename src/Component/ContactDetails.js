import React, { useRef } from 'react'

const ContactDetails = () => {
    // const InputName=useRef();
    function onUpdateProfile(e){
    e.preventDefalut();
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBwbCcow5NRjnP0jrgWCCdR_g0UiZX-vVI',{
        method:'POST',
        body:{
            idToken:'',
            displayName:'',
            photoUrl:'',
            deleteAttribute:'',
            returnSecureToken:true
        },
        headers:{
           'Content-Type': 'application/json'
        }

    })
    }
  return (
    <>
    <div style={{display:'flex'}}>
        <h1>ContactDetails</h1>
        <button style={{ right:'0',marginLeft:'auto'}}>Cancle</button>
    </div>
    <form onSubmit={onUpdateProfile}>
            <label>Full Name:</label><input type='text'/>
            <label>Profile Photo url:</label><input type='text'/>
            <button >update</button>
            <hr/>
        </form>
    </>
  )
}

export default ContactDetails