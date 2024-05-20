import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import About from './Pages/About';
import Recipe from './Pages/Recipe';
import User from './Pages/User';
import NoMatch from './Components/Nomatch/NoMatch';
import Navbar from './Components/Navbar/Navbar';


function App() {

  return (
    <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/About' element={<About/>} />
    <Route path='/Recipe' element={<Recipe/>}/>
    <Route path='/user' element={<User/>}/>
    <Route path='/login' element={<User/>}/>

    <Route path='*' element={<NoMatch/>}/>
   </Routes>
    </>
  );
}

export default App;
