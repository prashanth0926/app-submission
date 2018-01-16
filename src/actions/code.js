
import {CODE_SUBMIT_SUCCESS, ADDING_CODE,CODE_SUBMIT_ERROR} from "./actionTypes";

// metadata- data that describes data
const headers = {
    'Content-Type': 'application/json'
}
export const onCodeSubmit = userCode =>{

    return ( dispatch) => {
        console.log(userCode._id);
        fetch('http://localhost:8000/submit/', {
                method: 'PUT',
                body:JSON.stringify({
                    "code":userCode.code,
                    "_id":userCode._id
                }),
                headers,
            }
        ).then((response) => (response.json()))
        .then((data)=> {
            if(data.type==='error') {
                dispatch(addCodeFail(data.message));
                dispatch(addCode(false))
            }
            else
                dispatch(addCode(true));
        });
    }
}

export const OnaddingCode = add => {
    return {
        type : ADDING_CODE,
        addingCode : add
    }
}

export const addCode = obj => {
    return {
        type : CODE_SUBMIT_SUCCESS,
        codeSubmitted : obj
    }
}

export const addCodeFail= obj => {
    return {
        type : CODE_SUBMIT_ERROR,
        codeSubmitError : obj
    }
}
