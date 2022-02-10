import { useEffect, useState } from "react";
import { getOrdersUsers, filterOrder } from "../../ducks/actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import OrderDetail from "./OrderDetail";
import styles from "./_Order.module.scss";
import { Link } from "react-router-dom";


const Order = () => {
  const dispatch = useDispatch();
  const orderUser = useSelector((state) => state.orderUser.orderUsers);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState('')

  useEffect(() => {
    dispatch(getOrdersUsers(userId, token));
  }, []);

  // handle order filter
  const handleFilter = (e) => {
    e.preventDefault()
    dispatch(filterOrder(e.target.value))
  }

  return (
    <div className={styles.container}>
      <h1>Your Orders</h1>
      <div className="card w-75">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <select className="form-control" onChange={e => handleFilter(e)}>
                <option hidden>Orders</option>
                <option value="all">All</option>
                <option value="creada">Open Orders</option>
                <option value="procesada">On process Orders</option>
                <option value="completada">Buy again</option>
                <option value="cancelada">Cancelled Orders</option>
              </select>
            </li>
          </ul>
        </div>

        {/* sections */}

        <div className={`card-body ${styles.card_body}`}>
          {orderUser.length > 0 ? (
            orderUser?.map((e) =>
              <OrderDetail
              key={e.id} 
              id={e.id}
              OrderDetail={e.OrderDetail}
              created={e.created}
              status={e.status}
              total={e.total}
              />
            )
          ) : (
            <h5 className="card-title">You have not placed any orders yet</h5>
          )}  </div>
      </div>
    </div>
  );
};

export default Order;

