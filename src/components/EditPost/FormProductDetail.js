import { useState } from "react/cjs/react.development";
import firebase from "../../services/firebaseStorage";
import ConfirmDeletion  from './ConfirmDeletion'


const FormProductDetail = ({
  nextStep,
  addImage,
  input,
  Images,
  handleBlur,
  deleteMultiOption,
  handleChange,
  errors,
  deletePost
}) => {
  const [uploadValue, setUploadValue] = useState(1);
  const continues = (e) => {
    e.preventDefault();
    nextStep();
  };

  function handleUpload(e) {
    const file = e.target.files[0];
    let storageRef = firebase.storage().ref("/ecommerce/" + file.name);
    let task = storageRef.put(file);
    task.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadValue(percentage);
      },
      (err) => {
        console.log(err.message);
      },
      () => {
        setUploadValue(100);

        storageRef.getDownloadURL().then((url) => {
          addImage(url);
        });
      }
    );
  }

  return (
    <div className="container">
      <div className="mb-3">
        <label className="form-label"><h2>Titulo</h2></label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={input.title}
          onChange={handleChange}
        />

        <div className="form-text">
          Indica por favor nombre, marca y modelo
        </div>

          {errors.title?
            <div className="sm alert alert-danger">{errors.title}</div>
            :null}

      </div>
      <progress value={uploadValue} max="100"></progress>
      <div className="col mb-3">
        <label className="form-label">Añade o quita imagenes</label>

          <input
            type="file"
            className="form-control form-control-sm"
            name="images"
            onChange={handleUpload}
            required
          />



        <div className="d-flex flex-wrap justify-content-center">
        {errors.Images?
          <div className="sm alert alert-danger">{errors.Images}</div>
          :null}
          {Images?.map((link, i) => {
            return (
              <div
                key={i}
                className=" card  flex-column justify-content-between"
              >
                <img className="rounded" height={260} src={link} />
                <div

                  type="button"
                  className="btn rounded text-danger "
                  value={i}
                  onClick={() => deleteMultiOption("Images", link)}
                >
                  Eliminar
                </div>
              </div>
            );
          })}
        </div>
      </div  >
      <div className="">
      <button className="btn btn-primary m-3" onClick={continues}>
        Siguiente
      </button>

      <ConfirmDeletion deletePost={deletePost} input={input}/>
      </div>

    </div>
  );
};

export default FormProductDetail;
