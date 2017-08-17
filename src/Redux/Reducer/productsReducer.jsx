import * as types from '../ActionType/ActionTypes';
import {combineReducers} from 'redux'

const byId = (state ={}, action) => {
  switch (action.type) {
    case types.RECEIVE_PRODUCTS:
        const objcontainer = action.products.reduce((obj, product) => {
                 obj[product.id] = product
                    return obj
              }, {})
        return objcontainer
            
    default:
        return state
  }
}
const visibleIds = (state=[],action) => {
    switch (action.type) {
         case types.RECEIVE_PRODUCTS:
            return action.products.map(product => product.id)
        default:
            return state
    }
}

export default combineReducers({
    byId,
    visibleIds
})

export const getProduct = (state, id) =>
  state.byId[id]

export const getVisibleProducts = state =>
  state.visibleIds.map(id => getProduct(state, id))