import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { AppContext } from "../../context/AppProvider";
import { useContext, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = () => {
    const { products, GetProducts } = useContext(AppContext);

    useEffect(() => {
        GetProducts();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={8}>
                {products.map((product) => (
                    <Grid xs={4} key={product.ID}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductGrid;
