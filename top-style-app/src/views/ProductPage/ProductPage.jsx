import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import CircularProgress from "@mui/material/CircularProgress";
import "./ProductPage.css";
import { Box } from "@mui/material";
import { Alert } from "@mui/material";

const ProductPage = () => {
    const { product, GetProduct, AddProductToBasket } = useContext(AppContext);
    let { productID } = useParams();

    useEffect(() => {
        GetProduct(productID);
    }, []);

    const handleAddToBasket = () => {
        AddProductToBasket(product);
    };

    return (
        <div className="product-page">
            <NavLink
                to="/"
                style={{ marginBottom: "3%", color: "rgb(83, 95, 105)" }}
            >
                {"<"} Back to front page
            </NavLink>
            {product === null ? (
                <Alert severity="error">En error occurred.</Alert>
            ) : (
                <Card
                    sx={{
                        maxWidth: "100vw",
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                    }}
                >
                    {productID == product?.ID ? (
                        <>
                            <CardMedia
                                component="img"
                                alt="product image"
                                height="140"
                                image={product?.Image}
                                sx={{
                                    minHeight: "500px",
                                    width: {
                                        xs: "100%",
                                        sm: "60%",
                                        md: "50%",
                                        lg: "50%",
                                    },
                                }}
                            />
                            <div>
                                <CardContent
                                    sx={{
                                        textAlign: "left",
                                        marginLeft: "20px",
                                    }}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {product?.Name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {product?.Description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ marginLeft: "30px" }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={handleAddToBasket}
                                    >
                                        Add to basket
                                    </Button>
                                </CardActions>
                            </div>
                        </>
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
                            <CircularProgress color="secondary" size="6rem" />
                        </Box>
                    )}
                </Card>
            )}
        </div>
    );
};

export default ProductPage;
