import './styles/product.css';

const SERVER_HOST = 'http://localhost:5000';

const Product = ({ product }) => (
  <div id='product' className='border rounded p-2 shadow'>
    <img src={`${SERVER_HOST}/${product.image}`} alt={product.title} />
    <p>{product.title}</p>
    <p>${product.price}</p>
  </div>
);

export default Product;
