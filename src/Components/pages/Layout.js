import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Header from '../molecules/header_card';
import Tables from '../organisms/Tables';
import Menus from '../organisms/Menus';
import Navbar from '../molecules/Navbar';
import { Box } from '@material-ui/core';

class Layout extends Component {

    onTableKeyUpHandler = (event) => {
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
            this.props.searchTableHandler(tables);
        }
        else {
            for (let i = 0; i < tables.length; i++) {
                tables[i].show = true;
            }
            this.props.searchTableHandler(tables);
        }
    }

    onMenuKeyUpHandler = (event) => {
        var filter;
        filter = event.target.value.trim().toUpperCase();
        const menus = [];
        this.props.menus.map(menu => (
            menus.push(Object.assign({}, menu))
        ));
        if (filter !== '') {
            for (let i = 0; i < menus.length; i++) {
                let courseType = menus[i].type.trim().toUpperCase();
                let name = menus[i].name.trim().toUpperCase();
                if (name.includes(filter) === false &&
                    courseType.includes(filter) === false) {
                    menus[i].show = false;
                }
                else {
                    menus[i].show = true;
                }
            }
            this.props.searchMenuHandler(menus);
        }
        else {
            for (let i = 0; i < menus.length; i++) {
                menus[i].show = true;
            }
            this.props.searchMenuHandler(menus);
        }
    }

    render() {
        return (
            <React.Fragment>
                <Box display="block">
                    <Navbar />
                </Box>

                <br></br>
                <br></br>
                <br></br>
                <Box width="100%" position="fixed" bgcolor="white" display="flex">
                    <Box
                        bgcolor="white.300"
                        ml={4.5}
                        mt={2}
                        width={750}
                        display="inline-block"
                    >
                        <Header 
                            name="Tables"
                            placeholder="Search tables"
                            onKeyUp={this.onTableKeyUpHandler}/>
                    </Box>
                    <Box
                        bgcolor="white.300"
                        ml={2}
                        mt={2}
                        width={1000}
                        display="inline-block"
                    >
                        <Header
                            name="Menu"
                            placeholder="Search menu.... by course... by food"
                            onKeyUp={this.onMenuKeyUpHandler} />
                    </Box>
                </Box>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Box width="100%" bgcolor="white" display="flex">
                    <Box
                        bgcolor="white.300"
                        ml={4.5}
                        mt={2}
                        width={750}
                        display="inline-block"

                    >
                        <Tables />
                    </Box>
                    <Box
                        bgcolor="white.300"
                        ml={2}
                        mt={2}
                        width={1000}
                        display="inline-block"
                    >
                        <Menus />
                    </Box>
                </Box>
            </React.Fragment>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        tables: state.tableReducer.tables,
        menus: state.menuReducer.menus
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchTableHandler: (tables) => dispatch(actions.searchTable(tables)),
        searchMenuHandler: (menus) => dispatch(actions.searchMenu(menus))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);