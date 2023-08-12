function validarUser(){
    let valor = userValue.value;

    switch(valor){
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
    }
}


function validarPW(){
    let valor = pwValue.value;

    switch(valor){
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
    }
}

setTimeout(() => { console.log(`Una ayudita: ${passw}`); }, 5000);

function login(){
    let usuario = userValue.value;

    switch (validarUser()+validarPW()){
        case 2:
            console.log("Datos ingresados son correctos");
            alert(`Hola ${usuario}`);
            closePopup();
            buttonSwitch(usuario);
            break;
        case 4:
            console.log("Parecería que no, pero sí");
            alert(`Hola... dios?`);
            closePopup();
            buttonSwitch(usuario);
            break;
        case 6:
            console.log("Somos uuuuno");
            alert(`Hola Jefe`);
            closePopup();
            buttonSwitch(usuario);
            break;
        default:
            alert(`Hola ${usuario}`);
            closePopup();
            buttonSwitch(usuario);

    }
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
        `<button class="menu-main-session-login" onclick="popup()">Iniciar Sesion</button>`;
    }
}
