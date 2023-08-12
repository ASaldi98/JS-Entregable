let userValue = document.getElementById("user");
let pwValue = document.getElementById("pw");
let passw = "Bambi1234";
let numb = 0;

const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');

//-----fuente: https://youtu.be/lwRiLHwHOjQ
const wrapper = document.querySelector('.wrapper');
const navBar = document.querySelector('.menu-main');

fetch('./structs/menu.html')
.then(res=>res.text())
.then(data=>{
    navBar.innerHTML = data
})

fetch('./structs/loginBox.html')
.then(res=>res.text())
.then(data=>{
    wrapper.innerHTML = data
})

//-----fuente: https://stackoverflow.com/questions/43485888/include-multiple-javascript-files-in-a-js-file

function scriptLoader(path, callback)
{
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.async = true;
    script.src = path;
    script.onload = function(){
        if(typeof(callback) == "function")
        {
            callback();
        }
    }
    try
    {
        var scriptOne = document.getElementsByTagName('script')[0];
        scriptOne.parentNode.insertBefore(script, scriptOne);
    }
    catch(e)
    {
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}

scriptLoader('./JS/login-box.js',function(){
    console.log('login-box script loaded');
});

scriptLoader('./JS/login-funct.js',function(){
    console.log('login-funct script loaded');
});

//----------------------------------------------

function clicks(){
    numb +=1;
    contador();
}

function contador(){
    let i = 1;
    console.log("Contemos: ")

    while (i < numb) {
        console.log(i);
        i++;
    }
}
