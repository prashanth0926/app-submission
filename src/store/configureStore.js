import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { userReducer } from './reducers/users';

const combinedReducer = combineReducers({
    user : userReducer
});

const configureStore = () => {
    return createStore(combinedReducer, applyMiddleware(thunk));
}

export default configureStore;