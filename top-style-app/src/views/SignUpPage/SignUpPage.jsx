import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import { Alert } from "@mui/material";

const SignUpPage = () => {
    const {
        usernameTaken,
        SignUp,
        setUsernameTaken,
        userIsCreated,
        setUserIsCreated,
    } = useContext(AppContext);

    const [dataIsOk, setDataIsOk] = useState(true);

    useEffect(() => {
        setUsernameTaken(null);
        setUserIsCreated(false);
    }, []);

    const CheckUserInput = (inputEmail, inputPassword) => {
        const email = inputEmail;
        const password = inputPassword;
        if (
            email !== "" &&
            !email.includes(" ") &&
            password !== "" &&
            !password.includes(" ")
        )
            return true;
        else return false;
    };

    const handleSubmit = async (event) => {
        setUsernameTaken(null);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let dataOk = CheckUserInput(data.get("email"), data.get("password"));
        if (dataOk) {
            await SignUp({
                userEmail: data.get("email"),
                userPassword: data.get("password"),
            });
        } else setDataIsOk(false);
    };

    return (
        <div className="sign-up-page">
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
            {userIsCreated ? (
                <Alert severity="success" sx={{ marginTop: "20px" }}>
                    You successfully created your account!{" "}
                    <NavLink
                        to="/sign-in"
                        style={{
                            textDecorationLine: "underline",
                            color: "black",
                            fontWeight: "bold",
                        }}
                    >
                        Log in
                    </NavLink>
                </Alert>
            ) : (
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}></Grid>
                        </Grid>
                        {usernameTaken !== null ? (
                            <Alert severity="error">
                                There is already an account registered with this
                                email adress
                            </Alert>
                        ) : (
                            !dataIsOk && (
                                <Alert severity="error">Incorrect input.</Alert>
                            )
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink
                                    to="/sign-in"
                                    variant="body2"
                                    style={{
                                        color: "darkgrey",
                                        fontWeight: "normal",
                                        textDecorationLine: "underline",
                                    }}
                                >
                                    Already have an account? Sign in
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default SignUpPage;
