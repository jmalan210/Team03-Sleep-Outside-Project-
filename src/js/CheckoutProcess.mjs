import { getLocalStorage } from "./utils.mjs";

const zipInput = document.querySelector("#zip");

export default class CheckoutProcess {

    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        
        
               
    }
    init() {
        
        this.list = getLocalStorage(this.key);
        const { subtotal, totalItems } = this.calcSubtotal();
        this.calcTotal(subtotal, totalItems);
        this.displayTotal();
        
    }

    calcSubtotal() {
       
        const cartInventory = this.list;
        let subtotal = 0;
        let totalItems = 0;
        cartInventory.forEach(item => {
            subtotal += (item.FinalPrice) * (item.quantity);
            totalItems += (item.quantity);
        });
         document.getElementById("subtotal").innerHTML = `Subtotal: $${subtotal.toFixed(2)}`;
        return { subtotal, totalItems };
    }
    
    calcTotal(subtotal, totalItems) {
        
        const tax = subtotal * .06;
        const subtotalWithTax = subtotal + tax;
        const shipping = 10 + (2 * (totalItems - 1));
        const total = subtotalWithTax + shipping;

        document.getElementById("tax").innerHTML = `Tax: $${tax.toFixed(2)}`;
        document.getElementById("shipping").innerHTML = `Shipping: $${shipping.toFixed(2)}`;
        document.getElementById("total").innerHTML = `Total: $${total.toFixed(2)}`;
        return total;
        

    }

    displayTotal() {
        
        const subtotalP = document.querySelector("#subtotal");
        const taxP = document.querySelector("#tax");
        const shippingP = document.querySelector("#shipping");
        const totalP = document.querySelector("#total");

        subtotalP.hidden = false;
        taxP.hidden = true;
        shippingP.hidden = true;
        totalP.hidden = true;
        
        zipInput.addEventListener("input", () => {
            if (zipInput.checkValidity()) {
            
            taxP.hidden = false;
            shippingP.hidden = false;
            totalP.hidden = false;
            } else {
        
            taxP.hidden = true;
            shippingP.hidden = true;
            totalP.hidden = true;
                
        }
        });
    
    }

    
}