import {getParam, getCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import productDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new productDetails(productId, dataSource);
product.init();
document.getElementById("counter").innerText = getCartCount();


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



