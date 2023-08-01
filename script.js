
//Listado de productos
const productos = [
    {
        nombre: "Torta Chocotorta",
        precio: 1500,
        imagen: "./assets/torta-chocotorta.jpg",
    },
    {
        nombre: "Torta Cheesecake",
        precio: 1700,
        imagen: "./assets/torta-cheesecake.jpg",
    },
    {
        nombre: "Torta Red Velvet",
        precio: 1650,
        imagen: "./assets/torta-redvelvet.jpg",
    },
    {
        nombre: "Torta Patagonica",
        precio: 1900,
        imagen: "./assets/torta-patagonia.jpeg",
    },
    {
        nombre: "Budín de Chocolate",
        precio: 900,
        imagen: "./assets/budin-chocolate.jpg",
    },
    {
        nombre: "Budín de Vainilla",
        precio: 800,
        imagen: "./assets/budin-vainilla.jpg",
    },
    {

        nombre: "Budín Marmolado",
        precio: 1100,
        imagen: "./assets/budin-marmolado.jpg",
    },
    {
        nombre: "Cupcake Oreo",
        precio: 400,
        imagen: "./assets/cupcake-oreo.jpg",
    },
    {
        nombre: "Cupcake Cafe",
        precio: 450,
        imagen: "./assets/cupcake-cafe.jpg",
    },
    {
        nombre: "Cupcake Red Velvet",
        precio: 350,
        imagen: "./assets/cupcake-redvelvet.jpg"
    },
    {
        nombre: "Cupcake Nutella",
        precio: 550,
        imagen: "./assets/cupcake-nutella.jpg",
    },
];
//Declarar carrito y sus funciones
const carrito = [];
class ArticuloCarrito {
    constructor(nombre, cantidad, precio) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}
const agregarCarrito = (nombre, cantidad, precio) => {
    //Vemos si el producto esta repetido
    const productoRepetido = carrito.some(producto => producto.nombre === nombre);
    if (productoRepetido) {
        //Guardamos el producto repetido
        let repetido = carrito.find(producto => producto.nombre === nombre);
        //Extraemos el idex dentro del array carrito del repetido
        let index = carrito.indexOf(repetido);
        //Modificamos la cantidad del array del producto repetido
        carrito[index].cantidad = parseInt(carrito[index].cantidad)
        cantidad = parseInt(cantidad)
        carrito[index].cantidad = carrito[index].cantidad + cantidad;
    }
    else {
        carrito.push(new ArticuloCarrito(nombre, cantidad, precio))
    }
}
const crearElementosHtml = (padre, hijo) => {
    padre.appendChild(hijo);
}
//Actualiza informacion del carrito
const actualizarCarrito = (carrito, items, unidades, subtotal, cancelar) => {
    items.innerHTML = '';
    unidades.innerHTML = '';
    subtotal.innerHTML = '';
    cancelar.innerHTML = '';
    carrito.forEach((producto) => {
        //Creamos los elementos de cada contenedor del carrito
        let carritoItem = document.createElement("div");
        carritoItem.classList.add("item");
        carritoItem.innerHTML =
            `<p>${producto.nombre}</p>`;
        let carritoUnidad = document.createElement("div");
        carritoUnidad.classList.add("carrito_unidad");
        carritoUnidad.innerHTML =
            `<p>${producto.cantidad}</p>`;
        let carritoSubtotal = document.createElement("div");
        carritoSubtotal.innerHTML =
            `<p>${producto.cantidad * producto.precio}</p>`;
        let carritoCancelar = document.createElement("button");
        carritoCancelar.classList.add("borrar");        
        carritoCancelar.innerText = "X";
        crearElementosHtml(items, carritoItem);
        crearElementosHtml(unidades, carritoUnidad);
        crearElementosHtml(subtotal, carritoSubtotal);
        crearElementosHtml(cancelar, carritoCancelar);
    })
}
//Contenido carrito
let repetirPedido;
const contenidoCarrito = () => {
    if (carrito.length == 0) {
        //Mensaje cuando el cliente no tiene productos en el carrito        
        carrito_comprar.innerHTML =
            '<h3>No tienes ningun articulo en el carrito</h3>' +
            '<button id="repetir_pedido" class="btn btn-primary">¿Queres repetir el pedido anterior?</button>';
        repetirPedido = document.getElementById('repetir_pedido');
    }
    else {
        carrito_comprar.innerHTML =
            `<p>El total a pagar es $ ${montoTotal}</p>
            <form action="">
                <label for= "nombre" ></label >
                <input type="text" name="nombre" id="nombre_cliente" placeholder="Ingresa tu nombre" required>
                <label for="email"></label>
                <input type="email" id="email_cliente" placeholder="Ingresa tu email" required>
                <input type="submit" class="btn btn-primary" value="Enviar Pedido" id="pedido_cliente">
            </form>`;
    }
}
const repetirCompra = () => {
    const comprobarLocalStorage = localStorage.getItem('ultimaOrden');
    if (comprobarLocalStorage !== null) {
        const ultimoPedidoJSON = localStorage.getItem('ultimaOrden');
        const ultimoPedido = JSON.parse(ultimoPedidoJSON);
        for (i = 0; i < ultimoPedido.length; i++) {
            agregarCarrito(ultimoPedido[i].nombre, ultimoPedido[i].cantidad, ultimoPedido[i].precio)
        }
        const carritoContendorProductos = document.getElementById('carrito_contenedor_productos');
        const carritoContendorUnidades = document.getElementById('carrito_contenedor_unidades');
        const carritoContenedorSubtotal = document.getElementById('carrito_contenedor_subtotal');
        const carritoContendorCancelar = document.getElementById('carrito_contenedor_cancelar');
        actualizarCarrito(carrito, carritoContendorProductos, carritoContendorUnidades, carritoContenedorSubtotal, carritoContendorCancelar);
        costoTotal();
        carrito_comprar.innerHTML =
            `<p>El total a pagar es $ ${montoTotal}</p>
            <form action="">
                <label for= "nombre" ></label >
                <input type="text" name="nombre" id="nombre_cliente" placeholder="Ingresa tu nombre" required>
                <label for="email"></label>
                <input type="email" id="email_cliente" placeholder="Ingresa tu email" required>
                <input type="submit" value="Enviar Pedido" id="pedido_cliente">
            </form>`;
        /*Esta linea es para cerrar el divCarrito cuando se desea repetir la compra porque.
        Lo que sucede es que cuando quiero repetir la compra el boton de enviar pedido no 
        activa el evento para finalizar enviando el mensaje por whatsapp. 
        Busque solucionarlo pero no me doy cuenta que esta fallando*/
        divCarrito.classList.toggle('activo');
    }
}
//Calculo monto a pagar
let montoTotal;
const costoTotal = () => {
    montoTotal = 0
    carrito.forEach((producto) => {
        montoTotal = montoTotal + (parseInt(producto.precio) * parseInt(producto.cantidad));
    })
}
//Borrar articulos del carrito
const eliminarArticulo = () => {
    const borrarArticulo = document.querySelectorAll('.borrar');
    borrarArticulo.forEach((articulo, i) => {
        borrarArticulo[i].addEventListener('click', () => {
            const indice = i
            carrito.splice(indice, 1);
            const carritoContendorProductos = document.getElementById('carrito_contenedor_productos');
            const carritoContendorUnidades = document.getElementById('carrito_contenedor_unidades');
            const carritoContenedorSubtotal = document.getElementById('carrito_contenedor_subtotal');
            const carritoContendorCancelar = document.getElementById('carrito_contenedor_cancelar');
            actualizarCarrito(carrito, carritoContendorProductos, carritoContendorUnidades, carritoContenedorSubtotal, carritoContendorCancelar);
            costoTotal();
            contenidoCarrito();
            /*Esta linea es para cerrar el divCarrito cuando se elimine un producto
            lo agregue porque si la lista del carrito tiene mas de un producto
            y quiero eliminar mas de uno los botones .borrar no inician el evento
            click pero al cerrar y volver a abrir el carrito funciona. 
            Busque solucionarlo pero no me doy cuenta que esta fallando*/
            divCarrito.classList.toggle('activo');
        })
    })
}
//Control del contenido div#lista_productos
const lista_productos = document.getElementById('lista_productos');
productos.forEach((producto) => {
    lista_productos.innerHTML +=
        `<div class="tarjeta col-sm-12 col-md-6 col-lg-3">
                <img src="${producto.imagen}" alt="">
                 <h3>${producto.nombre}</h3>` +
        `<h4>$${producto.precio}</h4>
                <button class="comprar btn btn-primary">Comprar</button>
            </div>`
})
//Funciones validadoras del formulario
const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Validar el formato del nombre
const validarNombre = (nombre) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(nombre);
};
//Mensaje de error
const error = document.getElementById('error_formulario');
const Btnerror = document.getElementById('error');
//Se busca y guarda cada boton .comprar
const btnComprar = document.querySelectorAll(".comprar");
//Constantes y variables para regular el contenido y funcion del div#compra
const compra = document.getElementById('compra');
let inputCantidad;
let cantidad;
//Constantes para buscar al carrito en el DOM
const btnCarrito = document.getElementById('btnCarrito');
const divCarrito = document.getElementById('carrito');
//Renderiza en div #compra info del producto seleccionado
btnComprar.forEach((comprar, i) => {
    btnComprar[i].addEventListener('click', () => {
        compra.classList.add('activo');
        let compraHTML = '<h2 class="nombre"></h2>' +
            '<img id="compraImg" src="">' +
            '<h3 class="precioUnitario"></h3>' +
            '<form action="">' +
            '   <label for="cantidad" class="cantidad">Cantidad:</label>' +
            '   <input id="cantidad" type="number" min="1" value="1">' +
            '   <input type="submit" class="btn btn-primary" value="Aceptar" id="aceptar">' +
            '   <input type="submit" class="btn btn-danger" value="Cancelar" id="cancelar">' +
            '</form>';
        compra.innerHTML = compraHTML;
        inputCantidad = document.getElementById('cantidad')
        const compraImg = document.getElementById('compraImg');
        const tituloProd = document.querySelector('.nombre');
        const precioUni = document.querySelector('.precioUnitario');
        tituloProd.innerHTML = productos[i].nombre;
        compraImg.src = productos[i].imagen;
        precioUni.innerHTML = "$" + productos[i].precio;
        //Se guardan los input tipo submit del formulario de #compra
        const btnAceptar = document.getElementById('aceptar');
        const btnCancelar = document.getElementById('cancelar');
        //Aceptar compra
        btnAceptar.addEventListener('click', (event) => {
            event.preventDefault();
            cantidad = inputCantidad.value;
            if (isNaN(cantidad) || cantidad == 0 || cantidad === null || cantidad === undefined) {
                //No se agrega a carrito
                compra.classList.toggle('activo')
            }
            else {
                agregarCarrito(productos[i].nombre, cantidad, productos[i].precio);
                compra.classList.toggle('activo')
                const carritoContendorProductos = document.getElementById('carrito_contenedor_productos');
                const carritoContendorUnidades = document.getElementById('carrito_contenedor_unidades');
                const carritoContenedorSubtotal = document.getElementById('carrito_contenedor_subtotal');
                const carritoContendorCancelar = document.getElementById('carrito_contenedor_cancelar');
                actualizarCarrito(carrito, carritoContendorProductos, carritoContendorUnidades, carritoContenedorSubtotal, carritoContendorCancelar);
                costoTotal()
            }
        })
        //Cancelar compra
        btnCancelar.addEventListener('click', (event) => {
            event.preventDefault();
            compra.classList.toggle('activo')
        })
    })
})
btnCarrito.addEventListener('click', () => {
    divCarrito.classList.toggle('activo');
    const carrito_comprar = document.getElementById('carrito_comprar');
    contenidoCarrito();
    if (repetirPedido) {
        repetirPedido.addEventListener('click', () => {
            repetirCompra();
        })
    }
    costoTotal();
    eliminarArticulo();
    //Formulario para realizar el pedido    
    const nombreCliente = document.getElementById('nombre_cliente');
    const emailCliente = document.getElementById('email_cliente');
    const pedidoCliente = document.getElementById('pedido_cliente');
    //Agrego if para que no se inicie el evento 'click' hasta que no este creado pedido_cliente
    if (pedidoCliente) {
        //Realiza el pedido
        pedidoCliente.addEventListener('click', (event) => {
            event.preventDefault();
            //Validaoms la informacion del formulario
            const NombreValido = validarNombre(nombreCliente.value);
            const EmailValido = validarEmail(emailCliente.value);
            if (!NombreValido || !EmailValido) {
                // Nombre o correo electrónico inválido, muestra un mensaje de error o toma la acción apropiada                
                contenidoCarrito()
                divCarrito.classList.toggle('activo');                
                error.classList.toggle('activo');                
                Btnerror.addEventListener('click', () => {
                    error.classList.toggle('activo');
                })
            }
            else {//Guardamos el pedido en localstore para poder repetirlo si se desea
                const ultimoPedido = carrito;
                const ultimoPedidoJSON = JSON.stringify(ultimoPedido);
                localStorage.setItem('ultimaOrden', ultimoPedidoJSON);
                //Construccion del listado de productos pedidos como string
                let listadoPedido = "";
                for (let i = 0; i < carrito.length; i++) {
                    let articuloJson = JSON.stringify(carrito[i].nombre);
                    listadoPedido += (articuloJson + " por ");
                    articuloJson = JSON.stringify(carrito[i].cantidad);
                    listadoPedido += (articuloJson + " unidades;");
                }
                divCarrito.classList.toggle('activo');
                //Mensaje que se va a enviar
                let mensaje = encodeURIComponent(`Hola Letizir mi nombre es ${nombreCliente.value} mi mail de contacto es ${emailCliente.value} y quiero realizar un pedido con los siguientes productos:${listadoPedido}`);
                //Reemplaza 'numero_destino' con el número de teléfono al que deseas enviar el mensaje(incluyendo el código de país)
                let numeroDestino = '5491134330889';
                //Ruta que utilizamos para enviar el mensaje
                let enlaceWhatsApp = 'https://web.whatsapp.com/send?phone=' + numeroDestino + '&text=' + mensaje;
                //Abre el enlace en una nueva pestaña o ventana del navegador
                window.open(enlaceWhatsApp);
            }
        })
    }
})