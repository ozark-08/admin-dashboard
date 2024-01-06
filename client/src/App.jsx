import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Home} from './pages/Home'
import { Register } from './pages/Register';
import {Login  } from "./pages/Login";
import { Navbar } from "../src/components/Navbar";
import { Error } from './pages/Error';
import { useParams } from "react-router-dom";
import { Update } from './pages/update';

// import { Logout } from './pages/Logout';

const App = () => {
  const params = useParams();
  return<>
  <BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/update/:id" element = {<Update/>}/>
      <Route path="/register" element = {<Register/>}/>
      <Route path="/login" element = {<Login/>}/>
      {/* <Route path='/logout' element={<Logout/>}/> */}
      <Route path='*' element = {<Error/>}/>
    </Routes>
  </BrowserRouter>
  </>
}
export default App;