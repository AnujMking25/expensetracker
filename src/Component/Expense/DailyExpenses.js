import React, { useEffect, useRef, useState } from "react";
import classes from "./DailyExpenses.module.css";
import ShowExpense from "./ShowExpense";
import UpdateExpenses from "./UpdateExpenses";
import { useDispatch, useSelector } from "react-redux";
import {ExpenseItemsAction} from "../Store/ExpenseItemData";

const DailyExpenses = () => {
  const Inputmoney = useRef();
  const InputDescription = useRef();
  const InputCategory = useRef();
  const [cartShow,setCartShow]=useState(false);
  const [EditData,setEditData]=useState()
  const[Premium,setPremium]=useState(false);

  const dispatch=useDispatch();
  const ExpenseItems=useSelector(state=>state.expenseitems.items);
  let url =
    "https://expense-tracker-3983f-default-rtdb.firebaseio.com/Expense.json";

  useEffect(() => {
    async function fetchApi() {
      try {
        const GetApi = await fetch(
          "https://expense-tracker-3983f-default-rtdb.firebaseio.com/Expense.json"
        );

        if (GetApi.ok) {
          const response = await GetApi.json();
          let resarr = [];
          for (const key in response) {
            resarr = resarr.concat(response[key]);
          }
          dispatch(ExpenseItemsAction.GetApiData(resarr))
        }
      } catch (error) {
        alert("Get Method not working", error);
      }
    }
    fetchApi();
  }, []);

  function onHideCart(){
    setCartShow(false)
  }
//***************************** Edit API     ******************==>START HERE <==
async function onEditHandler(EditDATA){
  setEditData(()=>EditDATA)
  setCartShow(true)
  }
//***************************** Edit API     ******************==>START HERE <==
// **************************** Delete Api   *******************==> START HERE<==
async function onDeleteHandler(id){
  const GetApi = await fetch(
    "https://expense-tracker-3983f-default-rtdb.firebaseio.com/Expense.json")
let elementId;
    if(GetApi.ok){
      const response=await GetApi.json()
      for (const key in response) {
         if(id===response[key].id)
         { 
          elementId = key
          break;
        }
         
      }
    }

    const del=await fetch(`https://expense-tracker-3983f-default-rtdb.firebaseio.com/Expense/${elementId}.json`,{
      method:'DELETE'
    })
    console.log(del.ok);

    if(del.ok){
      dispatch(ExpenseItemsAction.DeleteApiData(id))
    }
  }

// **************************** Delete Api   *******************==> START HERE<==

  // *********************** Show List data on screen **********==>STATR HERE<==
  let sum=0;
  const data = (
    <ul>
      {ExpenseItems.map((item, i) =>{
          sum=sum+ (+item.money)
         
        return  <ShowExpense
        key={i}
        count={i}
          id={item.id}
          money={item.money}
          description={item.description}
          category={item.category}
          onDelete={onDeleteHandler}
          onEdit={onEditHandler}
        />
      }
      )}
    </ul>
  );

  useEffect(()=> {if(sum>10000){setPremium(true)}},[sum])

console.log('premium',sum);
  // *********************** Show List data on screen **********==>END HERE<==

  async function onExpensesHandler(e) {
    e.preventDefault();
    // console.log(InputCategory.current.value)
    const EnteredMoney = Inputmoney.current.value;
    const EnteredDescription = InputDescription.current.value;
    const EnteredCategory = InputCategory.current.value;

    const postData={ id:EnteredMoney+EnteredDescription,
                      money: EnteredMoney,
                      description: EnteredDescription,
                      category: EnteredCategory,
                    }
    // *********************** Post Request Api ***********==> START HERE<==*****************
    try {
      const PostApi = await fetch(url, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (PostApi.ok) {
        dispatch(ExpenseItemsAction.PostApiData(postData))
      }
    } catch (error) {
      alert(error.message);
    }
    // *********************** Post Request Api ***********==> END HERE<==*****************
  }

  // console.log(data);
  return (<>
  <div className={classes.premium}>
  {Premium && <button >Premium</button>}
  </div>
  
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
              <td>
                <input type="number" ref={Inputmoney} />
              </td>
              <td>
                <input type="text" ref={InputDescription} />
              </td>
              <td>
                <select name="Category" id="Tcategory" ref={InputCategory}>
                  <option value="Food">Food</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Salary">Salary</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button>submit</button>
      </form>
      
      {data}
    
      {cartShow && <UpdateExpenses Editdata={EditData} onHide={onHideCart}/>}
    </div>
    </>
  );
};

export default DailyExpenses;
