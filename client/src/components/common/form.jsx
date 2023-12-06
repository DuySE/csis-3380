const Form = props => {
  const { button, onSubmit, onChange } = props;
  return (
    <form className='custom-form-container border rounded p-4 shadow h-100 d-flex align-items-center mt-5 flex-column justify-content-center'>
      <input type='text' name='username' className='form-control mb-3 h-50' id='username' placeholder='Username' onChange={onChange} />
      <input type='password' name='password' className='form-control' id='password' placeholder='Password' onChange={onChange} />
      <button className='btn btn-warning mt-3 w-100' onClick={onSubmit}>{button}</button>
      {props.children}
    </form>
  )
};

export default Form;