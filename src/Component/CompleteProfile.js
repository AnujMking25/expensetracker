import React from 'react'
import ContactDetails from './ContactDetails'
import classes from './CompleteProfile.module.css'
const CompleteProfile = () => {
  return (
    <>
    <div className={classes.maindiv}>
         <p>Winners never quite, Quitters never win</p>
         <button type='submit'>Your Profile is 64% complete. A Complete Profile 
         <br/>has higher chances of landing a job.Complete now</button>
    </div>
    <hr/>
    <ContactDetails/>
    </>
  )
}

export default CompleteProfile