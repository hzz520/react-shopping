import React, {Component} from 'react';
import classNames from 'classnames'
import InputFiled from './inputFiled'

export default class fromAddress extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        
    }
    render(){
        let shippingAddress = this.props.shippingAddress
        return (
            <div className="filed-set">
                {shippingAddress.visibleNames.map(el=><InputFiled key={this.props.indicate+shippingAddress.byName[el].name}  {...shippingAddress.byName[el]} nocache={this.props.nocache||false} value={this.props.nocache?"":shippingAddress.byName[el].value} indicate={this.props.indicate}/>)} 
            </div>      
        )   
    }
}



