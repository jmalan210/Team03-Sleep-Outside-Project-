
import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();



const checkoutProcess = new CheckoutProcess("so-cart", "#checkoutData");
checkoutProcess.init();

const checkoutForm = document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkoutProcess.checkout();
});
