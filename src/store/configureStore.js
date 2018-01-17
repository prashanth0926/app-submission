import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import { userReducer } from './reducers/users';
import { adminReducer } from './reducers/adminReducer';

const combinedReducer = combineReducers({
    user : userReducer,
    admin: adminReducer
});

const configureStore = () => {
    return createStore(combinedReducer, applyMiddleware(thunk));
}

export default configureStore;