
import {CODE_SUBMIT_SUCCESS, ADDING_CODE,CODE_SUBMIT_ERROR, SET_LOADING} from "./actionTypes";

// metadata- data that describes data
const headers = {
    'Content-Type': 'application/json'
}

/* call is made to update code to the server and appropriate actions are dispatched*/
export const onCodeSubmit = userCode =>{

    return ( dispatch) => {
        console.log(userCode._id);
        dispatch(setLoading(true));
        fetch('http://localhost:8000/api/submit/', {
                method: 'PUT',
                body:JSON.stringify({
                    "code":userCode.code,
                    "_id":userCode._id
                }),
                headers,
            }
        ).then((response) => (response.json()))
        .then((data)=> {
            dispatch(setLoading(false));
            if(data.type==='error') {
                dispatch(addCodeFail(data.message));
                dispatch(addCode(false))
            }
            else
                dispatch(addCode(true));
        });
    }
}

/*ADDING_CODE*/
export const OnaddingCode = add => {
    return {
        type : ADDING_CODE,
        addingCode : add
    }
}

/*SET_LOADING*/
export const setLoading = loading => {
    return {
        type : SET_LOADING,
        payload : loading
    }
}

/*CODE_SUBMIT_SUCCESS*/
export const addCode = obj => {
    return {
        type : CODE_SUBMIT_SUCCESS,
        codeSubmitted : obj
    }
}

/*CODE_SUBMIT_ERROR*/
export const addCodeFail= obj => {
    return {
        type : CODE_SUBMIT_ERROR,
        codeSubmitError : obj
    }
}
