import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { AppContext } from "../../context/AppProvider";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const ProductGrid = () => {
    const { products, GetProducts, LoadUser } = useContext(AppContext);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        LoadUser();
        if (searchParams.get("search") !== null)
            GetProducts(searchParams.get("search"));
        else GetProducts();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            {products === null ? (
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
            ) : (
                <Grid container spacing={8}>
                    {products.map((product) => (
                        <Grid xs={12} sm={6} md={4} key={product.ID}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                    {searchParams.get("search") !== null &&
                    products.length === 0 ? (
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
                            <Alert severity="info">
                                No products matched your search {":("}
                            </Alert>
                        </Box>
                    ) : (
                        <></>
                    )}
                </Grid>
            )}
        </Box>
    );
};

export default ProductGrid;
