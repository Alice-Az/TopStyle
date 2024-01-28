import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavLink, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppProvider";
import ProductRow from "./ProductRow";

const OrderPage = () => {
    const { GetOrderDetails, orderDetails } = useContext(AppContext);

    let { orderID } = useParams();

    useEffect(() => {
        GetOrderDetails(orderID);
    }, []);

    return (
        <div style={{ width: "50%" }}>
            <NavLink to="/my-orders" style={{ color: "rgb(83, 95, 105)" }}>
                {"<"} Back to my orders
            </NavLink>
            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container
                    spacing={2}
                    sx={{ paddingBottom: "40px", marginTop: "40px" }}
                >
                    <Grid item xs={12}>
                        {orderDetails !== null &&
                        orderDetails.orderID == orderID ? (
                            orderDetails.Products.map((item) => (
                                <ProductRow
                                    product={item}
                                    key={item.productID}
                                />
                            ))
                        ) : (
                            <></>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default OrderPage;
