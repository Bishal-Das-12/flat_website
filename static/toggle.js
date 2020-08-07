burger = document.querySelector('.burger')
nav = document.querySelector('.nav')
navbar = document.querySelector('.navbar')
right = document.querySelector('.right')

burger.addEventListener('click',()=>{
    nav.classList.toggle('v_class');
    right.classList.toggle('v_class');
    navbar.classList.toggle('h_nav');
});
