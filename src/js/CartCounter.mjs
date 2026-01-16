import { getCartCount } from "./utils.mjs";


const count = getCartCount();
let counter = document.getElementById("counter");

if (!counter) {
    counter = document.createElement("div");
    counter.id = "counter";
    document.querySelector(".cart").prepend(counter);
}

if (count > 0) {
    counter.textContent = count;
    counter.removeAttribute("data-hidden");
}
else {
    counter.setAttribute("data-hidden", "true");
 }
