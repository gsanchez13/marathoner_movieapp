import React, { useState } from 'react';
// import clsx from 'clsx';
// import axios from 'axios';
// import { useInput } from '../util/customHooks.js';
import { TextField, IconButton, InputAdornment, Button, makeStyles, Grid } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons/';
// import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    textField: {
        width: "25ch"
    }
}));

const Login = () => {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    //standard username and setUsername hook. Username is initalized as an empty string and we call setUsername to update this string in the onChange portion of our TextField component. So this string is updated everytime the value of our TextField is modified.
    const [passwordValues, setPasswordValues] = useState({
        password: "",
        showPassword: false
    });
    //this hook takes in a value of an object, passwordValues, that has two keys: password (a string) and 
    //showPassword (a boolean). setPasswordValues is the function we will call to update this objects value.
    //this objects keys hold state values, aka the keys "password" and "showPassword" are part of our state.
    const handlePasswordChange = (key) => (e) => {
        setPasswordValues({ ...passwordValues, [key]: e.target.value });
    };
    //handlePasswordChange takes an object key as it's first argument. This will specify 
    //what part of the object to update. Because this function looks for the e.target.value, 
    //when we call the handlePasswordChange within our input's onChange, it will take the updated value of the
    //input and set it to that key's new value, aka update the password value to the e.target.value
    const handleShowPassword = () => {
        setPasswordValues({ ...passwordValues, showPassword: !passwordValues.showPassword })
    }
    //handleShowPassword is similar to what we did for passwordChange, but we don't specify the key in the passwordValues that we want to change. Instead, we know we're modifying the showPassword boolean value in the state, so we want the click of the button to change it to the booleans opposite. This will change the "type" of the text input, from "password" view of black dots to "text" view, where the user can see their password.
    const [loading, setLoading] = useState(false);
    console.log(username, passwordValues.password)
    return (
        <div>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <form onSubmit={e => e.preventDefault()}>
                    <TextField
                        variant="filled"
                        label="Username"
                        name={"username"}
                        value={username}
                        onChange={e => setUsername(e.target.value)} />
                    <br />
                    <br />
                    <TextField
                        variant="filled"
                        label="Password"
                        name={"password"}
                        value={passwordValues.password}
                        onChange={handlePasswordChange("password")}
                        type={passwordValues.showPassword ? 'text' : 'password'}
                        helperText="It's a secret."
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword}>
                                        {passwordValues.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                        }}
                    />
                    <br />
                    <br />
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        disabled={loading}
                        type="submit">{loading ? "Loading..." : "Sign In"}
                    </Button>
                </form>
            </Grid>
        </div>
    )
};
export default Login;