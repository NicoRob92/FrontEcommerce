import { useState } from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ReplyIcon from '@mui/icons-material/Reply';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import styles from './_Questions.module.scss'
import { replyQuestion, getPostById } from "../../ducks/actions/actionCreators";

const QuestionCard = ({ postId,id, description, reply }) => {
    const role = "Admin"
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const [input, setInput] = useState('')

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(replyQuestion({ reply: input, id: id }, token))
        dispatch(getPostById(postId))
        dispatch(getPostById(postId))
        setInput("")
    }

    return (
        <div className={styles.container} >
            <Card>
                <CardContent>
                    <h6>{description}</h6>
                </CardContent>
                <CardActions>
                    {
                        role === "Admin" ?
                            <Button size="small" startIcon={<ReplyIcon />} onClick={() => handleExpandClick()}>Responder</Button>
                            : null
                    }
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                id="outlined-multiline-flexible"
                                label="Reply"
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
                        </form>
                    </CardContent>
                </Collapse>
            </Card>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <p>Ver respuestas</p>
                </AccordionSummary>

                <AccordionDetails>
                    {reply ?
                        reply
                        :
                        <p>This product does not hay any reply from vendor</p>
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    )
};

export default QuestionCard;
