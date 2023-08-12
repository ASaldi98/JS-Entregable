
function signupTab(){
    wrapper.classList.add('active');
    eraseLoginContent();
}

function loginTab(){
    wrapper.classList.remove('active');
}

function popup(){
    wrapper.classList.add('active-popup');
    wrapper.classList.remove('active');
}

function closePopup(){
    wrapper.classList.remove('active-popup');
}

function eraseLoginContent(){
    loginForm.reset();
}
