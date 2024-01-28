import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { AppContext } from "../../context/AppProvider";
import { useContext, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

const ProductGrid = () => {
    const { products, GetProducts } = useContext(AppContext);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("search") !== null)
            GetProducts(searchParams.get("search"));
        else GetProducts();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
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
