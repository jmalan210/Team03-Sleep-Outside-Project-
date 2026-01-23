import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const category = getParam("category");

const dataSource = new ProductData();

const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);

productList.init();
loadHeaderFooter();

//Filter Results Functionality
//Get Buttons:
const brandNamebtnAZ = document.querySelector("#filter-brandNameBtn-AZ"); //Filter Brand name A-Z button
const brandNamebtnZA = document.querySelector("#filter-brandNameBtn-ZA"); //Filter Brand name Z-A button
const pricebtnLH = document.querySelector("filter-priceBtn-LH"); //Filter price Lowest - Highest button
const pricebtnHL = document.querySelector("filter-priceBtn-LH"); //Filter price Hightest - Lowest button

brandNamebtnAZ.addEventListener("click", () => {
    //Sort Brand Name from A-Z
});

brandNamebtnZA.addEventListener("click", () => {
    //Sort Brand Name from Z-A
});

pricebtnLH.addEventListener("click", () => {
    //Sort Price from Lowest - Highest
});

pricebtnHL.addEventListener("click", () => {
    //Sort Price from Highest - Lowest
});



