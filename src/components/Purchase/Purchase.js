import styles from "./_Purchase.module.scss";

const Purchase = ({
  postById,
  addPostToCart,
  buyNowFast,
  logginStatus,
  getAddress,
  address,
  checkDirectBuy,
  confirmBuy,
  payLink
}) => {
  return (
    <div className={`card ${styles.purchase_info}`}>
      <div className="card-body" styles="width: 18">
        <div className={styles.purchase_content}>
          {!postById.stock ? (<h5>Stock: 0</h5>) : (<h5>Stock: {postById.stock}</h5>)}
        </div>
        <div className={styles.purchase_button}>
          <div className={styles.purchase_quantity}>
            {postById.stock ? (
              <div>
                <label htmlFor="quantity">Cantidad:</label>
                <input
                  id="quantity"
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={postById.stock}
                />
              </div>
            ) : null}
          </div>
          {postById.stock ? (
            <div>
              <input
                type="button"
                value="Añandir al carrito"
                onClick={addPostToCart}
              />
            </div>
          ) : null}
          {postById.stock ? (
          <div>
            <span>Deseas realizar una compra directa? </span>
            <input id="checkbuy"type="button" value="Click" onClick={checkDirectBuy} />
          </div>
          ): null}
          {postById.stock && confirmBuy ? (
            <div>
            <input
              id="address"
              type="text"
              onChange={getAddress}
              placeholder="Direccion de envio"
            />
          </div>
          ):null}
          {postById.stock && confirmBuy ? (
            <div>
              <input id="proccedToBuy" type="button" value="Generar link de pago" onClick={buyNowFast} disabled={logginStatus && address ? false : true}/>
            </div>
          ): null}
          {payLink ? (<div>
            <a href={payLink}>Proceder al pago</a>
          </div>): null}
          <div>
            {!address && confirmBuy? <p>Completa la direccion de envio</p>:null}
            {!logginStatus ? <p>Para comprar debes iniciar sesión</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
