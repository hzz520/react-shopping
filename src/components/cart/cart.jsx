import React, {Component} from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import store from '../../Redux/Store/Store';
import {getProduct} from '../../Redux/Reducer/productsReducer'
import {addToCart,scrollTop} from '../../Redux/Action/IndexAction'
import {getTotal} from '../../Redux/Reducer/IndexReducer'



import ProductsList from './products'

import './index.scss'

class Index extends Component {
    constructor(){
        super();
    }
    componentDidMount(){
        document.title = 'Cart - Spectacles by Snap Inc.'
        $('html,body').animate({'scrollTop':store.getState().scrollStatus.get('scrollTop')},0)
    }
    toHome(){
        store.dispatch(scrollTop(store.getState().headerStyle.get('offsetTop')))
        this.props.router.push('/')
    }
    render(){
        return(
            this.props.cart.quantity?
                <div>
                    <section>
                        <div className="cart-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan="2">
                                            <h1>Your Cart</h1>
                                            <Link className="btn" to={{pathname:"/checkout",query:{"step":"first_step"}}}>checkout</Link>
                                        </th>
                                        <th> Price</th>
                                        <th>Quantity </th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <ProductsList/>
                                <tfoot>
                                    <tr>
                                        <td colSpan="2">Delivers in 1 – 2 weeks</td>
                                        <td colSpan="2">Subtotal</td>
                                        <td>${getTotal(store.getState())}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="cart-footer">
                                <div className="cart-footer-note">Limit 6 Spectacles per household. Available in the U.S. only. Requires Snapchat and a <a href="#">compatible device</a>.</div>
                                <div className="cart-footer-actions"><Link className="btn" onClick={()=>{this.props.router.push({pathname:'/checkout',query:{'step':'first_step'}})}}>Checkout</Link><Link className="btn" onClick={()=>{this.toHome()}}>Continue Shopping</Link></div>
                            </div> 
                        </div>
                    </section>
                    <aside>
                        <div className="extra-products-container">
                            <h1 className="extra-title">Extra Accessories</h1>
                            <div className="extra-products">
                                <div className="extra-product">
                                    <div className="img"></div>
                                    <h2 className="title">{getProduct(this.props.products,4).name}</h2>
                                    <a className="btn" onClick={()=>{store.dispatch(addToCart(4));$('html,body').animate({"scrollTop":0},0)}}>add to cart</a>
                                    <span className="price">${getProduct(this.props.products,4).price}</span>
                                </div>
                                <div className="extra-product">
                                    <div className="img"></div>
                                    <h2 className="title">{getProduct(this.props.products,5).name}</h2>
                                    <a className="btn" onClick={()=>{store.dispatch(addToCart(5));$('html,body').animate({"scrollTop":0},0)}}>add to cart</a>
                                    <span className="price">${getProduct(this.props.products,5).price}</span>
                                </div>
                            </div>
                        </div>
                    </aside>                
                </div>:
                <section className="emptycontent">
                    <div>
                        <h1>Your cart is empty!</h1>
                        <Link className="btn" onClick={()=>{this.toHome()}}>Continue Shopping</Link>
                    </div>
                </section>
        )
    }
}

const mapStateToProps = state => ({
    cart:state.cart,
    products:state.products,
    getProduct:getProduct
})


export default connect(mapStateToProps)(Index);