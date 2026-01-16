export async function renderProductList(dataSource) {
  const products = await dataSource.getData();
  const list = document.querySelector(".product-list");

  list.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.classList.add("product-card");

    li.innerHTML = `
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    `;

    list.appendChild(li);
  });
}
