import { useState, useEffect } from "react";
import "./App.css";
import TopBar from "./components/AppBar/TopBar";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import AppProvider from "./context/AppProvider";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./views/ProductPage/ProductPage";
import BasketPage from "./views/BasketPage/BasketPage";

const App = () => {
    return (
        <>
            <AppProvider>
                <TopBar />
                <Routes>
                    <Route exact path="/" element={<ProductGrid />} />
                    <Route
                        path="/product/:productID"
                        element={<ProductPage />}
                    />
                    <Route path="/basket" element={<BasketPage />} />
                </Routes>
            </AppProvider>
        </>
    );
};

export default App;
