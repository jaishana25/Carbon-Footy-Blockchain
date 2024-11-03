import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import App from './App.jsx';
import './index.css';
import Dashboard from "./pages/Dashboard.jsx";
import Started from "./pages/Started.jsx";

import {TransactionsProvider} from './context/TransactionContext.jsx';
import BreakDown from "./pages/BreakDown.jsx";
import Register from "./pages/Register.jsx";
import ScopeDetails from "./pages/ScopeDetails.jsx";
import SearchCompany from "./pages/SearchComapny.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
	},
	{
		path: "/add-footprint",
		element: <Started/>
	}, {
		path: "/dashboard",
		element: <Dashboard/>
	}, {
		path: "/register",
		element: <Register/>
	}, {
		path: "/breakdown",
		element: <BreakDown/>
	}, {
		path: "/scopeDetails",
		element: <ScopeDetails/>
	}, {
		path: "/search",
		element: <SearchCompany/>
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<TransactionsProvider>
		<RouterProvider router={router}/>
	</TransactionsProvider>
)

//Primary color - #798068
//Secondary color -#d0fc65
/*
Fonts- Albert Sans



 */