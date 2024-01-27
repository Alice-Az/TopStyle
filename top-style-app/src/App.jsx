import "./App.css";
import TopBar from "./components/AppBar/TopBar";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import AppProvider from "./context/AppProvider";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./views/ProductPage/ProductPage";
import CartPage from "./views/BasketPage/CartPage";
import Starter from "./components/Starter/Starter";

const App = () => {
    return (
        <>
            <AppProvider>
                <Starter />
                <TopBar />
                <Routes>
                    <Route exact path="/" element={<ProductGrid />} />
                    <Route
                        path="/product/:productID"
                        element={<ProductPage />}
                    />
                    <Route path="/basket" element={<CartPage />} />
                </Routes>
            </AppProvider>
        </>
    );
};

export default App;
