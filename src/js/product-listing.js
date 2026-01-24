import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ProductData();

const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);

productList.init();

//Filter Results Functionality
//Get Buttons:
const brandNamebtnAZ = document.querySelector("#filter-brandNameBtn-AZ"); //Filter Brand name A-Z button
const brandNamebtnZA = document.querySelector("#filter-brandNameBtn-ZA"); //Filter Brand name Z-A button
const pricebtnLH = document.querySelector("#filter-priceBtn-LH"); //Filter price Lowest - Highest button
const pricebtnHL = document.querySelector("#filter-priceBtn-HL"); //Filter price Hightest - Lowest button

const openFilterBtn = document.querySelector("#openFilterBtn"); // button to open the filter button menu
const filterMenu = document.querySelector(".filterMenu-content"); // filter buttons to hide and show
const arrowDownElement = document.querySelector("#arrow"); // span to change text content

brandNamebtnAZ.addEventListener("click", () => {
    //Sort Brand Name from A-Z
    productList.sortList("Name");
});

brandNamebtnZA.addEventListener("click", () => {
    //Sort Brand Name from Z-A
    productList.sortList("Name", "desc");
});

pricebtnLH.addEventListener("click", () => {
    //Sort Price from Lowest - Highest
    productList.sortList("FinalPrice");
});

pricebtnHL.addEventListener("click", () => {
    //Sort Price from Highest - Lowest
    productList.sortList("FinalPrice", "desc");
});

openFilterBtn.addEventListener("click", () => {
    //Toggle class:
    filterMenu.classList.toggle("hidden");
    //Toggle arrow:
    if (arrowDownElement.textContent == "⮝") {
        arrowDownElement.textContent = "⮟";
    }
    else{
        arrowDownElement.textContent = "⮝";
    }
});

const filterBtnList = document.querySelectorAll(".filterBtn");

filterBtnList.forEach(btn => {
    btn.addEventListener("click", () => {
        //Remove the class "clicked" in all buttons in the list:
        filterBtnList.forEach(button => button.classList.remove("clicked"));
        //and then add the class
        btn.classList.add('clicked');
    });
});



