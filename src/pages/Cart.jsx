import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useShopify } from '../context/ShopifyContext';
import { RockButton } from '../components/RockButton';
import '../styles/Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { cart, goToCheckout } = useShopify();

  const getTotalPrice = () => {
    if (!cart || !cart.lineItems || cart.lineItems.length === 0) return '£0.00';

    const total = cart.lineItems.reduce((sum, item) => {
      const price = parseFloat(item.variant.price.amount);
      const quantity = item.quantity;
      return sum + (price * quantity);
    }, 0);

    return `£${total.toFixed(2)}`;
  };

  const getItemCount = () => {
    if (!cart || !cart.lineItems) return 0;
    return cart.lineItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <main className="cart-container">
      <div className="cart-background">
        <div className="cart-overlay" />
      </div>

      <motion.div
        className="cart-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {(!cart || !cart.lineItems || cart.lineItems.length === 0) ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <RockButton
              variant="cream"
              onClick={() => navigate('/home')}
            >
              Continue Shopping
            </RockButton>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.lineItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="cart-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="cart-item-image">
                    {item.variant.image && (
                      <img src={item.variant.image.src} alt={item.title} />
                    )}
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p className="cart-item-variant">{item.variant.title}</p>
                    <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                  </div>
                  <div className="cart-item-price">
                    £{(parseFloat(item.variant.price.amount) * item.quantity).toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-total">
                <span>Total ({getItemCount()} {getItemCount() === 1 ? 'item' : 'items'}):</span>
                <span className="cart-total-price">{getTotalPrice()}</span>
              </div>

              <div className="cart-actions">
                <RockButton
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/home')}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Continue Shopping
                </RockButton>
                <RockButton
                  variant="cream"
                  size="lg"
                  onClick={() => goToCheckout()}
                >
                  Checkout
                </RockButton>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </main>
  );
}

export default Cart;
