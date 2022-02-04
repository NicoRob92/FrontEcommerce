import { Switch, Route, NavLink } from "react-router-dom";
import AdminButtonLink from "../../components/AdminButtonLink/AdminButtonLink";
import styles from "./Admin.module.scss";
import DashBoard from "../../Views/AdminViews/DashBoard/DashBoard";
import AdminCategory from "../../Views/AdminViews/CreateCategory/AdminCategory";
import {OrderHistoryAdmin} from '../../containers/OrderHistoryAdmin/OrderHistoryAdmin'
import {UsersAdmin} from '../../containers/UsersAdmin/UsersAdmin'
import {PostAdmin} from '../../containers/PostAdmin/PostAdmin'
export default function Admin() {

  const rol = localStorage.getItem('rol')
  
  return (
    <div className={styles.container}>
    { rol === 'admin' ?
    <div className={styles.container}>
      <aside>   
        <h2> DASHBOARD </h2>   
       <article ><NavLink to="/admin/category" className={styles.article} > Categorias </NavLink></article>
       <article ><NavLink to="/admin/user" className={styles.article}> Usuarios</NavLink></article>
       <article ><NavLink to="/admin/orders" className={styles.article}> Ordenes</NavLink></article>
       <article ><NavLink to="/admin" className={styles.article}> Post</NavLink></article>
       <article ><NavLink to="/" className={styles.article}>Home</NavLink></article>
      </aside>
      <div className={styles.containerRight}>
        <Switch>
          <Route path="/admin/category">
            <AdminCategory />
          </Route>          
          <Route exact path="/admin/user">
          <UsersAdmin/>
          </Route>                 
          <Route exact path="/admin/orders">
          <OrderHistoryAdmin/>
          </Route>
          <Route exact path="/admin/orders/:id">
            <p> ordenes for id</p>
          </Route>
          <Route exact path="/admin">
            <PostAdmin/>
          </Route>          
          <Route exact path="/admin/post/:id">
            <p>
              {" "}
              ver el detalle de un post aqui deberian poder ver el detalle del
              producto y poder{" "}
            </p>
          </Route>
        </Switch>
      </div> </div> : <div> Not found</div>}
      
    </div>
  );
}
