import React from 'react'
import classes from './ShowExpense.module.css'
import { useDispatch } from 'react-redux'
import { ExpenseItemsAction } from '../Store/ExpenseItemData'

const ShowExpense = (props) => {
 const dispatch=useDispatch()
  function onDeleteHandler(){
props.onDelete(props.id)
  }

  function onEditHandler(){
    
    const edititem={
      id:props.id,
      money:props.money,
      description:props.description,
      category:props.category
      }
      console.log("send",edititem);
      dispatch(ExpenseItemsAction.EditData(edititem))
    props.onEdit()
  }
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