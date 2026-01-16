import{g as d,s as n,a as i}from"./utils-C1ZufQCI.js";/* empty css              */function u(e){if(e.ok)return e.json();throw new Error("Bad Response")}class l{constructor(t){this.category=t,this.path=`/json/${this.category}.json`}getData(){return fetch(this.path).then(u).then(t=>t)}async findProductById(t){return(await this.getData()).find(a=>a.Id===t)}}class h{constructor(t,r){this.productId=t,this.product={},this.dataSource=r}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addProductToCart.bind(this))}addProductToCart(){const t=d("so-cart")||[];t.push(this.product),n("so-cart",t),console.log("cartItems:",t)}renderProductDetails(){const t=document.getElementById("page-title");t&&(t.textContent=`${this.product.Brand.Name}`),p(this.product)}}function p(e){const t=document.querySelector(".product-detail");t.innerHTML=`
    
    <h1 class="product-name">${e.NameWithoutBrand}</h1>
    
    <img src="${e.Image}" alt="${e.NameWithoutBrand}">
    
    <p class="product-price">$${e.FinalPrice}</p>
    <div class="product-description">
        ${e.DescriptionHtmlSimple}
    </div>        
    <button id="addToCart" data-id="${e.Id}">
      Add to Cart
    </button>
    `}async function m(e){const t=await e.getData(),r=document.querySelector(".product-list");r.innerHTML="",t.forEach(a=>{const o=document.createElement("li");o.classList.add("product-card"),o.innerHTML=`
      <a href="/product_pages/index.html?product=${a.Id}">
        <img src="${a.Image}" alt="${a.NameWithoutBrand}" />
        <h3 class="card__brand">${a.Brand.Name}</h3>
        <h2 class="card__name">${a.NameWithoutBrand}</h2>
        <p class="product-card__price">$${a.FinalPrice}</p>
      </a>
    `,r.appendChild(o)})}const c=new l("tents"),s=i("product");s?(document.querySelector(".product-list").style.display="none",new h(s,c).init()):m(c);
