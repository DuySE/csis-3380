import { useEffect, useState } from 'react';
import Product from './product';
import Spinner from './common/spinner';
import Modal from './common/modal';
import './styles/productList.css';

const ProductList = ({ category }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal); // show/hide modal

  useEffect(() => {
    async function getProductsByCategory() {
      setLoading(true);
      await fetch(`http://localhost:5000/products/category/${category}`)
        .then((products) => products.json())
        .then((products) => {
          setProducts(products);
          setLoading(false);
        });
    }
    getProductsByCategory();
  }, [category]);

  return (
    <>
      <button className='btn btn-warning m-3' onClick={toggleModal}>Add</button>
      <Modal title='Add new product' show={showModal} toggle={toggleModal}>
        <form action='/add' method='post' encType='multipart/form-data'>
          <input type='text' className='form-control mb-3' id='title' placeholder='Title' />
          <input type='number' className='form-control mb-3' id='price' step='0.01' min='0' placeholder='Price' />
          <input type='file' className='form-control-file' id='file' accept='image/*' />
        </form>
      </Modal>
      <div id='product-list'>
        {loading && <Spinner />}
        {products.map((product) => <Product key={product._id} product={product} />)}
      </div>
    </>
  )
};
export default ProductList;
