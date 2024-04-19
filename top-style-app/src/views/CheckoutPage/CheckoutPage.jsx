import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavLink, useNavigate } from "react-router-dom";
import "./CheckoutPage.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
import CartRow from "../../components/CartRow/CartRow";
import CartTotal from "../../components/CartTotal/CartTotal";
import { TextField } from "@mui/material";

const CheckoutPage = () => {
    const {
        basketList,
        currentUser,
        PlaceOrder,
        orderIsPlaced,
        setOrderIsPlaced,
        LoadUser,
        isUserValid,
        isPlaceOrderError,
        setIsPlaceOrderError,
    } = useContext(AppContext);

    const navigate = useNavigate();

    const [dataIsOk, setDataIsOk] = useState(true);

    useEffect(() => {
        setOrderIsPlaced(false);
        LoadUser();
    }, []);

    const isEmptyOrSpaces = (str) => {
        return str === null || str.match(/^ *$/) !== null;
    };

    const CheckUserInput = (
        inputFullName,
        inputAddress,
        inputZipCode,
        inputCity
    ) => {
        if (
            !isEmptyOrSpaces(inputFullName) &&
            !isEmptyOrSpaces(inputAddress) &&
            !isEmptyOrSpaces(inputZipCode) &&
            !isEmptyOrSpaces(inputCity)
        )
            return true;
        else return false;
    };

    const basketIsEmpty = basketList.length == 0;

    const fullName = useRef();
    const address = useRef();
    const zipcode = useRef();
    const city = useRef();

    let cartTotal = 0;

    const GetTotal = () => {
        basketList.forEach((item) => {
            cartTotal += item.Price;
        });
        return cartTotal;
    };

    const handlePlaceOrder = () => {
        setIsPlaceOrderError(false);
        if (!isUserValid(currentUser)) {
            LoadUser();
            navigate("/sign-in");
        } else {
            let dataOk = CheckUserInput(
                fullName.current.value,
                address.current.value,
                zipcode.current.value,
                city.current.value
            );
            if (dataOk) {
                let productsInOrder = [];
                basketList.forEach((item) => {
                    productsInOrder.push(item.ID);
                });
                PlaceOrder({
                    userID: currentUser.userID,
                    productIDs: productsInOrder,
                    fullName: fullName.current.value,
                    address: address.current.value,
                    zipCode: zipcode.current.value,
                    city: city.current.value,
                });
            } else setDataIsOk(false);
        }
    };

    return (
        <div className="checkout-page">
            <NavLink
                to="/"
                style={{
                    marginBottom: "3%",
                    color: "rgb(83, 95, 105)",
                    width: "100%",
                    textAlign: "left",
                }}
            >
                {"<"} Continue shopping
            </NavLink>
            {!orderIsPlaced ? (
                <>
                    {!basketIsEmpty ? (
                        <>
                            <div className="checkout-info">
                                <div className="basket-review">
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid
                                            container
                                            spacing={2}
                                            sx={{ paddingBottom: "40px" }}
                                        >
                                            <Grid item xs={12}>
                                                {basketList.map((item) => (
                                                    <CartRow
                                                        item={item}
                                                        key={item.tempID}
                                                    />
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <CartTotal cartTotal={GetTotal()} />
                                </div>
                                <div className="delivery-info">
                                    <p
                                        style={{
                                            color: "rgb(83, 95, 105)",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Fill in your delivery details:
                                    </p>
                                    <TextField
                                        label="Full name"
                                        className="delivery-input"
                                        inputRef={fullName}
                                        sx={{ margin: "5px 0px" }}
                                    ></TextField>
                                    <TextField
                                        label="Street adress"
                                        className="delivery-input"
                                        inputRef={address}
                                        sx={{ margin: "5px 0px" }}
                                    ></TextField>
                                    <TextField
                                        label="Zipcode"
                                        className="delivery-input"
                                        inputRef={zipcode}
                                        sx={{ margin: "5px 0px" }}
                                    ></TextField>
                                    <TextField
                                        label="City"
                                        className="delivery-input"
                                        inputRef={city}
                                        sx={{ margin: "5px 0px" }}
                                    ></TextField>
                                    {!dataIsOk && (
                                        <Alert severity="error">
                                            Incorrect delivery input.
                                        </Alert>
                                    )}
                                    {isPlaceOrderError && (
                                        <Alert severity="error">
                                            An error has occurred.
                                        </Alert>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="contained"
                                sx={{
                                    width: "30%",
                                    marginLeft: "35%",
                                    marginRight: "35%",
                                }}
                                onClick={handlePlaceOrder}
                            >
                                Confirm and pay
                            </Button>
                        </>
                    ) : (
                        <Alert severity="info">
                            You don't have any items anymore {":("}
                        </Alert>
                    )}
                </>
            ) : (
                <Alert severity="success">
                    You have successfully placed an order. You can find it under
                    "my orders".
                </Alert>
            )}
        </div>
    );
};

export default CheckoutPage;
