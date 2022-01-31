import { NavLink } from "react-router-dom"
import styles from "./AdminButtonLink.module.scss"

export default function AdminButtonLink ({text, to}){
    return (
        <NavLink to={to} className={styles.button}>
        <div>
        <span>{text}</span>
        </div>
        </NavLink>
    )
}