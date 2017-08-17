import Immutable from 'immutable';
import * as types from '../ActionType/ActionTypes';

const initialState = Immutable.fromJS({
    white: false,
    Opacity: false,
    relative: false,
    offsetTop:0,
}); //=Immutable.Map({})

const headerStyle = (state = initialState, action) => {
    switch (action.type) {
        case types.HEADER_STYLE_WHITE:
            return state.set('white',action.white);
            /*return Object.assign({}, state, {
                white: action.white
            });*/
        case types.HEADER_STYLE_RELATIVE:
            return state.set('relative',action.relative);
        case types.HEADER_STYLE_OPACITY:
            return state.set('Opacity',action.Opacity);
        case types.OFFSET_TOPS:
            return state.set('offsetTop',action.offsetTop)
        default:
            return state
    }
};
export default headerStyle