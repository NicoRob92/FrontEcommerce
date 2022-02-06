import { Link ,Redirect} from "react-router-dom";
import {useSelector}  from 'react-redux'

const Success = () => {
    let id = useSelector(state=>state.reducer.postById.id)
    return (
      <div className="card container">
        <div className="card-body">
          <h2 className="card-title">Acabas De Crear Un Producto</h2>
          <p className="card-text">
            Recibiras un email de confirmación
          </p>

          <Link className="btn btn-primary" to="/">Home</Link>
           <Link className="btn btn-primary mx-2" to={"/detail/"+id}>Ver detalle</Link>
        </div>
      </div>
    );


};

export default Success;
