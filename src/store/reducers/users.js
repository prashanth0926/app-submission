import { NEW_USER, USER_ADDING } from '../../actions/actionTypes';

let intialState = {
    users : [],
    userAdding : false
}

export const userReducer = (state = intialState, action) => {

    switch(action.type){
        case NEW_USER :
            return {
                ...state,
                users: [...state.users, action.user],
                userAdding: false

            }
        case USER_ADDING :
            return {
                ...state,
                userAdding : action.userAdding
            }
        default : 
            return state;
    }
}