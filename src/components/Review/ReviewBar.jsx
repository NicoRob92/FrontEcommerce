import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterReview } from '../../ducks/actions/actionCreators'
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const ReviewBar = ({ Order }) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)

  const handleClick = (e) => {
    dispatch(filterReview(e.currentTarget.id))
    Order(e.currentTarget.id)
  }

  return (
    <div>
      <div>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction id='all' onClick={handleClick} label="ALL" icon={<AllInclusiveIcon />} />
          <BottomNavigationAction id='positive' onClick={handleClick} label="POSITIVES" icon={<ThumbUpAltOutlinedIcon />} />
          <BottomNavigationAction id='negative' onClick={handleClick} label="NEGATIVES" icon={<ThumbDownOffAltIcon />} />
        </BottomNavigation>
      </div>
    </div>
  )
};

export default ReviewBar;
