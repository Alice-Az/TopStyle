import { useState, useEffect } from "react";
import "./App.css";
import PrimarySearchAppBar from "./components/AppBar/AppBar";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import AppProvider from "./context/AppProvider";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./views/ProductPage/ProductPage";

const App = () => {
    return (
        <>
            <AppProvider>
                <PrimarySearchAppBar />
                <Routes>
                    <Route exact path="" element={<ProductGrid />} />
                    <Route
                        path="/product/:productID"
                        element={<ProductPage />}
                    />
                </Routes>
            </AppProvider>
        </>
    );
};

export default App;
