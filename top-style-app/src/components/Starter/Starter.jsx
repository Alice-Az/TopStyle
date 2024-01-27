import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppProvider";

const Starter = () => {
    const { LoadBasket, LoadUser } = useContext(AppContext);

    useEffect(() => {
        LoadBasket();
        LoadUser();
    }, []);

    return <></>;
};

export default Starter;
