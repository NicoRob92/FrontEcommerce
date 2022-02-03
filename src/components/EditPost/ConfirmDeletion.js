import React, { Component } from "react";

function ConfirmDeletion({deletePost, input}) {
  return (
    <>
      <button
        type="button"
        className=" btn btn-danger m-3"
        data-bs-toggle="modal"
        data-bs-target="#alertModal"
      >
        Borrar producto
      </button>


      <div
        className="modal fade"
        id="alertModal"
        tabIndex="-1"
        aria-labelledby="alertModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="alertModalLabel">
                Borar producto
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <h4>¿Quieres borrar este producto?</h4>

             {input.title} con precio de ${input.price}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button onClick={deletePost} type="button" data-bs-dismiss="modal" className="btn btn-primary">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ConfirmDeletion;
