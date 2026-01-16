//Import the functions that are needed in this module from utils.mjs, ProductData.mjs, 
// and ProductDetails.mjs

import { getParam } from "./utils.mjs"; //Get the product parameter, the product id, from the URL using the helper function getParam
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";
import { renderProductList } from "./main.js";


const dataSource = new ProductData("tents"); //Create an instance of the ProductData data class with the URL it should use to look for products
const productId = getParam("product");

if (productId) {
  document.querySelector(".product-list").style.display = "none";
  //document.getElementById("page-title").textContent = "Product Details";

  const product = new ProductDetails(productId, dataSource); // Use both of these variables to create an instance of the ProductDetails class
  product.init(); //Call the init() method using the class instance to finish setting everything up
} else {
  renderProductList(dataSource);
}


