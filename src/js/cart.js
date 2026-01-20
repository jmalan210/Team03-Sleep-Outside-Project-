import { getLocalStorage, getCartCount } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const hasDiscount = item.FinalPrice < item.SuggestedRetailPrice;
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="product-card_price">
                ${
                    hasDiscount
                    ? `
                        <span class="price-label was">
                        <span class="label">Was:</span>
                        <span class="was-price">
                            $${item.SuggestedRetailPrice.toFixed(2)}
                        </span>
                        </span>

                        <span class="price-label discounted">
                        <span class="label">Now:</span>
                        <span class="discounted-price">
                            $${item.FinalPrice.toFixed(2)}
                        </span>
                        </span>
                    `
                    : 
                    
                    `<span class="price-label">
                        <span class="label">Price:</span>
                        $${item.FinalPrice.toFixed(2)}
                        </span>`
                }
                </p>
</li>`;

  return newItem;
}

renderCartContents();
