/**
 * Action（动作）实质上是包含 `type` 属性的普通对象
 * Action Creator 可以是同步的，也可以是异步的
 * Action Creator 是 action 的创造者，本质上就是一个函数，返回值是一个 action（对象）
 * @author  Darcy.X <darcyonw@163.com>
 */
import fetch from 'isomorphic-fetch'
import {
    proxyUrl,
    ajaxGet,
    ajaxPost,
    ajaxPut,
    ajaxDel
} from '../../public/public'

import * as types from '../ActionType/ActionTypes';
import shop from '../../api/shop'

//头部样式状态
export const headerStyleWhite = white => ({
    type: types.HEADER_STYLE_WHITE,
    white
});

//头部样式状态
export const headerStyleRelative = relative => ({
    type: types.HEADER_STYLE_RELATIVE,
    relative
});

//头部样式状态
export const headerStyleOpacity = Opacity => ({
    type: types.HEADER_STYLE_OPACITY,
    Opacity
});

//头部购物车物品数量
export const headerCartStatus = TotalQuantity => ({
    type:types.HEADER_CART_STATUS,
    TotalQuantity
});

//是否滚动状态
export const scrolledAction = scrolled => ({
    type: types.SCROLLED,
    scrolled,
});

//屏幕宽度变化时的屏幕宽度
export const screenWidthAction = effect => ({
    type:types.SCREEN_WIDTH,
    effect
});
//滚动到眼镜商品的距离
export const offsetTops = offsetTop => ({
    type: types.OFFSET_TOPS,
    offsetTop
});
export const scrollTop = scrollTop => ({
    type:types.SCROLL_TOP,
    scrollTop
})
const receiveProducts = products => ({
    type: types.RECEIVE_PRODUCTS,
    products: products
});

//获得所有商品信息
export const getAllProducts = (products) => (dispatch) => {
    shop.getProducts(() => {
        dispatch(receiveProducts(products))
    },products)
};

const addToCartUnsafe = productId => ({
    type: types.ADD_TO_CART,
    productId
});

//添加到购物车
export const addToCart = productId => (dispatch, getState) => {
    // if (getState().products.byId[productId].inventory > 0) {
        dispatch(addToCartUnsafe(productId))
    // }
};

const removeFromCartUnsafe = productId => ({
    type:types.REMOVE_FROM_CART,
    productId
});

//从购物车移除商品
export const removeFromCart = productId => (dispatch,getState) => {
    dispatch(removeFromCartUnsafe(productId))
};

const receiveShippingAddress = shippingAddress => ({
    type:types.RECEIVE_SHIPPING_ADDRESS,
    shippingAddress:shippingAddress
});

//获取邮递地址的表单信息项
export const getAllShippingAddress = () => dispatch => {
    shop.getShippingAddress(shippingAddress =>{
        dispatch(receiveShippingAddress(shippingAddress))
    })
};

const receiveEmailAddress = emailAddress => ({
    type:types.RECEIVE_EMAIL_ADDRESS,
    emailAddress:emailAddress
});

//获取邮箱表单信息项
export const getAllEmailAddress = () => dispatch => {
    shop.getEmailAddress(emailAddress=>{
        dispatch(receiveEmailAddress(emailAddress))
    })
};

const receiveBillingAddress = billingAddress => ({
    type:types.RECEIVE_BILLING_ADDRESS,
    billingAddress:billingAddress
})

//获取Billing表单信息项
export const getAllBillingAddress = () => dispatch => {
    shop.getBillingAddress(billingAddress=>{
        dispatch(receiveBillingAddress(billingAddress))
    })
}

const receiveCardInfoUnsafe = cardInfo => ({
    type:types.RECEIVE_CARD_INFO,
    cardInfo:cardInfo
});


//获取信用卡表单信息项
export const getAllCardInfo = () => dispatch => {
    shop.getCardInfo(cardInfo=>{
        dispatch(receiveCardInfoUnsafe(cardInfo))
    })
};


const changeValueByNameUnsafe = name => ({
    type:types.CHANGE_VALUE_BY_NAME,
    name
});

//input值改变
export const changeValueByName = name => dispatch => {
    dispatch(changeValueByNameUnsafe(name))
};



//是否使用邮递地址为bill地址
export const  resetShippingAddress = bool => ({
    type:types.RESET_SHIPPING_ADDRESS,
    bool
});

export const obeyNegotiate = bool => ({
    type:types.OBEY_NEGOTIATE,
    bool
});
















