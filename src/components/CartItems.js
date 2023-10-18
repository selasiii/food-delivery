// import { IMG_CDN_URL } from "../constants";
import { getCartTotal } from "../utils/totalPrice";
import ItemQuantity from "./ItemQuantity";

const CartItems = ({ cartItems }) => {
  const totalAmount = getCartTotal(cartItems);

  return (
    <div className="cart-items-container">
      {Object.values(cartItems).map((item) => (
        <div key={item.id} className="cart-items-item">
          <p>{item.name}</p>
          <ItemQuantity item={item} key={item.id} />
          <div className="cart-item-actions">
            {item.price ? (
              <p>GH₵{item.price / 100}</p>
            ) : (
              <p>GH₵{item.defaultPrice / 100}</p>
            )}
          </div>
        </div>
      ))}
      <div className="total-bill">
        <h3 className="subheading-text">Total Bill</h3>
        <h3 className="heading-text">GH₵ {totalAmount}</h3>
      </div>
    </div>
  );
};

export default CartItems;
