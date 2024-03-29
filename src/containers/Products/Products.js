import Product from "../../components/Product/Product"
import style from "./_Products.module.scss"


const Products = ({products}) => {
  return (
    <div className={style.productsContainer}>
      {products?.map(e => (
        <Product key={e.id} name={e.name} price={e.price} image={e.Images[0].link} id={e.id} ratingProm={e.ratingProm}/>
      ))}
    </div>
  )
}

export default Products