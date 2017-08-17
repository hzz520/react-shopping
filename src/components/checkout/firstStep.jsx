import React, {Component} from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import store from '../../Redux/Store/Store'

import FormAddress from './formAddress'
import InputFiled from './inputFiled'
import './firstStep.scss'


class firstStep extends Component{
    componentDidMount(){
         $('html,body').animate({'scrollTop':store.getState().scrollStatus.get('scrollTop')},0)
    }
    render(){
        return (
            <div>
                <div className="section section-contact-information">
                    <div className="section-header">
                        <h2 className='section-title'>Email address</h2>
                    </div>
                    <div className="section-content">
                        <FormAddress shippingAddress={this.props.emailAddress} indicate='emailAddress'/>
                   </div>
                </div>
                <div className='section section-shipping-address paddTop'>
                    <div className="section-header">
                        <h2 className="section-title">Shipping address</h2>
                    </div>
                    <div className="section-content">  
                        <FormAddress shippingAddress={this.props.shippingAddress} indicate='shippingAddress'/>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    emailAddress:state.formData.emailAddress,
    shippingAddress:state.formData.shippingAddress
})


export default connect(mapStateToProps)(firstStep);