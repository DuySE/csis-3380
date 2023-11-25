import './App.css';
import Home from './components/home';
import NavBar from './components/navBar';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/productList';
import Login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/new-arrivals' element={<ProductList category='new-arrivals' />} />
        <Route path='/ready-to-wear' element={<ProductList category='ready-to-wear' />} />
        <Route path='/men' element={<ProductList category='men' />} />
        <Route path='/women' element={<ProductList category='women' />} />
      </Routes>
    </div>
  );
}

export default App;
