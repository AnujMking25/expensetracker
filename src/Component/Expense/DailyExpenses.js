import React, { useRef, useState } from 'react'
import classes from './DailyExpenses.module.css'
const DailyExpenses = () => {
    const Inputmoney=useRef();
    const InputDescription=useRef()
    const InputCategory=useRef()
    // const[list ,setlist]=useState();
    let items=[];
    
const data=<ul>
   { items.map(item=><li>{item.money}=={item.description}=={item.category}</li>)}
</ul>
console.log(data);
    let url='https://expense-tracker-3983f-default-rtdb.firebaseio.com/Expense.json'
   async function onExpensesHandler(e){
        e.preventDefault();
        // console.log(InputCategory.current.value)
        const EnteredMoney=Inputmoney.current.value;
        const EnteredDescription=InputDescription.current.value;
        const EnteredCategory=InputCategory.current.value;

// *********************** Post Request Api ***********==> START HERE<==*****************
       try {
        const PostApi=await fetch(url,{
            method:'POST',
            body:JSON.stringify({
                money:EnteredMoney,
                description:EnteredDescription,
                category:EnteredCategory
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(PostApi.ok){
            alert("successfully")
            
            return {items:items.push({ money:EnteredMoney,
                description:EnteredDescription,
                category:EnteredCategory})
            }    
        
        }
       } catch (error) {
        alert(error.message)
       }
// *********************** Post Request Api ***********==> END HERE<==*****************
    }
  return (
    <div className={classes.maindiv}>
        <h1>Daily Expenses</h1>
    <form onSubmit={onExpensesHandler}>
        <table>
            <tbody>
                <tr>
                    <th>Spent Money</th>
                    <th>Description</th>
                    <th>Category</th>
                </tr>
                <tr>
                    <td><input type='number' ref={Inputmoney}/></td>
                    <td><input type='text' ref={InputDescription}/></td>
                    <td>
                        <select name='Category' id='Tcategory' ref={InputCategory}>
                            <option value='Food'>Food</option>
                            <option value='Petrol'>Petrol</option>
                            <option value='Salary'>Salary</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
        <button>submit</button>
    </form>
    {data}
    </div>
  )
}

export default DailyExpenses