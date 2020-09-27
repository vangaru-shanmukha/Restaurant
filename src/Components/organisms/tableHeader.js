import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import HeaderCard from '../molecules/header_card';

class TableHeader extends Component {

    onKeyUpHandler = (event) => {
        let filter;
        filter = event.target.value.trim().toUpperCase();
        const tables = [];
        this.props.tables.map(table => (
            tables.push(Object.assign({}, table))
        ));
        if (filter !== '') {
            for (let i = 0; i < tables.length; i++) {
                let name = tables[i].name.trim().toUpperCase();
                if (name.includes(filter) === false) {
                    tables[i].show = false;
                }
                else {
                    tables[i].show = true;
                }
            }
            this.props.searchHandler(tables);
        }
        else {
            for (let i = 0; i < tables.length; i++) {
                tables[i].show = true;
            }
            this.props.searchHandler(tables);
        }
    }

    render() {
        return (
            <HeaderCard
                name="Tables"
                placeholder="Search tables"
                onKeyUp={this.onKeyUpHandler}
            ></HeaderCard>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tables: state.tableReducer.tables
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchHandler: (tables) => dispatch(actions.searchTable(tables))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader);