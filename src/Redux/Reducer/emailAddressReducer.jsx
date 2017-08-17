import * as types from '../ActionType/ActionTypes';
import {combineReducers} from 'redux'
import store from '../../Redux/Store/Store'

const valid = (state=false,action) => {
    switch (action.type) {
        case types.CHANGE_VALUE_BY_NAME:
            let email = store.getState().formData.emailAddress
            if(email.byName[action.name.name] && action.name.store == 'emailAddress'){
                state=email.visibleNames.reduce((valid,el)=>valid&&email.byName[el].valid,true)
            }
            return state
        default:
            return state
    }
}

const byName = (state={},action) => {
    switch (action.type) {
        case types.RECEIVE_EMAIL_ADDRESS:
            const objcontainer = action.emailAddress.reduce((obj,emailAddressItem)=>{
                obj[emailAddressItem.name] = emailAddressItem;
                if(obj[emailAddressItem.name].valid==undefined)
                    obj[emailAddressItem.name].valid =emailAddressItem.name.indexOf('Optional')==-1?false:true;
                return obj
            },{})
            return objcontainer
         case types.CHANGE_VALUE_BY_NAME:
            if(state[action.name.name]!=undefined  && action.name.store == 'emailAddress'){
                state[action.name.name].warning = action.name.warning
                state[action.name.name].valid = !action.name.warning
                state[action.name.name].value = action.name.value
            }
            return state
        default:
            return state
    }
}

const visibleNames = (state=[],action) => {
    switch (action.type) {
        case types.RECEIVE_EMAIL_ADDRESS:
            return action.emailAddress.map(emailAddressItem => emailAddressItem.name)
        default:
            return state
    }
}

const submitList = (state={},action) => {
    switch (action.type) {
        case types.RECEIVE_EMAIL_ADDRESS:
            const objcontainer = action.emailAddress.reduce((obj,emailAddressItem)=>{
                obj[emailAddressItem.name] = emailAddressItem.value;
                return obj
            },{})
            return objcontainer
        case types.CHANGE_VALUE_BY_NAME:
            if(state[action.name.name]!=undefined && action.name.store == 'emailAddress')
                state[action.name.name] = action.name.value
            return state
        default:
            return state
    }
}

export default combineReducers({
    byName,
    visibleNames,
    submitList,
    valid
})