import { Route, Routes} from 'react-router-dom';
import SignupPage from './Component/Singup/SignupPage';
import Dummy from './Component/Dummy';
import CompleteProfile from './Component/CompleteProfile';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
// redux start
import { useSelector } from 'react-redux';
//redux end 

function App() {

const isAuth=useSelector(state=>state.auth.isAuthLoggedIn);

  return (
    <>
    <Routes>

    <Route path='/' element={ isAuth ? <Dummy/>: <SignupPage/>}/>  
      {isAuth && <Route path='/Dummy' element={<Dummy/>}/>} 
    <Route path='/CompleteProfile' element={<CompleteProfile/>}/>
     <Route path='/forgetpage' element={<ForgetPassword/>}/>
    </Routes>
    </>
  );
}

export default App;
