import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import productDetails from "./ProductDetails.mjs";

const dataSource = new ExternalServices("products");
const productId = getParam("product");

console.log("Product ID:", productId);

const product = new productDetails(productId, dataSource);
product.init();


