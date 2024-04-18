import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import { useContext, useEffect } from "react";
import { Alert } from "@mui/material";

const SignInPage = () => {
    const {
        currentUser,
        LoginAttempt,
        loginError,
        setLoginError,
        isSessionExpired,
    } = useContext(AppContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await LoginAttempt({
            loginEmail: data.get("email"),
            loginPassword: data.get("password"),
        });
    };

    useEffect(() => {
        setLoginError(false);
    }, []);

    return (
        <div className="sign-in-page">
            <NavLink
                to="/"
                style={{
                    marginBottom: "3%",
                    color: "rgb(83, 95, 105)",
                    width: "100%",
                }}
            >
                {"<"} Back to start page
            </NavLink>
            {currentUser !== null ? (
                <Alert severity="success" sx={{ marginTop: "20px" }}>
                    You are logged in!
                </Alert>
            ) : (
                <>
                    {isSessionExpired ? (
                        <Alert severity="warning">
                            Your session has expired, please login again
                        </Alert>
                    ) : (
                        <></>
                    )}
                    <Box
                        sx={{
                            marginTop: 5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1, width: "100%" }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                            {loginError === true ? (
                                <Alert severity="error">
                                    Email or password incorrect
                                </Alert>
                            ) : (
                                <></>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <NavLink
                                        to="/sign-up"
                                        variant="body2"
                                        style={{
                                            color: "darkgrey",
                                            fontWeight: "normal",
                                            textDecorationLine: "underline",
                                        }}
                                    >
                                        Don't have an account yet? Sign up!
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </>
            )}
        </div>
    );
};

export default SignInPage;
