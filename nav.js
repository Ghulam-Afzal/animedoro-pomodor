
let mainNav = document.querySelector('#js-menu'); 
let navBarToggle = document.querySelector('#js-nav-toggle'); 

navBarToggle.addEventListener('click', () => { 
    mainNav.classList.toggle('active'); 
})