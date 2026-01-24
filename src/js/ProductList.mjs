import { loadHeaderFooter, renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const title = document.querySelector("h2");
    title.innerHTML = `Top Products: <span class="title">${product.Category}</span>`;
    return `
    <li class="product-card">
        <a href="../product_pages/?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
            <h2 class="card_brand>${product.Brand.Name}</h2>
            <h3 class= "card_name>${product.Name}</h3>
            <p class="product-card_price">$${product.FinalPrice}</p>
                
        </a>
    </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
       
    
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        await loadHeaderFooter();
        const titleDash = document.querySelector(".title")
        if (titleDash) {
            titleDash.textContent = this.category.replace(/-/g, " ");
        }
       
        
            }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    
}

