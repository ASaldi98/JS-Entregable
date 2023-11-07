let carritoVisible = false;

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

function ready(){
    let botonesEliminarItem = document.querySelector('.btn-eliminar');
    for (let i=0; i<botonesEliminarItem.length; i++){
        let button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    let botonesSumarCantidad = document.querySelector('.sumar-cantidad');
    for(let i=0; i < botonesSumarCantidad.length; i++){
        let button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    let botonesRestarCantidad = document.querySelector('.restar-cantidad');
    for(let i=0; i < botonesRestarCantidad.length; i++){
        let button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    let botonAgregarCarrito = document.querySelector('.boton-item');
    for(let i=0; i < botonAgregarCarrito.length; i++){
        let button = botonAgregarCarrito[i];
        button.addEventListener('click', agregarCarritoClick);
    }

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClick);
}

function eliminarItemCarrito(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    actualizarTotalCarrito();

    ocultarCarrito();
}

function actualizarTotalCarrito(){
    let carritoContenedor = document.querySelector('.carrito')[0];
    let carritoItems = carritoContenedor.querySelector('.carrito-item');
    let total = 0;

    for(let i=0; i < carritoItems.length; i++){
        let item = carritoItems[i];
        let precioElemento = item.querySelector('.carrito-item-precio')[0];
        console.log(precioElemento);

        let precio = Number(precioElemento.innerText.replace('$','').replace('.',''));
        console.log(precio);
        let cantidadItem = item.querySelector('.carrito-item-cantidad')[0];
        let cantidad = cantidadItem.value;
        console.log(cantidad);
        total= total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.querySelector('.carrito-precio-total')[0].innerText = '$' + total.toLocaleString('es') + ',00';
}

function ocultarCarrito(){
    let carritoItems = document.querySelector('.carrito-items')[0];
    if (carritoItems.childElementCount == 0){
        let carrito = document.querySelector('.carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        let items = document.querySelector('.contenedor-items')[0];
        items.style.width = '-100%';
    }
}

function sumarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.querySelector('.carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.querySelector('.carrito-item-cantidad')[0].value = cantidadActual;

    actualizarTotalCarrito();
}

function restarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.querySelector('.carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;

    if(cantidadActual>=1){
           selector.querySelector('.carrito-item-cantidad')[0].value = cantidadActual;

        actualizarTotalCarrito();
    }else{
        eliminarItemCarrito();
    }
}

function agregarCarritoClick(event){
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.querySelector('.titulo-item')[0].innerText;
    console.log(titulo);
    let precio = item.querySelector('.precio-item')[0].innerText;
    let imagenSrc = item.querySelector('.img-item').src;

    agregarCarrito (titulo,precio,imagenSrc);

    volverCarritoVisible();
}

function agregarCarrito(titulo,precio,imagenSrc){
    let item = document.createElement('div');
    item.classList.add = 'item';
    let itemsCarrito = document.querySelector('.carrito-items')[0];

    let nombresItemsCarrito = itemsCarrito.querySelector('.carrito-item-titulo');
    for(let i=0; i < nombresItemsCarrito.length; i++){
        if(nombresItemsCarrito[i].innerText == titulo){
            alert("ya tienes este producto en tu carrito")
            return;
        }
    }

    let itemCarritoContenido = `
    <div class="carrito-item">
        <img src="${imagenSrc}" alt="">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <span class="btn-eliminar">
            <i class="fa-solid fa-trash-can"></i>
        </span>
    </div>
`
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    item.querySelector('.btn-eliminar')[0].addEventListener('click',eliminarItemCarrito);

    let botonSumar = item.querySelector('.sumar-cantidad');
    botonSumar.addEventListener('click',sumarCantidad)
    let botonRestar = item.querySelector('.restar-cantidad');
    botonRestar.addEventListener('click',restarCantidad)
}

function pagarClick(event){
    alert();
    let carritoItems = document.querySelector('.carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }

    actualizarTotalCarrito();

    ocultarCarrito();
}

function volverCarritoVisible(){
    carritoVisible = true;
    let carrito = document.querySelector('.carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity= '1';

    let items = document.querySelector('.contenedor-items')[0];
    items.style.width = '60%'    
}