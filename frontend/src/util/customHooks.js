import { useState } from 'react';

export const useInput = (intitalValue) => {
    const [value, setValue] = useState(intitalValue);
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return { value, onChange: handleChange}
};
