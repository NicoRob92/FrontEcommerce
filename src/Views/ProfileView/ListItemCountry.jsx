import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { putUser } from '../../ducks/actions/actionCreators'
import styles from './_ProfileView.module.scss'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';


const ListItemCountry = ({ label, text }) => {
    const dispatch = useDispatch()
    const countries = useSelector((state) => state.reducer.countries)
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    const [visible, setVisible] = useState(false)
    const [input, setInput] = useState('')
    const type = label

    const handleShowForm = (e) => {
        e.preventDefault()
        setVisible(!visible)
    }

    const handleChangeInput = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(putUser(userId, input, type, token));
        setInput('')
        setVisible(false)
    }

    return (
        <ListItem sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '20px' }}>
            <ListItem disablePadding>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {label}
                </Typography>
            </ListItem>
            {visible
                ?
                <ListItem disablePadding>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={styles.button_container}>
                            <Select
                                autoWidth
                                displayEmpty
                                value={input}
                                onChange={handleChangeInput}
                            >
                                <ListSubheader>Category 1</ListSubheader>
                                <MenuItem disabled value="">
                                    <em>Country</em>
                                </MenuItem>
                                {countries.map((c) => {
                                    return (
                                        <MenuItem key={c.id} value={c.name}>
                                            {c.name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                            {input 
                            ? 
                            <Button type="submit" size="small" sx={{ marginLeft: '5px' }} variant="outlined">Save</Button>
                            : 
                            <Button disabled type="submit" size="small" sx={{ marginLeft: '5px' }} variant="outlined">Save</Button>
                        }
                        </div>
                    </form>
                </ListItem>
                :
                <ListItem disablePadding>
                    <ListItemText primary={text} />
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
                        disablePadding
                    >
                    </ListItem>
            }
        </ListItem>
    )
};

export default ListItemCountry;
