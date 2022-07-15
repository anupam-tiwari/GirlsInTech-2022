import { Route, Routes } from 'react-router';
import './App.css';
import Community from './pages/Community';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      <Route path='/community' element={<Community></Community>}></Route>
    </Routes>
    </>
  );
}

export default App;
