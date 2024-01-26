import { useState, createContext } from "react";
import { FetchProducts, FetchProduct } from "../service/ProductAPI";
export const AppContext = createContext();

const AppProvider = (props) => {
    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState();

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
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider;
