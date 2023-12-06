import { useEffect, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import Product from './product';
import Spinner from './common/spinner';
import Modal from './common/modal';
import Default from '../images/default.png';
import './styles/productList.css';

const ProductList = ({ category }) => {
  const username = localStorage.getItem('username');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleModal = product => {
    setProduct(product);
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
    } else reset();
    setShowModal(!showModal); // show/hide modal
  }
  useEffect(() => {
    const getProductsByCategory = async () => {
      setLoading(true);
      await fetch(`/categories/${category}`)
        .then((products) => products.json())
        .then((products) => {
          setProducts(products);
          setLoading(false);
        });
    }
    getProductsByCategory();
  }, [category]);

  const reset = () => {
    setTitle('');
    setPrice('');
  }

  // Add a product
  const addProduct = async () => {
    const formData = new FormData();
    const file = document.forms['form']['file'].files[0];
    formData.append('title', title);
    formData.append('price', price);
    formData.append('file', file);
    formData.append('category', category);
    setLoading(true);
    await fetch('/products', {
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
    reset();
    toggleModal();
  };

  const handleSave = () => {
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    if (!title) alert('Name cannot be empty');
    else if (!price) alert('Price cannot be empty');
    else if (product) editProduct(product);
    else addProduct();
  };

  // Delete a product
  const deleteProduct = async product => {
    setLoading(true);
    await fetch(`/products/${product._id}`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache'
    });
    setLoading(false);
    const newProducts = products.filter(element => element._id !== product._id);
    setProducts(newProducts);
  };

  // Edit a product
  const editProduct = async () => {
    toggleModal();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('category', category);
    setLoading(true);
    await fetch(`/products/${product._id}`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      body: formData
    })
      .then(result => result.json())
      .then(result => {
        const index = products.findIndex(product => product._id === result._id);
        const newProducts = [...products];
        newProducts[index] = { ...newProducts[index], ...result }
        setProducts(newProducts);
      });
    setLoading(false);
    toggleModal();
  };

  // Preview an image before add/edit a product
  const preview = e => {
    const preview = document.getElementById('preview');
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const sortByPrice = () => {
    const select = document.getElementById('prices');
    const sortedProducts = [...products].sort((a, b) => {
      if (select.value === '-1') return b.price - a.price;
      else return a.price - b.price;
    });
    setProducts(sortedProducts);
  };
  const modalTitle = product ? 'Edit a product' : 'Add new product';
  return (
    <>
      <label htmlFor='price'>Price</label>
      <select id='prices' onChange={sortByPrice}>
        <option value='1'>Lowest to Highest</option>
        <option value='-1'>Highest to Lowest</option>
      </select>
      {username && <IoIosAddCircle size={30} cursor='pointer' onClick={() => toggleModal()} id='add' />}
      <Modal title={modalTitle} show={showModal} onToggle={toggleModal} onSave={handleSave}>
        <form name='form' action='/products' method='post' encType='multipart/form-data'>
          <input type='text' name='title' className='form-control mb-3' id='title' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
          <input type='number' name='number' className='form-control mb-3' id='price' step='0.01' min='0' placeholder='Price' value={price} onChange={e => setPrice(e.target.value)} />
          {!product && (
            <>
              <input type='file' name='file' className='form-control-file' id='file' accept='image/*' onChange={e => preview(e)} />
              <img src={Default} id='preview' alt='Preview' />
            </>
          )}
        </form>
      </Modal>
      <div id='product-list'>
        {loading && <Spinner />}
        {
          products.map(
            product => <Product key={product._id} product={product} onDelete={() => deleteProduct(product)} onEdit={() => toggleModal(product)} />
          )
        }
      </div>
    </>
  )
};
export default ProductList;
