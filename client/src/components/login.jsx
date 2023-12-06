import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdWarning } from 'react-icons/io';
import Form from './common/form';
import './styles/login.css';

const Login = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const submit = async e => {
    e.preventDefault();
    await fetch('/users/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) setError(response.error);
        else {
          localStorage.setItem('username', response.username);
          navigate('/');
        }
      });
  };
  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value, // Dynamic object
    });
  };
  return (
    <Form method='POST' button='Log In' onSubmit={e => submit(e)} onChange={e => handleChange(e)}>
      <small className='form-text text-muted'>
        <p>For testing purposes:</p>
        <p><b>Username:</b> admin</p>
        <p><b>Password:</b> admin</p>
      </small>
      {error && <p id='error'><IoMdWarning color='red' style={{ 'marginRight': '10px' }} />{error}</p>}
    </Form>
  );
};

export default Login;