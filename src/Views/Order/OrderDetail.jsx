import { Link } from "react-router-dom";
import OrderCard from "../../components/OrderCard/OrderCard";
import styles from './_Order.module.scss'

const OrderDetail = ({ id, OrderDetail, created, status, total }) => {

    return (
        <div className={`card w-100 ${styles.order_detail_container}`}>
            <div className="card-header">
            Order ID:<span> {id}</span> 
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><p className="h6">Status: </p>{status}</li>
            </ul>
            <ul className="list-group list-group-flush">
                <li className={`list-group-item ${styles.total_price}`}><p className="h6">Total: </p>${total}</li>
            </ul>
            <div className={styles.product}>
                <h5 className={`h4 ${styles.title_product}`}>Products ({OrderDetail.length})</h5>
                <div className={styles.detail_container}>
                    {OrderDetail.map((e) => {
                        return <Link to={`/detail/${e.posts.id}`} style={{textDecoration: 'none'}}><OrderCard id={e.posts.id} name={e.posts.name} price={e.posts.price}/></Link>
                    })}
                </div>
            </div>
            <div className="card-footer">
                <small className="text-muted"><p>Ordered On: </p>{created}</small>
            </div>
        </div>
    )
};

export default OrderDetail;