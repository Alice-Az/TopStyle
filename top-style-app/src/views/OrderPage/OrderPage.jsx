import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductRow from "./ProductRow";
import "./OrderPage.css";
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { FetchOrderDetails } from "../../service/ProductAPI";
import uuid from "react-uuid";

const OrderPage = () => {
    let { orderID } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState();
    const [isOrderError, setOrderError] = useState(false);

    useEffect(() => {
        FetchOrderDetails(orderID).then((data) => {
            if (data !== null) {
                data.Products = data.Products.map((product) => ({
                    ...product,
                    key: uuid(),
                }));
                setOrderDetails(data);
                setIsLoading(false);
            } else {
                setOrderError(true);
            }
        });
    }, []);

    return (
        <div className="order-page">
            <NavLink to="/my-orders" style={{ color: "rgb(83, 95, 105)" }}>
                {"<"} Back to my orders
            </NavLink>
            {!isOrderError ? (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid
                        container
                        spacing={2}
                        sx={{ paddingBottom: "40px", marginTop: "40px" }}
                    >
                        <Grid item xs={12}>
                            {!isLoading ? (
                                orderDetails.Products.map((item) => (
                                    <ProductRow product={item} key={item.key} />
                                ))
                            ) : (
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "400px",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <CircularProgress
                                        color="secondary"
                                        size="6rem"
                                    />
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <Alert severity="error">En error occurred.</Alert>
            )}
        </div>
    );
};

export default OrderPage;
