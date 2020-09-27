import React from 'react';

const Input = ({ type, value, className, placeholder, onKeyUp }) => {
    return (
        <input
            type={type}
            value={value}
            className={className}
            placeholder={placeholder}
            onChange={onKeyUp}
        ></input>
    );
}

export default Input;