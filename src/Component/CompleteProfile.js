import React from 'react'
import ContactDetails from './ContactDetails'

const CompleteProfile = () => {
  return (
    <>
    <div style={{display:'flex' }}>
         <h3>Winners never quite, Quitters never win</h3>
         <button style={{right:'0',marginLeft:'auto'}}>Your Profile is 64% complete. A Complete Profile has higher chances of landing a job.Complete now</button>
         <hr/>
    </div>
    <ContactDetails/>
    </>
  )
}

export default CompleteProfile