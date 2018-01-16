import {LOAD_APP_SUCCESS,LOAD_APP_FAIL, UPDATE_STATUS} from "./actionTypes";

import { setLoading } from "./code";

// metadata- data that describes data
const headers = {
    'Content-Type': 'application/json'
}

export const loadApplicantSuccess = (applicants) =>{
    return {
        type:LOAD_APP_SUCCESS,
        payload:applicants
    }
}

export const loadApplicantFail = (message) =>{
    return {
        type: LOAD_APP_FAIL,
        payload:message
    }
}

export const updateStatus = (obj, status) =>{
    return {
        type: UPDATE_STATUS,
        payload: obj,
        status: status
    }
}

export const changeStatus = (obj, status) =>{
    return(dispatch) => {
        dispatch(setLoading(true));
        // TODO: make api call here and put the dispatch inside then block
        dispatch(updateStatus(obj, status));
        dispatch(setLoading(false));
    }
}

export const loadApplicants = () =>{
    return (dispatch) => {
        console.log("hree");
        fetch('http://localhost:8000/admin/getAll/', {
                method: 'GET',
                headers,
            }
        ).then((response) => (response.json()))
            .then((data)=> {
                if(data.type==='error') {
                    dispatch(loadApplicantFail(data.message));
                }
                else {
                    console.log(data);
                    dispatch(loadApplicantSuccess(data));
                }
            });
    }
}
