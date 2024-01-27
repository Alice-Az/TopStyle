import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppProvider";

const Starter = () => {
    const { LoadBasket } = useContext(AppContext);

    useEffect(LoadBasket, []);

    return <></>;
};

export default Starter;
