import React from "react";  
export default function Paginado({itemsP,array,paginate}){

    const pageNumber = []

    for(let i=1;i<=Math.ceil(array/itemsP);i++){
        pageNumber.push(i)
    }
    console.log(pageNumber)
    
    return(
        <div className="paginado">
         {/*  <button onClick=>Next</button> */}
         
            {pageNumber?.map(page => <button key={page} onClick={(e)=>paginate(page)}>
                {page}
            </button>)
            }
           
          
        </div>
    )

}