import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");

//Create Instance of ProductData class
const dataSource = new ProductData();

//Get the element you want the product list to render
const element = document.querySelector(".product-list");

//Create an instance of the ProductList class and send it to the correct information
const productList = new ProductList(category, dataSource, element);

//Call .init() to show the products
productList.init();