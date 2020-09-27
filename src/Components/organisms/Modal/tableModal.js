import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './tableModal.module.css';

class TableModal extends Component {

    render() {
        return (
            <div id="myModal" className={classes.Modal}>
                <div className={classes.ModalContent} id="myModalContent">
                    <span className={classes.close} onClick={(event) => this.props.showTablePopUp(event)}>&times;</span>
                    <p>Do you want to add a new table ?</p>
                    <button className={classes.success} onClick={(event) => this.props.addTableHandler(event,this.props.tables)}>Yes</button>
                    <button className={classes.cancel} onClick={(event) => this.props.showTablePopUp(event)}>No</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tables: state.tableReducer.tables
    }
}

const mapDisptachToProps = (dispatch) => {
    return {
        showTablePopUp: (event) => {
            event.preventDefault();
            dispatch(actions.showTablePopUp())   
        },
        addTableHandler: (event,tables) => {
            event.preventDefault();
            var table = {
                id: ""+(tables.length+1),
                name: "Table - " + (tables.length+1)
            }
            dispatch(actions.addTable(table))
        }
    };
}
export default connect(mapStateToProps, mapDisptachToProps)(TableModal);