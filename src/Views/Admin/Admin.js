import { Switch, Route, NavLink } from "react-router-dom";
import AdminButtonLink from "../../components/AdminButtonLink/AdminButtonLink";
import styles from "./Admin.module.scss";
import DashBoard from "../../Views/AdminViews/DashBoard/DashBoard";
import AdminCategory from "../../Views/AdminViews/CreateCategory/AdminCategory";

export default function Admin() {
  return (
    <div className={styles.container}>
      <aside>
        <AdminButtonLink text="DASHBOARD" to="/admin" />
        <AdminButtonLink text="Administrar categorías" to="/admin/category" />
        <NavLink to="/admin/user"> Usuarios</NavLink>
        <NavLink to="/admin/user/reset-password"> Reset-Password</NavLink>
        <NavLink to="/admin/orders"> Ordenes</NavLink>
        <NavLink to="/admin/post"> Post</NavLink>
      </aside>
      <div>
        <Switch>
          <Route path="/admin/category">
            <AdminCategory />
          </Route>
          <Route exact path="/admin">
            <DashBoard />
          </Route>
          <Route exact path="/admin/post">
            <p> ver todos los post </p>
          </Route>
          <Route exact path="/admin/user">
            <p>users</p>
          </Route>
          <Route exact path="/admin/user/reset-password">
            <p> Reset Password</p>
          </Route>
          <Route exact path="/admin/user/:id">
            <p> User for id </p>
          </Route>
          <Route exact path="/admin/orders">
            <p> ordenes</p>
          </Route>
          <Route exact path="/admin/orders/:id">
            <p> ordenes for id</p>
          </Route>
          <Route exact path="/admin/post">
            <p> All post o products ??</p>
          </Route>
          <Route exact path="/admin/post/:id">
            <p>
              {" "}
              ver el detalle de un post aqui deberian poder ver el detalle del
              producto y poder{" "}
            </p>
          </Route>
        </Switch>
      </div>
    </div>
  );
}
