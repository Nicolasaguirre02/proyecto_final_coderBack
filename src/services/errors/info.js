export const generarProductErrorInfo = (product) => {
    return `Los datos del nuevo producto estan incompletos, o no son validos
        *titulo: ${product.titulo},
        *price: ${product.price},
        *Disponible: ${product.disponible}
    `
}


export const addProductToCart = () => {
    return `El producto no existe`
}