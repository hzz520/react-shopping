import * as types from '../ActionType/ActionTypes';
import {combineReducers} from 'redux'
import store from '../../Redux/Store/Store'

const valid = (state=false,action) => {
    switch (action.type) {
        case types.CHANGE_VALUE_BY_NAME:
            let cardInfo = store.getState().formData.cardInfo
            if(cardInfo.byName[action.name.name]){
                state=cardInfo.visibleNames.reduce((valid,el)=>valid&&cardInfo.byName[el].valid,true)
            }
            return state
        default:
            return state
    }
}
const byName = (state={},action) => {
    switch (action.type) {
        case types.RECEIVE_CARD_INFO:
            const objcontainer = action.cardInfo.reduce((obj,cardInfoItem)=>{
                obj[cardInfoItem.name] = cardInfoItem;
                if((obj[cardInfoItem.name].valid)==undefined)
                    obj[cardInfoItem.name].valid =cardInfoItem.name.indexOf('Optional')==-1?false:true; 
                return obj
            },{})
            return objcontainer
         case types.CHANGE_VALUE_BY_NAME:
            if(state[action.name.name]){
                state[action.name.name].warning = action.name.warning
                state[action.name.name].valid = !action.name.warning
                state[action.name.name].value = action.name.value
            }
            return state
        case types.CHANGE_RESET_VALUE_BY_NAME:
            if(state[action.name.name]){
                state[action.name.name].warning = action.name.warning
                state[action.name.name].value = action.name.value
            }
            return state
        default:
            return state
    }
}

const visibleNames = (state=[],action) => {
    switch (action.type) {
        case types.RECEIVE_CARD_INFO:
            return action.cardInfo.map(cardInfoItem => cardInfoItem.name)
        default:
            return state
    }
}

const submitList = (state={},action) => {
    switch (action.type) {
        case types.RECEIVE_CARD_INFO:
            const objcontainer = action.cardInfo.reduce((obj,cardInfoItem)=>{
                obj[cardInfoItem.name] = cardInfoItem.value;
                return obj
            },{})
            return objcontainer
        case types.CHANGE_VALUE_BY_NAME:
            if(state[action.name.name]!=undefined)
                state[action.name.name] = action.name.value
            return state
        default:
            return state
    }
}

const obeyNegotiate = (state=false,action) => {
    switch (action.type) {
        case types.OBEY_NEGOTIATE:
            return action.bool
        default:
            return state
    }
}

export default combineReducers({
    byName,
    visibleNames,
    submitList,
    valid,
    obeyNegotiate
})