import { NEW_USER, USER_ADDING,USER_ADDING_ERROR } from './actionTypes';
//import history from '../history'
const addUser = _id => {
    return {
        type : NEW_USER,
        id : _id
    }
}

const addUserFail = msg =>
{
    return {
        type : USER_ADDING_ERROR,
        msg : msg
    }
}
// metadata- data tat describes data
const headers = {
    'Content-Type': 'application/json'
}
export const onSubmit = user => {
    return ( dispatch) => {
        fetch('http://localhost:8000/', {
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
            if(data.type==='error')
                dispatch(addUserFail(data.message));
            else
                dispatch(addUser(data.id));
        })


    }
}

export const onUserAdding = adding => {
    return {
        type : USER_ADDING,
        userAdding : adding
    }
}
