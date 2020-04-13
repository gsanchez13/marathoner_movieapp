import React, { useState } from 'react';
import { useInput } from '../util/customHooks.js';

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
                <input name={"username"} {...usernameObj} placeholder="Username"/>
                <input name={"password"} {...passwordObj} placeholder="Password"/>
            </form>
        </div>
    )
};
export default Login;