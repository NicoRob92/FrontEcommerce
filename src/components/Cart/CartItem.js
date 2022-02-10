import styles from './_CartItem.module.scss';
import { NavLink } from 'react-router-dom';
import * as actionCreators from '../../ducks/actions/actionCreators';

const CartItem = ({
  name,
  id,
  decrementQuantity,
  incrementQuantity,
  removePost,
  quantity,
  price,
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.cont}>
        <NavLink to={`/detail/${id}`} className={styles.title}>
          {name.length > 20 ? `${name.substring(0, 16)}...` : name}
        </NavLink>
        <button onClick={(e) => removePost(id)}>
          <svg
            width='20'
            height='16'
            viewBox='10 0 10 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M16.9863 3.62866H3.7262'
              stroke='black'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M8.5481 6.59778V10.5566'
              stroke='black'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M12.1644 6.59778V10.5566'
              stroke='black'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M15.7808 3.62866V13.0309C15.7808 13.1621 15.7173 13.288 15.6043 13.3808C15.4913 13.4736 15.338 13.5257 15.1781 13.5257H5.53437C5.37452 13.5257 5.22121 13.4736 5.10818 13.3808C4.99514 13.288 4.93164 13.1621 4.93164 13.0309V3.62866'
              stroke='black'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M13.37 3.62865V2.63894C13.37 2.37645 13.243 2.12472 13.0169 1.93911C12.7908 1.7535 12.4842 1.64923 12.1645 1.64923H8.54812C8.22841 1.64923 7.92179 1.7535 7.69572 1.93911C7.46966 2.12472 7.34265 2.37645 7.34265 2.63894V3.62865'
              stroke='black'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </button>
      </div>

      <div className={styles.contador}>
        <button onClick={(e) => incrementQuantity(id)}>
          <svg
            width='24'
            height='24'
            viewBox='0 7 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <g clip-path='url(#clip0_119_38)'>
              <path
                d='M15 16L12.1937 13.1937C12.0867 13.0867 11.9133 13.0867 11.8063 13.1937L9 16'
                stroke='black'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M15 11L12.1505 8.15047C12.0674 8.06736 11.9326 8.06736 11.8495 8.15047L9 11'
                stroke='black'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </g>
            <defs>
              <clipPath id='clip0_119_38'>
                <rect width='24' height='24' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </button>
        <h6>{quantity}</h6>
        <button onClick={(e) => decrementQuantity(id)}>
          <svg
            width='24'
            height='24'
            viewBox='8 7 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M9 8L11.8063 10.8063C11.9133 10.9133 12.0867 10.9133 12.1937 10.8063L15 8'
              stroke='black'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M9 13L11.8495 15.8495C11.9326 15.9326 12.0674 15.9326 12.1505 15.8495L15 13'
              stroke='black'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </button>
        <h6>Total: $ {quantity * price} </h6>
      </div>
    </div>
  );
};

export default CartItem;
