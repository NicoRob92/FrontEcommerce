import styles from "./_Purchase.module.scss";

const Purchase = ({ postById, addPostToCart }) => {
  return (
    <div className={`card ${styles.purchase_info}`}>
      <div className="card-body" styles="width: 18">
        <div className={styles.purchase_content}>
          {!postById.stock ? (
            <h5>No hay stock</h5>
          ) : (
            <h5>En stock: {postById.stock}</h5>
          )}
        </div>
        <div className={styles.purchase_button}>
          <div className={styles.purchase_quantity}>
            <input
              id="quantity"
              type="number"
              defaultValue={1}
              min={1}
              max={postById.stock}
            />
          </div>
          <div>
            <input type="button" value="Add to cart" onClick={addPostToCart} />
          </div>
          <div>
            <input type="button" value="Buy now" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
