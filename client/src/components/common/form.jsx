const Form = props => (
  <form action={props.action} method={props.method} className='custom-form-container border rounded p-4 shadow h-100 d-flex align-items-center mt-5 flex-column justify-content-center'>
    <input type='text' className='form-control mb-3 h-50' id='username' placeholder='Username' />
    <input type='password' className='form-control' id='password' placeholder='Password' />
    <button className='btn btn-warning mt-3 w-100'>{props.button}</button>
    {props.children}
  </form>
);

export default Form;