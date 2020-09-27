import React from 'react';

const Button = ({ value, className, onClick, disabled }) => {
    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled}
        >{value}</button>
    );
}

export default Button;