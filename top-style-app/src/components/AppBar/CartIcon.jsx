import { Box, IconButton, Badge } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { NavLink } from "react-router-dom";

const CartIcon = () => {
    const { basketList } = useContext(AppContext);
    return (
        <NavLink
            to={"/basket"}
            style={{
                textDecorationLine: "none",
                textDecorationColor: "#f5f6f7",
            }}
        >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="shopping-basket"
                    aria-haspopup="true"
                    // onClick={handleProfileMenuOpen}
                    color="inherit"
                    sx={{ marginRight: "5px" }}
                >
                    <Badge badgeContent={basketList.length} color="secondary">
                        <ShoppingBasketIcon />
                    </Badge>
                </IconButton>
            </Box>
        </NavLink>
    );
};

export default CartIcon;
