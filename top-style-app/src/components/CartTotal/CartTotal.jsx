import "./CartTotal.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const CartTotal = ({ cartTotal }) => {
    return (
        <List className="total-row" sx={{ marginBottom: "40px" }}>
            <ListItem sx={{ width: "150px" }}></ListItem>
            <ListItem sx={{ width: "60%" }}>
                <ListItemText>
                    <b>Total:</b>
                </ListItemText>
            </ListItem>
            <ListItem sx={{ width: "20%" }}>
                <ListItemText>
                    <b>{cartTotal}kr</b>
                </ListItemText>
            </ListItem>
            <ListItem sx={{ width: "15%" }}></ListItem>
        </List>
    );
};

export default CartTotal;
