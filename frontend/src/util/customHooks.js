import { useState } from 'react';

export const useInput = (intitalValue) => {
    const [value, setValue] = useState(intitalValue);
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return { value, onChange: handleChange}
};
//useState returns an array of length 2, the first element is a value and the second is a function to set the value
