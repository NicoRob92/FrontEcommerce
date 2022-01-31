export default function validate(input) {
    let errors = {}
    if (!input.title) {
        errors.title = "A Title is required"
    }

    if (!input.categoryId) {
        errors.categoryId = "A category is required"
    } 

    if (!input.condition) {
        errors.condition = "A condition is required"
    } 

    if (!input.stock) {
        errors.stock = "A stock amount is required"
    } 

    if (!input.description) {
        errors.description = "A amount is required"
    } 

    if (!input.price) {
        errors.price = "A price is required"
    } 

    return errors
}