import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './Modal.module.css';
import Icon from '../../atoms/Increment_Decrement';
import Input from '../../atoms/Input_field';
import Button from '../../atoms/button';

class Modal extends Component {

    state = {
        count : []
    };

    getMenuItemCost = (itemName) => {
        let menus = this.props.menus;
        for(let item in menus) {
            if(menus[item].name === itemName) {
                return menus[item].cost;
            }
        }
    }

    getOrderJSON = (orders) => {
        let items = {};
        for(let order in orders) {
            let item = orders[order].item.name;
            if(items.hasOwnProperty(item)) {
                items[item] += 1;
            } else {
                items[item] = 1;
            }
        }
        return items;
    }

    render() {
        let tables = this.props.tables[this.props.currentTable-1];
        let orders = this.props.tables[this.props.currentTable-1].orders;
        let body = null;
        if (orders.length > 0) {
            const ordersJSON = this.getOrderJSON(orders);
            body = (
                Object.keys(ordersJSON).map((item,index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item}</td>
                        <td>
                            <div>
                                <div className={classes.order}>
                                <Icon 
                                    className={classes.decrement}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        this.props.editItemHandler(ordersJSON[item]-1,item,ordersJSON[item], tables)
                                    }}
                                    text="-"
                                ></Icon>
                                </div>
                                <div className={classes.order}>
                                    <Input
                                        type="text"
                                        value={ordersJSON[item]}
                                        className={null}
                                        placeholder="Qty"
                                        onKeyUp={(event) => this.props.editItemHandler(event.target.value, item, ordersJSON[item], tables)}
                                    ></Input>
                                </div>
                                <div className={classes.order}>
                                <Icon 
                                    className={classes.increment}
                                    onClick={() => {
                                        this.props.editItemHandler(ordersJSON[item]+1,item,ordersJSON[item], tables)
                                    }}
                                    text="+"
                                ></Icon>
                                </div>
                            </div>
                        </td>
                        <td>{this.getMenuItemCost(item) * ordersJSON[item]}</td>
                        <td>
                            <Button
                                onClick={(event) => this.props.deleteItemHandler(event, item, orders)}
                                value="Delete"
                                className={null}
                                disabled={null}></Button>
                        </td>
                    </tr>
                ))
            );
        }
        return (
            <div id="myModal" className={classes.Modal}>
                <div className={classes.ModalContent} id="myModalContent">
                    <span className={classes.close} onClick={this.props.showPopUp}>&times;</span>
                    <h2>Table - {this.props.currentTable}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {body}
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Total</td>
                                <td>{this.props.tables[this.props.currentTable-1].cost}</td>
                                <td>
                                    <Button
                                        onClick={this.props.showBillHandler}
                                        disabled={(body === null) ? true : false}
                                        value="Generate Bill"
                                        className={null}></Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tables: state.tableReducer.tables,
        menus: state.menuReducer.menus,
        currentTable: state.tableReducer.currentTable
    }
}

const mapDisptachToProps = (dispatch) => {
    return {
        showPopUp: () => dispatch(actions.showModal(null)),
        editItemHandler: (modifiedQty, item, actualQty, tables) => dispatch(actions.editItem(modifiedQty, item, actualQty, tables)),
        showBillHandler: () => dispatch(actions.showBill()),
        deleteItemHandler: (event, item, orders) => dispatch(actions.deleteItem(event, item, orders))
    }
}
export default connect(mapStateToProps, mapDisptachToProps)(Modal);