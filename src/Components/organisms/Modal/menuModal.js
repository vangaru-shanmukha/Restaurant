import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import classes from './menuModal.module.css';
import { Icon } from '@material-ui/core';

class MenuModal extends Component {

    state = {
        name: "",
        type: "",
        cost: 0,
        image: null,
        nameError: "",
        typeError: "",
        imageError: "",
        costError: "",
        hasError: false
    };

    fileChangeHandler = (event) => {
        console.log("in handler");
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (event) => {
            let bytes = event.target.result;
            bytes = bytes.split(",")[1];
            this.setState({
                image: bytes
            });
        }
    };

    itemNameHandler = (event) => {
        let itemName = event.target.value;
        if (itemName === null || itemName.length <= 5) {
            this.setState({
                nameError: "*Enter valid item name",
                hasError: true,
                name: itemName
            });
        } else {
            this.setState({
                nameError: "",
                hasError: false,
                name: itemName
            });
        }
    }

    itemTypeHandler = (event) => {
        let itemType = event.target.value;
        if (itemType === null || itemType.length <= 5) {
            this.setState({
                typeError: "*Enter valid type",
                hasError: true,
                type: itemType
            });
        } else {
            this.setState({
                typeError: "",
                hasError: false,
                type: itemType
            });
        }
    }

    itemCostHandler = (event) => {
        let itemCost = event.target.value;
        let regex = /^[0-9]*$/;
        if (!regex.test(itemCost)) {
            this.setState({
                costError: "*Enter valid cost",
                hasError: true,
            });
        } else {
            this.setState({
                costError: "",
                hasError: false,
                cost: itemCost
            });
        }
    }

    uploadHandler = (event) => {

    }

    render() {
        let menuImage = null;
        if (this.state.image != null) {
            menuImage = (
                <div>
                    <img src={"data:image/jpeg;base64," + this.state.image} width="100px" height="100px" alt="logo"></img>
                </div>
            );
        }
        return (
            <div id="myModal" className={classes.Modal}>
                <div className={classes.ModalContent} id="myModalContent">
                    <span className={classes.close} onClick={(event) => this.props.showMenuPopUp(event)}>&times;</span>
                    <div className={classes.form}>
                        <form>
                            <div>Item Name</div>
                            <div><input type="text" placeholder="Item name" onChange={(event) => this.itemNameHandler(event)} value={this.state.name} onClick={(event) => this.itemNameHandler(event)} /></div>
                            <div className={classes.error}>{this.state.nameError}</div><br></br>
                            <div>Course Type</div>
                            <div><input type="text" placeholder="course type" onChange={(event) => this.itemTypeHandler(event)} value={this.state.type} onClick={(event) => this.itemTypeHandler(event)} /></div>
                            <div className={classes.error}>{this.state.typeError}</div><br></br>
                            <div>Cost</div>
                            <div>Rs.<input type="number" placeholder="cost" onChange={(event) => this.itemCostHandler(event)} value={this.state.cost} onClick={(event) => this.itemCostHandler(event)} /></div>
                            <div className={classes.error}>{this.state.costError}</div><br></br>
                            {menuImage}
                            <div>Image</div><br></br>
                            <div><input type="file" placeholder="file" onChange={(event) => this.fileChangeHandler(event)} /></div><br></br>
                            <div><button className={classes.success} onClick={(event) => this.props.addItemHandler(event, this.state.name, this.state.type, this.state.cost, this.state.image, this.props.menus)} disabled={this.state.hasError ? true : false}>Submit</button></div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menus: state.menuReducer.menus
    }
}

const mapDisptachToProps = (dispatch) => {
    return {
        showMenuPopUp: (event) => {
            event.preventDefault();
            dispatch(actions.showMenuPopUp())
        },
        addItemHandler: (event, itemName, itemType, cost, image, menus) => {
            var item = {
                id: menus.length + 1,
                name: itemName,
                type: itemType,
                cost: cost,
                image: image
            };
            console.log(item);
            event.preventDefault();
            dispatch(actions.addMenuItem(item))
        }
    };
}
export default connect(mapStateToProps, mapDisptachToProps)(MenuModal);