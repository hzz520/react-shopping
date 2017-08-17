/**
 * Reducer
 * Reducer 必须是同步的纯函数
 * 用户每次 `dispatch(action)` 后，都会触发 `reducer`  的执行
 *
 * @author  Darcy.X <darcyonw@163.com>
 */

import {combineReducers}  from 'redux'
import headerStyle from './headerReducer'
import scrollStatus from './scrollStatusReducer'
import products,* as fromProducts  from './productsReducer'
import cart,* as fromCart from './cartReducer'
import formData from './formDataReducer'

/*const initialState = {
    white: false,
    Opacity: false,
    relative: false,
};*/

/**
 *
 * 根据 `action.type` 来更新 `state` 并返回 `nextState`
 * 最后会用 `reducer` 的返回值 `nextState` 完全替换掉原来的 `state`
 * 形式为 (state, action) => state
 *
 */
const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

export default combineReducers({
    headerStyle,
    scrollStatus,
    products,
    cart,
    formData
})

export const getTotal = state =>  
    getAddedIds(state)
        .reduce((total, id) =>
            total + getProduct(state, id).price * getQuantity(state, id),
          0
    )
    .toFixed(2);












