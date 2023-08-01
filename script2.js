//Inicializamos el carrito vacio
const carrito = [];


//Funciones

//Obtencion de la informacion de los productos productos.json
async function obtenerProductos() {

  try {

    //Traemos la informacion del JSON
    const productosJson = await fetch('./productos.json');
    const productos = await productosJson.json();   
    return productos;

  }

  catch (error) {

    //Solicitud denegada
    console.log(error);

  }
}

//Carrito
//Constructor de articulos para el carrito
class ArticuloCarrito {

  constructor(nombre, cantidad, precio) {
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precio = precio;

  }
}

function agregarCarrito(nombre, cantidad, precio) {

  //Vemos si el producto esta repetido
  const productoRepetido = carrito.filter(producto => producto.nombre === nombre);

  if (productoRepetido.length > 0) {
    //Sumamos la cantidad del array carrito con la cantidad que se agrega
    producto.cantidad += parseInt(cantidad);

  }
  else {

    carrito.push(new ArticuloCarrito(nombre, cantidad, precio))

  }
}


//Carga el contenido de #comprar_producto
function mostrarContenido(producto) {

  comprarProducto.classList.toggle('activo');

  comprarProducto.innerHTML +=
    `<h2 class="nombre">${productos[producto].nombre}</h2>
    <img src="${productos[producto].imagen}">
    <h3 class="precioUnitario">$${productos[producto].precio}</h3>
    <form action="">
       <label for="cantidad" class="cantidad">Cantidad:</label>
       <input id="cantidad" type="number" min="1" value="1" required>
       <input type="submit" class="btn btn-primary" value="Aceptar" id="aceptar">
       <input type="submit" class="btn btn-danger" value="Cancelar" id="cancelar">
    </form>`;

}

//Boton Aceptar de la compra
function aceptarCompra() {

  const btnAceptarCompra = document.getElementById('aceptar');

  btnAceptarCompra.addEventListener('click', (event) => {

    event.preventDefault();

    const inputCantidad = document.getElementById('cantidad');

    //En el input se me permite colocar la letra "e" por eso agrego esta capa para corroborar
    if (isNaN(inputCantidad)) {

      //No se agrega a carrito
      comprarProducto.classList.toggle('activo')

    }

    agregarCarrito();

  })
}

//Iniciamos recuperando la lista de produtos del JSON
const productos = obtenerProductos();

//Renderiza el contenido div#lista_productos y guarmados sus botones
const listaProductos = document.getElementById('lista_productos');

productos.forEach((producto) => {

  listaProductos.innerHTML +=
    `<div class="tarjeta col-sm-12 col-md-6 col-lg-3">
            <img src="${productos[producto].imagen}" alt="">
            <h3>${productos[producto].nombre}</h3>
            <h4>$${productos[producto].precio}</h4>
            <button class="comprar_producto btn btn-primary">Comprar</button>
        </div>`

})

const btnProductos = document.querySelectorAll('.comprar_producto');



//Cargamos contenido div #comprar_producto. Buscandolo en el DOM
//activandolo y cargando su contenido de forma dinamica.
const comprarProducto = document.getElementById('comprar_producto');

btnProductos.forEach((btn, i) => {

  btn.addEventListener('click', () => {

    mostrarContenido(i);


  })
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