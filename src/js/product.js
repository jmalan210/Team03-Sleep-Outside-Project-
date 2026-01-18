import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import productDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new productDetails(productId, dataSource);
product.init();

// add to cart button event handler

//following commented out because it was competing with the product.init()--JM

// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   console.log(product)
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
// import { setLocalStorage, getLocalStorage } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";

// const dataSource = new ProductData("tents");

// function addProductToCart(product) {
//   let cartItems = getLocalStorage("so-cart") || [];
//   if (!Array.isArray(cartItems)) {
//     cartItems = [];
//   }
//   cartItems.push(product);
//   setLocalStorage("so-cart", cartItems);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   console.log("Adding product:", product);
//   addProductToCart(product);
//   console.log("Cart contents:", getLocalStorage("so-cart"));
//   alert("Product added to cart!");
// }

// // add listener to Add to Cart button
// document.addEventListener("DOMContentLoaded", () => {
//   document
//     .getElementById("addToCart")
//     .addEventListener("click", addToCartHandler);
// });
