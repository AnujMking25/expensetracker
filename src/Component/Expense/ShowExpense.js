import React from 'react'
import classes from './ShowExpense.module.css'

const ShowExpense = (props) => {

  function onDeleteHandler(){
props.onDelete(props.id)
  }

  function onEditHandler(){
    const edititems={
      id:props.id,
      money:props.money,
      description:props.description,
      category:props.category
      }
    props.onEdit(edititems)
  }
  
  // Premium button logic
 
  // Premium button end
  return (
    <li key={props.id} className={classes.mainli}>
      
        <h3>{props.count+1}{") "} {props.category}</h3>
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