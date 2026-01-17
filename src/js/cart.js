import { getLocalStorage } from "./utils.mjs";
import { updateCartCounter } from "./CartCounter.mjs";
import { GetCartTotal } from "./CartTotal.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
  <div class="remover" data-id=${item.Id}>X</div>
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
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}


function removeItemFromCart(id) {
  let cart = getLocalStorage("so-cart") || [];
        cart = cart.filter(item => item.Id !== id);
        localStorage.setItem("so-cart", JSON.stringify(cart));
  renderCartContents();
  updateCartCounter();
  GetCartTotal();
    }

renderCartContents();

const productList = document.querySelector(".product-list");
if (productList) {
  productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remover")) {
      const id = e.target.dataset.id;
      console.log("removing", id);
      removeItemFromCart(id)
    }
  });
}
