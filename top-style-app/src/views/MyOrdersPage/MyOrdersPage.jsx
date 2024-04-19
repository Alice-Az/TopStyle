import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import { Alert } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button } from "@mui/material";
import "./MyOrdersPage.css";
import { NavLink } from "react-router-dom";

const MyOrdersPage = () => {
    const { myOrders, GetMyOrders, currentUser, isFetchOrdersError } =
        useContext(AppContext);

    useEffect(() => {
        if (currentUser !== null) {
            GetMyOrders();
        }
    }, []);

    return (
        <Box className="orders-page">
            <NavLink
                to="/"
                style={{ marginBottom: "3%", color: "rgb(83, 95, 105)" }}
            >
                {"<"} Back to front page
            </NavLink>
            <Grid container spacing={2} sx={{ padding: "40px 0px" }}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {" "}
                    {!isFetchOrdersError ? (
                        myOrders.length > 0 ? (
                            myOrders.map((order) => (
                                <List
                                    className="orders-list"
                                    key={order.orderID}
                                >
                                    <ListItem sx={{ width: "30%" }}>
                                        <p className="row-detail">
                                            <b
                                                style={{
                                                    color: "rgb(83, 95, 105)",
                                                }}
                                            >
                                                Order Number:
                                            </b>{" "}
                                            {order.orderID}
                                        </p>
                                    </ListItem>
                                    <ListItem sx={{ width: "30%" }}>
                                        <p className="row-detail">
                                            <b
                                                style={{
                                                    color: "rgb(83, 95, 105)",
                                                }}
                                            >
                                                Total Price:
                                            </b>{" "}
                                            {order.price}kr
                                        </p>
                                    </ListItem>
                                    <ListItem
                                        sx={{
                                            width: "50%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "left",
                                            alignItems: "start",
                                        }}
                                    >
                                        <p className="row-detail">
                                            <b
                                                style={{
                                                    color: "rgb(83, 95, 105)",
                                                }}
                                            >
                                                Delivery address:
                                            </b>{" "}
                                        </p>
                                        <p className="row-detail">
                                            To: <i>{order.fullName}</i>
                                        </p>
                                        <p className="row-detail">
                                            Address: <i>{order.address}</i>
                                        </p>
                                        <p className="row-detail">
                                            ZipCode: <i>{order.zipCode}</i>
                                        </p>
                                        <p className="row-detail">
                                            City: <i>{order.city}</i>
                                        </p>
                                    </ListItem>
                                    <ListItem sx={{ width: "15%" }}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                padding: 0,
                                                minWidth: "30px",
                                            }}
                                        >
                                            <NavLink
                                                to={
                                                    "/my-orders/" +
                                                    order.orderID
                                                }
                                                className="navlink-details"
                                            >
                                                <span className="navlink-big">
                                                    Details
                                                </span>{" "}
                                                <span className="navlink-small">
                                                    {">"}
                                                </span>
                                            </NavLink>
                                        </Button>
                                    </ListItem>
                                </List>
                            ))
                        ) : (
                            <Alert severity="info">
                                You don't have any orders yet.
                            </Alert>
                        )
                    ) : (
                        <Alert severity="error">En error occurred.</Alert>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};
export default MyOrdersPage;
