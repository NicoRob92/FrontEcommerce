import styles from './_DetailLeftCard.module.scss';
import {useState}  from 'react'

const DetailLeftCard = ({ postById }) => {
  const [imageView , setimageView]= useState("")
  function selectImge(url) {
     setimageView(url)
  }
  return (
    <div className={`${styles.product_imgs}`}>
      <div className={styles.img_showcase}>
        <img src={imageView||postById?.Images[0]?.link} alt={postById?.name} />
      </div>
      <div className={styles.img_select}>
        {postById.Images?.map((image, i) => (
          <div onClick={()=>selectImge(image.link)} key={i} className={styles.img_item}>
            <img src={image.link} alt={postById?.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailLeftCard;
