import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createQuestion } from '../../ducks/actions/actionCreators';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import QuestionCard from './QuestionCard';
import SendIcon from '@mui/icons-material/Send';
import styles from './_Questions.module.scss'

const Questions = ({ Questions, PostId }) => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const [input, setInput] = useState('')

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createQuestion({ PostId: PostId, description: input }, token))
    }
    return (
        <div>
            <h5 className={styles.title_questions}>Do you have any question?</h5>
            {/* Display questions */}
            <div>
                {Questions ?
                    Questions.map((q) => (
                        <QuestionCard key={q.id} id={q.id} description={q.description} reply={q.reply} />
                    ))
                    : <h6>This product does not have any questions yet</h6>
                }
            </div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h6>Write your Question </h6>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit}>
                        {/* <div> */}
                        <TextField
                            fullWidth
                            id="outlined-multiline-flexible"
                            label="Question"
                            multiline
                            maxRows={8}
                            value={input}
                            onChange={handleInputChange}
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
            </Accordion>
        </div>
    )
};

export default Questions;
