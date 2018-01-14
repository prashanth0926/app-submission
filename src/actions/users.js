import { NEW_USER, USER_ADDING } from './actionTypes';

const addUser = user => {
    return {
        type : NEW_USER,
        user : user
    }
}

export const onSubmit = user => {
    return dispatch => {
        // let users = localStorage.getItem('users');
        
        // if(users != null){
        //     users = JSON.parse(users);
        //     users = [...users, user];
        // }else{
        //     users = [user];
        // }
        
        // localStorage.setItem('users', JSON.stringify(users));

        dispatch(addUser(user));
    }
}

export const onUserAdding = adding => {
    return {
        type : USER_ADDING,
        userAdding : adding
    }
}