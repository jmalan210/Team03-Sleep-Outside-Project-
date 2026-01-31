import { loadHeaderFooter } from "./utils.mjs";
import CartList from "./ShoppingCart.mjs";



const element = document.querySelector("#cart-list");
const cartList = new CartList(element);


cartList.init();
loadHeaderFooter();

const cartBtn = document.querySelector("#checkout");
cartBtn.addEventListener("click", () => {
    window.location.href = "/checkout/index.html";
    })
