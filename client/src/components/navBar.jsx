import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.jpg';
import './styles/navBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const auth = () => {
    if (username) {
      localStorage.removeItem('username');
      navigate('/');
    }
    else navigate('/login');
  }
  return (
    <nav>
      <div id='logo'>
        <a href='/'>
          <img src={logo} alt='Logo' />
        </a>
      </div>
      <div id='menus'>
        <div className='menu'>
          <a href='/new-arrivals'>NEW ARRIVALS</a>
        </div>
        <div className='menu'>
          <a href='/ready-to-wear'>READY-TO-WEAR</a>
        </div>
        <div className='menu'>
          <a href='/men'>MEN</a>
        </div>
        <div className='menu'>
          <a href='/women'>WOMEN</a>
        </div>
        <div className='menu'>
          <a href='#/' onClick={auth}>{username ? 'LOG OUT' : 'LOG IN'}</a>
        </div>
      </div>
    </nav >
  )
};

export default NavBar;