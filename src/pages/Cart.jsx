import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useShopify } from '../context/ShopifyContext';
import { RockButton } from '../components/RockButton';
import '../styles/Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { cart } = useShopify();

  const getTotalPrice = () => {
    if (!cart || !cart.lines || !cart.lines.edges) return '£0.00';

    const total = cart.lines.edges.reduce((sum, { node }) => {
      const price = parseFloat(node.cost.totalAmount.amount);
      return sum + price;
    }, 0);

    return `£${total.toFixed(2)}`;
  };

  const getItemCount = () => {
    if (!cart || !cart.lines || !cart.lines.edges) return 0;
    return cart.lines.edges.reduce((sum, { node }) => sum + node.quantity, 0);
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
        <h1 className="cart-title">Your Cart</h1>

        {(!cart || !cart.lines || cart.lines.edges.length === 0) ? (
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
              {cart.lines.edges.map(({ node }) => (
                <motion.div
                  key={node.id}
                  className="cart-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="cart-item-image">
                    {node.merchandise.image && (
                      <img src={node.merchandise.image.url} alt={node.merchandise.product.title} />
                    )}
                  </div>
                  <div className="cart-item-details">
                    <h3>{node.merchandise.product.title}</h3>
                    <p className="cart-item-variant">{node.merchandise.title}</p>
                    <p className="cart-item-quantity">Quantity: {node.quantity}</p>
                  </div>
                  <div className="cart-item-price">
                    £{parseFloat(node.cost.totalAmount.amount).toFixed(2)}
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
                  onClick={() => navigate('/home')}
                >
                  Continue Shopping
                </RockButton>
                <RockButton
                  variant="cream"
                  onClick={() => {
                    if (cart.checkoutUrl) {
                      window.location.href = cart.checkoutUrl;
                    }
                  }}
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
