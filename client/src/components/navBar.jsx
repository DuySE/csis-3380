import logo from '../images/logo.jpg';
import './styles/navBar.css';

const NavBar = () => {
  const username = localStorage.getItem('username');
  const auth = () => {
    if (username) {
      localStorage.removeItem('username');
      window.location.href='/';
    }
    else window.location.href='/login';
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
          <a href='/contact'>CONTACT US</a>
        </div>
        <div className='menu'>
          <a href='#/' onClick={auth}>{username ? 'LOG OUT' : 'LOG IN'}</a>
        </div>
      </div>
    </nav >
  )
};

export default NavBar;