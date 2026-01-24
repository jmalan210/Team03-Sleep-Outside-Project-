import { getCartCount, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class productDetails{
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        console.log("PRODUCT FROM API:", this.product);
        this.renderProductDetails();
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
        // console.log("before push:", getLocalStorage("so-cart"));
        const existingItem = cartItems.find((item) => item.Id === this.product.Id)
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
                cartItems.push({
                    Id: this.product.Id,
                    NameWithoutBrand: this.product.NameWithoutBrand,
                    FinalPrice: this.product.FinalPrice,
                    Image: this.product.Images.PrimaryMedium,
                    Color: this.product.Colors[0].ColorName,
                    quantity: 1
        });
    }
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
    document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
    document.querySelector("#p-brand").textContent = product.Brand.Name;
    document.querySelector("#p-name").textContent = product.NameWithoutBrand;
    
  
    const retailPrice = document.querySelector("#p-price");      
    retailPrice.innerHTML = `Was: $${parseFloat(product.SuggestedRetailPrice)}`;

    const finalPrice = document.querySelector("#p-price-final");     
    finalPrice.innerHTML = `Now: $${parseFloat(product.FinalPrice)}`;
       
    const productImage = document.querySelector("#p-image");
    productImage.src = product.Images.PrimaryExtraLarge;
    productImage.alt = product.NameWithoutBrand;

    const productDescription = document.querySelector("#p-description");
    const temp = document.createElement("div");
        temp.innerHTML = product.DescriptionHtmlSimple;        
        temp.querySelectorAll("a").forEach(link => {
        link.replaceWith(link.textContent);
        });
        productDescription.innerHTML = temp.innerHTML;
    
    
    const productColor = document.querySelector("#p-color");
    productColor.textContent = product.Colors[0].ColorName;

    document.getElementById('addToCart').dataset.id = product.Id;
}