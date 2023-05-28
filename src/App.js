import logo from './logo.svg';
import './App.css';

import Navbar from './Navbar';
import Dashboard from './dashboard';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (

    <div className="scroll-smooth">
      <div className='h-[7vh] bg-black fixed w-screen top-0'>
        <Navbar />
      </div>

      <div className='h-fit my-[7vh]'>
        <Routes>
          
            <Route path='/' element={<Home />}></Route>
          
            <Route path='/dashboard' element={<Dashboard/>}></Route>
          
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
