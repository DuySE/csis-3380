import Form from './common/form';
import './styles/login.css';

const SERVER_URL = 'http://localhost:5000';

const Login = () => (
  <Form action={`${SERVER_URL}/users/login`} method='POST' button='Log In'>
    <small className='form-text text-muted'>
      <p>For testing purposes:</p>
      <p><b>Username:</b> admin</p>
      <p><b>Password:</b> admin</p>
    </small>
  </Form>
);

export default Login;