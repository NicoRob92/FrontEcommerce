import styles from './_OrderCard.module.scss'
import { Link } from "react-router-dom";
const OrderCard = ({ids, name, price}) => {

    return (
        <div className={`card ${styles.cards}`} >
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="https://gizmobo.com/wp-content/uploads/2021/11/google-pixel-6-pro-extra-1.webp" className=" img-thumbnail rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">1</p>
                        <p className="card-text">Price <span>{price}</span></p>
                        <Link  className="btn btn-warning" to={`/detail/${ids}`}>Buy Again</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default OrderCard;
