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
  const SERVER_HOST = 'http://localhost:5000';

  useEffect(() => {
    const getProductsByCategory = async () => {
      setLoading(true);
      await fetch(`${SERVER_HOST}/products/category/${category}`)
        .then((products) => products.json())
        .then((products) => {
          setProducts(products);
          setLoading(false);
        });
    }
    getProductsByCategory();
  }, [category]);

  const addProduct = async () => {
    const formData = new FormData();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    // const preview = document.getElementById('preview');
    const file = document.forms['form']['file'].files[0];
    formData.append('title', title);
    formData.append('price', price);
    formData.append('file', file);
    formData.append('category', category);
    setLoading(true);
    await fetch(`${SERVER_HOST}/products`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: formData
    })
      .then(product => product.json())
      .then(product => {
        setProducts([
          ...products,
          product
        ])
      });
    setLoading(false);
    toggleModal();
  }

  const deleteProduct = async product => {
    setLoading(true);
    await fetch(`${SERVER_HOST}/products/${product._id}`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache'
    });
    setLoading(false);
    const newProducts = products.filter(element => element._id !== product._id);
    setProducts(newProducts);
  }

  return (
    <>
      <button className='btn btn-warning m-3' onClick={toggleModal}>Add</button>
      <Modal title='Add new product' show={showModal} onToggle={toggleModal} onAdd={addProduct}>
        <form name='form' action='/products' method='post' encType='multipart/form-data'>
          <input type='text' name='title' className='form-control mb-3' id='title' placeholder='Title' />
          <input type='number' name='number' className='form-control mb-3' id='price' step='0.01' min='0' placeholder='Price' />
          <input type='file' name='file' className='form-control-file' id='file' accept='image/*' />
          <img src='#' id='preview' alt='Preview' />
        </form>
      </Modal>
      <div id='product-list'>
        {loading && <Spinner />}
        {products.map((product) => <Product key={product._id} product={product} onDelete={() => deleteProduct(product)} />)}
      </div>
    </>
  )
};
export default ProductList;
