import { createSlice } from "@reduxjs/toolkit";

const intialExpenseItemDataState={
    items:[],
    editiitem:{}
}
const ExpenseItemsSlice=createSlice({
    name:'ExpenseItemData',
    initialState:intialExpenseItemDataState,
    reducers:{
        GetApiData(state,action){
            state.items=action.payload;
        },
        PostApiData(state,action){
            state.items=state.items.concat(action.payload)
            alert("Item Add successfully"); 
        },
        EditData(state,action){
            state.editiitem=action.payload
            console.log("Edit data=>",state.editiitem);
        },
        updateDataApi(state,action){
            state.items.map(item=>{
                if(item.id===action.payload.id){
                    item.money=action.payload.money;
                    item.description=action.payload.description;
                    item.category=action.payload.category;
                }
                return state.items
                
            })
        },
        DeleteApiData(state,action){
            state.items=state.items.filter(item=>item.id !== action.payload)
            alert("Item deleted succesfully")
        },
    }
})
export const ExpenseItemsAction=ExpenseItemsSlice.actions
export default ExpenseItemsSlice.reducer