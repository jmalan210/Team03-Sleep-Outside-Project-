import { renderListWithTemplate } from "./utils.mjs";

function cartCardTemplate(product) {
    return `
        <li class="cart-card divider">
            <a href="product_pages/?product=${product.Id}" class="cart-card__image">
              <img
                src="${product.Image}"
                alt="${product.Name}"
              />
            </a>
            <a href="product_pages/?product=${product.Id}">
              <h2 class="card__name">${product.Brand.Name}<</h2>
            </a>
            <p class="cart-card__color">${product.Colors.ColorName}</p>
            <p class="cart-card__quantity">qty: 1</p>
            <p class="cart-card__price">$${product.FinalPrice}</p>
        </li>
    `;
}

export default class CartList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
       
    }
    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(cartCardTemplate, this.listElement, list);
    }
}

