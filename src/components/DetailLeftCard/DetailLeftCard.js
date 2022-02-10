import styles from './_DetailLeftCard.module.scss';

const DetailLeftCard = ({ postById }) => {
  return (
    <div className={`${styles.product_imgs}`}>
      <div className={styles.img_showcase}>
        <img src={postById?.Images[0]?.link} alt={postById?.name} />
      </div>
      <div className={styles.img_select}>
        {postById.Images?.map((image, i) => (
          <div key={i} className={styles.img_item}>
            <img src={image.link} alt={postById?.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailLeftCard;
