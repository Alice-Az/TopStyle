import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import "./ProductRow.css";

const ProductRow = ({ product }) => {
    return (
        <List className="product-row">
            <ListItem sx={{ width: "150px" }}>
                <ListItemAvatar>
                    <Avatar
                        src={product.image}
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
                <ListItemText>{product.name}</ListItemText>
            </ListItem>
        </List>
    );
};

export default ProductRow;
