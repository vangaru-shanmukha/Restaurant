import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal/Modal';
import * as actions from '../../store/actions/index';
import TableModal from './Modal/tableModal';
import BodyCard from './body_card';
import MenuModal from './modal';

class Tables extends Component {

    allowDrop = (event) => {
        event.preventDefault();
    }

    getTableJSON = (id) => {
        var tables = this.props.tables;
        var reqTable = null;
        for(let table in tables) {
            if(tables[table].id == id) {
                reqTable = {...tables[table]};
            }
        }
        delete reqTable.orders;
        delete reqTable.cost;
        delete reqTable.show;
        return reqTable;
    }

    getMenuJSON = (id) => {
        var menus = this.props.menus;
        var reqMenu = null;
        for(let menu in menus) {
            if(menus[menu].id == id) {
                reqMenu = {...menus[menu]};
            }
        }
        delete reqMenu.show;
        return reqMenu;
    }

    getOrderJSON = (table,item) => {
        return {
            id: 0,
            table: table,
            item: item,
            status: "Active"
        };
    }

    drop = (event) => {
        event.preventDefault();
        var tableId = event.target.id;
        var menuId = event.dataTransfer.getData("menu");
        if(tableId && menuId) {
            const table = this.getTableJSON(tableId);
            const item = this.getMenuJSON(menuId);
            const order = this.getOrderJSON(table,item);
            console.log(order);
            this.props.addItemHandler(order);
        } else {
            alert('Please drag properly');
        }

    }

    componentDidMount () {
        this.props.onFetchTables();
    }


    render() {
        let modal = null;
        if(this.props.showModal) {
            modal = (
                <Modal />
            );
        }
        if(this.props.showBillPopUp) {
            modal = (
                <MenuModal
                    heading={"Bill Amount"}
                    closeHandler={() => this.props.generateBillHandler(this.props.tables[this.props.currentTable-1])}
                    billAmount={this.props.tables[this.props.currentTable-1].cost}
                />
            );
        }
        console.log(this.props.showTableModal);
        if(this.props.showTableModal) {
            modal = (
                <TableModal />
            );
        }
        return(
            <React.Fragment>
                <BodyCard
                    onClick={(event) => this.props.showTablePopUp(event)}
                    contents={this.props.tables}
                    clicked={this.props.showPopUp}
                    tables={true}
                    menus={false}
                    drop={this.drop}
                    allowDrop={this.allowDrop}
                ></BodyCard>
                {modal}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tables: state.tableReducer.tables,
        showModal: state.tableReducer.showModal,
        showBillPopUp: state.tableReducer.showBillPopUp,
        showTableModal: state.tableReducer.showTableModal,
        menus: state.menuReducer.menus,
        currentTable: state.tableReducer.currentTable
    }
};

const mapDisptachToProps = (dispatch) => {
    return {
        showPopUp: (id) => dispatch(actions.showModal(id)),
        onFetchTables: () => dispatch(actions.fetchTables()),
        showTablePopUp: (event) => {
            event.preventDefault();
            dispatch(actions.showTablePopUp())
        },
        addItemHandler: (order) => dispatch(actions.addItem(order)),
        generateBillHandler: (table) => dispatch(actions.generateBill(table)),
        editItemHandler: (modifiedQty, item, actualQty, tables) => dispatch(actions.editItem(modifiedQty, item, actualQty, tables)),
        showBillHandler: () => dispatch(actions.showBill()),
        deleteItemHandler: (event, item, orders) => dispatch(actions.deleteItem(event, item, orders))
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(Tables);