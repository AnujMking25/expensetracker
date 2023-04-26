import React from 'react'
import{render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ForgetPassword from './ForgetPassword'
describe('Forget Password test Zone',()=>{
    test('Forget Password testing', () => { 
        //Arrange
          render(<ForgetPassword/>)
          //Act
          // ...nothing
      
          // assert
          const Tageh4=screen.getByText('Enter the eamil with which you have registered',{exact:true})
          expect(Tageh4).toBeInTheDocument();
       })
       test('Button Test', () => { 
          //Arrange
          render(<ForgetPassword/>)
      
          //Act  
          const buttonElement=screen.getByRole('button');
          userEvent.click(buttonElement)
      
          //assert
         const Tagbutton=screen.getByText('Send Link',{exact:true})
         expect(Tagbutton).toBeInTheDocument()
       })
})
