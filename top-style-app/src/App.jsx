import "./App.css";
import TopBar from "./components/AppBar/TopBar";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import AppProvider from "./context/AppProvider";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./views/ProductPage/ProductPage";
import CartPage from "./views/BasketPage/CartPage";
import Starter from "./components/Starter/Starter";
import SignInPage from "./views/SignInPage/SignInPage";
import SignUpPage from "./views/SignUpPage/SignUpPage";
import CheckoutPage from "./views/CheckoutPage/CheckoutPage";
import MyOrdersPage from "./views/MyOrdersPage/MyOrdersPage";
import OrderPage from "./views/OrderPage/OrderPage";
import Loader from "./components/Loader/Loader";
import AppTheme from "./themes/AppTheme";
import { ThemeProvider } from "@mui/material/styles";

const App = () => {
    return (
        <ThemeProvider theme={AppTheme}>
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
                    <Route path="/sign-in" element={<SignInPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route
                        path="/checkout"
                        element={
                            <Loader>
                                <CheckoutPage />
                            </Loader>
                        }
                    />
                    <Route
                        path="/my-orders"
                        element={
                            <Loader>
                                <MyOrdersPage />
                            </Loader>
                        }
                    />
                    <Route
                        path="/my-orders/:orderID"
                        element={
                            <Loader>
                                <OrderPage />
                            </Loader>
                        }
                    />
                </Routes>
            </AppProvider>
        </ThemeProvider>
    );
};

export default App;
