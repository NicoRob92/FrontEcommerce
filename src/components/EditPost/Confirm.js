
const Confirm = ({ nextStep, prevStep, input, handleSubmit,allCategories }) => {
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
            <h1>Por favor, confirma los datos</h1>
                <ul className="list-group">

                    <li className="list-group-item" name="title" >
                    <h3>{input.title}</h3>
                    </li>
                    <li className="list-group-item" name="categoryId" >
                      <h2>Categorias</h2>
                    {input.Categories?.map((c,i)=>{
                      let cat = allCategories.filter(e=>e.id==c)
                      return(
                        <span className="card d-inline" key={i}>
                           {` ${cat[0].name} `}
                        </span>
                      )
                    })}
                    </li>

                    <li className="list-group-item" name="stock" >
                    <h2>Stock</h2>
                       {input.stock}
                    </li>

                    <li className="list-group-item" name="description" >
                    <h2>Description</h2>
                    {input.description}
                    </li>
                    <li className="list-group-item" name="price" >
                    <h2>Precio</h2>
                    $ {input.price}
                    </li>
                </ul>
                <button type="submit" className="btn btn-primary" onClick={continues}>Confirmar</button>
                <button className="btn btn-light" onClick={back}>Atras</button>
            </form>
        )
    }


export default Confirm
