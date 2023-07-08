import ReactDOM from "react-dom"
import classes from './UpdateExpenses.module.css'
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ExpenseItemsAction } from "../Store/ExpenseItemData";
const UpdateExpensesCart=(props)=>{
    const Emoney=useRef();
    const Edescription=useRef();
    const Ecategory=useRef();
    const email=useSelector(state=>state.auth.emailIs)
    const edititem=useSelector(state=>state.expenseitems.editiitem)
const dispatch=useDispatch()
function onHide(){
  props.onHide()
}
  async function getElementID(){
    try {
      let elementId;
      const getApi=await fetch(`https://expenses-tracker-664a3-default-rtdb.firebaseio.com/${email}.json`)
        if(getApi.ok){
          // alert("getApi working")
          const response=await getApi.json();
          // console.log("getApi Key",response);
         for (const key in response) {
           if (edititem.id===response[key].id) {
              elementId =key
             break
           }
         }
         return elementId
        }
        
    } catch (error) {
      alert("Something went wrong!!!")
    }
  }

   async function onSubmitHandler(e){
      e.preventDefault();
    
     const elementID=await getElementID()
    const updatedData={
      id:edititem.id,
      money: Emoney.current.value,
      description: Edescription.current.value,
      category: Ecategory.current.value,
    }
    try {
      const EditApi= await fetch(`https://expenses-tracker-96b1c-default-rtdb.firebaseio.com/${email}/${elementID}.json`,{
        method:'PUT',
        body:JSON.stringify(updatedData),
        headers:{
          'Content-Type':'application/json'
        }
        
      })
      if(EditApi.ok){
        dispatch(ExpenseItemsAction.updateDataApi(updatedData))
        alert('Update Expense successfully')
        onHide()
      }
    } catch (error) {
      alert(error)
    }
     
}

return(
    <div className={classes.maindiv}>
       <form onSubmit={onSubmitHandler}>
        <table>
          <tbody>
            <tr>
              <th>Spent Money</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
            <tr>
              <td>
                <input type="number" defaultValue={edititem.money} ref={Emoney}/>
              </td>
              <td>
                <input type="text" defaultValue={edititem.description} ref={Edescription}/>
              </td>
              <td>
                <select name="Category" id="Tcategory" defaultValue={edititem.category} ref={Ecategory}>
                  <option value="Food">Food</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Salary">Salary</option>
                  <option value="Electronice">Electronice</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button>update</button>
        <button onClick={onHide}>Cancle</button>
      </form>
     
    </div>
)
}

const UpdateExpenses = (props) => {
 
    const PortelId=document.getElementById('updateExpenses')
  return ReactDOM.createPortal(<UpdateExpensesCart Editdata={props.Editdata} onHide={props.onHide}/>,PortelId)
}

export default UpdateExpenses