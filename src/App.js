import { Route, Routes } from 'react-router-dom';
import SignupPage from './Component/Singup/SignupPage';
import Dummy from './Component/Dummy';
import CompleteProfile from './Component/CompleteProfile';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<SignupPage/>}/>
      <Route path='/Dummy' element={<Dummy/>}/>
    <Route path='/CompleteProfile' element={<CompleteProfile/>}/>
     <Route path='/forgetpage' element={<ForgetPassword/>}/>
    </Routes>
    </>
  );
}

export default App;
