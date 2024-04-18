import { useState, createContext } from "react";
import {
    FetchProducts,
    FetchProduct,
    LogIn,
    CreateUser,
    PostOrder,
    FetchMyOrders,
    FetchOrderDetails,
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

    const [dataIsOk, setDataIsOk] = useState(true);

    const [myOrders, setMyOrders] = useState([]);

    const [orderIsPlaced, setOrderIsPlaced] = useState(false);

    const [orderDetails, setOrderDetails] = useState(null);

    const [isSessionExpired, setIsSessionExpired] = useState(false);

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
                const user = {
                    userID: decodedToken[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"
                    ],
                    userEmail:
                        decodedToken[
                            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
                        ],
                    exp: decodedToken.exp,
                };
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
    };

    const isUserValid = (user) => {
        if (user !== null) {
            const currentTimestamp = Math.floor(Date.now() / 1000);
            console.log(user.exp > currentTimestamp);
            return user.exp > currentTimestamp;
        }
        console.log("lafja");
        return false;
    };

    const CheckTokenValidity = (token) => {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
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
            setProduct(data !== undefined ? data : null);
        });
    };

    const PlaceOrder = (order) => {
        PostOrder(order).then(() => {
            setOrderIsPlaced(true);
            EmptyBasket();
        });
    };

    const GetMyOrders = (userID) => {
        FetchMyOrders(userID).then((data) => {
            setMyOrders(data);
        });
    };

    const GetOrderDetails = (orderID) => {
        FetchOrderDetails(orderID).then((data) => {
            setOrderDetails(data);
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
                dataIsOk,
                setDataIsOk,
                PlaceOrder,
                orderIsPlaced,
                setOrderIsPlaced,
                GetMyOrders,
                myOrders,
                GetOrderDetails,
                orderDetails,
                isSessionExpired,
                setIsSessionExpired,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider;
