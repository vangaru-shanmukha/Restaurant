import React from "react";
import { makeStyles } from '@material-ui/core';
import Card from '../molecules/card';
import Button from '../atoms/button';

const useStyles = makeStyles((theme) => ({
    Main: {
        border: '1px solid black',
        padding: '15px',
        verticalAlign: 'top',
        borderRadius: '5px',
        backgroundColor: 'white'
    },
    Content: {
        listStyleType: 'none',
        padding: '10px'
    },
    list: {
        padding: '10px',
        textDecoration: 'none',
        color: 'black',
        display: 'block',
        border: '1px solid #888888',
        boxShadow: '3px 3px #888888',
        marginBottom: '15px',
        borderRadius: '5px'
    },
    button: {
        backgroundColor: 'green',
        border: 'none',
        color: 'white',
        padding: '10px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '2px',
        cursor: 'pointer',
        borderRadius: '5px',
        alignItems: 'flex-end',
        "&:hover": {
            border: '1px solid green',
            backgroundColor: 'white',
            color: 'green'
        }
    },
    feature: {
        textAlign: 'right'
    }
}));

const BodyCard = ({ onClick, contents, clicked, tables, menus, drop, allowDrop, onDrag }) => {
    const classes = useStyles();
    let item = null;
    if (tables) {
        item = (
            <ul id={classes.Content}>
                {contents.map(table => (
                    <Card
                        key={table.id}
                        item={table}
                        clicked={clicked}
                        className={classes.list}
                        onDrop={drop}
                        onDragOver={allowDrop}
                        onDrag={null} />
                ))}
            </ul>
        );
    } else {
        item = (
            <ul id={classes.Content}>
                {contents.map(menu => (
                    <Card
                        key={menu.id}
                        item={menu}
                        clicked={clicked}
                        className={classes.list}
                        onDrop={null}
                        onDragOver={null}
                        onDrag={onDrag} />
                ))}
            </ul>
        );
    }
    return (
        <div className={classes.Main}>
            <div className={classes.feature}>
                <Button
                    className={classes.button}
                    onClick={onClick}
                    value="New"
                    disable={null}></Button>
            </div>
            <div>
                {item}
            </div>
        </div>
    )
}

export default BodyCard;