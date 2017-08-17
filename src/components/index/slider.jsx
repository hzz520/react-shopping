/**
 * Slider Component
 * @author Darcy <darcyonw@163.com>
 */

import React, {Component} from 'react';
import {proxyUrl, ajaxGet,isPc} from '../../public/public'
/*
 |--------------------------------------------------------------------------
 | public stylesheet
 |--------------------------------------------------------------------------
 |
 */
import './slider.scss';

const slideInterface = '';

class Slider extends Component {
    constructor() {
        super();
        this.state = {
            duration: 800,
            delay: 2000,
            moving: false,
            offset: 0,
            slideCount: 5,
            slideIndex: 1,
        }
    }

    componentDidMount() {
        let that = this;
        let root = this.refs['swiper-container'];

        $(root).find('.swiper-wrapper').append(
            $(root).find('.swiper-slide').eq(0).clone().css('z-index','1')
        ).prepend(
            $(root).find('.swiper-slide:nth-last-of-type(2)').clone()
        );

        this.pos(that.state.duration);

        this.autoLoop()
    }

    componentWillUnmount() {
        this.stopAutoLoop()
    }

    //get slide images
    getSlides() {
        const This = this;
        ajaxGet(slideInterface, {}, function (data) {
            This.setState({
                contentsData: data.data
            });
        })
    }

    //上一张
    previousImage() {
        let root = this.refs['swiper-container'], that = this;
        let slideIndex = this.state.slideIndex == 0 ? this.state.slideCount - 1 : this.state.slideIndex - 1
        this.setState({slideIndex: slideIndex}, (t) => {
            that.pos(that.state.duration)
        });
        setTimeout(function () {
            if (that.state.slideIndex == 0) {
                that.setState({slideIndex: that.state.slideCount}, (t, d) => {
                    that.pos(0)
                })
            }
        }, that.state.duration);
    }

    //下一张
    nextImage() {
        if(isPc()){
            if (!localStorage.getItem('t'))
                localStorage.setItem('t', +new Date());
            if (localStorage.getItem('t') && +new Date() - localStorage.getItem('t') < this.state.duration) {
                localStorage.setItem('t', +new Date());
                return
            } else {
                localStorage.setItem('t', +new Date())
            }
        }
        let root = this.refs['swiper-container'], that = this;
        let slideIndex = this.state.slideIndex + 1;
        this.setState({slideIndex: slideIndex}, (t) => {
            that.pos(that.state.duration);
        });
        setTimeout(function () {
            if (that.state.slideIndex == that.state.slideCount + 1) {
                that.setState({slideIndex: 1}, (t, d) => {
                    that.pos(0)
                })
            }
        }, that.state.duration);
    }


    //设置每个滑块的位置
    pos(dur, delay) {
        let that = this;
        root.querySelectorAll('.swiper-slide').forEach(function (el, index, arr) {
            $(el).animate({'left':that.state.moving?(index - that.state.slideIndex)*window.innerWidth + that.state.offset:(index - that.state.slideIndex) + '00vw'},dur)
        })
    }

    autoLoop() {
        let that = this;
        let loopTime = that.state.delay + that.state.duration;
        this.timer = setInterval(
            () => {
                that.nextImage()
            }, loopTime);
    }

    stopAutoLoop() {
        let that = this
        clearInterval(that.timer)
    }

    scrollToTop() {
        let that = this;
        $('html,body').animate({'scrollTop': that.refs['swiper-container'].offsetHeight - 46}, 1000)
    }

    touchStart(e){
        if(!isPc()){
            let touch = e.nativeEvent.targetTouches[0]
            this.setState({
                startX:touch.pageX,
                startY:touch.pageY,
                moving:true
            },()=>{this.stopAutoLoop()})
        }   
    }
    touchMove(e){
        if(!isPc()){
            let touch = e.nativeEvent.targetTouches[0]
            if((touch.pageY-this.state.startY)/(touch.pageX-this.state.startX)>0.15||(touch.pageY-this.state.startY)/(touch.pageX-this.state.startX)<-0.15)
                return
            this.setState({
                endX:touch.pageX,
                offset:touch.pageX-this.state.startX
            },()=>{this.pos(0)})
        }
    }
    touchEnd(e){
        if(!isPc()){
            this.setState({
                moving:false,
                offset:0
            },()=>{
                let n = (this.state.endX-this.state.startX)/window.innerWidth
                if(n > 0.2)
                    this.previousImage()
                else if(n < -0.2)
                    this.nextImage()
                else if(n > 0){
                    this.pos(this.state.duration)
                }else{
                   this.pos(this.state.duration)
                }
                this.autoLoop() 
                
            })
        }
    }

    render() {
        return (
            <div className="fullviewport swiper-container" ref='swiper-container' onMouseOver={() => {
                this.stopAutoLoop()
            }} onMouseOut={() => {
                this.autoLoop()
            }}  onTouchStart={(e)=>{
                this.touchStart(e)
            }}  onTouchMove={(e)=>{
                this.touchMove(e)
            }}  onTouchEnd={(e)=>{
                this.touchEnd(e)
            }}
            >
               {
                   isPc()?
                    <a className="arrow-left" href="#" onClick={() => {
                        this.previousImage()
                    }}><span></span></a>
                    :null
                }
                {   isPc()?
                    <a className="arrow-right" href="#" onClick={() => {
                        this.nextImage()
                    }}><span></span></a>
                    :null
                }
                <div className="swiper-wrapper" ref='swiper-wrapper'>
                    <div className="swiper-slide swiper-slide1"><span></span></div>
                    <div className="swiper-slide swiper-slide2"><span></span></div>
                    <div className="swiper-slide swiper-slide3"><span></span></div>
                    <div className="swiper-slide swiper-slide4"><span></span></div>
                    <div className="swiper-slide swiper-slide5"><span></span></div>
                </div>
                <img className="toTop" src={require("./img/toTop.svg")} onClick={() => {
                    this.scrollToTop()
                }}/>
                {
                    isPc() ? (
                        <div className="logo">
                            <div>snap to try on</div>
                            <img src={require("./img/252f8f6aa58bac049579c9284f99b90e.svg")}/>
                        </div>
                    ) : null
                }
            </div>
        )
    }
}
;

export default Slider;
