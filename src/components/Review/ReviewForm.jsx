import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview,getReview, getOrdersUsers } from "../../ducks/actions/actionCreators";
import st from "./_Review.module.scss";
// buttons
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
// accordion
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
//input
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";

const ReviewForm = ({ ProductId, token , reviews}) => {
  const dispatch = useDispatch()
  const logged = localStorage.getItem('logged')
  const orderUser = useSelector((state) => state.orderUser.orderUsers);
  const userId = localStorage.getItem("userId");
  // rate stars state
  const [value, setValue] = useState(2)
  // get user name or author
  const userName = localStorage.getItem("username")
  // input state
  const [input, setInput] = useState('')
  const message = <h1>Inicia sesión</h1>
  // handle input change
    const handleInput = (e) => {
      setInput(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postReview({description: input, rating: value, PostId: ProductId, author: userName}, token));
    dispatch(getReview(ProductId,""))
    setInput("")
    setValue(1)
  };

  function validatePermits() {
    let reviewMade= reviews.reduce((p,c)=>{
      return p||c.author==userName
    },false)

     return  !reviewMade
  }
  const handleLogged = () =>{
    if (logged) {
      dispatch(getOrdersUsers(userId, token))
    }
  }
  useEffect(() =>{
    handleLogged()
  },[])

  const validatePurchase = (id, orders) => {
    if (orders.length) {
      const checkData = orders.map((e) => {
        const details = e.OrderDetail.map((e) =>{
           return e.posts.id
        })
         return details[0]
      })
      return checkData.includes(parseInt(id))
    } else {
      return false
    }
  }

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h6>Dejar una reseña</h6>
        </AccordionSummary>
        {
          logged&&validatePermits() && validatePurchase(ProductId, orderUser)?

          <AccordionDetails>
          <form onSubmit={handleSubmit}>
            {/* <div> */}
            <h6>Califica el producto</h6>
            <Rating
                sx={{marginBottom: '10px'}}
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            <TextField
                fullWidth
                id="outlined-multiline-flexible"
                label="Comment"
                multiline
                maxRows={8}
                value={input}
                onChange={handleInput}
                className={st.input_description}
              />
            {
              input
                ?
                <Button sx={{ marginTop: '10px' }} type='submit' variant="contained" endIcon={<SendIcon />}>
                  Send
                </Button>
                :
                <Button sx={{ marginTop: '10px' }} disabled type='submit' variant="contained" endIcon={<SendIcon />}>
                  Send
                </Button>
            }
            {/* </div> */}
          </form>
        </AccordionDetails>
        :<>
        <h5 className={st.no_purchase_Message}>No puedes hacer {validatePermits()||"más"} reseñas</h5>
         <h5 className={st.no_purchase_Message}>Recuerda que para hacer reseñas, debes comprar</h5>
         </>
      }
      </Accordion>
    </div>
  );
};

export default ReviewForm;
