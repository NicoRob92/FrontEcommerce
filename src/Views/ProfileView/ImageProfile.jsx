import { useState } from 'react';
import { useDispatch } from "react-redux";
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Badge from '@mui/material/Badge';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { styled } from '@mui/material/styles';
import { putUser } from '../../ducks/actions/actionCreators'
import firebase from '../../services/firebaseStorage'

const ImageProfile = ({ image }) => {
    const dispatch = useDispatch()
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    const type = "IMAGE"
    // Show different icon when image is selected
    const [show, setShow] = useState(false)
    // State for image
    const [PImage, setPImage] = useState(image)
    // state to track when file is upload to firebase
    const [uploadValue, setUploadValue] = useState()

    const Input = styled('input')({
        display: 'none',
    });

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(putUser(userId, PImage, type, token))
        setShow(false)
    }

    const handleUploadOnChange = (e) => {
        const file = e.target.files[0];
        let storageRef = firebase.storage().ref("/ecommerce/" + file.name);
        let task = storageRef.put(file);
        task.on(
            "state_changed",
            (snapshot) => {
                let percentage =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadValue(percentage);
            },
            (err) => {
                console.log(err.message);
            },
            () => {
                setUploadValue(100);

                storageRef.getDownloadURL().then((url) => {
                    setPImage(url);
                    setShow(true)
                });
            }
        );
    }

    const SmallButton = styled(IconButton)(({ theme }) => ({
        position: 'fixed',
        background: 'white',
        width: 22,
        height: 22,
        borderRadius: 100,
        padding: 20,
        border: `2px solid #757575`,
        ":hover": {
            background: 'white'
        }
    }));

    return (
        <form onSubmit={onSubmit}>
            <Badge
                overlap="circular"
                variant="standard"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    show
                        ?
                        <Stack direction="row" spacing={5.8}>
                            <SmallButton type='submit' edge="end" aria-label="edit">
                                <SaveAltIcon />
                            </SmallButton>
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" onChange={handleUploadOnChange} />
                                <SmallButton color="primary" aria-label="upload picture" component="span">
                                    <EditIcon />
                                </SmallButton>
                            </label>
                        </Stack>
                        :
                        <label htmlFor="icon-button-file">
                            <Input accept="image/*" id="icon-button-file" type="file" onChange={handleUploadOnChange} />
                            <SmallButton color="primary" aria-label="upload picture" component="span">
                                <AddAPhotoIcon />
                            </SmallButton>
                        </label>
                }
            >

                {uploadValue == 0 || uploadValue == 99
                    ?
                    <Avatar
                        sx={{ width: 250, height: 250 }}
                        alt="loading"
                    >
                        <CircularProgress />
                    </Avatar>
                    :
                    <Avatar
                        sx={{ width: 250, height: 250 }}
                        alt="Profile Picture"
                        src={PImage}
                    />
                }
            </Badge>
        </form>
    )
}
export default ImageProfile;
