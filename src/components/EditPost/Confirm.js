
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
            <form className="container">
                <ul className="list-group">
                    
                    <li className="list-group-item" name="title" >{input.title}</li>
                    <li className="list-group-item" name="categoryId" >{input.categoryId}</li>
                    <li className="list-group-item" name="condition" >{input.condition}</li>
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