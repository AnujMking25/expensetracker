import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Auth";
import ExpenseItemData from "./ExpenseItemData";
import ThemeMode from "./ThemeMode";
const store=configureStore({
    reducer:{auth:Auth,
        expenseitems:ExpenseItemData,
        theme:ThemeMode
    }
})
export default store