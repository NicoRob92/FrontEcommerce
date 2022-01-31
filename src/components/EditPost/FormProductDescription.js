const FormProductDescription = ({
  nextStep,
  prevStep,
  handleChange,
  handleBlur,
  input,
  allCategories,
  handleMultiOption,
  deleteMultiOption
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
        <label className="form-label">Choose Category</label>
        <select
          className="form-select"
          name="Categories"
          default value="select"
          onBlur={handleBlur}
          onChange={handleMultiOption}
        >
          <option hidden>Open this select menu</option>
          <option value="select">Select</option>
          {allCategories?.map((c) => {
            return (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            );
          })}
        </select>
        <ul className="column m-1">
          {input.Categories?.map((c, i) => {
            let name = allCategories.filter(e=>e.id==c)
            return (
            <span key={c} className="card border border-dark d-inline  m-1" key={i}>
              <span className="p-1">{name[0].name} </span>
              <div type="button"
                name="Categories"
                className="rounded d-inline  bg-danger h-100"
                value={c}
                onClick={()=>deleteMultiOption("Categories",c)}
                >{" x "}</div>
            </span>
            )
          })}
        </ul>
      </div>
      <div className="mb-3">
        <label className="form-label">Condition</label>
        <select
          className="form-select"
          name="condition"
          defaultValue={input.condition}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          <option hidden>Open this select menu</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
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
        <div className="form-text">Amount of products you have on stock</div>
      </div>
      
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
          Give a brief description of your product
        </div>
      </div>
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
      <button className="btn btn-primary" onClick={continues}>
        Continue
      </button>
      <button className="btn btn-light" onClick={back}>
        Back
      </button>
    </form>
  );
};

export default FormProductDescription;
