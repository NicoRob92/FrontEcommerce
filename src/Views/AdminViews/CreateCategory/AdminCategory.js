import { useEffect, useState } from "react"
import * as actionCreators from "../../../ducks/actions/actionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function AdminCategory ({getCategories, categories}){
    const [newCategory, setNewCategory]=useState("")
    useEffect(() => {
        getCategories()
    },[newCategory])

    const onSubmit = (e)=>{//suir categoria
        e.preventDefault()
        fetch("http://localhost:4000/api/admin/category", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

            body: JSON.stringify({category:newCategory})
          })
        .then(()=>{
            setNewCategory("")

        })
    }
    const deleteCategory = (e,id)=>{ //borrar categoria
        fetch(`http://localhost:4000/api/admin/category/${id}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}
        )
    }

    return (
        <div>
            <input type="text" placeholder="Create category" value={newCategory} onChange={e=>setNewCategory(e.target.value)}></input>
            <button type="submit" onClick={e=>onSubmit(e)} >Submit</button>
            <div>
                <ul>
                    {/* {
                    categories.map(e=><li key={e.id}>{e.name} <button onClick={(e) =>deleteCategory(e, )}>X</button></li>)
                    } */}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {categories: state.reducer.categories}
}
const mapDispatchToProps =(dispatch)=>{
    return bindActionCreators(actionCreators, dispatch)
}
export default connect (mapStateToProps, mapDispatchToProps)(AdminCategory)
