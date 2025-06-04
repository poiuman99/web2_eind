// src/components/MenuPage.js
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importeer je productdata
import productsData from '../data/products.json';
import ProductModal from './ProductModal'; // Importeer de ProductModal component
import { useCart } from '../context/CartContext'; // Importeer de useCart hook

const MenuPage = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  // Gebruik de useCart hook om toegang te krijgen tot de winkelwagen state en functies
  const { addToCart, totalCartItems, totalCartPrice } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('Burgers'); // Pas aan naar je startcategorie
  const [isModalOpen, setIsModalOpen] = useState(false); // State voor het openen/sluiten van de modal
  const [selectedProductForModal, setSelectedProductForModal] = useState(null); // State voor het product in de modal

  const categories = [
    { name: 'Fries', icon: '🍟' },
    { name: 'Burgers', icon: '🍔' },
    { name: 'Snacks', icon: '🍢' },
    { name: 'Veggie', icon: '🥗' },
    { name: 'Sauces', icon: '🥫' },
    { name: 'Drinks', icon: '🥤' },
  ];

  const filteredProducts = useMemo(() => {
    // Voeg een filter toe om alleen producten met een geldige prijs te tonen
    return productsData.filter(product =>
      product.category === selectedCategory && typeof product.price === 'number'
    );
  }, [selectedCategory]);

  // Functie om de modal te openen met een specifiek product
  const openProductModal = (product) => {
    setSelectedProductForModal(product);
    setIsModalOpen(true);
  };

  // Functie om de modal te sluiten
  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProductForModal(null); // Reset het product
  };

  // Navigatie functies
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
                    onClick={() => openProductModal(product)} // <<-- Klik op de kaart opent de modal
                    style={{ cursor: 'pointer' }} // Optioneel, voor visuele feedback
                  >
                    <div className="product-card__img">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-card__name">{product.name}</div>
                    {/* Zorg dat de prijs altijd een nummer is door de filter in filteredProducts */}
                    <div className="product-card__price">€{product.price.toFixed(2)}</div>
                    {/* De "Add to Cart" knop is verwijderd uit de product-card */}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
        <footer className="order__footer">
          <div className="order__order-type">Order-Eat In</div>
          <div className="order__summary">
            {/* COMPACTE WINKELWAGEN WEERGAVE HIER */}
            <div className="cart-summary-widget">
              <img src="/img/pngegg.png" alt="Shopping Cart" className="cart-icon" width="30" />
              <span className="cart-item-count">{totalCartItems} items</span>
              <span className="cart-total-price">€{totalCartPrice.toFixed(2)}</span>
            </div>
            <button className="order__details-btn" onClick={goToOrder}>Order details</button>
          </div>
          <button className="order__pay-btn" onClick={goToPayment}>Pay</button>
        </footer>
      </div>

      {/* De Product Modal component */}
      {isModalOpen && (
        <ProductModal
          product={selectedProductForModal}
          onAddToCart={addToCart} // Geef de addToCart functie door
          onClose={closeProductModal} // Geef de close functie door
        />
      )}
    </div>
  );
});

export default MenuPage;