import * as types from '../ActionType/ActionTypes';
import {combineReducers} from 'redux'
import store from '../../Redux/Store/Store';

const initialState = {
    addedIds: [],
    quantityById: {},
    quantity: 0
}

const addedIds = (state = initialState.addedIds, action) => {
    switch (action.type) {
        case types.ADD_TO_CART:
            if (state.indexOf(action.productId) !== -1) {
                return state
            }
            return [...state, action.productId];
        case types.REMOVE_FROM_CART:
            if (store.getState().cart.quantityById[action.productId] == 1)
                state.splice(state.indexOf(action.productId), 1);
            return state;
        default:
            return state;
    }
};

const quantityById = (state = initialState.quantityById, action) => {
    const {productId} = action;
    switch (action.type) {
        case types.ADD_TO_CART:
            state[productId] = (state[productId] || 0) + 1;
            return state;
        case types.REMOVE_FROM_CART:
            state[productId] = state[productId] - 1;
            if (state[productId] == 0)
                delete state[productId];
            return state;
        default:
            return state;
    }
};

const quantity = (state = innitialState.quantity, action) => {
    switch (action.type) {
        case types.ADD_TO_CART:
            return state + 1;
        case types.REMOVE_FROM_CART:
            return state - 1;
        default:
            return state;
    }
};

export const getQuantity = (state, productId) => state.quantityById[productId] || 0;

export const getAddedIds = state => state.addedIds;

const cart = (state = initialState, action) => {
    switch (action.type) {
        case types.CHECKOUT_REQUEST:
            return initialState;
        case types.CHECKOUT_FAILURE:
            return action.cart;
        default:
            return {
                addedIds: addedIds(state.addedIds, action),
                quantityById: quantityById(state.quantityById, action),
                quantity: quantity(state.quantity, action)
            }
    }
};

export default cart

