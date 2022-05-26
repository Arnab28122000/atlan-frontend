import { createContext, useState } from "react";

import { customer } from "../data/customer";
import { employee } from "../data/employee";


const RootContext = createContext(null);

const RootState = (props) => {
    
    const sqlQuery = [
        "select * from customers;",
        "select * from employee;"
    ];

    const isValidQuery = (query) => {
        return sqlQuery.includes(query);
    }

    const [editorList, setEditorList] = useState([
        {
            id: 0,
            query: "",
            data: []
        }
    ])

    const addEditor = () => {
        setEditorList([
            ...editorList,
            {
                id: editorList.length,
                query: "",
                data: []
            }
        ]);
    }

    const updateEditorList = (id, query) => {
        setEditorList(editorList.map(editor => {
            if(editor.id === id){
                editor.query = query;
                if(query.includes("customers")){
                    editor.data = customer;
                }
                else if(query.includes("employee")){
                    editor.data = employee;
                }
            }
            return editor;
        }));
    }

    const removeEditor = (id) => {
        setEditorList(editorList.filter(editor => editor.id !== id));
    }

    return (
        <RootContext.Provider value={{
            editorList, setEditorList, sqlQuery, addEditor, removeEditor, isValidQuery,
            updateEditorList
        }}>
            {props.children}
        </RootContext.Provider>
    )
}

export {RootState, RootContext};