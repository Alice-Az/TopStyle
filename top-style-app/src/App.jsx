import { useState, useEffect } from "react";
import "./App.css";
import { GetProducts } from "./service/ProductAPI";
import PrimarySearchAppBar from "./components/AppBar/AppBar";

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        GetProducts().then((returnProducts) => {
            setProducts(returnProducts);
        });
    }, []);

    return (
        <>
            <PrimarySearchAppBar></PrimarySearchAppBar>
            <div>
                {products.map((product) => (
                    <p key={product?.ID}>{product?.Name}</p>
                ))}
            </div>
        </>
    );
}

export default App;
