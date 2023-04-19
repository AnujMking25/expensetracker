import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Dummy.module.css'
const Dummy = () => {
   const Navigate=useNavigate()
  return (
    <div className={classes.maindiv}>
         <p>Welcome To Expense Tracker!!!</p>
         <button onClick={()=>Navigate('/CompleteProfile')}>Your Profile is incomplete.<i style={{color:'blue'}}>Complete now</i></button>
         <hr/>
         
         </div>
  )
}

export default Dummy