import React from 'react'
import classes from './ShowExpense.module.css'
const ShowExpense = (props) => {
console.log(props.id);
  function onDeleteHandler(){
props.onDelete(props.id)
  }
  function onEditHandler(){
    props.onEdit(props)
  }
  return (
    <li key={props.id} className={classes.mainli}>
      
        <h3>{") "} {props.category}</h3>
        <p>{props.description}</p>
        <p>{props.money}</p>
        <div>
        <button onClick={onEditHandler}>Edit</button>
        <button onClick={onDeleteHandler}>Delete</button>
        </div>
        
    </li>
  )
}

export default ShowExpense