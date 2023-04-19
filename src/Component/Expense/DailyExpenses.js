import React from 'react'
import classes from './DailyExpenses.module.css'
const DailyExpenses = () => {
  return (
    <div className={classes.maindiv}>
        <h1>Daily Expenses</h1>
    <form>
        <table>
            <tbody>
                <tr>
                    <th>Spent Money</th>
                    <th>Description</th>
                    <th>Category</th>
                </tr>
                <tr>
                    <td><input type='number'/></td>
                    <td><input type='text'/></td>
                    <td>
                        <select name='Category' id='Tcategory'>
                            <option >Food</option>
                            <option>Petrol</option>
                            <option>Salary</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
        <button>submit</button>
    </form>
    </div>
  )
}

export default DailyExpenses