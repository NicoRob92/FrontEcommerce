import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, filterOrder } from '../../ducks/actions/actionCreators'
import OrderDetail from "./OrderDetail";
import styles from "./_Order.module.scss";
import { Link } from "react-router-dom";

 
const Order = () => {
  let orders = [
    {
      "id": 1,
      "delivery_adress": "17 av a 3-67",
      "status": "creada",
      "total": 4500,
      "createdAt": "2022-01-28T03:15:01.082Z",
      "updatedAt": "2022-01-28T03:15:01.082Z",
      "UserId": null,
      "Posts": [
        {
          "id": 101,
          "name": "Muchos Productos",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.",
          "price": "55",
          "stock": 5,
          "status": true,
          "createdAt": "2022-01-28T03:01:35.060Z",
          "updatedAt": "2022-01-28T03:01:35.060Z",
          "UserId": 1,
          "OrderPost": {
            "createdAt": "2022-01-28T03:15:01.189Z",
            "updatedAt": "2022-01-28T03:15:01.189Z",
            "OrderId": 1,
            "PostId": 101
          }
        },
        {
          "id": 101,
          "name": "Muchos Productos",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.",
          "price": "55",
          "stock": 5,
          "status": true,
          "createdAt": "2022-01-28T03:01:35.060Z",
          "updatedAt": "2022-01-28T03:01:35.060Z",
          "UserId": 1,
          "OrderPost": {
            "createdAt": "2022-01-28T03:15:01.189Z",
            "updatedAt": "2022-01-28T03:15:01.189Z",
            "OrderId": 1,
            "PostId": 101
          }
        }
      ],
      "User": null
    },
    {
      "id": 1,
      "delivery_adress": "17 av a 3-67",
      "status": "creada",
      "total": 4500,
      "createdAt": "2022-01-28T03:15:01.082Z",
      "updatedAt": "2022-01-28T03:15:01.082Z",
      "UserId": null,
      "Posts": [
        {
          "id": 101,
          "name": "Muchos Productos",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.",
          "price": "55",
          "stock": 5,
          "status": true,
          "createdAt": "2022-01-28T03:01:35.060Z",
          "updatedAt": "2022-01-28T03:01:35.060Z",
          "UserId": 1,
          "OrderPost": {
            "createdAt": "2022-01-28T03:15:01.189Z",
            "updatedAt": "2022-01-28T03:15:01.189Z",
            "OrderId": 1,
            "PostId": 101
          }
        },
        {
          "id": 101,
          "name": "Muchos Productos",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.",
          "price": "55",
          "stock": 5,
          "status": true,
          "createdAt": "2022-01-28T03:01:35.060Z",
          "updatedAt": "2022-01-28T03:01:35.060Z",
          "UserId": 1,
          "OrderPost": {
            "createdAt": "2022-01-28T03:15:01.189Z",
            "updatedAt": "2022-01-28T03:15:01.189Z",
            "OrderId": 1,
            "PostId": 101
          }
        }
      ],
      "User": null
    }
  ]

  // let orders = useSelector((state) => state.orders)
  console.log(orders);
  const [order, setOrder] = useState('')

  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrders())
  }, [])

  // handle order filter
  const handleFilter = (e) =>{
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
              <select className="form-control" onChange={e => filterOrder(e)}>
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
          {orders ? (
            orders.map((e) =>
              <OrderDetail
                ids={e.id}
                delivery_adress={e.delivery_adress}
                status={e.status} 
                total={e.total}
                createdAt={e.createdAt}
                posts={e.Posts}
              />
            )
          ) : (
            <h5 className="card-title">You have not placed any orders yet</h5>
          )}
        </div>

      </div>
    </div>
  );
};

export default Order;
