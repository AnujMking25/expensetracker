import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Auth";
import ExpenseItemData from "./ExpenseItemData";

const store=configureStore({
    reducer:{auth:Auth,expenseitems:ExpenseItemData}
})
export default store