import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import HeaderCard from '../molecules/header_card';

class DishHeader extends Component {

    state = {
        value: "Search by item"
    }

    onKeyUpHandler = (event) => {
        var filter;
        filter = event.target.value.trim().toUpperCase();
        this.setState({
            value: filter
        })
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
            this.props.searchHandler(menus);
        }
        else {
            for (let i = 0; i < menus.length; i++) {
                menus[i].show = true;
            }
            this.props.searchHandler(menus);
        }
    }

    render() {
        return (
            <HeaderCard
                name="Menu"
                placeholder="Seach menu... by course.. by food"
                onKeyUp={this.onKeyUpHandler}
                value={this.value}
            ></HeaderCard>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menus: state.menuReducer.menus
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchHandler: (menus) => dispatch(actions.searchMenu(menus))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DishHeader);