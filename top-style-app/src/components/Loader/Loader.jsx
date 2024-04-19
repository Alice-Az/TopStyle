import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ children }) => {
    const { isUserFetched } = useContext(AppContext);

    return (
        <>
            {isUserFetched ? (
                children
            ) : (
                <Box
                    sx={{
                        width: "100%",
                        height: "400px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress color="secondary" size="6rem" />
                </Box>
            )}
        </>
    );
};
export default Loader;
