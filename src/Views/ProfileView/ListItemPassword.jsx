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
    const [errors, setErrors] = useState('')
    const type = "PASSWORD"

    const handleShowForm = () => {
        setVisible(!visible)
    }

    const handleChangeInput = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(putUser(userId, input, type, token))
        setInput('')
        setVisible(false)
    }

    const validate = (type, input) => {
        let errors;
        switch (type) {
            case "PASSWORD":
                if (!input) {
                    errors = "a password is required";
                } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(input)) {
                    errors =
                        "A valid password is required, at least one number, at least one special character, 6-16 characters";
                }
                break;
            default:
                break;
        }
        return errors
    }

    const handleBlur = () => {
        setErrors(validate(type, input));
      };

    return (
        <ListItem>
            {
                visible
                    ?
                    <ListItem disablePadding>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.button_container}>
                                <TextField 
                                size="small" 
                                id="outlined-basic" 
                                label="Password" variant="outlined" 
                                value={input} 
                                onChange={handleChangeInput}
                                onBlur={handleBlur}
                                type="password"
                                error={errors ? true : false}
                                helperText={errors && errors}
                                />
                                <Button size="small" sx={{ marginLeft: '5px' }} variant="outlined" type="submit">Save</Button>
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
