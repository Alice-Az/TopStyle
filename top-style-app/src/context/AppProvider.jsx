import { useState, createContext } from "react";
import {
    FetchProducts,
    FetchProduct,
    LogIn,
    CreateUser,
    PostOrder,
    FetchMyOrders,
} from "../service/ProductAPI";
import uuid from "react-uuid";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext();

const AppProvider = (props) => {
    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState();

    const [basketList, setBasket] = useState([]);

    const [currentUser, setCurrentUser] = useState(null);

    const [loginError, setLoginError] = useState(null);

    const [usernameTaken, setUsernameTaken] = useState(null);

    const [userIsCreated, setUserIsCreated] = useState(false);

    const [myOrders, setMyOrders] = useState([]);

    const [isFetchOrdersError, setIsFetchOrdersError] = useState(false);

    const [orderIsPlaced, setOrderIsPlaced] = useState(false);

    const [isPlaceOrderError, setIsPlaceOrderError] = useState(false);

    const [isSessionExpired, setIsSessionExpired] = useState(false);

    const [isUserFetched, setIsUserFetched] = useState(false);

    const LoginAttempt = (loginInfo) => {
        LogIn(loginInfo).then((data) => {
            if (data !== null) {
                setCurrentUser(data);
                setIsSessionExpired(false);
                localStorage.setItem("currentUser", data);
            } else setLoginError(true);
        });
    };

    const LogOut = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
    };

    const LoadUser = () => {
        const token = localStorage.getItem("currentUser");
        if (token !== null) {
            const decodedToken = CheckTokenValidity(token);
            if (decodedToken !== null) {
                const user = token;
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
                setIsSessionExpired(true);
                localStorage.removeItem("currentUser");
            }
        } else {
            setCurrentUser(null);
            setIsSessionExpired(false);
        }
        setIsUserFetched(true);
    };

    const isUserValid = (userToken) => {
        if (userToken !== null) {
            return CheckTokenValidity(userToken);
        }
        return false;
    };

    const CheckTokenValidity = (token) => {
        const decodedToken = jwtDecode(token);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        return decodedToken.exp > currentTimestamp ? decodedToken : null;
    };

    const SignUp = (userInfo) => {
        CreateUser(userInfo).then((data) => {
            if (typeof data === "string") setUsernameTaken(data);
            else setUserIsCreated(true);
        });
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

    const EmptyBasket = () => {
        setBasket([]);
        localStorage.removeItem("basketList");
    };

    const GetProducts = (input) => {
        FetchProducts(input).then((data) => {
            setProducts(data !== undefined ? data : []);
        });
    };

    const GetProduct = (productID) => {
        FetchProduct(productID).then((data) => {
            setProduct(data === null ? null : data);
        });
    };

    const PlaceOrder = (order) => {
        PostOrder(order).then((data) => {
            if (data !== null) {
                setOrderIsPlaced(true);
                EmptyBasket();
            } else setIsPlaceOrderError(true);
        });
    };

    const GetMyOrders = () => {
        setIsFetchOrdersError(false);
        FetchMyOrders().then((data) => {
            if (data !== null) {
                setMyOrders(data);
            } else {
                setIsFetchOrdersError(true);
            }
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
                isUserValid,
                LogOut,
                usernameTaken,
                setUsernameTaken,
                SignUp,
                userIsCreated,
                setUserIsCreated,
                PlaceOrder,
                orderIsPlaced,
                setOrderIsPlaced,
                GetMyOrders,
                myOrders,
                isSessionExpired,
                setIsSessionExpired,
                isPlaceOrderError,
                setIsPlaceOrderError,
                isFetchOrdersError,
                setIsFetchOrdersError,
                isUserFetched,
                setIsUserFetched,
                setProducts,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider;
