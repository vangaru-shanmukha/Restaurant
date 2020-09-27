import React from 'react';
import { makeStyles } from '@material-ui/core';
import Icon from '../atoms/Increment_Decrement';

const useStyles = makeStyles((theme) => ({
    Order: {
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    Button: {
        backgroundColor: 'black',
        color: 'white',
        padding: '14px 20px',
        margin: '8px 0',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        "&:hover": {
            color: 'black',
            border: '1px solid black',
            fontWeight: 'bold',
            backgroundColor: 'white'
        }
    }
}));

export default function Order({ orders, editItemHandler, costCalculator, onClick, item, index }) {
    const classes = useStyles();
    return (
        <React.Fragment>
            {
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item}</td>
                        <td>
                            <div>
                            <div className={classes.Order}>
                                <Icon 
                                    styles="color: red[500]"
                                    onClick={editItemHandler}
                                    text="-"
                                ></Icon>
                                </div>
                                <div className={classes.Order}>
                                    <input min="0" step="1" type="number" value={orders[item]} />
                                </div>
                                <div className={classes.Order}>
                                <Icon 
                                    styles="color: green[500]"
                                    onClick={editItemHandler}
                                    text="+"
                                ></Icon>
                                </div>
                            </div>
                        </td>
                        <td>{costCalculator}</td>
                        <td><button onClick={onClick} className={classes.Button}>Delete</button></td>
                    </tr>
            }
        </React.Fragment>
    );
}