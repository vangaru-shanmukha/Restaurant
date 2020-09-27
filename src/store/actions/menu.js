import * as actionTypes from './actionTypes';

export const searchMenu = (menus) => {
    return {
        type: actionTypes.SEARCH_MENU,
        menus: menus
    };
};

export const fetchItemsSuccess = (items) => {
    return {
        type: actionTypes.FETCH_ITEMS_SUCCESS,
        items: items
    };
};

export const showMenuPopUp = () => {
    return {
        type: actionTypes.SHOW_MENU_MODAL,
    };
};

export const addMenuItem = (menu) => {
    console.log(typeof(menu.image));
    return dispatch => {
        fetch('http://localhost:8080/items/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("TOKEN")
            },
            body: JSON.stringify(menu)
        }).then( response => {
            dispatch(fetchItems())
        })
    };
};

export const showEditMenuPopUp = (id) => {
    return {
        type: actionTypes.SHOW_EDIT_MENU_MODAL,
        id: id
    }
};

export const fetchItems = () => {
    return dispatch => {
        fetch('http://localhost:8080/items/', {
            method: "GET",
            headers: {
                authorization: localStorage.getItem("TOKEN")
            }
        })
            .then( response => {
                const fetchItems = [];
                if(response.ok) {
                    response.json().then((resultItems) => {
                        for(let item in resultItems) {
                            fetchItems.push({
                                ...resultItems[item],
                                show: true
                            });
                        }
                        dispatch(fetchItemsSuccess(fetchItems));
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
};