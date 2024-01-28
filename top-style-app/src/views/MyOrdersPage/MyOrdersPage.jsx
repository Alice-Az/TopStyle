import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import { Alert } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import "./MyOrdersPage.css";
import { NavLink } from "react-router-dom";

const MyOrdersPage = () => {
    const { myOrders, GetMyOrders, currentUser } = useContext(AppContext);

    const [userIsLoaded, setUserIsLoaded] = useState(false);

    useEffect(() => {
        if (currentUser !== null && !userIsLoaded) {
            GetMyOrders(currentUser.userID);
            setUserIsLoaded(true);
        }
    });

    return (
        <Box sx={{ width: "100%" }}>
            <NavLink
                to="/"
                style={{ marginBottom: "3%", color: "rgb(83, 95, 105)" }}
            >
                {"<"} Back to front page
            </NavLink>
            <Grid container spacing={2} sx={{ padding: "40px 0px" }}>
                <Grid item xs={12}>
                    {myOrders.length > 0 ? (
                        myOrders.map((order) => (
                            <List className="orders-list" key={order.orderID}>
                                <ListItem sx={{ width: "30%" }}>
                                    <ListItemText>
                                        Order Number: {order.orderID}
                                    </ListItemText>
                                </ListItem>
                                <ListItem sx={{ width: "50%" }}>
                                    <ListItemText>
                                        Total Price: {order.price}kr
                                    </ListItemText>
                                </ListItem>
                                <ListItem sx={{ width: "50%" }}>
                                    <ListItemText>
                                        Delivery address: {order.fullName},{" "}
                                        {order.address}, {order.zipCode},{" "}
                                        {order.city}
                                    </ListItemText>
                                </ListItem>
                                <ListItem sx={{ width: "15%" }}>
                                    <Button
                                        variant="contained"
                                        sx={{ padding: 0 }}
                                    >
                                        <NavLink
                                            to={"/my-orders/" + order.orderID}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                color: "white",
                                                padding: "6px 16px",
                                            }}
                                        >
                                            Details
                                        </NavLink>
                                    </Button>
                                </ListItem>
                            </List>
                        ))
                    ) : (
                        <Alert severity="info">
                            You don't have any orders yet.
                        </Alert>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};
export default MyOrdersPage;
