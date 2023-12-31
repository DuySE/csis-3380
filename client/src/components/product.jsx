import './styles/product.css';
import { FaRegEdit, FaTrash } from 'react-icons/fa';

const Product = ({ product, onDelete, onEdit }) => {
  const username = localStorage.getItem('username');
  const SERVER_HOST = 'http://localhost:5000';
  return (
    <div id='product' className='border rounded p-2 shadow'>
      <img src={`${SERVER_HOST}/${product.image}`} alt={product.title} />
      <p>{product.title}</p>
      <p>${product.price}</p>
      {username &&
        (
          <>
            <FaRegEdit size={20} cursor='pointer' style={{ 'marginRight': '15px' }} onClick={() => onEdit(product)} />
            <FaTrash size={20} cursor='pointer' color='red' onClick={() => onDelete()} />
          </>
        )}
    </div>
  );
};

export default Product;
