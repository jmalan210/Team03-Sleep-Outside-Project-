
export default class CheckoutProcess{
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
    }
    calcSubtotal() {
        const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
        let subtotal = 0;
        let totalItems = 0;
        cartItems.forEach(item => {
            subtotal += parseFloat(item.FinalPrice * item.quantity);
            totalItems += parseFloat(item.quantity); 
        });
        document.getElementById("subtotal").innerHTML = `${subtotal.toFixed(2)}`;
        return { subtotal, totalItems }
    }

    calcTotal(subtotal,totalItems) {
        const tax = subtotal * .06;
        const subtotalWithTax = subtotal + tax;
        const shipping = 10 + (2 * (totalItems - 1));
        const total = parseFloat(subtotalWithTax + shipping);

        document.getElementById("tax").innerHTML = `${tax.toFixed(2)}`;
        document.getElementById("shipping").innerHTML = `${shipping.toFixed(2)}`;
        document.getElementById("total").innerHTML = `${total.toFixed(2)}`;
        return total;

    }
    init() {
        const {subtotal, totalItems } = this.calcSubtotal();
        this.calcTotal(subtotal, totalItems);
    }

}