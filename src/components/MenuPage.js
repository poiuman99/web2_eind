import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';
import ProductModal from './ProductModal';
import { useCart } from '../context/CartContext';

const MenuPage = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { cart, addToCart, totalCartItems, totalCartPrice } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('Burgers');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  const categories = [
    { name: 'Fries', icon: '🍟' },
    { name: 'Burgers', icon: '🍔' },
    { name: 'Snacks', icon: '🍖' },
    { name: 'Satés', icon: '🍢' },
    { name: 'Fingerfood', icon: '🍗' },
    { name: 'Krokets', icon: '🫔' },
    { name: 'Sauces', icon: '🥫' },
    { name: 'Drinks', icon: '🥤' },
  ];

  const filteredProducts = useMemo(() => {
    return productsData.filter(product =>
      product.category === selectedCategory && typeof product.price === 'number'
    );
  }, [selectedCategory]);

  const openProductModal = (product) => {
    setSelectedProductForModal(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProductForModal(null);
  };

  const goToOrder = () => {
    navigate('/order');
  };

  const goToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="order" ref={ref}>
      <div className="order__container">
        <main className="order__main">
          <h1 className="order__menu-title">Menu</h1>
          <Link to="/takeaway" className="payment__back">&larr; Back</Link>
          <div className="order__content">
            <nav className="order__sidebar">
              <ul className="sidebar-menu">
                {categories.map(category => (
                  <li
                    key={category.name}
                    className={`sidebar-menu__item ${selectedCategory === category.name ? 'sidebar-menu__item--active' : ''}`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <span className="sidebar-menu__icon">{category.icon}</span>
                    <span className="sidebar-menu__text">{category.name}</span>
                  </li>
                ))}
              </ul>
            </nav>
            <section className="order__products">
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <div
                    className="product-card"
                    key={product.id}
                    onClick={() => openProductModal(product)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="product-card__img">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-card__name">{product.name}</div>
                    <div className="product-card__price">€{product.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
        <footer className="order__footer">
          <div className="order__order-type">Menu</div>
          <div className="order__summary">
            <div className="cart-summary-widget">
              <img src="/img/pngegg.png" alt="Shopping Cart" className="cart-icon" width="30" />
              <div className="order__total">Total: €{totalCartPrice.toFixed(2)}</div>
            </div>
            <button className="order__details-btn" onClick={goToOrder}>Order details</button>
          </div>
          <button className="order__pay-btn" onClick={goToPayment} disabled={cart.length === 0} >Pay</button>
        </footer>
      </div>
      {isModalOpen && (
        <ProductModal
          product={selectedProductForModal}
          onAddToCart={addToCart}
          onClose={closeProductModal}
        />
      )}
    </div>
  );
});

export default MenuPage;
