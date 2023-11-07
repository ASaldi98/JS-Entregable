let prodCard = document.getElementById("productos");
let prodLoaded = false;

const fetchProductos = async ()=>{
    try{
        let resp = await fetch('./Products/productos.json');
        let productos = await resp.json();
    
        productos.forEach(producto => {
            prodCard.innerHTML+=`
                    <div class="item" data-tilt>
                        <span class="titulo-item">${producto.nombre}</span>
                        <img src="${producto.imagenProd}" alt="" class="img-item">
                        <span class="precio-item">$${producto.precio}</span>
                        <button class="boton-item">Agregar al Carrito</button>
                    </div>
                `
        });
    }catch (error){
        console.log("Ha ocurrido un error",error);
    }finally{
        ready()
        VanillaTilt.init(document.querySelectorAll(".item"));
    }
}
fetchProductos();
//-------------------------------
let carritoVisible = false;
let total = 0;
let localS = JSON.parse(localStorage.getItem("carrito"));

function ready(){
    actualizarTotalCarrito();
    ocultarCarrito();

    let botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (let i=0; i<botonesEliminarItem.length; i++){
        let button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(let i=0; i < botonesSumarCantidad.length; i++){
        let button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(let i=0; i < botonesRestarCantidad.length; i++){
        let button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    let botonesAgregarCarrito = document.getElementsByClassName('boton-item');
    for(let i=0; i < botonesAgregarCarrito.length; i++){
        let button = botonesAgregarCarrito[i];
        button.addEventListener('click', agregarCarritoClick);
    }

    if (localS != null){
        //console.log(localS);
        let titulo = localS.titulo;
        let precio = localS.precio;
        let imagenSrc = localS.imagenSrc;
        agregarCarrito(titulo,precio,imagenSrc);
        volverCarritoVisible();
    }

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClick);
}

function eliminarItemCarrito(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    actualizarTotalCarrito();

    ocultarCarrito();
}

function actualizarTotalCarrito(){
    let carritoContenedor = document.getElementsByClassName('carrito')[0];
    let carritoItems = carritoContenedor.getElementsByClassName('carrito-item');

    for(let i=0; i < carritoItems.length; i++){
        let item = carritoItems[i];
        let precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //console.log(precioElemento);

        let precio = Number(precioElemento.innerText.replace('$','').replace('.',''));
        //console.log(precio);
        let cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        let cantidad = cantidadItem.value;
        //console.log(cantidad);
        total= total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString('es') + ',00';
}

function ocultarCarrito(){
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0){
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        let items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';

        localStorage.clear();
    }
}

function sumarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    //console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;

    actualizarTotalCarrito();
}

function restarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    //console.log(cantidadActual);
    cantidadActual--;

    if(cantidadActual>=1){
           selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;

        actualizarTotalCarrito();
    }
}

function agregarCarritoClick(event){
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    //console.log(titulo);
    let precio = item.getElementsByClassName('precio-item')[0].innerText;
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;
    //console.log(imagenSrc);

    agregarCarrito(titulo,precio,imagenSrc);

    volverCarritoVisible();
}
function agregarCarrito(titulo,precio,imagenSrc){
    let item = document.createElement('div');
    item.className = 'carrito-item';

    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(let i=0; i < nombresItemsCarrito.length; i++){
        if(nombresItemsCarrito[i].innerText == titulo){
            Swal.fire({
                icon: 'error',
                title: 'Tienes prohibido agregar el mismo producto dos veces.'
              })
            return;
        }
    }

    let itemCarritoContenido = `
        <img src="${imagenSrc}" alt="" width="80px">
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
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminarItemCarrito);

    let botonSumar = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumar.addEventListener('click', sumarCantidad);
    
    let botonRestar = item.getElementsByClassName('restar-cantidad')[0];
    botonRestar.addEventListener('click',restarCantidad);

    actualizarTotalCarrito();

    let prodCarrito = {titulo, precio, imagenSrc};

    localStorage.setItem("carrito", JSON.stringify(prodCarrito));
}

function pagarClick(event){
    Swal.fire(
        'Felicidades!',
        `Su compra de $${total},00 ha sido realizada con éxito!`,
        'success'
    )

    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }

    actualizarTotalCarrito();

    ocultarCarrito();
}

function volverCarritoVisible(){
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity= '1';

    let items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%'    
}