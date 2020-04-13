import React, { useState } from 'react';
import { useInput } from '../util/customHooks.js';
import {TextField, Button} from '@material-ui/core'

const Login = () => {
    const usernameObj = useInput("");
    const passwordObj = useInput("");
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    console.log(usernameObj, passwordObj)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField required variant="standard" label="Username" name={"username"} {...usernameObj}/> <br/> <br/>
                <TextField required variant="standard" label="Password" name={"password"} {...passwordObj} helperText="It's a secret only you know."/>
                {/* <Button  */}
            </form>
        </div>
    )
};
export default Login;