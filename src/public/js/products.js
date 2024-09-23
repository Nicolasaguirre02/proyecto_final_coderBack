
const botonesAgregarCarrito = document.querySelectorAll('.btn_agregarProduct');


let cartid = async() => {

    let url = `http://localhost:8080/api/current`;
    
    try {
        const response = await fetch(url);
        if (response.ok) {
            const dataUser = await response.json();
            return dataUser.playload.cart;
        }
        
    } catch (error) {
        alert("Error al agregar producto")

    }
}



async function agregarProducto(productId, cartId){
    let url = `http://localhost:8080/api/carts/${cartId}/product/${productId}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key: 'value' })
        });

        if (response.ok) {
            alert("Producto agregado")
        }
        
    } catch (error) {
        alert("Error al agregar producto")

    }
}

const nombre = document.getElementById("nombre");
botonesAgregarCarrito.forEach(boton => {
    boton.addEventListener('click', async function() {
        const idProduct = boton.dataset.id;
        let cartId = await cartid();
        agregarProducto(idProduct, cartId) 
    });
});


//Enviar mail
async function enviarMail(idCart){
    let url = `http://localhost:8080/api/${idCart}/purchase `;

    try {
        let result = await fetch(url);

        if(result.ok){
            const data = await result.json();
            alert("Se envio correctamente")
        }
    } catch (error) {
        alert("Error al enviar el mail")
    }
}

const finalizarCompra = document.getElementById("finalizarCompra");

finalizarCompra.addEventListener("click", async()=>{
    let idCart = await cartid();
    await enviarMail(idCart)
})