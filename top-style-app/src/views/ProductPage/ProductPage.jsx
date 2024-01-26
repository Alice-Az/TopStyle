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
import "./ProductPage.css";

const ProductPage = () => {
    const { product, GetProduct, AddProductToBasket, basketList } =
        useContext(AppContext);
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
            <Card
                sx={{
                    maxWidth: "100vw",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <CardMedia
                    component="img"
                    alt="product image"
                    height="140"
                    image={product?.Image}
                    style={{ minHeight: "500px", width: "40%" }}
                />
                <div>
                    <CardContent sx={{ textAlign: "left", marginLeft: "20px" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {product?.Name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
            </Card>
        </div>
    );
};

export default ProductPage;
