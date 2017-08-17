import React, {Component} from 'react';
import classnames from 'classnames'
import {Link} from 'react-router'
import {connect} from 'react-redux';
import store from '../../Redux/Store/Store'
import {getTotal} from '../../Redux/Reducer/IndexReducer'
import classNames from 'classnames'
import {getAllShippingAddress,getAllEmailAddress,getAllCardInfo,getAllBillingAddress,screenWidthAction} from '../../Redux/Action/IndexAction'

import FirstStep from './firstStep'
import SecondStep from './secondStep'
import LastStep from './lastStep'
import ProductsInfoList from './productsinfo'

import './index.scss'

class Index extends Component{
    constructor(){
        super();
    }

    expands(effect){
        store.dispatch(screenWidthAction({
            transition:true,
            expand:!this.props.effect.expand,
            screenWidth:window.innerWidth
        }))
    }
    
    resizeEvent(e){
        if(window.innerWidth > 999 && store.getState().scrollStatus.get('effect').transition == true){
            store.dispatch(screenWidthAction({
                transition:false,
                screenWidth:window.innerWidth,
                expand:store.getState().scrollStatus.get('effect').expand
            }))
        }else   
            store.dispatch(screenWidthAction({
                transition:false,
                screenWidth:window.innerWidth,
                expand:store.getState().scrollStatus.get('effect').expand
            }))
    }

    componentDidMount(){
        document.title = 'Checkout - Spectacles by Snap Inc.'
        store.dispatch(getAllEmailAddress())
        store.dispatch(getAllShippingAddress())
        store.dispatch(getAllCardInfo())
        store.dispatch(getAllBillingAddress())
        if(window.innerWidth<1000){
            store.dispatch(screenWidthAction({
                transition:true,
                expand:false,
                screenWidth:window.innerWidth
            }))
        }
        else
            store.dispatch(screenWidthAction({
                transition:false,
                expand:false,
                screenWidth:window.innerWidth
            }))
        window.addEventListener('resize',this.resizeEvent)
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.resizeEvent)
    }

    handleSubmit(e){
        let step=this.props.location.query.step;
        let nextStep = step == 'first_step'?'second_step':(step=='last_step'?'last_step':'last_step')
        let form = this.props.formData
        if(step=='first_step'&& !(this.props.formData.shippingAddress.valid&&this.props.formData.emailAddress.valid))
            return
        this.props.router.push('/checkout?step='+nextStep)
    }

    render(){
        let step = this.props.location.query.step,effect = this.props.effect
        let form = this.props.formData
        console.log(step)
        return(
            <div className='box'>
                <nav>
                    <ul>
                        <li className="active">My information</li>
                        <li className={classNames({active:step!='first_step'})}>Shipping method</li>
                        <li className={classNames({active:step=='last_step'})}>Payment method</li>
                    </ul>
                </nav>
                <button className={classnames({"order-summary-toggle":true,active:effect.expand})} onClick={(effect)=>{this.expands(effect)}}>
                    <div className="wrap">
                        <div>{effect.expand?'Hide':'Show'} order summary</div>
                        <span>${getTotal(store.getState())}</span>
                    </div>
                </button>
                <div className="content">
                    <div className="wrap clearfix">
                        <aside 
                            className={classnames({
                                active:effect.expand,
                                transition:effect.transition
                            })}
                            style = {{height:effect.expand||effect.screenWidth>999?(this.refs['order-summary'].offsetHeight)+'px':0}}
                        >
                            <div className="order-summary" ref='order-summary'>
                                <ProductsInfoList/>
                                <div className="products-subTotal clearfix">
                                    <div>
                                        <span>Subtotal</span>
                                        <span>${getTotal(store.getState())}</span>
                                    </div>
                                    <div>
                                        <span>Shipping & Handling</span>
                                        <span>-</span>
                                    </div>
                                    <div>
                                        <span>Taxes</span>
                                        <span>-</span>
                                    </div>
                                </div>
                                <div className="products-price-total clearfix">
                                    <span>Total</span>
                                    <span>${getTotal(store.getState())}</span>
                                </div>
                            </div>
                        </aside>
                        <main>
                            {step == 'first_step'?<FirstStep/>:(step == 'second_step'?<SecondStep/>:step == 'last_step'?<LastStep/>:null)}
                            <div className="section-footer">
                                <Link className={classNames({
                                    'btn':true,
                                    'btn-disable':step=='first_step'?!(form.shippingAddress.valid && form.emailAddress.valid):(step=='last_step'?!(form.cardInfo.valid && form.cardInfo.obeyNegotiate && (!form.shippingAddress.reset||form.billingAddress.valid)):null)
                                })} onClick={(e)=>{this.handleSubmit(e)}}>
                                    {step=='first_step'?'Continue to shipping method':(step=='last_step'?'Place order':'Continue to payment method')} 
                                </Link>
                                <Link className='back' to={step == 'first_step'?'/cart':{pathname:'/checkout',query:{'step':step=='last_step'?'second_step':'first_step'}}}>
                                    <svg className="previous-link__icon icon--chevron icon" xmlns="http://www.w3.org/2000/svg" width="6.7" height="11.3" viewBox="0 0 6.7 11.3">
                                        <path d="M6.7 1.1l-1-1.1-4.6 4.6-1.1 1.1 1.1 1 4.6 4.6 1-1-4.6-4.6z"></path>
                                    </svg>
                                    &nbsp;Return to {step == 'first_step'?'cart':(step=='last_step'?'shipping method':'my information')}
                                </Link>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    effect:state.scrollStatus.get('effect'),
    formData:state.formData
})

export default connect(mapStateToProps)(Index);

