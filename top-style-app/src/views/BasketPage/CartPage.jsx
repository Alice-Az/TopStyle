import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavLink, useNavigate } from "react-router-dom";
import "./CartPage.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppProvider";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
import CartRow from "../../components/CartRow/CartRow";
import CartTotal from "../../components/CartTotal/CartTotal";

const CartPage = () => {
    const { basketList, currentUser, LoadUser, isUserValid } =
        useContext(AppContext);

    useEffect(() => {
        LoadUser();
    }, []);

    const basketIsEmpty = basketList.length == 0;

    const navigate = useNavigate();

    const handleClick = () => {
        if (isUserValid(currentUser)) {
            navigate("/checkout");
        } else {
            LoadUser();
            navigate("/sign-in");
        }
    };

    let cartTotal = 0;

    const GetTotal = () => {
        basketList.forEach((item) => {
            cartTotal += item.Price;
        });
        return cartTotal;
    };

    return (
        <div className="cart-page">
            <NavLink
                to="/"
                style={{ marginBottom: "3%", color: "rgb(83, 95, 105)" }}
            >
                {"<"} Continue shopping
            </NavLink>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ paddingBottom: "40px" }}>
                    <Grid item xs={12}>
                        {!basketIsEmpty ? (
                            basketList.map((item) => (
                                <CartRow item={item} key={item.tempID} />
                            ))
                        ) : (
                            <Alert severity="info">
                                Your basket is empty {":("}
                            </Alert>
                        )}
                    </Grid>
                </Grid>
            </Box>
            {!basketIsEmpty ? (
                <>
                    <CartTotal cartTotal={GetTotal()} />
                    <Button
                        variant="contained"
                        sx={{
                            width: "30%",
                            marginLeft: "35%",
                            marginRight: "35%",
                            padding: 0,
                        }}
                        style={{
                            color: "white",
                            padding: "6px 16px",
                        }}
                        onClick={handleClick}
                    >
                        Continue to checkout
                    </Button>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default CartPage;
