import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <NavLink
            to={`/product/${product?.ID}`}
            style={{ textDecorationLine: "none" }}
        >
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <CardMedia
                    sx={{ pt: "100%", objectFit: "contain" }}
                    image={product.Image}
                    title={`image of ${product.Name}`}
                />
                <CardContent
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        textAlign="center"
                    >
                        {product.Name}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                    >
                        {product.Price}kr
                    </Typography>
                </CardContent>
            </Card>
        </NavLink>
    );
};

export default ProductCard;
