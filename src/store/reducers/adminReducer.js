import {LOAD_APP_SUCCESS, LOAD_APP_FAIL, UPDATE_STATUS,UPDATE_STATUS_FAIL} from "../../actions/actionTypes";

let intialState = {
    applicants:[],
    loadApplicantsFail:"",
    updateStatusFail:""
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
        case UPDATE_STATUS :
           const tmpData = state.applicants;
           tmpData.find((a) => {return a.email === action.payload.email}).status = action.status;
            return {
                ...state,
                applicants: tmpData
            }
        case LOAD_APP_FAIL :
            return {
                ...state,
                loadApplicantsFail : action.payload
            }
        case UPDATE_STATUS_FAIL:
            return {
                ...state,
                updateStatusFail: action.payload
            }
        default :
            return state;
    }
}