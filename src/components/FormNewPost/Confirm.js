import ConfirmCancel  from './ConfirmCancel'

const Confirm = ({ nextStep, prevStep, input,errors, handleSubmit,allCategories }) => {
    const continues = e => {
        e.preventDefault()
            if(Object.keys(errors).length === 0){
              nextStep()
              // dispatch the action or handle submit
              handleSubmit(e)
            }else {
              let errs =""
              Object.keys(errors).map(key=>{
                errs += "-"+errors[key]+"\n"
               return errors[key]
             })
             alert("Completa bien el formulario, por favor.\n"+errs)
            }


    }
    let withoutData= <span className="text-danger">No especifícado</span>
    const back = e => {
        e.preventDefault()
        prevStep()
    }

        return (
            <form className="container">
            <h3>Por favor, confirma los datos</h3>
                <ul className="list-group">

                    <li className="list-group-item" name="title" >
                    <h1>{input.title}</h1>
                    </li>
                    <li className="list-group-item" name="categoryId" >
                      <h2>Categorias</h2>
                    {input.Categories.length==0?
                      withoutData
                      : input.Categories?.map((c,i)=>{
                      let cat = allCategories.filter(e=>e.id==c)
                      return(
                        <span className="card d-inline" key={i}>
                           {` ${cat[0].name} `}
                        </span>
                      )
                    }) }
                    </li>

                    <li className="list-group-item" name="stock" >
                    <h2>Stock</h2>
                       {input.stock || withoutData}
                    </li>

                    <li className="list-group-item" name="description" >
                    <h2>Description</h2>
                    {input.description|| withoutData}
                    </li>
                    <li className="list-group-item" name="price" >
                    <h2>Precio</h2>
                    $ {input.price|| withoutData}
                    </li>
                </ul>
                <button type="submit" className="btn btn-primary" onClick={continues}>Confirmar</button>
                <button className="btn btn-light" onClick={back}>Atras</button>
                <ConfirmCancel />
            </form>
        )
    }


export default Confirm
