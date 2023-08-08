//Variables globales
const carrito = [];
let productos = [];
let btnProductos;
const comprarProducto = document.getElementById('comprar_producto')


//Funciones

//Obtencion de la informacion de los productos productos.json

async function obtenerProductos() {

  try {

    //Traemos la informacion del JSON
    const productosJson = await fetch('./productos.json');
    productos = await productosJson.json();
    mostrarProductos(productos);
    return (productos);
  }

  catch (error) {

    //Solicitud denegada
    console.log(error);

  }
}

//Renderiza el contenido div#lista_productos

function mostrarProductos(productos) {

  const listaProductos = document.getElementById('lista_productos');

  productos.forEach((producto) => {

    listaProductos.innerHTML +=
      `<div class="tarjeta col-sm-12 col-md-6 col-lg-3">
            <img src="${producto.imagen}" alt="">
            <h3>${producto.nombre}</h3>
            <h4>$${producto.precio}</h4>
            <button class="comprar_producto btn btn-primary">Comprar</button>
        </div>`

  })
}

//Funcionalidad del boton comprar de ls lista de productos. Carga el contenido del div comprar_producto

function comprar(productos) {

  //Leemos y guardamos una constante que tenga todos los botones comprar de los articulos
  btnProductos = document.querySelectorAll('.comprar_producto');

  btnProductos.forEach((btn, i) => {

    btn.addEventListener('click', () => {

      comprarProducto.classList.toggle('activo');
      comprarProducto.innerHTML +=
        `<h2 class="nombre">${productos[i - 1].nombre}</h2>
        <img id="compraImg" src="${productos[i - 1].imagen}">
        <h3 class="precioUnitario">$${productos[i - 1].precio}</h3>
        <form action="" method="post">
          <label for="cantidad" class="cantidad">Cantidad:</label>
          <input id="cantidad" type="number" min="1" value="1">
          <input type="submit" class="btn btn-primary" value="Aceptar" id="aceptar">
          <input type="submit" class="btn btn-danger" value="Cancelar" id="cancelar">
        </form>`;

        
        aceptarCompra(productos[i - 1], i - 1);

    })
  })  
}

//Boton Aceptar de la compra

function aceptarCompra(producto, i) {  

  const btnAceptarCompra = document.getElementById('aceptar');

  btnAceptarCompra.addEventListener('click', (event) => {

    event.preventDefault();

    const inputCantidad = document.getElementById('cantidad');

    //En el input se me permite colocar la letra "e" por eso agrego esta capa para corroborar
    if (isNaN(inputCantidad)) {

      //No se agrega a carrito
      comprarProducto.classList.toggle('activo')

    }

    agregarCarrito(producto.nombre, producto.cantidad, producto.precio);
    comprarProducto.classList.toggle('activo')
    console.log(carrito)

  })
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





//Iniciamos recuperando la lista de produtos del JSON
const cargarProductos = new Promise((resolve, reject) => {

  obtenerProductos()
    .then(() => {
      if (productos.length > 0) {
        resolve(productos);
      }
    })
    .catch(error => {
      reject(error);
    });

})

cargarProductos
  .then(() => {
    comprar(productos);
  })
  .catch(error => {
    console.log(error);
  })