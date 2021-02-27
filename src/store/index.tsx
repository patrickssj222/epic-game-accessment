import { combineReducers } from 'redux'
import {reducer, ReduxState} from "./reducer";

export interface rootState {
    reducer: ReduxState
}

export const rootReducer = combineReducers({
    reducer
})