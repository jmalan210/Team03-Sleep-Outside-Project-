import { getParam, loadHeaderFooter, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import productDetails from "./ProductDetails.mjs";

const dataSource = new ExternalServices("products");
const productId = getParam("product");

const product = new productDetails(productId, dataSource);
product.init();
loadHeaderFooter();

const addToCartBtn = document.querySelector("#addToCart");
addToCartBtn.addEventListener("click", () => {
    //remove all previous alerts
    const alerts = document.querySelectorAll(".alert");
    alerts.forEach((alert) => document.querySelector("main").removeChild(alert));

    //make alert messages:
    alertMessage("Added Product to Cart.");
});

