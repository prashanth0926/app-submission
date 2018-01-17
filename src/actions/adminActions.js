import {LOAD_APP_SUCCESS,LOAD_APP_FAIL, UPDATE_STATUS, UPDATE_STATUS_FAIL} from "./actionTypes";

import { setLoading } from "./code";

// metadata- data that describes data
const headers = {
    'Content-Type': 'application/json'
}

/* LOAD_APP_SUCCESS*/
export const loadApplicantSuccess = (applicants) =>{
    return {
        type:LOAD_APP_SUCCESS,
        payload:applicants
    }
}

/* LOAD_APP_FAIL*/
export const loadApplicantFail = (message) =>{
    return {
        type: LOAD_APP_FAIL,
        payload:message
    }
}

/* UPDATE_STATUS*/
export const updateStatus = (obj, status) =>{
    return {
        type: UPDATE_STATUS,
        payload: obj,
        status: status
    }
}

/* UPDATE_STATUS_FAIL*/
export const updateStatusFail = (message) =>{
    return {
        type: UPDATE_STATUS_FAIL,
        payload : message
    }
}

/* backend call to update application evaluation by  administrators and call to dispatch appropriate action*/
export const changeStatus = (obj, status) =>{
    return(dispatch) => {
        dispatch(setLoading(true));
        fetch('http://localhost:8000/api/update/', {
            method: 'PUT',
            body:JSON.stringify({
                "email":obj.email,
                "status":status
            }),
            headers,
        }).then( (data) => data.json()).then( (data) => {
            if (data.type == "error")
                dispatch(updateStatusFail(data.message));
            else {
                dispatch(updateStatus(obj, status));
                dispatch(setLoading(false));

            }
          });
    }
}

/* backend call to fetch applicants data and dspatch appropriate actions*/
export const loadApplicants = () =>{
    return (dispatch) => {
        console.log("hree");
        fetch('http://localhost:8000/api/getAll/', {
                method: 'GET',
                headers,
            }
        ).then((response) => (response.json()))
            .then((data)=> {
                if(data.type==='error') {
                    dispatch(loadApplicantFail(data.message));
                }
                else {
                    dispatch(loadApplicantSuccess(data));
                }
            });
    }
}
