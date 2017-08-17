import * as types from '../ActionType/ActionTypes';
import Immutable from 'immutable';

const initState = Immutable.fromJS({
    scrolled: false,
    scrollTop: 0,
    effect: {
        expand: false,
        transition: false,
        screenWidth: null
    }
});

const scrollStatus = (state = initState, action) => {
    switch (action.type) {
        case types.SCROLLED:
            return state.set('scrolled', action.scrolled);
        case types.SCROLL_TOP:
            return state.set('scrollTop', action.scrollTop);
        case types.SCREEN_WIDTH:
            return state.set('effect', {
                'expand': action.effect.expand,
                'transition': action.effect.transition,
                'screenWidth': action.effect.screenWidth
            });
        default:
            return state
    }
};

export default scrollStatus;