import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Loader from "../UI/Loader";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const displayCheckoutHandler = () => {
    setIsCheckout(true);
  };
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={displayCheckoutHandler}>
          Order
        </button>
      )}
    </div>
  );
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-app-5b454-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userInfo: userData,
          orderedItems: cartContext.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCartHandler();
  };
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onClose={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );
  const didSubmitModal = (
    <React.Fragment>
      <p>Your order is on it's way to you</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {didSubmit && didSubmitModal}
      {isSubmitting && <Loader />}
    </Modal>
  );
};

export default Cart;
