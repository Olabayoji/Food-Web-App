import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../Store/cart-context";
export default function HeaderCartButton(props) {
  const cartProvider = useContext(CartContext);
  const numberOfCartItem = cartProvider.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const [btnHighlight, setBtnHighlight] = useState(false);
  const btnClasses = `${classes.button} ${btnHighlight && classes.bump}`;
  const { items } = cartProvider;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHighlight(true);
    const timer = setTimeout(() => {
      setBtnHighlight(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
}
