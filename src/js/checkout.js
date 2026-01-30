
import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();



const checkoutProcess = new CheckoutProcess("so-cart", "#checkoutData");
checkoutProcess.init();

const checkoutForm = document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //Check form validity:
    const checkoutForm = document.forms[0]; //gets the form element
    const formStatus = checkoutForm.checkValidity();
    checkoutForm.reportValidity();
    if (formStatus) {
        checkoutProcess.checkout();
    }
});
