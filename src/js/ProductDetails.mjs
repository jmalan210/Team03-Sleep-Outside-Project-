import { getLocalStorage, setLocalStorage } from "./utils.mjs"; // imports

export default class productDetails{
    constructor(productId, dataSource) {
        this.productId = productId; //product's Id
        this.product = {}; 
        this.dataSource = dataSource; //object responsible for return the data (API or JSON)
    }
    //page initializer method
    async init() {
        this.product = await this.dataSource.findProductById(this.productId); 
        this.renderProductDetails();
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this)); 
            // adds a click event to the "Add to Cart" button
    }
    // this method is called when user click on button
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
   
        cartItems.push(this.product); // add to cart
        setLocalStorage("so-cart",cartItems); // salve to cart

        console.log("cartItems:", cartItems);
        // console.log("testArray", testArray);
    }
    // this method simply calls an external function to render product on html file
    renderProductDetails() {
        const title = document.getElementById("page-title");
        if (title) {
            title.textContent = `${this.product.Brand.Name}`;
        }
        productDetailsTemplate(this.product);
        }
}

function productDetailsTemplate(product) {

    const section = document.querySelector(".product-detail");
    section.innerHTML = `
    
    <h1 class="product-name">${product.NameWithoutBrand}</h1>
    
    <img src="${product.Image}" alt="${product.NameWithoutBrand}">
    
    <p class="product-price">$${product.FinalPrice}</p>
    <div class="product-description">
        ${product.DescriptionHtmlSimple}
    </div>        
    <button id="addToCart" data-id="${product.Id}">
      Add to Cart
    </button>
    `
}