import React, {Component} from 'react'
import {Link} from 'react-router'
import FormAddress from './formAddress'
import InputFiled from './inputFiled'
import classNames from 'classnames'
import {connect} from 'react-redux'
import store from '../../Redux/Store/Store'
import {resetShippingAddress,obeyNegotiate} from '../../Redux/Action/IndexAction'
import './lastStep.scss'


class lastStep extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        store.dispatch(resetShippingAddress(false))
        $('html,body').animate({'scrollTop':store.getState().scrollStatus.get('scrollTop')},0)
    }
    handlerClick(){
        if(this.refs.promo.state.val == '')
            return
        //提交优惠码
    }
    render(){
        return (
            <div>
                <div className="section section-reduction">
                    <div className="section-content">
                        <div className="filed-set">
                            <InputFiled ref='promo' filedRequired={false} placeholder='Promo code' btn='true' btnTitle='apply' wrapper='wrapper' handlerClick={()=>{this.handlerClick()}}/>
                        </div>
                    </div>
                </div>
                <div className="section section-payment-method">
                    <div className="section-header">
                        <h2 className='section-title'>Payment method</h2>
                        <p className='section-text'>All transactions are encrypted.</p>
                    </div>
                    <div className="section-content">
                        <div className="content-box">
                            <div className="content-box-row radio-label-wrapper">
                                <label htmlFor="" className='radio-label'>
                                    <div className="radio-label-title">Credit card</div>  
                                    <ul className="radio-label-acess">
                                        <li className="payment-icon"></li>
                                        <li className="payment-icon"></li>
                                        <li className="payment-icon"></li>
                                        <li className="payment-icon"></li>
                                    </ul>
                                </label>
                            </div>
                            <div className="content-box-row">
                                <FormAddress nocache='true' shippingAddress={store.getState().formData.cardInfo} indicate='cardInfo'/>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="section section--billing-address">
                    <div className="section-header">
                        <h2 className='section-title'>Billing address</h2>
                    </div>
                    <div className="section-content">
                        <div className="content-box">
                            <div className="content-box-row" onClick={(e)=>{store.dispatch(resetShippingAddress(false));}}>
                                <div className="content-box-row-wrap">
                                    <div className="radio-box">
                                        <input className='radio' type="radio" name='checkout[different-address]' onChange={()=>{}} checked={!this.props.reset}/>
                                    </div>
                                    <label>
                                        Same as shipping address
                                    </label>
                                </div>
                            </div>
                            <div className="content-box-row" onClick={()=>{store.dispatch(resetShippingAddress(true))}}>
                                <div className="content-box-row-wrap">
                                    <div className="radio-box">
                                        <input className='radio' type="radio" name='checkout[different-address]' onChange={()=>{}} checked={this.props.reset}/>
                                    </div>
                                    <label htmlFor="">
                                        Use a different billing address
                                    </label>
                                </div>
                            </div>
                            <div className={classNames({
                                "content-box-row":true,
                                'active':this.props.reset
                            })}>
                                <div className='section section-shipping-address'>
                                    <div className="section-header hidden">
                                        <h2 className="section-title">Shipping address</h2>
                                    </div>
                                    <div className="section-content">  
                                         <div className='section section-shipping-address'>
                                            <div className="section-header hidden">
                                                <h2 className="section-title">Shipping address</h2>
                                            </div>
                                            <div className="section-content">  
                                                <FormAddress nocache={true} shippingAddress={store.getState().formData.billingAddress} indicate='billingAddress'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sc-terms">
                     <div className="checkbox-wrapper">
                         <input type="checkbox" checked={this.props.obeyNegotiate}  onChange={()=>{store.dispatch(obeyNegotiate(!this.props.obeyNegotiate))}}/>
                     </div>
                     <p>
                         I agree to the Snap Inc. <a href="#" target='_blank'>Privacy Policy</a>,<a href="#" target='_blank'>Terms of Service</a>, and the <a href="#" target='_blank'>Product Sales Terms</a>
                        . My card will be charged when I click “Place Order.”
                     </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    reset:state.formData.shippingAddress.reset,
    obeyNegotiate:state.formData.cardInfo.obeyNegotiate
})

export default connect(mapStateToProps)(lastStep);