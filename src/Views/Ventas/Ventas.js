import style from './_Compras.module.scss';
import { Link } from 'react-router-dom';
import { useEffect , useState} from 'react';
import { getOrders } from '../../ducks/actions/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import {api} from '../../credentials'
import { ModalStateOrder } from '../../components/Modals/ModalStateOrder';
const Ventas = () => {
  const dispatch = useDispatch();
  const orderUser = useSelector((state) => state.reducer.orders);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const orders = useSelector((state) => state.reducer.orders);
  const [filter, setFilter] = useState(null);
  const [current, setCurrent] = useState(1);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [show, setShow] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [id, setId] = useState(0);
  const [msg, setMsg] = useState('');
  const pages = filter ? filter?.length / 27 : orders?.length / 272;
  const lastIndex = current * 27;
  const first = lastIndex - 27;
  const orden = orderUser.filter((e) => {
    for (let i = 0; i < e.OrderDetail.length; i++) {
      if (e.OrderDetail[i].UserId === Number(userId)) return e;
    }
  });
  let idTochange = 0;
  const elementos = orden.map((e) =>
    e.OrderDetail.filter((e) => e.UserId === Number(userId))
  );
  const suma = elementos.map((e) =>
    e.map((x) => x.amount * Number(x.posts.price))
  );
  console.log(suma);
  const total = suma.map((e) => e.reduce((a, b) => a + b));

  console.log('suma', total);
  
  const cancelOrder = async (e) => {
    idTochange = e.id;
    let body = {
      status: 'cancelada',
    };
    let msg = await axios.put(`${api}admin/order/${idTochange}`, body, {
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    });
    setMsg(msg);
    setTimeout(() => {
      setMsg('');
    }, 500);
  };

  const [input, setInput] = useState({
    option: '',
    value: '',
  });

  const handleShow = (e) => {
    setShow(!show);
    setChangeStatus(!changeStatus);
  };


  const Hstatus = (e) => {
    setId(e.id);
    setShow(!show);
    setChangeStatus(true);
  };


  useEffect(() => {
    dispatch(getOrders(token));
  }, []);

  return (
    <div className={style.container}>
      <div className={style.parent}>
        <div className={style.div1}>
          <div className={style.title}>Ventas</div>
        </div>
        <div className={style.div2}>
          <div className={style.title}>Id</div>
          {orden?.map((e) => (
            <div className={style.item}>{e.id}</div>
          ))}
        </div>
        <div className={style.div3}>
          {' '}
          <div className={style.title}>Detalle</div>
          {orden?.map((e) => (
            <div className={style.item}>
              {e.OrderDetail.map((x) => {
                if (x.UserId === Number(userId)) return x.posts.name + ' ,';
              })}
            </div>
          ))}
        </div>
        <div className={style.div4}>
          {' '}
          <div className={style.title}>Total</div>{' '}
          {total?.map((e) => (
            <div className={style.item}> $ {e}</div>
          ))}
        </div>
        <div className={style.div5}>
          {' '}
          <div className={style.title}>Fecha</div>{' '}
          {orden?.map((e) => (
            <div className={style.item}>{e.created.substring(0,10)}</div>
          ))}
        </div>
        <div className={style.div6}>
          {' '}
          <div className={style.title}>Status</div>{' '}
          {orden?.map((e) => (
            <div className={style.item}>{e.status}</div>
          ))}
        </div>
        <div className={style.div7}>
          {' '}
          <div className={style.title}>Acciones</div>{' '}
          {orden ? orden.map((e) =>
              e.status !== 'completada' && e.status !== 'cancelada' ? (
                <div key={e.id} className={style.actions}>
                  <button onClick={(x) => Hstatus(e)}>
                    <svg
                      width='25'
                      height='25'
                      viewBox='0 0 32 32'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <g clip-path='url(#clip0_108_12)'>
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M12 2C12.5523 2 13 2.44772 13 3V4.17071C14.1652 4.58254 15 5.69378 15 7C15 8.30622 14.1652 9.41746 13 9.82929V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V9.82929C9.83481 9.41746 9 8.30622 9 7C9 5.69378 9.83481 4.58254 11 4.17071V3C11 2.44772 11.4477 2 12 2Z'
                          fill='black'
                        />
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M19 2C19.5523 2 20 2.44772 20 3V14.1707C21.1652 14.5825 22 15.6938 22 17C22 18.3062 21.1652 19.4175 20 19.8293V21C20 21.5523 19.5523 22 19 22C18.4477 22 18 21.5523 18 21V19.8293C16.8348 19.4175 16 18.3062 16 17C16 15.6938 16.8348 14.5825 18 14.1707V3C18 2.44772 18.4477 2 19 2Z'
                          fill='black'
                        />
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M5 2C5.55228 2 6 2.44772 6 3V14.1707C7.16519 14.5825 8 15.6938 8 17C8 18.3062 7.16519 19.4175 6 19.8293V21C6 21.5523 5.55228 22 5 22C4.44772 22 4 21.5523 4 21V19.8293C2.83481 19.4175 2 18.3062 2 17C2 15.6938 2.83481 14.5825 4 14.1707V3C4 2.44772 4.44772 2 5 2Z'
                          fill='black'
                        />
                      </g>
                      <defs>
                        <clipPath id='clip0_108_12'>
                          <rect width='24' height='24' fill='black' />
                        </clipPath>
                        <clipPath id='clip1_108_12'>
                          <rect
                            width='24'
                            height='24'
                            fill='black'
                            transform='translate(12 12)'
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <button onClick={(x) => cancelOrder(e)}>
                    <svg
                      width='25'
                      height='25'
                      viewBox='0 0 32 32'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        opacity='0.2'
                        d='M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z'
                        fill='black'
                      />
                      <path
                        d='M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z'
                        stroke='black'
                        stroke-width='2'
                        stroke-miterlimit='10'
                      />
                      <path
                        d='M20 12L12 20'
                        stroke='black'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M20 20L12 12'
                        stroke='black'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  </button>
                </div>
              ) : e.status === 'completada' ? (
                <div key={e.id} className={style.actions}>
                  <button>
                    <svg
                      width='25'
                      height='25'
                      viewBox='0 0 32 32'
                      fill='green'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M8.33341 28.3334H4.33341C3.62617 28.3334 2.94789 28.0524 2.4478 27.5523C1.9477 27.0522 1.66675 26.3739 1.66675 25.6667V16.3334C1.66675 15.6261 1.9477 14.9478 2.4478 14.4477C2.94789 13.9476 3.62617 13.6667 4.33341 13.6667H8.33341M17.6667 11V5.66669C17.6667 4.60582 17.2453 3.58841 16.4952 2.83826C15.745 2.08811 14.7276 1.66669 13.6667 1.66669L8.33341 13.6667V28.3334H23.3734C24.0165 28.3406 24.6406 28.1152 25.1306 27.6987C25.6207 27.2822 25.9437 26.7026 26.0401 26.0667L27.8801 14.0667C27.9381 13.6845 27.9123 13.2943 27.8045 12.923C27.6968 12.5518 27.5096 12.2084 27.2559 11.9167C27.0022 11.625 26.6882 11.3919 26.3355 11.2336C25.9828 11.0754 25.6 10.9956 25.2134 11H17.6667Z'
                        stroke='black'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div key={e.id} className={style.actions}>
                  <button>
                    <svg
                      width='25'
                      height='25'
                      viewBox='0 0 32 32'
                      fill='red'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M22.6667 2.66668H26.2267C26.9813 2.65334 27.7146 2.91753 28.2873 3.40911C28.8599 3.90068 29.2322 4.58543 29.3334 5.33335V14.6667C29.2322 15.4146 28.8599 16.0993 28.2873 16.5909C27.7146 17.0825 26.9813 17.3467 26.2267 17.3333H22.6667M13.3334 20V25.3333C13.3334 26.3942 13.7548 27.4116 14.5049 28.1618C15.2551 28.9119 16.2725 29.3333 17.3334 29.3333L22.6667 17.3333V2.66668H7.62671C6.9836 2.65941 6.35954 2.88481 5.8695 3.30134C5.37946 3.71787 5.05647 4.29747 4.96004 4.93335L3.12004 16.9333C3.06203 17.3155 3.08781 17.7058 3.19559 18.077C3.30337 18.4483 3.49057 18.7916 3.74423 19.0833C3.99789 19.375 4.31193 19.6081 4.66461 19.7664C5.01729 19.9247 5.40016 20.0044 5.78671 20H13.3334Z'
                        stroke='black'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                </div>
              )
            )
           : (
            <div>Post Not Found</div>
          ) }
        </div>
      </div>
      {changeStatus ? (
        <ModalStateOrder id={id} show={handleShow} hidden={show} />
      ) : null}
    </div>
  );
};

export default Ventas;
