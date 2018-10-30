import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { reducer as formReducer } from 'redux-form'
import { Provider } from 'react-redux';
import salesReducer from './store/reducers/salesReducer';
import inventoryReducer from './store/reducers/inventoryReducer';
import orderReducer from './store/reducers/orderReducer';
import { composeWithDevTools } from "redux-devtools-extension";
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
	sales: salesReducer,
	inventory: inventoryReducer,
	order: orderReducer,
	form: formReducer
});

const composeEnhancer = composeWithDevTools || compose;

const store = createStore(
	rootReducer,
	composeEnhancer(applyMiddleware(apiMiddleware))
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
