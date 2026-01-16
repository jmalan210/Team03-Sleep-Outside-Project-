import{g as c}from"./utils-C1ZufQCI.js";/* empty css              */function e(){const r=c("so-cart")||[];if(r.length===0){document.querySelector(".product-list").innerHTML="<p>Your cart is empty</p>";return}const t=r.map(a=>o(a));document.querySelector(".product-list").innerHTML=t.join("")}function o(r){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${r.Image}" alt="${r.Name}" />
  </a>
  
    <h2 class="card__name">${r.NameWithoutBrand}</h2>  
    <p class="cart-card__color">${r.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${r.FinalPrice}</p>
</li>`}e();
