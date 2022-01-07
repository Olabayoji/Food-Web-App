import { useState, useEffect } from "react";
import Header from "./container/Layout/Header";
import Meals from "./container/Meals/Meals";
import Cart from "./container/Cart/Cart";
import CartProvider from "./Store/CartProvider";
function App() {
  // This effect runs once, after the first render
  useEffect(() => {
    document.title = "My Restaurant";
  }, []);
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {showCart && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
