import { NEW_USER, USER_ADDING,USER_ADDING_ERROR, SET_LOADING } from './actionTypes';
import {setLoading} from './code';

/*NEW_USER*/
const addUser = _id => {
    return {
        type : NEW_USER,
        id : _id
    }
}

/*USER_ADDING_ERROR*/
const addUserFail = msg =>
{
    return {
        type : USER_ADDING_ERROR,
        msg : msg
    }
}

// metadata- data tat describes data
const headers = {
    'Content-Type': 'application/json',
}

/* call to store applicant info is made and appropriate actions are dispatched here*/
export const onSubmit = user => {
    return ( dispatch) => {
        dispatch(onUserAdding(true));
        dispatch(setLoading(true));
        fetch('http://localhost:8000/api/', {
                method: 'POST',
                body:JSON.stringify({
                    "firstname":user.firstname,
                    "lastname":user.lastname,
                    "email":user.email,
                    "code":user.code,
                    "zipcode":user.zipcode
                }),
                headers,
            }
        ).then(function(response) {
            if (response.status===422 || response.status===200) {
                return response.json();
        }}
        ).then((data)=> {
            dispatch(setLoading(false));
            dispatch(onUserAdding(false));
            if(data.type==='error')
                dispatch(addUserFail(data.message));
            else
                dispatch(addUser(data.id));
        })


    }
}

/* USER_ADDING*/
export const onUserAdding = adding => {
    return {
        type : USER_ADDING,
        userAdding : adding
    }
}
