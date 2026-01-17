import { getCartCount, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class productDetails{
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
        // console.log("before push:", getLocalStorage("so-cart"));
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
        // console.log("after push:", getLocalStorage("so-cart"));
        // console.log("Counter updated to:", getCartCount());
        document.getElementById("counter").innerText = getCartCount();

        console.log("cartItems:", cartItems);
        

        
    }
    renderProductDetails() {
        productDetailsTemplate(this.product);
    }

}

function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;
    //console.log("product= ", product);
    //******************Code for Add discount to product detail pages**************/
    //*****************************************************************************/
    const discount = document.querySelector('h3');
    const retailPrice = document.createElement('h4');
    const amountDiscounted = document.createElement('h4');
    
    retailPrice.innerHTML = `Retail price: $${parseFloat(product.SuggestedRetailPrice)}`;
    amountDiscounted.innerHTML=`Discount: $${parseFloat(product.SuggestedRetailPrice)-parseFloat(product.ListPrice)}`;
    //discount.appendChild(newLine);
    discount.appendChild(retailPrice);
    discount.appendChild(amountDiscounted);
    //*****************************************************************************/
    //*****************************************************************************/
    const productImage = document.getElementById('productImage');
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}