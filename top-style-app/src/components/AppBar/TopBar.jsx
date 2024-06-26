import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./TopBar.css";
import { useContext, useRef } from "react";
import { AppContext } from "../../context/AppProvider";
import CartIcon from "./CartIcon";
import { NavLink, useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const TopBar = () => {
    const { GetProducts, currentUser, LogOut, setProducts } =
        useContext(AppContext);
    const searchValue = useRef();

    const navigate = useNavigate();

    const handleClick = () => {
        setProducts(null);
        navigate(`/?search=${searchValue.current.value}`);
        GetProducts(searchValue.current.value);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        handleMenuClose();
        LogOut();
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {currentUser === null ? (
                <div>
                    <MenuItem onClick={handleMenuClose}>
                        <NavLink
                            to="/sign-in"
                            style={{ color: "#000000", width: "100%" }}
                        >
                            Sign in
                        </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <NavLink
                            to="/sign-up"
                            style={{
                                color: "darkgrey",
                                width: "100%",
                                fontStyle: "italic",
                                fontSize: "0.8rem",
                            }}
                        >
                            Sign up!
                        </NavLink>
                    </MenuItem>
                </div>
            ) : (
                <div>
                    <MenuItem onClick={handleLogOut}>
                        <NavLink
                            to="/"
                            style={{ color: "#000000", width: "100%" }}
                        >
                            Sign out
                        </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <NavLink
                            to="/my-orders"
                            style={{ color: "#000000", width: "100%" }}
                        >
                            My orders
                        </NavLink>
                    </MenuItem>
                </div>
            )}
        </Menu>
    );

    return (
        <Box>
            <AppBar
                style={{
                    width: "100%",
                }}
            >
                <Toolbar
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            display: { xs: "flex", sm: "block" },
                            minWidth: "40px",
                        }}
                    >
                        <span className="icon-big">TopStyle</span>
                        <span className="icon-small">TS</span>
                    </Typography>
                    <Search
                        sx={{
                            padding: 0,
                            maxWidth: "250px",
                            minWidth: "40px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "80%",
                        }}
                    >
                        <input
                            type="text"
                            ref={searchValue}
                            className="search-input"
                            placeholder="Search products..."
                        />
                        <IconButton
                            onClick={handleClick}
                            sx={{ color: "white" }}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Search>
                    <div className="top-bar-icons">
                        <CartIcon />
                        <Box sx={{ display: "flex" }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                                sx={{ marginLeft: "5px" }}
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
};

export default TopBar;
