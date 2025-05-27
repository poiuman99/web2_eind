// src/components/MenuPage.js
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import productsData from '../data/products.json';
import ProductModal from './ProductModal';

// Ontvang cart-gerelateerde props van App.js
const MenuPage = React.forwardRef(({ cart, addToCart, removeFromCart, totalCartPrice, totalCartItems }, ref) => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('Burgers');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  const categories = [
    { name: 'Fries', icon: '🍟' },
    { name: 'Burgers', icon: '🍔' },
    { name: 'Snacks', icon: '🍢' },
    { name: 'Veggie', icon: '🥗' },
    { name: 'Sauces', icon: '🥫' },
    { name: 'Drinks', icon: '🥤' },
  ];

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => product.category === selectedCategory);
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
        <header className="order__header">
          <img src="/img/logo3-uitgeknipt beter copy.png" alt="Jetreken Logo" className="order__logo" />
        </header>
        <main className="order__main">
          <h1 className="order__menu-title">Menu</h1>
          <Link to="/takeaway" className="payment__back-button">&larr; Back</Link>
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
        {/* EXTRA CONTROLE: Controleer voordat toFixed wordt aangeroepen */}
        <div className="product-card__price">
          {typeof product.price === 'number' ? `€${product.price.toFixed(2)}` : 'Price N/A'}
        </div>
      </div>
    ))}
  </div>
</section>

// ... (en in de footer voor de totalen)
<span className="cart-total-price">€{totalCartPrice.toFixed(2)}</span>
// totalCartPrice wordt berekend met .reduce en zal altijd een nummer zijn (0 indien leeg),
// dus hier is een extra controle minder snel nodig, tenzij de items zelf corrupt zijn.
          </div>
        </main>
        <footer className="order__footer">
          <div className="order__order-type">Order-Eat In</div>
          <div className="order__summary">
            {/* COMPACTE WINKELWAGEN WEERGAVE HIER */}
            <div className="cart-summary-widget">
              <img src="/img/cart_icon.png" alt="Shopping Cart" className="cart-icon" width="30" />
              <span className="cart-item-count">{totalCartItems} items</span>
              <span className="cart-total-price">€{totalCartPrice.toFixed(2)}</span>
            </div>
            <button className="order__details-btn" onClick={goToOrder}>Order details</button>
          </div>
          <button className="order__pay-btn" onClick={goToPayment}>Pay</button>
        </footer>
      </div>

      {/* Product Modal component blijft hier */}
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