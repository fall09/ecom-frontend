import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { checkout, getCartItems } from "../../services/cartService";
import "./CartPage.css";

const CartPage = () => {
  const cartId = 4;

  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }, [cartItems]);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const data = await getCartItems(cartId);
        setCartItems(data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Cart could not be loaded");
      }
    };

    loadCartItems();
  }, []);

  const handleCheckout = async () => {
    try {
      await checkout(cartId);
      alert("Order created successfully");
    } catch (error) {
      console.error(error);
      alert("Checkout failed");
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Your Cart</h1>
          <Link to="/home" className="back-home-link">
            ← Continue Shopping
          </Link>
        </div>

        {errorMessage && <p className="error-text">{errorMessage}</p>}

        {cartItems.length === 0 ? (
          <div className="empty-cart">Your cart is empty</div>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => (
                <div className="cart-item-card" key={item.id}>
                  <img
                    src={
                      item.product.imgUrl && item.product.imgUrl.trim()
                        ? item.product.imgUrl
                        : "/shopping.png"
                    }
                    alt={item.product.name}
                    className="cart-item-image"
                  />

                  <div className="cart-item-info">
                    <h3>{item.product.name}</h3>
                    <p>{item.product.description}</p>
                    <span>Quantity: {item.quantity}</span>
                  </div>

                  <div className="cart-item-price">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Total: ${totalPrice.toFixed(2)}</h2>
              <button className="checkout-button" onClick={handleCheckout}>
                Confirm Cart / Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;