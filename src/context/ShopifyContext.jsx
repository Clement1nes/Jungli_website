import { createContext, useContext, useState, useEffect } from 'react';
import { createCheckout, addToCart, fetchCheckout, getCheckoutUrl } from '../utils/shopify';

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

  // Initialize or restore checkout on mount
  useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutId = localStorage.getItem('shopify_checkout_id');

      try {
        if (existingCheckoutId) {
          // Try to fetch existing checkout
          const existingCheckout = await fetchCheckout(existingCheckoutId);

          // If checkout is completed, create a new one
          if (existingCheckout.completedAt) {
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

  const goToCheckout = () => {
    if (checkout) {
      const checkoutUrl = getCheckoutUrl(checkout);
      window.location.href = checkoutUrl;
    }
  };

  const buyNow = async (variantId, quantity = 1) => {
    try {
      await addItemToCart(variantId, quantity);
      goToCheckout();
    } catch (error) {
      console.error('Error in buy now:', error);
      throw error;
    }
  };

  const value = {
    checkout,
    isLoading,
    addItemToCart,
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
