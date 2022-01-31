import { useState } from 'react';
import { Fragment } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
const ReviewBar = () => {
    const [value, setValue] = useState(0)
    return (
        <Fragment>
        <Box sx={{ width: 500 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="ALL" icon={<AllInclusiveIcon />} />
            <BottomNavigationAction label="POSITIVES" icon={<ThumbUpAltOutlinedIcon />} />
            <BottomNavigationAction
              label="NEGATIVES"
              icon={<ThumbDownOffAltIcon />}
            />
          </BottomNavigation>
        </Box>
      </Fragment>
    )
};

export default ReviewBar;
