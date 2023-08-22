const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');
const loginLink = document.querySelector('.login-link');
const signupLink = document.querySelector('.signup-link');
const closePopup = document.querySelector('.icon-close');
const popup = document.querySelector('.menu-main-session-login');

signupLink.addEventListener('click',()=>{
    wrapper.classList.add('active');
    eraseLoginContent();
});

loginLink.addEventListener('click',()=>{
    wrapper.classList.remove('active');
    eraseSignupContent();
});

popup.addEventListener('click',()=>{
    wrapper.classList.add('active-popup');
    wrapper.classList.remove('active');
});

closePopup.addEventListener('click',()=>{
    wrapper.classList.remove('active-popup');
    eraseLoginContent();
    eraseSignupContent();
});

function eraseLoginContent(){
    loginForm.reset();
}

function eraseSignupContent(){
    signupForm.reset();
}
