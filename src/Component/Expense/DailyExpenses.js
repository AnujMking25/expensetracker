import React, { useEffect, useState } from "react";
import classes from "./DailyExpenses.module.css";
import ShowExpense from "./ShowExpense";
import UpdateExpenses from "./UpdateExpenses";
import { useDispatch, useSelector } from "react-redux";
import {ExpenseItemsAction} from "../Store/ExpenseItemData";
import { themeActions } from "../Store/ThemeMode";
import './toggel.css'
const DailyExpenses = () => {
  let email=useSelector(state=>state.auth.emailIs)
 
  console.log("user email=>",email);

  let[Inputdata,setInputData]=useState({Inputmoney:'',InputDescription:'',InputCategory:''});
  const [cartShow,setCartShow]=useState(false);
  const[Premium,setPremium]=useState(false);

  const dispatch=useDispatch();
  const ExpenseItems=useSelector(state=>state.expenseitems.items);
  const themeMode = useSelector((state) => state.theme.theme);

  let url =
    `https://expenses-tracker-e19f3-default-rtdb.firebaseio.com/${email}.json`;

  useEffect(() => {
    async function fetchApi() {
      try {
        const GetApi = await fetch(
          `https://expenses-tracker-e19f3-default-rtdb.firebaseio.com/${email}.json`
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
        alert("Get Method is not working", error);
      }
    }
    fetchApi();
  },[email,dispatch]);

  function onHideCart(){
    setCartShow(false)
  }
//***************************** Edit API     ******************==>START HERE <==
async function onEditHandler(){
  setCartShow(true)
  }
//***************************** Edit API     ******************==>START HERE <==
// **************************** Delete Api   *******************==> START HERE<==
async function onDeleteHandler(id){
  const GetApi = await fetch(
    `https://expenses-tracker-e19f3-default-rtdb.firebaseio.com/${email}.json`)
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

    const del=await fetch(`https://expenses-tracker-e19f3-default-rtdb.firebaseio.com/${email}/${elementId}.json`,{
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

  useEffect(()=> {
    if(sum>9999)
      {setPremium(true)}
      else{setPremium(false)}
  },[sum])


  // *********************** Show List data on screen **********==>END HERE<==

  function onMoneyHandler(e){
    setInputData({
      ...Inputdata,
      Inputmoney:e.target.value
    })
  }
  function onDescriptionHandler(e){
    setInputData({...Inputdata,
                  InputDescription:e.target.value
              })
  }
  function onCategoryHandler(e){
    setInputData({...Inputdata,
                  InputCategory:e.target.value
              })
  }
   function onExpensesHandler(e) {
    e.preventDefault();
    
    const EnteredMoney = Inputdata.Inputmoney;
    const EnteredDescription = Inputdata.InputDescription;
    const EnteredCategory = Inputdata.InputCategory;
    if(EnteredCategory==="" || EnteredDescription==="" || EnteredMoney===""){
      alert('Please fill all details...')
      return;
    }
    const no=Math.random();
    
    const postData={ id:EnteredMoney+EnteredDescription+no,
                      money: EnteredMoney,
                      description: EnteredDescription,
                      category: EnteredCategory,
                    }
     setInputData({
                 Inputmoney:'',
                 InputDescription:'',
                 InputCategory:''
                })
    // *********************** Post Request Api ***********==> START HERE<==*****************
   async function postApi(){
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
   }
   postApi();
    // *********************** Post Request Api ***********==> END HERE<==*****************
  }

    //********************************* Theme******************==> START HERE <==

    useEffect(() => {
      if (themeMode === "dark") {
        document.body.style.backgroundColor = "gray";
      } else {
        document.body.style.backgroundColor = "white";
      }
    }, [themeMode]);
     //*********************************** Theme ends**************==> End HERE <==
     const onDyaNightMode = () => {
      dispatch(themeActions.toggleTheme());
    };

//  ********************CSV*************************
function onDownloadCSV(){
  const title=['Category','Description','Spent Money'];
  const CSVdata=[title];
  ExpenseItems.forEach(element => {
    CSVdata.push([element.category,element.description,element.money])
  });

  return CSVdata.map((row) => row.join(",")).join("\n");
}
      
      const blob =new Blob([onDownloadCSV()]); 
    
  return (<>
  <div className={classes.premium}>
    <button>Premium {Premium ?  '🤩': '😔'}</button>
 
  </div>
 {Premium && <div style={{float:"right"}}>
  <label className="switch">
  <input type="checkbox"  onClick={onDyaNightMode}/>
  <span className="slider round">🌙{" "}🌕</span>
</label></div>}
    <div className={classes.maindiv}>
    {Premium &&  <a
          href={URL.createObjectURL(blob)}
          download="expenses.txt"
          style={{ marginTop: "80px", color: "red" }}
        >
          Download Your Expenses
        </a>}
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
                <input type="number" value={Inputdata.Inputmoney} onChange={onMoneyHandler}/>
              </td>
              <td>
                <input type="text" value={Inputdata.InputDescription} onChange={onDescriptionHandler}/>
              </td>
              <td>
                <select name="Category" id="Tcategory" defaultValue="Food" onClick={onCategoryHandler} >
                  <option value="Food">Food</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Salary">Salary</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Electronice">Electronice</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">submit</button>
      </form>
      {data}
      {cartShow && <UpdateExpenses onHide={onHideCart}/>}
    </div>
    </>
  );
};

export default DailyExpenses;
