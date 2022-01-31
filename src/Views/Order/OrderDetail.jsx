import OrderCard from "../../components/OrderCard/OrderCard";
import styles from './_Order.module.scss'

const OrderDetail = ({ ids, delivery_adress, status, createdAt, posts }) => {
    return (
        <div className={`card w-100 ${styles.order_detail_container}`}>
            <div class="card-header">
                Order
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><p className="h6">Shipping Address: </p>{delivery_adress}</li>
                <li className="list-group-item"><p className="h6">Status: </p>{status}</li>
            </ul>
            <div className={styles.product}>
                <h5 className={`h4 ${styles.title_product}`}>Products ({posts.length})</h5>
                <div className={styles.detail_container}>
                {posts.map((e) => {
                    return <OrderCard ids={e.id} name={e.name} price={e.price} />
                })}
                </div>
            </div>
            <div className="card-footer">
                <small className="text-muted"><p>Ordered On: </p>{createdAt}</small>
            </div>
        </div>
    )
};

export default OrderDetail;
