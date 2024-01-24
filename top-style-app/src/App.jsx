import { useState, useEffect } from "react";
import "./App.css";
import { GetProducts } from "./service/ProductAPI";

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        GetProducts().then((returnProducts) => {
            setProducts(returnProducts);
        });
    }, []);

    return (
        <div>
            {products.map((product) => (
                <p key={product?.ID}>{product?.Name}</p>
            ))}
        </div>
    );
}

export default App;
