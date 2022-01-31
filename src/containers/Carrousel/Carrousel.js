import React, { useState , useEffect } from 'react';
import style from './_Carrousel.module.scss';
import Card from '../../components/Card/Card';

const Carrousel = ({ cards, arr }) => {
  const number = Number(cards);
  const [selectIndex, setselectIndex] = useState(0);
  const [selectedImage, setselectedImage] = useState(arr?.slice(0, number));
const [array,setArray] = useState(arr)
  const selectNewImage = (arr, next = true) => {
    const condition = next
      ? selectIndex < arr?.length - number
      : selectIndex > 0;
    const nextIndex = next
      ? condition
        ? selectIndex + 1
        : 0
      : condition
      ? selectIndex - 1
      : arr?.length - number;
    setselectIndex(nextIndex);
    setselectedImage(arr?.slice(nextIndex, number + nextIndex));
  };

  const previous = () => {
    selectNewImage(arr, false);
  };
  const next = () => {
    selectNewImage(arr, true);
  };

  useEffect(() => {
    selectNewImage(arr,true)
  },[array,arr])
  

  return (
    <div className={style.container}>
      <button onClick={() => previous()}>
        <svg
          width='40'
          height='40'
          viewBox='0 0 40 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M20 39C30.4934 39 39 30.4934 39 20C39 9.50659 30.4934 1 20 1C9.50659 1 1 9.50659 1 20C1 30.4934 9.50659 39 20 39ZM20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM14.4 20L24.8 30.4L24.0929 31.1071L13.6929 20.7071L14.4 20ZM22.9554 8L14.4 19.9634L15.2134 20.5451L23.7689 8.5817L22.9554 8Z'
            fill='black'
          />
        </svg>
      </button>
      <div className={style.image}>
        {selectedImage?.map((e) => (
          <Card
            key={e.id}
            image={e.image}
            title={e.name}
            detail={e.detail}
            price={e.price}
            id={e.id}
          />
        ))}
      </div>
      <button onClick={() => next()}>
        <svg
          width='41'
          height='41'
          viewBox='0 0 41 41'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M20.0242 1.82339C9.5397 2.25585 1.39092 11.1058 1.82338 21.5903C2.25584 32.0748 11.1058 40.2236 21.5903 39.7911C32.0748 39.3586 40.2236 30.5087 39.7911 20.0242C39.3586 9.53971 30.5087 1.39093 20.0242 1.82339ZM19.983 0.824241C8.94668 1.27946 0.36901 10.5952 0.824232 21.6315C1.27946 32.6678 10.5952 41.2455 21.6315 40.7903C32.6678 40.335 41.2455 31.0193 40.7902 19.983C40.335 8.94669 31.0193 0.369019 19.983 0.824241ZM26.4025 20.5765L15.5827 10.6139L16.2601 9.87826L27.0799 19.8408L26.4025 20.5765ZM18.3489 32.9189L26.404 20.613L25.5673 20.0653L17.5122 32.3712L18.3489 32.9189Z'
            fill='black'
          />
        </svg>
      </button>
    </div>
  );
};

export default Carrousel
