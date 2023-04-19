import React, { useEffect, useRef, useState } from 'react'
import './ContactDetails.css'
const ContactDetails = () => {
    const InputName=useRef();
    const InputUrl=useRef();
    const [userDetails,setUserDetails]=useState({
        name:'',
        url:''
    })
    useEffect(() => {
        const token = localStorage.getItem("token");
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBwbCcow5NRjnP0jrgWCCdR_g0UiZX-vVI',{
        method:'POST',
        body:JSON.stringify({
            idToken:token
        })
      })
        .then((res)=>res.json())
        .then(res=>{
            console.log(res)
            setUserDetails({
                name:res.users[0].displayName,
                url:res.users[0].photoUrl
            })
        })
        .catch(err=>alert('Error in get request',err))
    },[])
    
    function onUpdateProfile(e){
    e.preventDefault();

    const Name=InputName.current.value;
    const Url=InputUrl.current.value;
    const Token=localStorage.getItem('token')
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBwbCcow5NRjnP0jrgWCCdR_g0UiZX-vVI',{
        method:'POST',
        body:JSON.stringify({
            idToken:Token,
            displayName:Name,
            photoUrl:Url,
            // deleteAttribute:'',
            returnSecureToken:true
        }),
        headers:{
           'Content-Type': 'application/json'
        }

    }).then(res=>res.json())
    .then((res)=>{
        console.log(res);
   
    }).catch(err=>console.log(err))
    }
  return (
    <>
    <div className='maindiv'>
<table className='table'>
    <tbody>
        <tr>
            <td><h1 id='h1'>ContactDetails</h1></td>
        <td ><button id='b1'>Cancle</button> </td>
        </tr>
    </tbody>
</table>
        
         
        <form onSubmit={onUpdateProfile}>
            <table>
                <tbody>
                    <tr>
                        <td  className='td'><label>Full Name:</label></td>
                    <td className='td'> <input type='text' defaultValue={userDetails.name} ref={InputName}/></td>
                    <td className='td'> <label>Profile Photo url:</label></td>
                    <td className='td'><input type='url' defaultValue={userDetails.url} ref={InputUrl}/></td>
                    </tr>
                </tbody>
            </table>
           
           
            <button  id='b2'>update</button>
            <hr/>
        </form>
        
        </div>
    </>
  )
}

export default ContactDetails