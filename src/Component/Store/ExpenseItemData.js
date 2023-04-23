import { createSlice } from "@reduxjs/toolkit";

const intialExpenseItemDataState={
    items:[]
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
        DeleteApiData(state,action){
            state.items=state.items.filter(item=>item.id !== action.payload)
            alert("Item deleted succesfully")
        }
    }
})
export const ExpenseItemsAction=ExpenseItemsSlice.actions
export default ExpenseItemsSlice.reducer