//Generate a list of product cars in HTML from an array

import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        //get the data
        const list = await this.dataSource.getData();
        //then render the list:
        this.renderList(list)
    }

    renderList(list) {
        //const htmlStrings = list.map(productCardTemplate);
        //this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
        
        //use function in the utils.mjs file that has an upgraded function as above lines of code
        renderListWithTemplate(productCardTemplate, listElement, list);
    }
}

function productCardTemplate(product) {
    return `<li class="product-card">
            < a href = "product_pages/index.html product=" >
                <img src="" alt="Image of ">
                <h2 class="card__brand"></h2>
                <h3 class="card__name"></h3>
                <p class="product-card__price">$</p>
            </a>
            </li >`
}
