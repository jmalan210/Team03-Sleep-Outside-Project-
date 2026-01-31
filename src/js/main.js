import { loadHeaderFooter, getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";

loadHeaderFooter();

const welcomePopUp = document.querySelector(".welcomePopUp");
const closeBtn = document.querySelector("#closeBtn");
const couponBtn = document.querySelector("#couponBtn");

//Trigger event: pop-up the modal when all conent has been loaded
window.addEventListener("DOMContentLoaded", () => {
    const visited = getLocalStorage("visited");
    //check if local storage has the variable "visited"
    setTimeout(() => {
        if (!visited) {
            //show welcome pop-up
            welcomePopUp.showModal();
            //update local storage to show that user has visited
            //won't show again on the next load unless "visited" is deleted in localStorage
            setLocalStorage("visited", true);
        }
    },1000);
})

closeBtn.addEventListener("click", () => {
    welcomePopUp.close();
});

couponBtn.addEventListener("click", (e) => {
    e.preventDefault();
    welcomePopUp.close();
    removeAllAlerts();
    alertMessage("Coupon sent to your email");
    setTimeout(removeAllAlerts,3000);
})