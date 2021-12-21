import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../Store/cart-context";
export default function MealItem(props) {
  const cardContext = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  const addToCartHandler = (amount) => {
    cardContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>{price}</p>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
}
