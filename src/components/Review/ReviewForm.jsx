import { Fragment, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../../ducks/actions/actionCreators";
import st from "./_Review.module.scss";
// buttons
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
// accordion
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
//input
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import { render } from "@testing-library/react";

const ReviewForm = ({ ProductId, token }) => {
  const dispatch = useDispatch()
  // accordion state
  const [expanded, setExpanded] = useState(false)
  // rate stars state
  const [value, setValue] = useState(2)
  // get user name or author
  const userName = localStorage.getItem("username")
  // send value of description input
  const valueRef = useRef('')
  const [input, setInput] = useState('')
  const sendValue = () => {
    return valueRef.current.value
  }
  const states = {
    description: input,
    rating: value,
    author: userName,
    PostId: ProductId,
  };
  // handle input change
//   const handleInput = () => {
    
// }
  const handleSubmit = (e) => {
    e.preventDefault();
    setInput(sendValue())
    console.log(input)
    dispatch(postReview(states, token));
  };

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  //   accordion section component
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Fragment>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Leave a comment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form key="form" onSubmit={(e) => handleSubmit(e)}>
            {/* stars */}
            <Box sx={{ "& > legend": { mt: 2 } }}>
              <Typography component="legend">Rate Product</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>

            {/* input */}
            <Box sx={{ width: 500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                id="outlined-multiline-flexible"
                label="Comment"
                multiline
                maxRows={8}
                inputRef={valueRef}
                className={st.input_description}
              />
            </Box>
            {/* button*/}
            <Stack direction="row" spacing={2}>
              <Button
                className={st.card_button}
                variant="contained"
                type="submit"
                color="success"
                onClick={sendValue}
              >
                Done
              </Button>
            </Stack>
          </form>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
};

export default ReviewForm;
