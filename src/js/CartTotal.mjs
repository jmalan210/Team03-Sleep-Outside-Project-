import { getLocalStorage, getCartCount} from "./utils.mjs";



//Total in Cart Feature
export function GetCartTotal() {
    const divTotal = document.querySelector(".cart-footer");
    const displayTotal = document.querySelector(".cart-total");

    if (!divTotal || !displayTotal) return 0;

    const cartItems = getLocalStorage("so-cart") ||[];
    let total = 0.0;

    cartItems.forEach(item => {
        total += parseFloat(item.FinalPrice);
    });

    

    if (cartItems.length === 0) {
        divTotal?.classList.add("hide");
        displayTotal && (displayTotal.textContent = "");
    } else {
        divTotal?.classList.remove("hide");
        displayTotal && (displayTotal.textContent = `Total: $${total.toFixed(2)}`)
    }
    
    return total
}

GetCartTotal();




