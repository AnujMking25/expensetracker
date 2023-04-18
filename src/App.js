import { Route, Routes } from 'react-router-dom';
import SignupPage from './Component/Singup/SignupPage';
import Dummy from './Component/Singup/Dummy';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<SignupPage/>}/>
      <Route path='/Dummy' element={<Dummy/>}/>
    </Routes>
    </>
  );
}

export default App;
