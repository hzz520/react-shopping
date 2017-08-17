import React, {Component} from 'react';
import {Link} from 'react-router'
import store from '../../Redux/Store/Store'
import './secondStep.scss'

export default class secondStep extends Component{
    componentDidMount(){
         $('html,body').animate({'scrollTop':store.getState().scrollStatus.get('scrollTop')},0)
    }
    render(){
        let shipping = store.getState().formData.shippingAddress.submitList,
            email = store.getState().formData.emailAddress.submitList
        return (
            <div>
                <div className="section section-shipping-recp">
                    <div className='section-header'>
                        <h2 className="section-title">Shipping address</h2>
                    </div>
                    <p>
                        {shipping.LastName} {shipping.FirstName}
                        <br/>{shipping['Company_Optional']}{shipping['Company_Optional']!=''?<br/>:null}
                        {shipping.Address}
                        <br/>{shipping['Apt_Optional']}{shipping['Apt_Optional']!=''?<br/>:null}
                        {shipping.City} {shipping.State} {shipping.ZIP}
                        <br/>{shipping.Country}
                        <br/>{shipping.Phone}
                        <br/>{email.Email}
                        <Link to={{pathname:'/checkout',query:{'step':'first_step'}}}>Edit</Link>
                    </p>
                </div> 
                <div className="section section-shipping-method">
                    <div className='section-header'>
                        <h2 className="section-title">Shipping method</h2>
                    </div>
                    <div className="section-content">
                        <div className="content-box">
                            <div className="content-box-row">
                                <div className="content-box-row-wrap">
                                    <div className="radio-box">
                                        <input className='radio' type="radio" defaultChecked='checked' />
                                    </div>
                                    <label htmlFor="">
                                        <span>Standard shipping & handling</span>
                                        <span>$5.99</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="sc-delivery">
                            Delivers Apr 18 – Apr 25
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
}