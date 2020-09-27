import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tables: [],
    showModal: false,
    showBillPopUp: false,
    currentTable: null,
    showTableModal: false
};

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TABLES_SUCCESS:
            return {
                ...state,
                tables: action.tables
            };
        case actionTypes.SEARCH_TABLE:
            return {
                ...state,
                tables: action.tables
            };
        case actionTypes.ADD_ITEM:
            return {
                ...state,
                tables: action.tables
            };
        case actionTypes.ADD_TABLE:
            return {
                ...state,
                tables: action.tables
            };
        case actionTypes.SHOW_TABLE_MODAL:
            var showTable = !state.showTableModal
            console.log(showTable);
            return {
                ...state,
                showTableModal: showTable
            };
        case actionTypes.SHOW_MODAL:
            return {
                ...state,
                showModal: !state.showModal,
                currentTable: action.id
            };
        case actionTypes.SHOW_BILL:
            var showBill = !state.showBillPopUp;
            var showModal = !state.showModal;
            return {
                ...state,
                showBillPopUp : showBill,
                showModal : showModal
            };
        case actionTypes.GENERATE_BILL:
            var showBill1 = !state.showBillPopUp;
            return {
                ...state,
                showBillPopUp: showBill1
            }
    }
    return state;
};

export default tableReducer;