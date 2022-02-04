
const FormProductDetail = ({ nextStep, prevStep, input, handleSubmit }) => {
    const continues = e => {
        e.preventDefault()
        nextStep()
        // dispatch the action or handle submit
        handleSubmit(e)
    }

    const back = e => {
        e.preventDefault()
        prevStep()
    }

        return (
            <form>
                <ul className="list-group">
                    <li className="list-group-item" name="title" >{input.name}</li>
                    <li className="list-group-item" name="categoryId" >{input.Categories}</li>
                    <li className="list-group-item" name="condition" >{input.status}</li>
                    <li className="list-group-item" name="stock" >{input.stock}</li>
                    <li className="list-group-item" name="images" >{input.images}</li>
                    <li className="list-group-item" name="description" >{input.description}</li>
                    <li className="list-group-item" name="price" >{input.price}</li>
                </ul>
                <button type="submit" className="btn btn-primary" onClick={continues}>Confirm & Continue</button>
                <button className="btn btn-light" onClick={back}>Back</button>
            </form>
        )
    }


export default FormProductDetail