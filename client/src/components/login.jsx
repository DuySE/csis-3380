import Form from './common/form';
import './styles/login.css';

const Login = () => (
  <Form action='/login' method='POST' button='Log In'>
    <small className='form-text text-muted'>
      For testing purposes:
      <br />
      <b><em>Admin user:</em></b> <br />
      Username: admin <br />
      Password: admin
      <br />
      <b><em>Normal user:</em></b> <br />
      Username: user <br />
      Password: user
    </small>
  </Form>
)

export default Login;