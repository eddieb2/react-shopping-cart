import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./context/ProductContext";
import { CartContext } from "./context/CartContext";
import uuid from "react-uuid";

//* COMPONENT HERE *//
function App() {
  const [cart, setCart] = useState([]);
  const [products] = useState(data);
  console.log("cart in app.js:", cart);

  const addItem = item => {
    item.uniqueID = uuid();
    setCart([...cart, { ...item, id: uuid() }]);
  };

  const removeItem = id => {
    const updatedCart = cart.filter(cartItem => {
      if (cartItem.id !== id) {
        return cartItem;
      }
    });
    setCart(updatedCart);
  };

  return (
    // ? QUESTION: DOES IT MATTER IF I HAD MY VALUES IN AN ARRAY OR OBJ? Is this just preference?
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className="App">
          <Navigation />

          {/* Routes */}
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/cart">
            <ShoppingCart />
          </Route>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}
export default App;
