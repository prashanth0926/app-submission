import {
    LOAD_APP_SUCCESS, LOAD_APP_FAIL
} from "../../actions/actionTypes";

let intialState = {
    applicants:[],
    appFail:""
}

export const adminReducer =(state = intialState, action)=>{
    switch(action.type){
        case LOAD_APP_SUCCESS :
            return {
                ...state,
                applicants: action.payload.map( (data)=>{
                        var d={};
                        d['firstname']=data.firstname;
                        d['lastname']=data.lastname;
                        d['email']=data.email;
                        d['code']=data.code;
                        d['status']=data.status;
                    return d;
                })

            }
        case LOAD_APP_FAIL :
            return {
                ...state,
                appFail : action.payload
            }
        default :
            return state;
    }
}