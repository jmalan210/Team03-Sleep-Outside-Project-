// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
  
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
    
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  //if clear is true, we need to clear out parent contents
  if (clear) {
    parentElement.innerHTML = "";
  }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
export function getCartCount() {
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  return cart.reduce(
    (total, item) => total + (item.quantity ?? 1), 0  );
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  return await response.text();
}

export async function loadHeaderFooter(){
  const templateHeader = await loadTemplate("../partials/header.html");
  const templateFooter = await loadTemplate("../partials/footer.html");

  const header = document.querySelector("#dynamic-header");
  const footer = document.querySelector("#dynamic-footer");

  renderWithTemplate(templateHeader, header, null, initCartCounter);
  renderWithTemplate(templateFooter, footer);

  initCartCounter();
}

//cart counter functioning.  Gets called as a callback function when renderWithTemplate is called for the dynamic header//
export function initCartCounter() {
   
    const cartIcon = document.querySelector(".cart");
    if (!cartIcon) return;
    
    let counter = document.getElementById("counter");
 
    if (!counter) {
    counter = document.createElement("div");
    counter.id = "counter";
        cartIcon.prepend(counter);
    }
    
    const count = getCartCount();

    if (count > 0) {
    counter.textContent = count;
    counter.removeAttribute("data-hidden");
}
    else {
    counter.setAttribute("data-hidden", "true");
 }
};

export function updateCartFooter() {
    const divTotal = document.querySelector(".cart-footer");
    const displayTotal = document.querySelector(".cart-total");
    const dispQuantity = document.querySelector(".cart-quant");

    const cartItems = getLocalStorage("so-cart") || [];

    if (getCartCount() === 0) {
      divTotal.classList.add("hide");
      displayTotal.textContent = "";
      dispQuantity.textContent = "";
    } else {
        divTotal.classList.remove("hide");

        
        const subTotal = cartItems.reduce((total, item) => total + parseFloat(item.FinalPrice) * (item.quantity ?? 1), 0);

         displayTotal.textContent = `Total Price: $${subTotal.toFixed(2)}`;
         dispQuantity.textContent = `Total Items: ${getCartCount()}`;
}
    
}

export function alertMessage(message, scroll=true){
  
  const alert = document.createElement('div');
  
  //Access to the error message
  for(let key in message.message){  
    alert.innerHTML = `<span>${message.message[key]}</span>
                        <p class="close">x</p>`;  
  }
  //Creates a class= alert
  alert.classList.add('alert');
 //When click on x, error message disappears
  alert.querySelector('.close').addEventListener('click', ()=>{
    alert.remove();
  }); 

  //Adds the alert at the top of teh page
  const main = document.querySelector('main');
  main.prepend(alert);
  if(scroll)
    window.scrollTo(0,0);

  }





