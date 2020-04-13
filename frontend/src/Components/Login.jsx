import React, { useState } from 'react';

const Login = () => {
    const [state, setState] = useState({
        username: "",
        password: ""
    });
    //state and setState are two items in the useState component of React
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const { username, password } = state;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="username" value={username} onChange={handleChange} placeholder="Username"/>
                <input name="password" value={password} onChange={handleChange} placeholder="Password"/>
            </form>
        </div>
    )
};
export default Login;