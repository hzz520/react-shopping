/**
 * Index Components
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames'
import {connect} from 'react-redux';
import store from '../../Redux/Store/Store';
import Superagent from "superagent";
import {proxyUrl} from "../../public/public";
import {getProduct} from '../../Redux/Reducer/productsReducer'
import {ajaxGet,ajaxPost} from '../../public/public'
import {products} from '../../api/product.json'




import {
    headerStyleWhite,
    headerStyleOpacity,
    scrolledAction,
    offsetTops,
    headerCartStatus,
    addToCart,
    scrollTop,
    getAllProducts
} from '../../Redux/Action/IndexAction'




/*
 |--------------------------------------------------------------------------
 | dependencies components module
 |--------------------------------------------------------------------------
 */
import Slider from './slider';

/*
 |--------------------------------------------------------------------------
 | Index Component stylesheet
 |--------------------------------------------------------------------------
 |
 */
import './index.scss'
import ThumbImageV from './img/bfc97a68c023b1e8526607e2127f7f12.jpg'
import ThumbImageB from './img/a5cda99d912e4f6284d25739d92232cd.jpg'



/*
 |--------------------------------------------------------------------------
 | Index Component
 |--------------------------------------------------------------------------
 | define Index Component and export
 */
class Index extends Component {
    constructor() {
        super();
        this.state = {
            tab: [true, false, false, false, false],
            tab1:[false,true,false],
            tab1ActiveIndex:1,
        }
        this.handleResize = this.handleResize.bind(this)
    }
   
    

    componentDidMount() {
        
        // ajaxGet('http://rapapi.org/mockjsdata/17943/api/shangpinlist',{},(data)=>{
        //     store.dispatch(getAllProducts(data.products))
        // })
        
        // ajaxPost(url,JSON.stringify(data),(data)=>{
        //     console.log(JSON.stringify(data))
        // })
        // $.get('http://localhost:8087/set/user',(data)=>{
        //     console.log(data)
        // })
        // $.post('http://localhost:8087/music/getVideo',{uid:67378662,mid:10,page:1},(data)=>{
        //     console.log(data)
        // })
        // Superagent.get(window.location.protocol+'//'+window.location.host+'/api/set/user')
        //     .end((err,res)=>{
        //         console.log(res.text)
        //     })
        // Superagent.post(window.location.protocol+'//'+window.location.host+'/api/user/getIntroduceUser')
        //     .send({uid:67378662,page:1})
        //     .end((err,res)=>{
        //         console.log(JSON.parse(res.text))
        //     })

        store.dispatch(getAllProducts(products))
        document.title = 'Spectacles by Snap Inc.'
        const top = this.refs['section-shop'].offsetTop;
        const {dispatch} = this.props;
        dispatch(headerStyleWhite(true));
        dispatch(headerStyleOpacity(true));
        dispatch(offsetTops(top - 46))
        if(store.getState().scrollStatus.get('scrollTop')==0)
            $('html,body').animate({'scrollTop':store.getState().scrollStatus.get('scrollTop')},0)
        else
             $('html,body').animate({'scrollTop':store.getState().headerStyle.get('offsetTop')},0)
        window.addEventListener('scroll', this.handleScroll)
        window.addEventListener('resize',this.handleResize)
        // this.ajaxGetNum()
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(headerStyleWhite(false));
        dispatch(headerStyleOpacity(false));
        window.removeEventListener('scroll', this.handleScroll)
        window.removeEventListener('resize',this.handleResize)
    }

    //滚动事件
    handleScroll(e) {
        let pos = parseInt($(window).scrollTop());
        if (pos == 0) {
            store.dispatch(headerStyleOpacity(true));
            store.dispatch(scrolledAction(false));
        } else if (!store.getState().scrollStatus.scrolled) {
            store.dispatch(headerStyleOpacity(false));
            store.dispatch(scrolledAction(true));
        }
    }

    handleResize(){
        const top = this.refs['section-shop'].offsetTop;
        store.dispatch(offsetTops(top - 46))
    }

    ajaxGetNum() {
        Superagent
            .get(proxyUrl+'video/rl')
            .query('')
            .end(function (err, res) {
                let data = JSON.parse(res.text);
                console.log(data);
            });
    }

    tab(e, index) {
        let tab = this.state.tab;
        tab.forEach(function (el, idx, arr) {
            idx == index ? (el ? null : arr[idx] = !el) : (el ? arr[idx] = !el : null)
        })
        this.setState({
            tab: tab
        })
    }

    tab1(e, index) {
        let tab1 = this.state.tab1;
        let that = this
        tab1.forEach(function (el,idx,arr) {
            idx == index ? (el ? null : arr[idx] = !el) : (el ? arr[idx] = !el : null)     
            if(idx == index)
                that.setState({tab1ActiveIndex:idx})
        })
        this.setState({
            tab1:tab1
        })
    }
    addToCart(id){
        store.dispatch(addToCart(id));
        store.dispatch(scrollTop(0))
        // history.push('/cart')
        this.props.router.push('/cart')
    }

    render() {
        return (
            <div className="container">
                {/*-- Slider Component --*/}
                <Slider/>

                <div className="videoshow fullviewport">
                    <h2>just for<span> Snapchat</span></h2>
                    <div className="videoContainer">
                        <video poster={ThumbImageV} preload="auto" autoPlay="autoplay" loop="loop" muted="muted"
                               playsInline data-scroll-visble>
                            {/*<source src="http://gslb.miaopai.com/stream/jr9wemZsZgCNuqkhwqpVDA__.mp4"/>   */}
                            <source src={require('./video/hand.mp4')}/>
                            <source src={require('./video/hand.webm')}/>
                        </video>
                    </div>
                </div>
                <div className="tab fullviewport">
                    <div className="content">
                        <div className={classnames({active: this.state.tab[0]})}>
                            <div className="videobox active">
                                <video poster={ThumbImageV} preload="auto" autoPlay="autoplay" loop="loop" muted="muted"
                                       playsInline data-scroll-visble>
                                    {/*<source src="http://gslb.miaopai.com/stream/jr9wemZsZgCNuqkhwqpVDA__.mp4"/>*/}
                                    <source src={require('./video/hand.mp4')}/>
                                    <source src={require('./video/hand.webm')}/>
                                </video>
                            </div>
                        </div>
                        <div className={classnames({active: this.state.tab[1]})}></div>
                        <div className={classnames({active: this.state.tab[2]})}></div>
                        <div className={classnames({active: this.state.tab[3]})}></div>
                        <div className={classnames({active: this.state.tab[4]})}></div>
                    </div>
                    <div className="footer">
                        <ul>
                            <li className={classnames({active: this.state.tab[0]})} onClick={(e, index) => {
                                this.tab(e, 0)
                            }}>
                                <p>Specs make memories,from your perspective</p>
                            </li>
                            <li className={classnames({active: this.state.tab[1]})} onClick={(e, index) => {
                                this.tab(e, 1)
                            }}>
                                <p>Press the button to make 10-second Snap</p>
                            </li>
                            <li className={classnames({active: this.state.tab[2]})} onClick={(e, index) => {
                                this.tab(e, 2)
                            }}>
                                <p>Lights show friends you're Snapping</p>
                            </li>
                            <li className={classnames({active: this.state.tab[3]})} onClick={(e, index) => {
                                this.tab(e, 3)
                            }}>
                                <p>Wirelessly add your Snaps to Memories on Snapchat</p>
                            </li>
                            <li className={classnames({active: this.state.tab[4]})} onClick={(e, index) => {
                                this.tab(e, 4)
                            }}>
                                <p>Specs charge in their case</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="section-shop" ref='section-shop'>
                    <div className="shop-product">
                        <div className="product-container">
                            <div className="product-preview">
                                <div className={
                                    classnames({
                                        active: this.state.tab1[0]
                                    })
                                }></div>
                                <div className={
                                    classnames({
                                        active: this.state.tab1[1]
                                    })
                                }></div>
                                <div className={
                                    classnames({
                                        active: this.state.tab1[2]
                                    })
                                }></div>
                            </div>
                            <div className="product-info">
                                <div className="product-info-section">
                                    <div className="product-info-head">
                                        <div className="product-info-color">{this.props.visibleIds.length!=0?this.props.byId[this.state.tab1ActiveIndex+1].color:''}</div>
                                        <div className="product-info-money">${this.props.visibleIds!=0?this.props.byId[this.state.tab1ActiveIndex+1].price:''}</div>
                                    </div>
                                    <ul className="product-selector">
                                        <li className={
                                            classnames({
                                                active: this.state.tab1[0]
                                            })
                                        } onClick={(e, index) =>
                                            this.tab1(e, 0)
                                        }><span></span></li>
                                        <li className={
                                            classnames({
                                                active: this.state.tab1[1]
                                            })
                                        } onClick={(e, index) =>
                                            this.tab1(e, 1)
                                        }><span></span></li>
                                        <li className={
                                            classnames({
                                                active: this.state.tab1[2]
                                            })
                                        } onClick={(e, index) =>
                                            this.tab1(e, 2)
                                        }><span></span></li>
                                    </ul>
                                </div>
                                <div className="product-info-section">
                                    <Link className="btn"  onClick={(id)=>{this.addToCart(this.state.tab1ActiveIndex+1)}}>Add To Cart</Link>
                                    <div className="product-info-caption">
                                        <p>Delivers in<span>1-2 weeks</span></p>
                                        <p>Includes charging case and cable</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-store fullviewport">
                    <div className="bg">
                        <div className="sref">
                            <a href="#">701 Ocean Front Walk, Venice, CA 90291</a>
                            <span>11am–Sunset Daily</span>
                        </div>
                    </div>
                </div>
                <div className="section-bot fullviewport">
                    <video poster={ThumbImageB} preload="auto" autoPlay="autoplay" loop="loop" muted="muted" playsInline
                           data-scroll-visble>
                        {/*<source src="http://gslb.miaopai.com/stream/jr9wemZsZgCNuqkhwqpVDA__.mp4"/>*/}
                        <source src={require("./video/teaser.webm")}/>
                        <source src={require("./video/teaser.mp4")}/>
                    </video>
                    <a className="btn" href="#">Find A Bot</a>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    scrolled:state.scrollStatus.scrolled,
    byId:state.products.byId,
    visibleIds:state.products.visibleIds
})
export default connect(mapStateToProps)(Index);