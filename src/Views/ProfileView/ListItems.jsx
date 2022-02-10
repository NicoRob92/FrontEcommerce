import { useState} from "react";
import { useDispatch } from "react-redux";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {putUser,getUserById} from '../../ducks/actions/actionCreators'
import styles from './_ProfileView.module.scss'
import validate from "./Validation";

const ListItems = ({ label, text , submit}) => {
  const dispatch = useDispatch()
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")
  const [visible, setVisible] = useState(false)
  const [input, setInput] = useState(text)
  const [errors, setErrors] = useState('')
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
    submit()
    //setInput('')
    setVisible(false)
  }

  const handleBlur = () => {
    setErrors(validate(label, input));
  };


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
            <TextField
            size="small"
            id="outlined-basic"
            label={label}
            variant="outlined"
            value={input}
            onChange={handleChangeInput}
            onBlur={handleBlur}
            error = {errors ? true : false}
            helperText={errors ? errors : null}/>
            {input
            ?
            <Button type="submit" size="small" sx={{marginLeft: '5px'}} variant="outlined">Save</Button>
            :
            <Button disabled type="submit" size="small" sx={{ marginLeft: '5px' }} variant="outlined">Save</Button>
          }
            </div>
          </form>
        </ListItem>
        :
        <ListItem disablePadding>
          <ListItemText primary={input} />
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

export default ListItems;
