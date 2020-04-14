import { useState } from 'react';


const useErrorHandler = (false) => {
    const [ error, showError ] = useState(false);
    const handleError = (e) => {
        showError(e.target.value)
    }
};

export const useInput = (intitalValue) => {
    const [value, setValue] = useState(intitalValue);
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return { value, onChange: handleChange}
};
// useState returns an array of length 2, the first element is a value and the second is a function to set the value
export const useLogin = (initalValue) => {
    const [user, setUser] = useState(initalValue);
    const handleUser = (e) => {
        setUser(e.target.user)
    }
    return { user, onChange: handleUser};
}
export const useUsername = (initalValue) => {
    const [ username, setUsername ] = useState(initalValue);
    const handleChange = (e) => {
        setUsername()
    }
}
