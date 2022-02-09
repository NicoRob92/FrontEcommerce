import ConfirmCancel  from './ConfirmCancel'


const FormProductDescription = ({
  nextStep,
  prevStep,
  handleChange,
  handleBlur,
  input,
  allCategories,
  handleMultiOption,
  deleteMultiOption,
  errors
}) => {
  const continues = (e) => {
    e.preventDefault();
    nextStep();
  };

  const back = (e) => {
    e.preventDefault();
    prevStep();
  };
  return (
    <form className="container">
      <div className="mb-3">
        <label className="form-label">Puedes escoger varias categorias</label>
        <select
          className="form-select"
          name="Categories"
          default value="select"
          onBlur={handleBlur}
          onChange={handleMultiOption}
        >
          <option hidden>Open this select menu</option>
          <option value="select">Selecciona</option>
          {allCategories?.map((c) => {
            return (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            );
          })}
        </select>
        <ul className="column m-1 d-flex flex-wrap justify-content-center">
          {input.Categories?.map((c, i) => {
            let name = allCategories.filter(e=>e.id==c)
            return (
            <span key={c} className="card border border-dark d-inline  m-1" key={i}>
              <span className="p-1">{name[0].name} </span>
              <div type="button"
                name="Categories"
                className="px-1 rounded d-inline  bg-danger"
                value={c}
                onClick={()=>deleteMultiOption("Categories",c)}
                >{" x "}</div>
            </span>
            )
          })}
        </ul>
        {errors.Categories?
          <div className="sm alert alert-danger">{errors.Categories}</div>
          :null
        }
      </div>

      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input
          type="text"
          className="form-control"
          name="stock"
          defaultValue={input.stock}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className="form-text">Cuantos productos tienes disponibles</div>
      </div>
      {errors.stock?
        <div className="sm alert alert-danger">{errors.stock}</div>
        :null
      }

      <div className="mb-3">
        <label className="form-label">Description</label>
        <br />
        <textarea
          className="form-control"
          name="description"
          defaultValue={input.description}
          onBlur={handleBlur}
          onChange={handleChange}
          rows="6"
          cols="40"
        ></textarea>
        <div className="form-text">
          Da una descripción más exacta de tu producto
        </div>
      </div>
      {errors.description?
        <div className="sm alert alert-warning">{errors.description}</div>
        :null
      }
      <div className="input-group mb-3">
        <span className="input-group-text">$</span>
        <input
          type="number"
          className="form-control"
          name="price"
          defaultValue={input.price}
          onBlur={handleBlur}
          onChange={handleChange}
        />

      </div>
      {errors.price?
        <div className="alert alert-sm alert-danger">{errors.price}</div>
        :null
      }
      <button className="btn btn-primary" onClick={continues}>
        Siguiente
      </button>
      <button className="btn btn-light" onClick={back}>
        Atras
      </button>
      <ConfirmCancel />
    </form>
  );
};

export default FormProductDescription;
