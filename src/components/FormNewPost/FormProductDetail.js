import { useState } from "react";
import firebase from "../../services/firebaseStorage";
import ConfirmCancel  from './ConfirmCancel'

const style = require("./_FormNewPost.scss")



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
    <div className="p-5 m-3">
      <div className="mb-3">
        <label className="form-label"><h2>Titulo</h2></label>
        <input
          type="text"
          className="form-control"
          accept="image/x-png,image/gif,image/jpeg"
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
          {" "}
          <button className="upload-button d-flex flex-row align-items-center">
            <div className="d-flex justify-content-center align-items-center upload-icon">

              <img alt=""
              className="d-flex justify-content-center align-items-center upload-icon"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimage.net%2Fwp-content%2Fuploads%2F2018%2F06%2Ficono-nube-png-2.png&f=1&nofb=1" />
            </div>
            <div className="upload-text">

              <span>Subir foto</span>{" "}
            </div>
            <input
              type="file"
              className="btn_subir form-control form-control-sm"
              name="images"
              onChange={handleUpload}
              required
            />
          </button>{" "}





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

      <ConfirmCancel />
      </div>

    </div>
  );
};

export default FormProductDetail;
