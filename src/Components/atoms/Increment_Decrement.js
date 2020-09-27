import React from 'react';
import { Icon } from '@material-ui/core';

export default function Icons({className, onClick, text}) {
    return (
        <Icon
            className={className}
            onClick={onClick}>{text}</Icon>
    );
}