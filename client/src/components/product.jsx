import './styles/product.css';

const Product = ({ product }) => (
  <div id='product' className='border rounded p-2 shadow'>
    <img src={`data:image/jpeg;base64,${Buffer.from(`${product.image}`).toString('base64')}`} alt={product.title} />
    <p>{product.title}</p>
    <p>${product.price}</p>
  </div>
);

export default Product;
