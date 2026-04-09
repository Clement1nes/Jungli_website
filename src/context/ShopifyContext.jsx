import { createContext, useContext, useState, useEffect } from 'react';
import { createCheckout, addToCart, fetchCheckout, getCheckoutUrl, removeLineItem, updateLineItem } from '../utils/shopify';

const ShopifyContext = createContext();

export const useShopify = () => {
  const context = useContext(ShopifyContext);
  if (!context) {
    throw new Error('useShopify must be used within a ShopifyProvider');
  }
  return context;
};

export const ShopifyProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize or restore checkout on mount and when page gains focus
  useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutId = localStorage.getItem('shopify_checkout_id');

      try {
        if (existingCheckoutId) {
          // Try to fetch existing checkout
          const existingCheckout = await fetchCheckout(existingCheckoutId);

          // If checkout is completed or order is processed, create a new one
          if (existingCheckout.completedAt || existingCheckout.order) {
            console.log('Checkout completed, creating new checkout');
            const newCheckout = await createCheckout();
            setCheckout(newCheckout);
            localStorage.setItem('shopify_checkout_id', newCheckout.id);
          } else {
            setCheckout(existingCheckout);
          }
        } else {
          // Create new checkout
          const newCheckout = await createCheckout();
          setCheckout(newCheckout);
          localStorage.setItem('shopify_checkout_id', newCheckout.id);
        }
      } catch (error) {
        console.error('Error initializing checkout:', error);
        // If there's an error, create a new checkout
        const newCheckout = await createCheckout();
        setCheckout(newCheckout);
        localStorage.setItem('shopify_checkout_id', newCheckout.id);
      }
    };

    initializeCheckout();

    // Re-check checkout when window regains focus (user returns from Shopify)
    const handleFocus = () => {
      console.log('Window focused, refreshing checkout');
      initializeCheckout();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const addItemToCart = async (variantId, quantity = 1) => {
    if (!checkout) {
      console.error('Checkout not initialized');
      return;
    }

    setIsLoading(true);
    try {
      const lineItemsToAdd = [
        {
          variantId,
          quantity
        }
      ];

      const updatedCheckout = await addToCart(checkout.id, lineItemsToAdd);
      setCheckout(updatedCheckout);
      return updatedCheckout;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeItemFromCart = async (lineItemId) => {
    if (!checkout) return;
    setIsLoading(true);
    try {
      const updatedCheckout = await removeLineItem(checkout.id, [lineItemId]);
      setCheckout(updatedCheckout);
      return updatedCheckout;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateItemQuantity = async (lineItemId, quantity) => {
    if (!checkout) return;
    setIsLoading(true);
    try {
      const updatedCheckout = await updateLineItem(checkout.id, [{ id: lineItemId, quantity }]);
      setCheckout(updatedCheckout);
      return updatedCheckout;
    } catch (error) {
      console.error('Error updating item quantity:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const goToCheckout = () => {
    if (checkout) {
      const checkoutUrl = getCheckoutUrl(checkout);
      window.location.href = checkoutUrl;
    }
  };

  const buyNow = async (variantId, quantity = 1) => {
    try {
      // Create a fresh checkout for Buy Now so old items don't carry over
      const freshCheckout = await createCheckout();
      setCheckout(freshCheckout);
      localStorage.setItem('shopify_checkout_id', freshCheckout.id);

      const lineItemsToAdd = [{ variantId, quantity }];
      const updatedCheckout = await addToCart(freshCheckout.id, lineItemsToAdd);
      setCheckout(updatedCheckout);

      const checkoutUrl = getCheckoutUrl(updatedCheckout);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error in buy now:', error);
      throw error;
    }
  };

  const value = {
    checkout,
    cart: checkout,
    isLoading,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    goToCheckout,
    buyNow,
    cartItemCount: checkout?.lineItems?.length || 0
  };

  return (
    <ShopifyContext.Provider value={value}>
      {children}
    </ShopifyContext.Provider>
  );
};
