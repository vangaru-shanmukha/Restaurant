import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    Modal: {
        position: 'fixed',
        zIndex: '2',
        paddingTop: '70px',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgb(0,0,0,0.4)'
    },
    Order: {
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    ModalContent: {
        backgroundColor: '#fefefe',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #888',
        width: '80%',
        justifyContent: 'center',
        borderRadius: '10px',
        "& h2": {
            textAlign: 'center'
        }
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
    },
    Table: {
        textAlign: 'center',
        width: '100%',
        "& td": {
            border: '1px solid #ddd',
            padding: '8px',
            borderRadius: '10px'
        },
        "& th": {
            border: '1px solid #ddd',
            padding: '8px',
            borderRadius: '10px'
        },
        "& tr:nth-child(even)": {
            backgroundColor: "#f2f2f2"
        },
        "& tr:hover": {
            backgroundColor: '#ddd'
        },
        "& th": {
            paddingTop: '12px',
            paddingBottom: '12px',
            textAlign: 'center',
            backgroundColor: 'black',
            color: 'white'
        }
    },
    Close: {
        color: '#aaaaaa',
        float: 'right',
        fontSize: '28px',
        fontWeight: 'bold',
        "&:hover": {
            color: '#000',
            textDecoration: 'none',
            cursor: 'pointer'
        }
    },
    Qty: {
        width: '50%',
        padding: '12px 20px',
        margin: '8px 0',
        display: 'inline-block',
        border: '1px solid #ccc',
        borderRadius: '20px',
        boxSizing: 'border-box',
        textAlign: 'center'
    }
}));

export default function Modal({ heading, closeHandler, billAmount }) {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.Modal}>
                <div className={classes.ModalContent}>
                    <span className={classes.Close} onClick={closeHandler}>&times;</span>
                    <table className={classes.Table}>
                        <tbody>
                            <tr>
                                <th>{heading}</th>
                                <td>{billAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};