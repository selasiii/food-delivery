export const getCartTotal = (cartItems) => {
    return Object.values(cartItems).reduce((total, item) => {
      const price = item.price || item.defaultPrice;
      return total + item.quantity * price;
    }, 0) / 100;
  };
  