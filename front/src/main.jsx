import React, {Fragment} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import TableView from "./pages/TableView/index.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Fragment>
            <ToastContainer theme='dark' toastStyle={{
                backgroundColor: 'rgb(24 24 27)',
            }}/>
            <TableView/>
        </Fragment>
    </React.StrictMode>,
)
