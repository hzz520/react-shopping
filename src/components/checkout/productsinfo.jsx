import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../Redux/Store/Store';



class ProductInfo extends Component{
    render(){
        const byId = this.props.products.byId,productId = this.props.productId;
        const quantityById = this.props.cart.quantityById[this.props.productId]
        return (
            <dl className='clearfix'>
                <dt>
                    <img src={byId[productId].image}/>
                </dt>
                <dd>
                    <div>
                        {byId[productId].name}
                        {byId[productId].color?<span>{byId[productId].color}</span>:null}
                    </div>
                    <div>{quantityById}</div>
                </dd>
                <dd>${(byId[productId].price*quantityById).toFixed(2)}</dd>
            </dl>
        )
    }
}
class ProductsInfoList extends Component{
    render(){
        return(
            <div className="products-info">
                {
                    this.props.cart.addedIds.map(index=>
                        <ProductInfo key={index} productId={index} cart = {this.props.cart} products={this.props.products}/>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cart:state.cart,
    products:state.products
})



export default connect(mapStateToProps)(ProductsInfoList);