let userValue = document.querySelector("#user");
let pwValue = document.querySelector("#pw");
let loginButton = document.querySelector("#login");
let passw = "Bambi1234";

let valorUser = userValue.value;
let valorPW = pwValue.value;


//const hint = document.querySelector('.remember-forget');
//
//hint.addEventListener('click',()=>{
//    if(valorUser>0){
//
//    }else if(valorPW>0){
//
//    }else{
//        console.log("Nada...")
//    }
//});

userValue.addEventListener('input', validarUser);
pwValue.addEventListener('input', validarPW);

loginButton.addEventListener('submit',login);

function validarUser(){
    console.log(valorUser);
    switch(valorUser){
        case 'user123':
            userValue.style.color = "#44e444";
            console.log("Clásico");
            return 1;
        case 'dev':
            userValue.style.color = "#44e444";
            console.log("¿Nuestro creador está aquí?");
            return 2;
        case '0wn3r':
            userValue.style.color = "#44e444";
            console.log("La gaaaarra~");
            return 3;
        default:
            userValue.style.color = "";
            return 0;
    }
}

function validarPW(){
    console.log(valorPW);
    switch(valorPW){
        case passw:
            pwValue.style.color = "#44e444";
            console.log("Otro Clásico");
            return 1;
        case 'dev123':
            pwValue.style.color = "#44e444";
            console.log("¿En serio?");
            return 2;
        case 'D4_B3s7!':
            pwValue.style.color = "#44e444";
            console.log("Apa...");
            return 3;
        default:
            pwValue.style.color = "";
            return 0;
    }
}

setTimeout(() => { console.log(`Una ayudita: ${passw}`); }, 5000);

function login(){
    let usuario = userValue.value;

    switch (validarUser()+validarPW()){
        case 0:
            break;
        case 2:
            console.log("Datos ingresados son correctos");
            alert(`Hola ${usuario}`);
            closePopupFunct();
            buttonSwitch(usuario);
            break;
        case 4:
            console.log("Parecería que no, pero sí");
            alert(`Hola... dios?`);
            closePopupFunct();
            buttonSwitch(usuario);
            break;
        case 6:
            console.log("Somos uuuuno");
            alert(`Hola Jefe`);
            closePopupFunct();
            buttonSwitch(usuario);
            break;
        default:
            alert(`Hola ${usuario}`);
            closePopupFunct();
            buttonSwitch(usuario);

    }
}

function closePopupFunct(){
    wrapper.classList.remove('active-popup');
    eraseLoginContent();
    eraseSignupContent();
}

function buttonSwitch(usuario){
    let miDiv = document.getElementById("session");
    miDiv.innerHTML = `<p>${usuario}</p> <button id="menu-main-session-login" onclick="logout()">Desloguearse</button>`;
}

function logout(){
    if(confirm("¿Estas seguro de querer desloguearte?")==true){
        alert("Te has deslogueado");
        let miDiv = document.getElementById("session");
        miDiv.innerHTML = 
        `<button class="menu-main-session-login">Iniciar Sesion</button>`;
    }
}
