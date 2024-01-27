import "./CartRow.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

const CartRow = ({ item }) => {
    const { RemoveProductFromBasket } = useContext(AppContext);

    return (
        <List className="product-row">
            <ListItem sx={{ width: "150px" }}>
                <ListItemAvatar>
                    <Avatar
                        src={item.Image}
                        alt=""
                        sx={{
                            height: "70px",
                            width: "70px",
                        }}
                    />
                </ListItemAvatar>
                <ListItemText />
            </ListItem>
            <ListItem sx={{ width: "60%" }}>
                <ListItemText>{item.Name}</ListItemText>
            </ListItem>
            <ListItem sx={{ width: "20%" }}>
                <ListItemText>{item.Price}kr</ListItemText>
            </ListItem>
            <ListItem sx={{ width: "15%" }}>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => RemoveProductFromBasket(item)}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        </List>
    );
};

export default CartRow;
