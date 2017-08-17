import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../Redux/Store/Store';
import {addToCart,removeFromCart} from '../../Redux/Action/IndexAction'


class ProductItem extends Component {
    constructor(){
        super()
    }
    componentDidMount(){
        
    }

    render(){
        const byId = this.props.products.byId,productId = this.props.productId;
        const quantityById = this.props.cart.quantityById[this.props.productId];
        return (
            <tr>
                <th>
                    <img src={byId[productId].image}/>
                </th>
                <td>
                    <div className="title">
                        {byId[productId].name}
                        &nbsp;
                        {byId[productId].color?<span>({byId[productId].color})</span>:null}
                    </div>
                    <div className="desc">{byId[productId].description}</div>
                </td>
                <td>${byId[productId].price}</td>
                <td>
                    <span className="remove" onClick={()=>{store.dispatch(removeFromCart(productId))}}></span>
                    <span className="num">{quantityById}</span>
                    <span className="add" onClick={()=>{store.dispatch(addToCart(productId))}}></span>
                </td>
                <td>${(byId[productId].price*quantityById).toFixed(2)}</td>
            </tr>
        )
    }
}

class ProductsList extends Component {
    componentDidMount(){
        // console.log(this.props)
    }
    render(){
        return (
            <tbody>
                {
                    this.props.cart.addedIds.map(index => 
                        <ProductItem key={index} productId={index} cart = {this.props.cart} products={this.props.products} getProduct={this.props.getProduct}/>
                    )
                }
            </tbody>           
        )
    }
}

const mapStateToProps = state => ({
    cart:state.cart,
    products:state.products
})



export default connect(mapStateToProps)(ProductsList);