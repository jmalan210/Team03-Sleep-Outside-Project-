import { getLocalStorage, alertMessage, removeAllAlerts} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

//External services:
const externalServices = new ExternalServices();

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
        // console.log("checkout list:", this.list);
        
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
        
        this.tax = subtotal * .06;
        this.shipping = totalItems >0 ?10 + (2 * (totalItems - 1)):0; //prevents negative shipping totals if no cart items
        this.orderTotal = subtotal + this.tax + this.shipping;

        document.getElementById("tax").innerHTML = `Tax: $${this.tax.toFixed(2)}`;
        document.getElementById("shipping").innerHTML = `Shipping: $${this.shipping.toFixed(2)}`;
        document.getElementById("total").innerHTML = `Total: $${this.orderTotal.toFixed(2)}`;
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

    async checkout(){
        // get the form element data by the form name
        const formElement = document.forms["checkoutForm"];
        // convert the form data to a JSON order object using the formDataToJSON function
        const orderList = formDataToJSON(formElement);

        // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
        orderList.orderDate = new Date().toISOString();
        orderList.orderTotal = this.orderTotal;
        orderList.tax = this.tax;
        orderList.shipping = this.shipping;
        orderList.items = packageItems(this.list);

        // call the checkout method in the ExternalServices module and send it the JSON order data.
        try {
            const response = await externalServices.checkout(orderList);
            console.log(response);
            if (!response.success) {
                removeAllAlerts();
                response.errors.forEach(err => alertMessage(err));
                return
            }
            window.location.href = "success.html"
        }
        catch (e) {
            console.log(e);// shows error message
            
            removeAllAlerts();
            // if (e.data && Array.isArray(e.data.errors)) {
            //     e.data.errors.forEach(msg => alertMessage(msg));
            if (e.data && typeof e.data === "object") {
                Object.values(e.data).forEach(msg => {
                    if (msg) alertMessage(msg);
                });
            }
            else if (typeof e.message === "string") {
                alertMessage(e.message);
            } else {
                alertMessage("Something went wrong with placing your order.")
            }
           
        }
    } 
}

function packageItems(items) {
    const cartItems = items;
    const simplifiedCart = cartItems.map(item => {
        return {
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.quantity
        }
    });
    return simplifiedCart;
    
}

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
   
}

