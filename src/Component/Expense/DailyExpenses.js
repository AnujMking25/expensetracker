import React, { useEffect, useRef, useState } from "react";
import classes from "./DailyExpenses.module.css";
import ShowExpense from "./ShowExpense";
const DailyExpenses = () => {
  const Inputmoney = useRef();
  const InputDescription = useRef();
  const InputCategory = useRef();
  const [itemsList, setItemsList] = useState([]);

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

          setItemsList((prev) => {
            return (prev = prev.concat(resarr));
          });
        }
      } catch (error) {
        alert("Get Method not working", error);
      }
    }
    fetchApi();
  }, []);

//***************************** Edit API     ******************==>START HERE <==
async function onEditHandler(EditData){
console.log("Editi is working");

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
         { elementId = key}
          break;
      }
    }
console.log(elementId);
  console.log("Delete is working",id);
  
    const del=await fetch(`https://expense-tracker-3983f-default-rtdb.firebaseio.com/Expense/${elementId}.json`,{
      method:'DELETE'
    })
    console.log(del.ok);

    if(del.ok){
      alert("Item deleted succesfully")
    }
 
    
  // setItemsList(()=>{
  //   const updated=itemsList.filter(item=>item.id !== id)
  //   return updated
  // })
  }

// **************************** Delete Api   *******************==> START HERE<==
  // *********************** Show List data on screen **********==>STATR HERE<==
  const data = (
    <ul>
      {itemsList.map((item, i) => (
        <ShowExpense
        key={i}
          id={item.id}
          money={item.money}
          description={item.description}
          category={item.category}
          onDelete={onDeleteHandler}
          onEdit={onEditHandler}
        />
      ))}
    </ul>
  );
  // *********************** Show List data on screen **********==>END HERE<==

  async function onExpensesHandler(e) {
    e.preventDefault();
    // console.log(InputCategory.current.value)
    const EnteredMoney = Inputmoney.current.value;
    const EnteredDescription = InputDescription.current.value;
    const EnteredCategory = InputCategory.current.value;

    // *********************** Post Request Api ***********==> START HERE<==*****************
    try {
      const PostApi = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          id:EnteredMoney+EnteredDescription,
          money: EnteredMoney,
          description: EnteredDescription,
          category: EnteredCategory,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (PostApi.ok) {
        alert("successfully");

        // setItemsList((prev)=>{
        //    return prev=prev.concat({ money:EnteredMoney,
        //     description:EnteredDescription,
        //     category:EnteredCategory})
        // })
        setItemsList(() => {
          return [
            ...itemsList,
            {
              id:EnteredMoney+EnteredDescription,
              money: EnteredMoney,
              description: EnteredDescription,
              category: EnteredCategory,
            },
          ];
        });
      }
    } catch (error) {
      alert(error.message);
    }
    // *********************** Post Request Api ***********==> END HERE<==*****************
  }

  // console.log(data);
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
    </div>
  );
};

export default DailyExpenses;
