import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {createStore, combineReducers} from "redux";


const initState = {likes: []}
const initStateAnother = {
    another: [],
    something: 'else'
}

const anotherReducer = (state = initStateAnother, {type, payload}) => {
    switch (type) {
        case 'another/example':
            const currentAnothers = state.another
            return {
                ...state,
                another: [...currentAnothers, payload]
            }
        default:
            return state
    }
}

const likesReducer = (state = initState, {type, payload}) => {
    switch (type) {
        case 'likes/locationSelected':
            const currentLikes = state.likes
            return {
                ...state,
                likes: [...currentLikes, payload]
            }
        default :
            return state
    }
}

const rootReducer = combineReducers({
    likes: likesReducer,
    another: anotherReducer
})

const store = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
