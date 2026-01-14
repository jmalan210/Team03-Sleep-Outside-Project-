import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
  console.log("type of cartItems:", typeof cartItems);
  console.log("Is it an array?", Array.isArray(cartItems));
  cartItems.push(product);
  setLocalStorage("so-cart",cartItems);

  console.log("cartItems:", cartItems);
  // console.log("testArray", testArray);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
