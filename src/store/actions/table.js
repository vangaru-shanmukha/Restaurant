import * as actionTypes from './actionTypes';

export const searchTable = (tables) => {
    return {
        type: actionTypes.SEARCH_TABLE,
        tables: tables
    };
};

export const showModal = (id) => {
    return {
        type: actionTypes.SHOW_MODAL,
        id: id
    };
};

export const getTableJSON = (table) => {
    var reqTable = {...table};
    delete reqTable.orders;
    delete reqTable.cost;
    delete reqTable.show;
    return reqTable;
}

export const editItem = (modifiedQty, item, actualQty, table) => {
    let orders = table.orders;
    let qty = modifiedQty;
    if(qty < actualQty) {
        let promisesArray = [];
        for(let order in orders) {
            if(item === orders[order].item.name && actualQty > qty) {
                promisesArray.push(
                    fetch('http://localhost:8080/orders/' + orders[order].id, {
                        method: "DELETE",
                        headers: {
                            authorization: localStorage.getItem("TOKEN")
                        }
                    })
                );
                actualQty -= 1;
            }
        }
        return dispatch => {
            Promise.all(promisesArray)
                .then( response => {
                    dispatch(fetchTables())
                });
        }
    }
    else if(qty > actualQty) {
        let promisesArray = [];
        for(let order in orders) {
            if(item === orders[order].item.name && actualQty < qty) {
                let reqTable = getTableJSON(table);
                orders[order].id = 0;
                orders[order].table = reqTable;
                promisesArray.push(
                    fetch('http://localhost:8080/orders/', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: localStorage.getItem("TOKEN")
                        },
                        body: JSON.stringify(orders[order])
                    })
                );
                actualQty += 1;
            }
        }
        return dispatch => {
            Promise.all(promisesArray)
                .then( response => {
                    dispatch(fetchTables())
                });
        }
    }
};

export const deleteItem = (event, item, orders) => {
    event.preventDefault();
    let promisesArray = [];
    for(let order in orders) {
        if(item === orders[order].item.name) {
            promisesArray.push(
                fetch('http://localhost:8080/orders/' + orders[order].id, {
                    method: "DELETE",
                    headers: {
                        authorization: localStorage.getItem("TOKEN")
                    }
                })
            );
        }
    }
    return dispatch => {
        Promise.all(promisesArray)
            .then( response => {
                dispatch(fetchTables())
            })
    };
};

export const showBill = () => {
    return {
        type: actionTypes.SHOW_BILL
    };
};

export const showTablePopUp = () => {
    console.log("in table");
    return {
        type: actionTypes.SHOW_TABLE_MODAL
    }
};

export const generateBillSuccess = (showBill) => {
    return {
        type: actionTypes.GENERATE_BILL,
        showBill: showBill
    };
};

export const generateBill = (table) => {
    let promisesArray = [];
    let orders = table.orders;
    for(let order in orders) {
        promisesArray.push(
            fetch('http://localhost:8080/orders/' + orders[order].id, {
                method: "DELETE",
                headers: {
                    authorization: localStorage.getItem("TOKEN")
                }
            })
        );
    }
    return dispatch => {
        Promise.all(promisesArray)
            .then( response => {
                dispatch(generateBillSuccess())
            })
            .then( response => {
                dispatch(fetchTables())
            });
    };
};

export const fetchTablesSuccess = (tables) => {
    return {
        type: actionTypes.FETCH_TABLES_SUCCESS,
        tables: tables
    };
};

const calculateCost = (orders) => {
    let cost = Number(0);
    for(let order in orders) {
        cost += Number(orders[order].item.cost);
    }
    return cost;
}

export const fetchTables = () => {
    return dispatch => {
        fetch('http://localhost:8080/tables/', {
            method: "GET",
            headers: {
                authorization: localStorage.getItem("TOKEN")
            }
        })
            .then(response => {
                const fetchTables = [];
                if(response.ok) {
                response.json().then((resultTables) => {
                    for (let table in resultTables) {
                        console.log(resultTables[table]);
                        fetchTables.push({
                            ...resultTables[table],
                            cost: calculateCost(resultTables[table].orders),
                            show: true
                        });
                    }
                    dispatch(fetchTablesSuccess(fetchTables));
                });
                }
            })
            .catch(err => {
                console.log(err);

            });
    };
};

export const addItem = (order) => {
    return dispatch => {
        fetch('http://localhost:8080/orders/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("TOKEN")
            },
            body: JSON.stringify(order)
        })
            .then(response => {
                dispatch(fetchTables());
            });
    };
};

export const addTable = (table) => {
    return disptach => {
        fetch('http://localhost:8080/tables/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("TOKEN")
            },
            body: JSON.stringify(table)
        }).then(response => {
            disptach(fetchTables());
        });
    };
};