import { useState } from "react"
import style from "./Register.module.scss"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { api } from "../../ducks/actions/actionCreators"

function Register (props){

    const [data, setData]= useState({})
    const [isSend, setIsSend]= useState(false)

    const onSubmit = e=>{

        
        console.log("si")
        e.preventDefault()
        fetch(api+"register", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

            body: JSON.stringify(data)
          })
        .then(()=>{
            setData({})
            setIsSend(true)
        })
        
        

    }


    const handleChange = e =>{
        setData({...data,
        [e.target.name]:e.target.value
        })
    }

    return (
        <div className={style.container}>
        <form onSubmit={e=>onSubmit(e)}> 
            <label>Username</label> <br/>

                <input type="text"
                name="username" 
                value={data.username || ""}
                onChange={e=>handleChange(e)}
                ></input><br/>

            <label>First name</label> <br/>

                <input type="text"
                name="first_name" 
                value={data.first_name || ""}
                onChange={e=>handleChange(e)}
                ></input><br/>

            <label>Last name</label> <br/>

                <input type="text"
                name="last_name" 
                value={data.last_name || ""}
                onChange={e=>handleChange(e)}                
                ></input><br/>

            <label>Email</label> <br/>

                <input type="email"
                name="email" 
                value={data.email || ""}
                onChange={e=>handleChange(e)}  
                ></input><br/>

            <label>Phone</label> <br/>

                <input type="tel"
                name="phone" 
                value={data.phone || ""}
                onChange={e=>handleChange(e)}  
                ></input><br/>

            <label>Dni</label> <br/>

                <input type="tel"
                name="dni" 
                value={data.dni || ""}
                onChange={e=>handleChange(e)}  
                ></input><br/>

            <label>Password</label> <br/>

                <input type="password"
                name="password" 
                value={data.password || ""}
                onChange={e=>handleChange(e)}  
                ></input><br/>

            <label>Country</label> <br/>
               <select name="country" onChange={e=>handleChange(e)}>
                   <option default >Selecciona </option>
                   {props.countries?.map((c,i)=>{
                       return <option key={i} value={c.id}>{c.name}</option>
                   })}
               </select>
                
            <div>
            <button type="submit">Submit</button>
            </div>
        </form>

        {isSend?<>
        <div className={style.sent}>
            <div>
                <span>Your account was sent to the server</span> <br/>
                <NavLink to="/" className={style.backHome}>Ok!</NavLink>
            </div>
            
        </div>
        </>:""}

        </div>

        
    )
}
const mapStateToProps = (state)=>{
    return {countries: state.reducer.countries}
}
export default connect (mapStateToProps, null)(Register)