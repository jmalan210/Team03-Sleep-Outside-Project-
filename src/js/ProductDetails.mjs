
import { getCartCount, getLocalStorage, setLocalStorage, initCartCounter, animateCart, addedToCartMsg, qs, setClick } from "./utils.mjs";

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
        const existsInCart = cartItems.find(item => item.Id === this.product.Id);
        if (existsInCart) {
            existsInCart.quantity += 1;
        } else {
            cartItems.push({...this.product, quantity: 1});
        }
        setLocalStorage("so-cart", cartItems);
        animateCart();
        initCartCounter();
        addedToCartMsg(this.product);
        
    }
    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
    

}


function productDetailsTemplate(product) {

    //******************Code for Add discount to product detail pages**************/
    //*****************************************************************************/
    
    const retailP = parseFloat(product.SuggestedRetailPrice);
    const finalP = parseFloat(product.FinalPrice);
    
    const finalPriceEl = document.getElementById('productFinalPrice');
    
    if (finalP !== 0 && retailP > finalP) {
        //Retail Price
        const retailPriceEl = document.createElement('p');
        retailPriceEl.id = "productRetailPrice";
        retailPriceEl.className = "product-card_price";
        retailPriceEl.textContent = `Retail Price: $${retailP.toFixed(2)}`;
        retailPriceEl.style.textDecoration = "line-through";
        retailPriceEl.style.color = "#888";
        
        //Percent Descont
        const discountEl = document.createElement('p');
        discountEl.id = "productPerc";
        discountEl.className = "product-card_price";
        const discountPercent = Math.round(((retailP - finalP) / retailP) * 100);
        discountEl.textContent = `Discount: ${discountPercent}% OFF`;
        discountEl.style.color = "#e63946";
        
        //Insert Before Final Price
        finalPriceEl.parentNode.insertBefore(retailPriceEl, finalPriceEl);
        finalPriceEl.parentNode.insertBefore(discountEl, finalPriceEl);
        
    }
    
    // const productImage = document.getElementById('productImage');
    // productImage.src = product.Images.PrimaryExtraLarge;
    // productImage.classList.add("product-image");
    
    // Create Image Carousel
    const imgCont = qs("#images-container");
    const imgOpts = qs("#image-options");

    imgCont.innerHTML = `
    <img id="productImage" class="product-image" src="${product.Images.PrimaryExtraLarge}" alt="${product.NameWithoutBrand}">
    `;

    imgOpts.innerHTML = `
    <img class="image-preview active-img" src="${product.Images.PrimarySmall}" alt="${product.NameWithoutBrand}" width="50">
    `;
            
    if (product.Images.ExtraImages) {
        product.Images.ExtraImages.forEach(image => {
            imgCont.innerHTML += `
            <img class="product-image hidden" src="${image.Src}" alt="${product.NameWithoutBrand}">
            `;
            
            imgOpts.innerHTML += `
            <img class="image-preview" src="${image.Src}" alt="${product.NameWithoutBrand}" width="50">
            `;
        });

        imgCont.innerHTML += `
        <a class="prev">&#10094;</a>
        <a class="next">&#10095;</a>
        <div class="img-dots"></div>`;

        let imgPrev = document.getElementsByClassName("image-preview");
        let currentImg = 1;

        function changeImage(change) {
            currentImg += change;

            let imgs = document.getElementsByClassName("product-image");
            
            if (currentImg > imgs.length) {currentImg = 1}
            if (currentImg < 1) {currentImg = imgs.length}

            for (let i = 0; i < imgs.length; i++) {
                imgs[i].classList.add("hidden");
                imgPrev[i].classList.remove("active-img");
            }

            imgs[currentImg-1].classList.remove("hidden");
            imgPrev[currentImg-1].classList.add("active-img");
        };

        setClick(".prev", () => changeImage(-1));
        setClick(".next", () => changeImage(1));
        for (let i = 0; i < imgPrev.length; i++) {
            const img = imgPrev[i];
            
            img.addEventListener("click", () => {
                currentImg = i+1;
                changeImage(0);
            })
        
        }
    }

    window.addEventListener("resize", () => {
        const windowWidth = window.innerWidth;
        const productImage = document.getElementById('productImage');
        
        if (windowWidth < 600) {
            productImage.src = product.Images.PrimaryMedium;
        } else if (windowWidth < 1200) {
            productImage.src = product.Images.PrimaryLarge;
        } else {
            productImage.src = product.Images.PrimaryExtraLarge;
        }
    });

    //*****************************************************************************/
    //*****************************************************************************/
    // productImage.alt = product.NameWithoutBrand;
    document.getElementById('brand').textContent = product.Brand.Name;
    document.getElementById('name').textContent = product.NameWithoutBrand;
    document.getElementById('productFinalPrice').textContent = "Final Price: $" + parseFloat(product.FinalPrice).toFixed(2);
    document.getElementById('productColor').textContent = "Color: " + product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = "Availabillity: " + product.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = product.Id;
}

