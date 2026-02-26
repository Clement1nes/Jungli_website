import Client from 'shopify-buy';

// Initialize the Shopify client
const client = Client.buildClient({
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN || 'your-store.myshopify.com',
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '696adf0fee0ace50d06ff1b771b74ad9'
});

// Create a new checkout
export const createCheckout = async () => {
  try {
    const checkout = await client.checkout.create();
    return checkout;
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
};

// Fetch all products
export const fetchProducts = async () => {
  try {
    const products = await client.product.fetchAll();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (productId) => {
  try {
    // Convert numeric ID to GID format if needed
    const gid = productId.startsWith('gid://')
      ? productId
      : `gid://shopify/Product/${productId}`;

    const product = await client.product.fetch(gid);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Add item to checkout
export const addToCart = async (checkoutId, lineItemsToAdd) => {
  try {
    const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
    return checkout;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Update line item quantity
export const updateLineItem = async (checkoutId, lineItemsToUpdate) => {
  try {
    const checkout = await client.checkout.updateLineItems(checkoutId, lineItemsToUpdate);
    return checkout;
  } catch (error) {
    console.error('Error updating line item:', error);
    throw error;
  }
};

// Remove line item from checkout
export const removeLineItem = async (checkoutId, lineItemIdsToRemove) => {
  try {
    const checkout = await client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove);
    return checkout;
  } catch (error) {
    console.error('Error removing line item:', error);
    throw error;
  }
};

// Fetch checkout by ID
export const fetchCheckout = async (checkoutId) => {
  try {
    const checkout = await client.checkout.fetch(checkoutId);
    return checkout;
  } catch (error) {
    console.error('Error fetching checkout:', error);
    throw error;
  }
};

// Get the checkout URL for payment
export const getCheckoutUrl = (checkout) => {
  return checkout.webUrl;
};

export default client;
