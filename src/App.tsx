import React, {useState} from "react";
import './App.css';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actionTypes from "./store/action"
import {ReduxState} from "./store/reducer";
import {Column} from "./component/Column/Column";
export const App = () => {
    const [column, setColumn] = useState("column1")
    const [item, setItem] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const columnList = useSelector((state:ReduxState)=>Object.keys(state.reducer),shallowEqual)
    const dispatch = useDispatch()
    const addItemHandler = () => {
        const id = new Date().getTime()
        dispatch({type: actionTypes.ADD_ITEM, payload:{id,column,item}})
    }
    return (
        <div className="App">
            <div className={"content-wrapper"}>
                <div className={"header"}>
                    <text className={"title"}>Marvelous!</text>
                    <text className={"description"}>Lorem lpsum is simply dummy text of the printing and typesetting industry. Lorem lpsum has been the industry standard dummy text ever since.</text>
                </div>
                <div className={"body"}>
                    <label className={"title"}>ADD AN ITEM</label>
                    <div className={"row-container"}>
                        <div className={"control-wrapper"}>
                            <div className={"top-control"}>
                                <input type={"text"} placeholder={"ENTER ITEM"} onChange={(event)=>setItem(event.target.value)} value={item}/>
                                <select value={column} onChange={(event)=>setColumn(event.target.value)} placeholder={"CHOOSE COLUMN"}>
                                    {columnList.map((columnItem, index)=>{
                                        return <option key={index} value={columnItem}>{columnItem.toUpperCase()}</option>
                                    })}
                                </select>
                            </div>
                            <div className={"bottom-control"}>
                                <button className={"add-button"} onClick={()=>addItemHandler()}>ADD ITEM</button>
                                <div className={"search-wrapper"}>
                                    <text className={"search-header"}>SEARCH AN ITEM</text>
                                    <input className={"search-bar"} type={"text"} placeholder={"SEARCH"} value={searchTerm} onChange={(event)=>setSearchTerm(event.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className={"table-wrapper"}>
                            {
                                columnList.map((columnItem, index)=>{
                                    return <Column key={index} columnName={columnItem} searchTerm={searchTerm}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
