import { useState, createContext } from "react";
import { FetchProducts, FetchProduct, LogIn } from "../service/ProductAPI";
export const AppContext = createContext();
import uuid from "react-uuid";

const AppProvider = (props) => {
    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState();

    const [basketList, setBasket] = useState([]);

    const [currentUser, setCurrentUser] = useState(null);

    const [loginError, setLoginError] = useState(null);

    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    const LoginAttempt = (loginInfo) => {
        LogIn(loginInfo).then((data) => {
            if (typeof data !== "string") {
                setCurrentUser(data);
                localStorage.setItem("currentUser", JSON.stringify(data));
            } else setLoginError(data);
        });
    };

    const LogOut = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
    };

    const LoadUser = () => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        setCurrentUser(user ?? null);
    };

    const LoadBasket = () => {
        const basket = JSON.parse(localStorage.getItem("basketList"));
        setBasket(basket ?? []);
    };

    const SaveBasket = (basket) => {
        localStorage.setItem("basketList", JSON.stringify(basket));
        setBasket(basket);
    };

    const AddProductToBasket = (product) => {
        const basketItem = { ...product, tempID: uuid() };
        const newBasketList = [...basketList, basketItem];
        SaveBasket(newBasketList);
    };

    const RemoveProductFromBasket = (productToRemove) => {
        const updatedBasket = basketList.filter(
            (product) => productToRemove !== product
        );
        SaveBasket(updatedBasket);
    };

    const GetProducts = (input) => {
        FetchProducts(input).then((data) => {
            setProducts(data !== undefined ? data : []);
        });
    };

    const GetProduct = (productID) => {
        FetchProduct(productID).then((data) => {
            setProduct(data !== undefined ? data : null);
        });
    };

    return (
        <AppContext.Provider
            value={{
                products,
                GetProducts,
                GetProduct,
                product,
                AddProductToBasket,
                RemoveProductFromBasket,
                basketList,
                LoadBasket,
                LoginAttempt,
                currentUser,
                loginError,
                setLoginError,
                LoadUser,
                LogOut,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider;
