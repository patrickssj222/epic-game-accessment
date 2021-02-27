import * as actionTypes from './action';

export interface ReduxState {
    [columnName: string]: ItemList
}

export interface ItemList {
    [id: string]: string
}

const initialState: ReduxState = {
    "column1": {},
    "column2": {}
};

export const reducer = (store = initialState, action:any) => {
    switch (action.type){
        case actionTypes.ADD_ITEM:
            console.log("[Store] Adding new item", action.payload.item)
            return {
                ...store,
                [action.payload.column]: {
                    ...store[action.payload.column],
                    [action.payload.id]:action.payload.item
                }
            }
        case actionTypes.DELETE_ITEM:
            console.log("[Store] Removing item", action.payload.id)
            const {[action.payload.id]:toRemove, ...restOfColumn} = store[action.payload.column]
            return {
                ...store,
                [action.payload.column]: restOfColumn
            }
        default:
            return store
    }
}