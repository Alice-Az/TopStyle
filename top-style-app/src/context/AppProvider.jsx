import { useState, createContext } from "react";
import { FetchProducts, FetchProduct } from "../service/ProductAPI";
export const AppContext = createContext();
import uuid from "react-uuid";

const AppProvider = (props) => {
    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState();

    const [basketList, setBasket] = useState([]);

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
                LoadBasket
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider;
