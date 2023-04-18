import { Route, Routes } from 'react-router-dom';
import SignupPage from './Component/Singup/SignupPage';
import Dummy from './Component/Singup/Dummy';
import CompleteProfile from './Component/CompleteProfile';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<SignupPage/>}/>
      <Route path='/Dummy' element={<Dummy/>}/>
      <Route path='/CompleteProfile' element={<CompleteProfile/>}/>
    </Routes>
    </>
  );
}

export default App;
