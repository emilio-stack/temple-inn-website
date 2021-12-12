// This file contains all the JavaScript that is global to the application.


// Nav drop down.
document.getElementById("menu-icon").addEventListener("click", dropDown) 
function dropDown() {
    var dropDownMenu = document.querySelector(".drop-down-menu");
    var className = dropDownMenu.classList;
    dropDownMenu.classList.toggle("show");
}

// Footer year.
function displayCurrentYear() {
    var date = new Date() ;
    var year = date.getFullYear() ;
    document.getElementById("year").textContent = year
}
window.onload = displayCurrentYear;