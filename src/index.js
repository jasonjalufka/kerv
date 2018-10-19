import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import salesReducer from './store/reducers/salesReducer';
import inventoryReducer from './store/reducers/inventoryReducer';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
	sales: salesReducer,
	inventory: inventoryReducer
});

const store = createStore(rootReducer);

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
