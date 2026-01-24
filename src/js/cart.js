import { getLocalStorage, getCartCount, loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  document.querySelector("#product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {

  const image = item.Images.PrimarySmall;
  const name = item.NameWithoutBrand;
  const color = item.Colors?.[0]?.ColorName;
  const price = item.FinalPrice;

  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${image}"
      alt="${name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${name}</h2>
  </a>
  <p class="cart-card__color">${color}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${price}</p>
</li>`;

  return newItem;
}

renderCartContents();
