import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import likesReducer from './Likes/store'
import 'bootstrap/dist/css/bootstrap.min.css';

const rootReducer = combineReducers({
    likes: likesReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
