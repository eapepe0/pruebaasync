# pruebaasync
Hola tengo un error que no se porque se esta dando. Cuando se activa el div para comprar un producto, se carga toda la informacion correctamente. Pero cuando hago click en la imagen que se genero o por ejemplo en el input que controla la cantidad me da un error por consola relacionado con la propiedad .nombre

script2.js:63 Uncaught TypeError: Cannot read properties of undefined (reading 'nombre')
    at HTMLDivElement.<anonymous> (script2.js:63:48)

No entiendo porque me da este error ya que todas las propiedades del objeto se leidas de forma correcta y se renderizan de forma correcta en pantalla. Este error surge siempre que hago click en algun componente del contenedor. El codigo falla antes de que se saque la clase activo al contenedor por eso no se cierra. Pero no me doy cuenta cual es el error.

Tambien no entiendo porque el indice del foreach para que funcione tiene que ser i - 1. Cuando use el indice i solo todo estaba desfazado en 1, por eso le agregue una resta

Cuando quiero aceptar la compra hice un console.log(carrito) y funciona pero la cantidad figura undefined. Es claro que tengo mal algo del formulario porque creo que casi todos los errores pasan por ahi pero no me doy cuenta que es.