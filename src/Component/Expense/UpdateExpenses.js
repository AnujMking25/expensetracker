import ReactDOM from "react-dom"
import classes from './UpdateExpenses.module.css'
import { useRef } from "react"
const UpdateExpensesCart=(props)=>{
    const Emoney=useRef();
    const Edescription=useRef();
    const Ecategory=useRef();
function onHide(){
  props.onHide()
}
  async function getElementID(){
    try {
      let elementId;
      const getApi=await fetch("https://expense-tracker-3983f-default-rtdb.firebaseio.com/Expense.json")
        if(getApi.ok){
          // alert("getApi working")
          const response=await getApi.json();
          // console.log("getApi Key",response);
         for (const key in response) {
           if (props.Editdata.id===response[key].id) {
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
      // console.log(Emoney.cu);
     const elementID=await getElementID()
    //  console.log("elementID===> ",elementID);
    try {
      const EditApi= await fetch(`https://expense-tracker-3983f-default-rtdb.firebaseio.com/Expense/${elementID}.json`,{
        method:'PUT',
        body:JSON.stringify({
          id:Emoney.current.value+Edescription.current.value,
          money: Emoney.current.value,
          description: Edescription.current.value,
          category: Ecategory.current.value,
        }),
        headers:{
          'Content-Type':'application/json'
        }
        
      })
      if(EditApi.ok){
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
                <input type="number" defaultValue={props.Editdata.money} ref={Emoney}/>
              </td>
              <td>
                <input type="text" defaultValue={props.Editdata.description} ref={Edescription}/>
              </td>
              <td>
                <select name="Category" id="Tcategory" defaultValue={props.Editdata.category} ref={Ecategory}>
                  <option value="Food">Food</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Salary">Salary</option>
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