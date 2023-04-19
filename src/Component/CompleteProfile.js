import React from 'react'
import ContactDetails from './ContactDetails'
import classes from './Dummy.module.css'
const CompleteProfile = () => {
  return (
    <>
    <div className={classes.maindiv} >
         <p>Winners never quite, Quitters never win</p>
         <button style={{marginTop:'-3rem'}}>Your Profile is 64% complete. A Complete Profile <br/>has higher chances of landing a job.Complete now</button>
         <hr/>
    </div>
    <ContactDetails/>
    </>
  )
}

export default CompleteProfile