import Banner from './banner';
import Look1 from '../images/products/home/look1.jpg';
import Look2 from '../images/products/home/look2.jpg';
import Look3 from '../images/products/home/look3.jpg';
import Look4 from '../images/products/home/look4.jpg';
import Jewelry from '../images/products/home/jewelry.jpg';
import Bags from '../images/products/home/bags.jpg';
import Clothing from '../images/products/home/clothing.jpg';
import Shoes from '../images/products/home/shoes.jpg';
import './styles/home.css';
import { useEffect, useState } from 'react';
import Spinner from './common/spinner';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getJewelries() {
      setLoading(true);
      await fetch('https://fakestoreapi.com/products/category/jewelery')
        .then((products) => products.json())
        .then((products) => {
          setProducts(products);
          setLoading(false);
        });
    }
    getJewelries();
  }, []);

  return (
    <>
      <Banner />
      <div id='bestsellers'>
        <h1>SALE</h1>
        <p className='slogan'>Discover best-sellers of Gangster</p>
        <div id='products'>
          <div className='product'>
            <img src={Clothing} alt='Clothing' />
            <p className='section-name'>CLOTHING</p>
          </div>
          <div className='product'>
            <img src={Bags} alt='Bags' />
            <p className='section-name'>BAGS</p>
          </div>
          <div className='product'>
            <img src={Shoes} alt='Shoes' />
            <p className='section-name'>SHOES</p>
          </div>
          <div className='product'>
            <img src={Jewelry} alt='Jewelry' />
            <p className='section-name'>JEWELRY</p>
          </div>
        </div>
      </div>
      <div id='collections'>
        <h1>LOOKBOOK</h1>
        <p className='slogan'>Collections</p>
        <div id='lookbooks'>
          <div className='product'>
            <img src={Look1} alt='Lookbook 1' />
          </div>
          <div className='product'>
            <img src={Look2} alt='Lookbook 2' />
          </div>
          <div className='product'>
            <img src={Look3} alt='Lookbook 3' />
          </div>
          <div className='product'>
            <img src={Look4} alt='Lookbook 4' />
          </div>
        </div>
      </div>
      <div id='new-arrivals'>
        <h1>JEWELRIES</h1>
        <p className='slogan'>Explore luxury jewelries</p>
        <div id='new'>
          {loading && <Spinner />}
          {products.map(product => (
            <>
              <div key={product._id} className='product'>
                <img src={product.image} alt={product.title} />
                <p className='name'>{product.title}</p>
                <p className='price'>${product.price}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
