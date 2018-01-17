import { NEW_USER, USER_ADDING,SET_LOADING, USER_ADDING_ERROR,ADDING_CODE,CODE_SUBMIT_SUCCESS,CODE_SUBMIT_ERROR } from '../../actions/actionTypes';

let intialState = {
    id : "" ,
    userAdding : false,
    addingCode:false,
    codeSubmitted:false,
    userAddError:null,
    codeSubmitError:"",
    loading: false
}

export const userReducer = (state = intialState, action) => {

    switch(action.type){
        case NEW_USER :
            return {
                id:action.id,
                userAdding: false

            }
        case USER_ADDING :
            return {
                ...state,
                userAdding : action.userAdding
            }
        case SET_LOADING :
            return {
                ...state,
                loading:action.payload
            }
        case ADDING_CODE:
            return {
                ...state,
                addingCode:action.addingCode
            }
        case CODE_SUBMIT_SUCCESS:
            return {
                ...state,
                codeSubmitted:action.codeSubmitted
            }
        case USER_ADDING_ERROR:
            return {
                ...state,
                userAddError : action.msg
            }
        case CODE_SUBMIT_ERROR:
            return {
                ...state,
                codeSubmitError:action.codeSubmitError
            }
        default :
            return state;
    }
}