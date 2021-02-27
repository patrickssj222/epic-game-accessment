import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../store/reducer";
import {ItemList} from "../../store/reducer";
import "./Column.css"
import { MdClear } from "react-icons/md"
import * as actionTypes from "../../store/action"
import React from "react";
interface Props{
    columnName: string,
    searchTerm: string
}

export const Column = (props: Props) => {
    const { columnName, searchTerm } = props
    const itemList: ItemList = useSelector((state:{reducer:ReduxState})=>state.reducer[columnName] as ItemList, shallowEqual)
    const dispatch = useDispatch()

    const deleteItemHandler = (id:string) => {
        dispatch({type:actionTypes.DELETE_ITEM, payload:{id, column:columnName}})
    }
    return <div className={"column-wrapper"}>
        <div className={"column-header"}>{columnName.toUpperCase()}</div>
        {
            Object.keys((itemList)).filter((itemId)=>{
                if(searchTerm === "")
                    return true
                else{
                    return itemList[itemId].includes(searchTerm)
                }
            }).map((itemId:string, index)=>{
                return <div key={index} className={"column-item "+(index%2>0?"column-item-dark":"column-item-light")}>
                    <text>{itemList[itemId]}</text>
                    <div className={"icon-wrapper "+(index%2>0?"icon-wrapper-light":null)} onClick={()=>deleteItemHandler(itemId)}><MdClear/></div>
                </div>
            })
        }
    </div>
}