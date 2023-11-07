let userValue = document.querySelector("#user");
let pwValue = document.querySelector("#pw");
const hint = document.querySelector('.hint');
const wrapper = document.querySelector('.wrapper');

let user1_1 = "user123";
let pw1_1 = "Bambi1234";

let user2_1 = "dev";
let pw2_1 = "dev123";

let user3_1 = "0wn3r";
let pw3_1 = "D4_B3s7!";

userValue.addEventListener('input', validarUser);
pwValue.addEventListener('input', validarPW);

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    login();
})

signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
})

hint.addEventListener('click',()=>{
    console.log("Muy bien");

    if(validarUserBG()!=0 || validarPWBG()!=0){
        setTimeout(() => { console.log(`Buscando...`); }, 2000);
        if(validarPWBG()!=0){
            console.log("Casi");
            switch(validarPWBG()*validarUserBG()){
                case 0:
                    switch(validarPWBG()){
                        case 1:
                            setTimeout(() => { console.log(`Una ayudita: ${user1_1}`); }, 5000);
                            break;
                        case 2:
                            setTimeout(() => { console.log(`Una ayudita: ${user2_1}`); }, 5000);
                            break;
                        case 3:
                            setTimeout(() => { console.log(`Una ayudita: ${user3_1}`); }, 5000);
                            break;
                    }
                            break;
                case 1:
                    setTimeout(() => { console.log(`Ya lo tienes. Logueate`); }, 5000);
                    break;
                case 2:
                    setTimeout(() => { console.log(`Decide: user: ${user2_1} o pw: ${pw1_1}`); }, 5000);
                    break;
                case 3:
                    setTimeout(() => { console.log(`Decide: user: ${user3_1} o pw: ${pw1_1}`); }, 5000);
                    break;
                case 4:
                    setTimeout(() => { console.log(`Ya lo tienes. Logueate`); }, 5000);
                    break;
                case 6:
                    setTimeout(() => { console.log(`Decide: user: ${user3_1} o pw: ${pw2_1}`); }, 5000);
                    break;
                case 9:
                    setTimeout(() => { console.log(`Ya lo tienes. Logueate`); }, 5000);
                    break;
            }
        }else if(validarUserBG()!=0 && validarPWBG()==0){
            switch(validarUserBG()){
                case 1:
                    setTimeout(() => { console.log(`Una ayudita: ${pw1_1}`); }, 5000);
                    break;
                case 2:
                    setTimeout(() => { console.log(`Una ayudita: ${pw2_1}`); }, 5000);
                    break;
                case 3:
                    setTimeout(() => { console.log(`Una ayudita: ${pw3_1}`); }, 5000);
                    break;
            }    
        }
        
    }else{
        setTimeout(() => { console.log(`Nada...`); }, 2000);
    }
    setTimeout(() => { console.clear(); }, 10000);
});

function validarUser(){
    console.log(userValue.value);
    switch(userValue.value){
        case user1_1:
            userValue.style.color = "#44e444";
            console.log("Clásico");
            return 1;
        case user2_1:
            userValue.style.color = "#44e444";
            console.log("¿Nuestro creador está aquí?");
            return 2;
        case user3_1:
            userValue.style.color = "#44e444";
            console.log("La gaaaarra~");
            return 3;
        default:
            userValue.style.color = "";
            return 0;
    }
}
function validarUserBG(){
    switch(userValue.value){
        case user1_1:
            return 1;
        case user2_1:
            return 2;
        case user3_1:
            return 3;
        default:
            return 0;
    }
}


function validarPW(){
    console.log(pwValue.value);
    switch(pwValue.value){
        case pw1_1:
            pwValue.style.color = "#44e444";
            console.log("Otro Clásico");
            return 1;
        case pw2_1:
            pwValue.style.color = "#44e444";
            console.log("¿En serio?");
            return 2;
        case pw3_1:
            pwValue.style.color = "#44e444";
            console.log("Apa...");
            return 3;
        default:
            pwValue.style.color = "";
            return 0;
    }
}
function validarPWBG(){
    switch(pwValue.value){
        case pw1_1:
            return 1;
        case pw2_1:
            return 2;
        case pw3_1:
            return 3;
        default:
            return 0;
    }
}


function login(){
    let usuario = userValue.value;

    switch (validarUserBG()*validarPWBG()){
        case 0:
            if(confirm("¿Estas seguro de querer loguearte de esa forma?")==true){
                alert(`Hola ${usuario}`);
                closePopupFunct();
                buttonSwitch(usuario);    
            }
            break;
        case 1:
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
        case 9:
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
        location.reload();
        let miDiv = document.getElementById("session");
        miDiv.innerHTML = 
            `<button class="menu-main-session-login">Iniciar Sesion</button>`;
    }
}
