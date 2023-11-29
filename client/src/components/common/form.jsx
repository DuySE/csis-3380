import { useState } from 'react';

const Form = props => {
  const { action, method, button } = props;
  const [data, setData] = useState({});
  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const submit = async e => {
    e.preventDefault();
    await fetch(action, {
      method,
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
        localStorage.setItem('username', response.username);
        window.location.href = '/';
      });
  }
  return (
    <form className='custom-form-container border rounded p-4 shadow h-100 d-flex align-items-center mt-5 flex-column justify-content-center'>
      <input type='text' name='username' className='form-control mb-3 h-50' id='username' placeholder='Username' onChange={handleChange} />
      <input type='password' name='password' className='form-control' id='password' placeholder='Password' onChange={handleChange} />
      <button className='btn btn-warning mt-3 w-100' onClick={e => submit(e)}>{button}</button>
      {props.children}
    </form>
  )
};

export default Form;