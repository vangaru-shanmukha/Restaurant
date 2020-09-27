import * as actionTypes from '../actions/actionTypes';

const initialState = {
    menus: [],
    showMenuModal: false,
    showEditMenuModal: false,
    currentMenu: null
};

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                menus: action.items,
                showMenuModal: false,
                showEditMenuModal: false
            }
        case actionTypes.SEARCH_MENU:
            return {
                ...state,
                menus: action.menus
            };
        case actionTypes.SHOW_MENU_MODAL:
            var showModal = !state.showMenuModal
            return {
                ...state,
                showMenuModal: showModal
            };
        case actionTypes.SHOW_EDIT_MENU_MODAL:
            let currentId = null;
            let showEdit = !state.showEditMenuModal
            for(let i=0;i<state.menus.length;i++) {
                if(state.menus[i].id === action.id) {
                    currentId = state.menus[i];
                    break;
                }
            }
            return {
                ...state,
                showEditMenuModal: showEdit,
                currentMenu: currentId
            };
    }
    return state;
};

export default menuReducer;