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
   
    //******************Code for Add discount to product detail pages**************/
    //*****************************************************************************/
    // const discount = document.querySelector('h3');
    // const retailPrice = document.createElement('h4');
    // const amountDiscounted = document.createElement('h4');
    
    // retailPrice.innerHTML = `Retail price: $${parseFloat(product.SuggestedRetailPrice)}`;
    // amountDiscounted.innerHTML=`Discount: $${(parseFloat(product.SuggestedRetailPrice)-parseFloat(product.ListPrice)).toFixed(2)}`;
    // //discount.appendChild(newLine);
    // discount.appendChild(retailPrice);
    // discount.appendChild(amountDiscounted);
    //*****************************************************************************/
    //*****************************************************************************/
    
    //**********Code to chage the picture size depending on window width***********/
    //*****************************************************************************/
    productImage.src = product.Images.PrimaryExtraLarge;
    window.addEventListener("resize",()=>{
        const windowWidth = window.innerWidth;
        const productImage = document.getElementById('productImage'); 
            
        if (windowWidth < 600){
            productImage.src = product.Images.PrimaryMedium;
        }else if (windowWidth < 1200) {
            productImage.src = product.Images.PrimaryLarge;
        }else {
            productImage.src = product.Images.PrimaryExtraLarge;
        }
    });
    //*****************************************************************************/
    //*****************************************************************************/
    productImage.alt = product.NameWithoutBrand;
    document.getElementById('brand').textContent = product.Brand.Name;
    document.getElementById('name').textContent = product.NameWithoutBrand;
    document.getElementById('productPrice').textContent = "Price: $" + parseFloat(product.FinalPrice).toFixed(2);
    document.getElementById('productColor').textContent = "Color: " + product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = "Availabillity: " + product.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = product.Id;
}
