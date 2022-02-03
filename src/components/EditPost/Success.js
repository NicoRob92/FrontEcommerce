import { Link ,Redirect} from "react-router-dom";

const Success = ({id,deletion}) => {
  if (!deletion) {
    return (
      <div className="card container">
        <div className="card-body">
          <h2 className="card-title">Acabas De Actualizar Un Producto</h2>
          <p className="card-text">
            Recibiras un email de confirmación
          </p>

          <Link className="btn btn-primary" to="/">Home</Link>
           <Link className="btn btn-primary mx-2" to={"/detail/"+id}>Ver detalle</Link>
        </div>
      </div>
    );
  }else {
    return (
      <div className="card container">
        <div className="card-body">
          <h2 className="card-title">Acabas De Borar Un Producto</h2>
          <p className="card-text">
            Recibiras un email de confirmación
          </p>

          <Link className="btn btn-primary" to="/">Home</Link>
        </div>
      </div>
    );
  }

};

export default Success;
