import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles((theme) => ({
    Item: {
        display: 'inline-block',
        padding: '5px',
        textAlign: 'left'
    },
    Image: {
        display: 'inline-block',
        verticalAlign: 'top',
        margin: '10px'
    },
    Menu: {
        display: 'flex'
    },
    Edit: {
        textAlign: 'right'
    },
    EditIcon: {
        "&:hover": {
            border: '1px solid green',
            backgroundColor: 'white',
            color: 'green',
            cursor: 'pointer',
            borderRadius: '5px',
            boxShadow: '2px 2px #888888',
            padding: '2px'
        }
    }
}));
export default function Card({ item, clicked, className, onDrop, onDragOver, onDrag }) {
    const classes = useStyles();
    if (item.show && onDrag === null) {
        return (
            <li
                id={item.id}
                onDrop={(event) => onDrop(event)}
                onDragOver={(event) => onDragOver(event)}
                onClick={() => clicked(item.id)}
                className={className}>
                <div>
                    <h3>{item.name}</h3>
                    Rs.<span>{item.cost}</span>| Total items: <span>{item.orders.length}</span>
                </div>
            </li>
        );
    }
    if (item.show && onDrag != null) {
        return (
            <li 
                id={item.id} 
                draggable="true" 
                onDragStart={(event) => onDrag(event)}
                className={className}>
                <div className={classes.Edit}>
                    <EditIcon
                        style={{ fontSize: "20" }}
                        className={classes.EditIcon}
                        onClick={(event) => clicked(event, item.id)}></EditIcon>
                </div>
                <div className={classes.Menu}>
                    <div className={classes.Image}>
                        <img src={"data:image/jpeg;base64," + item.image} width="100px" height="100px" alt="logo"></img>
                    </div>
                    <div className={classes.Item}>
                        <p>Item Name: <b>{item.name}</b></p>
                        <p>Course Type: <b>{item.type}</b></p>
                        Rs.<span>{item.cost}</span>
                    </div>
                </div>
            </li>
        );
    } else {
        return null;
    }
}