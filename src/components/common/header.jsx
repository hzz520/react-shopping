import React, {Component} from 'react';
import {Link} from 'react-router'
import classNames from 'classnames'
import {connect} from 'react-redux';
import store from '../../Redux/Store/Store';
import {scrollTop} from '../../Redux/Action/IndexAction'

import './header.scss'

class Header extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
       
    }
    scrollToCart(){
        let nextStep = this.props.TotalQuantity?'/cart':(this.props.pathname == '/cart'?'/':null)
        const offsetTop = store.getState().headerStyle.get('offsetTop')
       if(nextStep==null) 
            $('html,body').animate({'scrollTop':offsetTop},1000)
       else{
           if(nextStep=='/')
                store.dispatch(scrollTop(offsetTop));
           else
                store.dispatch(scrollTop(0))
           this.props.router.push(nextStep)
       }

    }
    render() {
        return (
            <div className={classNames({
                'header': true,
                'header-white': this.props.white,
                'header-tranparent': this.props.Opacity,
                'header-relative': this.props.pathname == '/checkout',
            })}>
                <div className='header-wrapper'>
                    <Link className={"globalheader-logo"} onClick={()=>{store.dispatch(scrollTop(0));this.props.router.push('/')}}>
                        <h1 className={"globalheader-title"} data-reactid="7">Spectacles</h1>
                    </Link>
                    <Link className={classNames({
                        buy: true,
                        cart:this.props.TotalQuantity,
                        active:this.props.pathname == '/checkout'
                    })} 
                    onClick={()=>{this.scrollToCart()}}>{
                        this.props.TotalQuantity?this.props.TotalQuantity:'Buy'
                    }</Link>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state =>({
    white:state.headerStyle.get('white'),
    relative:state.headerStyle.get('relative'),
    Opacity:state.headerStyle.get('Opacity'),
    scrolled:state.scrollStatus.get('scrolled'),
    offsetTop:state.headerStyle.get('offsetTop'),
    TotalQuantity:state.cart.quantity,
})

export default connect(mapStateToProps)(Header);
