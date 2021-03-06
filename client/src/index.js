import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { reducer as formReducer } from 'redux-form'
import { Provider } from 'react-redux';
import kervReducer from './store/reducers/kervReducer'
import orderReducer from './store/reducers/orderReducer';
import configReducer from './store/reducers/configReducer';
import { composeWithDevTools } from "redux-devtools-extension";
import './index.css';
import App from './App';

// import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
	order: orderReducer,
	kerv: kervReducer,
	form: formReducer,
	config: configReducer
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
