import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppProvider";

const Starter = () => {
    const { LoadBasket, LoadUser, setProducts } = useContext(AppContext);

    useEffect(() => {
        LoadBasket();
        LoadUser();
        setProducts(null);
    }, []);

    return <></>;
};

export default Starter;
