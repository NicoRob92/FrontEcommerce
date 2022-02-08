import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../ducks/actions/actionCreators";
import styles from "./_ProfileView.module.scss";
// Material ui components
// Cards
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// List
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItems from "./ListItems";
import ListItemPassword from "./ListItemPassword";
import ImageProfile from "./ImageProfile";
import ListItemCountry from "./ListItemCountry";
const ProfileView = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    // const user1 = useSelector((state) => state.user.user);
    console.log(user);
    // const user = []
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        dispatch(getUserById(userId, token));
    }, []);



    return (
        <div className={styles.container}>
            <Box sx={{ marginTop: '20px', marginBottom: '10px' }}>
                <ImageProfile image={user.image}/>
            </Box>
            <Box>
                <Card sx={{ width: 800 }}>
                    <CardContent>
                        <h3 className={styles.title}>Basic info</h3>
                        <p className={styles.pText}>
                            Some information may be visible in your public profile
                        </p>
                    </CardContent>
                    {/* List */}
                    <nav aria-label="secondary mailbox folders">
                        <List>
                            <ListItems label={`NAME`} text={user.first_name} />
                            <Divider />
                            <ListItems label={`LASTNAME`} text={user.last_name} />
                            <Divider />
                            <ListItems label={`USERNAME`} text={user.username} />
                            <Divider />
                            <ListItems label={`DNI`} text={user.dni} />
                        </List>
                    </nav>
                </Card>
            </Box>
            <Box sx={{ marginTop: '10px' }}>
                <Card sx={{ width: 800 }}>
                    <CardContent>
                        <h3 className={styles.title}>Contact info</h3>
                        <p className={styles.pText}>
                            Some information may be visible in your public profile
                        </p>
                    </CardContent>
                    {/* List */}
                    <nav aria-label="secondary mailbox folders">
                        <List>
                            <ListItems label={`EMAIL`} text={user.email} />
                            <Divider />
                            <ListItems label={`PHONE`} text={user.phone} />
                            <Divider />
                            <ListItemCountry label={`COUNTRY`} text={user.Country ? user.Country.name : null} />
                        </List>
                    </nav>
                </Card>
            </Box>
            <Box sx={{ marginTop: '10px', marginBottom: '20px' }}>
                <Card sx={{ width: 800 }}>
                    <CardContent>
                        <h3 className={styles.title}>Password</h3>
                        <p className={styles.pText}>
                            A secure password helps protect your account
                        </p>
                    </CardContent>
                    {/* List */}
                    <nav aria-label="secondary mailbox folders">
                        <List>
                            <ListItemPassword value={user.password} />
                        </List>
                    </nav>
                </Card>
            </Box>
        </div>
    );
};

export default ProfileView;
