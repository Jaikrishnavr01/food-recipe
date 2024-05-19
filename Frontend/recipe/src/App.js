import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import About from './Pages/About';
import Recipe from './Pages/Recipe';
import User from './Pages/User';


function App() {
  return (
    <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/About' element={<About/>} />
    <Route path='/Recipe' element={<Recipe/>}/>
    <Route path='/user' element={<User/>}/>
   </Routes>
    </>
  );
}

export default App;
