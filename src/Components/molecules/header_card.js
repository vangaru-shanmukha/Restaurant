import React from "react";
import { makeStyles } from "@material-ui/core";
import Input from '../atoms/Input_field';

const useStyles = makeStyles((theme) => ({
    Table: {
        border: '1px solid black',
        padding: '15px',
        zIndex: '1000',
        backgroundColor: 'white',
        borderRadius: '5px'
    },
    Input: {
        width: '50%',
        padding: '12px 20px',
        margin: '8px 0',
        display: 'inline-block',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box'
    }
}));
const HeaderCard = ({ name, placeholder, onKeyUp, value }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.Table}>
                <h3>{name}</h3>
                <Input
                    type="text"
                    value={value}
                    className={classes.Input}
                    placeholder={placeholder}
                    onKeyUp={onKeyUp}>
                </Input>
            </div>
        </React.Fragment>
    );
};

export default HeaderCard;