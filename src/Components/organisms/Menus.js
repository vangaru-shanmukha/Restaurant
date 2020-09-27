import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import EditMenu from './Modal/EditMenu';
import MenuModal from './Modal/menuModal';
import BodyCard from './body_card';

class Menus extends Component {
    drag = (event) => {
        event.dataTransfer.setData("menu", event.target.id);
    };

    componentDidMount () {
        this.props.onFetchItems();
    }

    render() {
        let modal = null;
        if(this.props.showMenuModal) {
            modal = (
                <MenuModal />
            );
        }
        if(this.props.showEditMenuModal) {
            return (
                <EditMenu />
            );
        }
        return (
            <React.Fragment>
                <BodyCard
                    onClick={(event) => this.props.showMenuPopUp(event)}
                    contents={this.props.menus}
                    clicked={this.props.showEditMenuPopUp}
                    tables={false}
                    menus={true}
                    onDrag={this.drag}
                ></BodyCard>
                {modal}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menus: state.menuReducer.menus,
        showMenuModal: state.menuReducer.showMenuModal,
        showEditMenuModal: state.menuReducer.showEditMenuModal
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchItems: () => dispatch(actions.fetchItems()),
        showMenuPopUp: (event) => {
            event.preventDefault();
            dispatch(actions.showMenuPopUp())
        },
        showEditMenuPopUp: (event,id) => {
            console.log(id);
            event.preventDefault();
            dispatch(actions.showEditMenuPopUp(id))   
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menus);