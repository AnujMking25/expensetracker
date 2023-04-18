import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dummy = () => {
   const Navigate=useNavigate()
  return (
    <div style={{display:'flex'}}>
         <h3>Welcome To Expense Tracker...</h3>
         <button style={{right:'0',marginLeft:'auto'}} onClick={()=>Navigate('/CompleteProfile')}>Your Profile is incomplete.Complete now</button>
         <hr/>
         
         </div>
  )
}

export default Dummy