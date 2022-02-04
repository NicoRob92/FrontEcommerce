import { useState } from "react";
import { useDispatch } from "react-redux";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from './_ProfileView.module.scss'
import { putUser } from "../../ducks/actions/actionCreators";

const ListItemPassword = ({ value }) => {
    const dispatch = useDispatch()
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    const [visible, setVisible] = useState(false)
    const [input, setInput] = useState('')

    const handleShowForm = () => {
        setVisible(!visible)
    }

    const handleChangeInput = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(putUser(userId, input, token))
        setInput('')
        setVisible(false)
    }

    return (
        <ListItem>
            {
                visible
                    ?
                    <ListItem disablePadding>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.button_container}>
                                <TextField size="small" id="outlined-basic" label="Password" variant="outlined" value={input} onChange={handleChangeInput} />
                                <Button size="small" sx={{ marginLeft: '5px' }} variant="outlined">Save</Button>
                            </div>
                        </form>
                    </ListItem>
                    :
                    <ListItem>
                        <TextField
                            id="standard-password-input standard-read-only-input"
                            value={value}
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            disabled
                        />
                    </ListItem>
            }
            {
                visible
                    ?
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="cancel" onClick={handleShowForm}>
                                <HighlightOffIcon />
                            </IconButton>
                        }
                        disablePadding
                    >
                    </ListItem>
                    :
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="edit" onClick={handleShowForm}>
                                <EditIcon />
                            </IconButton>
                        }
                    >
                    </ListItem>
            }
        </ListItem>
    )
};

export default ListItemPassword;
