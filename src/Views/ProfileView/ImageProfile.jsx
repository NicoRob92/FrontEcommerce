import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const ImageProfile = ({ image }) => {
    const initialState = []
    // Input file image save file on state
    const [profileImage, setProfileImage] = useState([])
    // Show different icon when image is selected
    const [show, setShow] = useState(false)
    // State for image and set image to the Avatar in case one to edit is selected
    const [PImage, setPImage] = useState('')
    let defaultImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

    const handleInput = (e) => {
        const pImage = e.target.files
        setProfileImage({ profileImage: pImage[0] })
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
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
                show
                    ?
                    <SmallButton edge="end" aria-label="edit">
                        <SaveAltIcon />
                    </SmallButton>
                    :
                    <SmallButton variant="contained" edge="end" aria-label="edit" component="label" >
                        <input type="file" hidden onChange={e => handleInput(e)} />
                        <EditIcon />
                    </SmallButton>
            }
        >
            <Avatar
                sx={{ width: 250, height: 250 }}
                alt="Profile Picture"
                src={image ? image : defaultImage}
            />
        </Badge>
    )
}
export default ImageProfile;
