export default function validate(input) {
    let errors = {}
    if (!input.title) {
        errors.title = "Agraga un titulo"
    }

    if (!input.Categories.length) {
        errors.Categories = "Minimo una categría"
    }
    if (!input.Images.length) {
        errors.Images = "Minimo una imagen"
    }

    if (!input.stock) {
        errors.stock = "Agraga un stock"
    }
    else if ( Number(input.stock)< 1 || isNaN(Number(input.stock))) {
        errors.stock = "Agrega una cantidad valida"
    }

    if (!input.description) {
        errors.description = "Una descripción hace más fácil la venta de tu producto"
    }


    if (!input.price) {
        errors.price = "Agrega un precio"
    }else if ( Number(input.price)< 5 || isNaN(Number(input.price))) {
        errors.price = "Agrega una cantidad valida. Mayor a $5"
    }

    return errors
}
