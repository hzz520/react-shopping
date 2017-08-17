import React, {Component} from 'react';
import classNames from 'classnames'
import store from '../../Redux/Store/Store';
import {changeValueByName,changeResetValueByName} from '../../Redux/Action/IndexAction'

export default class InputFiled extends Component{
    constructor(){
        super();
        this.state ={
            filedRequired:true,
            inputType:'text',
            btnTitle:'click',
            wrapper:false,
            val:'',
            warning:false,
            warningWords:'content'
        }
    }
    hanlderChange(e){
        let newValue = e.target.value;
        if(this.props.maxlength&&newValue.length>=this.props.maxlength)
            newValue = newValue.slice(0,this.props.maxlength)
        let warning = !(this.props.pattern!=undefined?new RegExp(this.props.pattern).test(newValue):true)
        if(this.props.filedRequired!=false&&this.props.pattern==undefined)
            warning=newValue==''?true:false
          
        this.setState({
            val:newValue,
            warning:warning
        },()=>{    
            store.dispatch(changeValueByName({name:this.props.name,value:newValue,warning:warning,store:this.props.indicate}))          
        })
        
    }
    componentDidMount(){
        this.setState({
            val:this.props.value||'',
            warning:this.props.warning||false
        })
    }
    componentWillUnMount(){
        this.props.nocache?store.dispatch(changeValueByName({name:this.props.name,value:'',warning:false,store:this.props.indicate})):null
    }
    render(){
        return (
            <div ref={this.props.name} className={classNames({
                "filed":true,
                "filed-required":this.props.filedRequired==false?this.props.filedRequired:this.state.filedRequired,
                "filed-optional":this.props.filedRequired==false?!this.props.filedRequired:false,
                "filed-half":this.props.filedType == "filed-half",
                "filed-two-thirds":this.props.filedType == "filed-two-thirds",
                "filed-one-thirds":this.props.filedType == "filed-one-thirds",
                "filed-three-eights":this.props.filedType == "filed-three-eights",
                "filed-quarter":this.props.filedType == "filed-quarter",
                "filed-show-floating-label":this.state.val!='',
                'filed-warning':this.state.warning
            })}>
                <div className="filed-wrap">
                    <div className={classNames({'wrapper':this.props.wrapper})}>
                        <label className='filed-label'>{this.props.placeholder}</label>
                        <input  className='filed-input' 
                                type={this.props.inputType||this.state.inputType} 
                                name={this.props.name} 
                                placeholder={this.props.placeholder} 
                                onChange={(e)=>{this.hanlderChange(e)}} 
                                value={this.state.val}
                                pattern={this.props.pattern||''}
                                maxLength = {this.props.maxlength||null}
                        />
                    </div>
                    {
                        this.props.filedIcon?<span className={classNames({
                            'filed-icon':true,
                            'filed-icon-lock':this.props.filedIconType=='filed-icon-lock',
                            'filed-icon-question':this.props.filedIconType=='filed-icon-question'
                            })}></span>
                        :null
                    }
                    {
                        this.props.btn?<span className={classNames({'btn':true,'btn-disable':this.state.val==''})} onClick={()=>{this.props.handlerClick()}}><i>{this.props.btnTitle||this.state.btnTitle}</i></span>:null
                    }
                </div>
                {this.props.filedRequired==false?this.props.filedRequired:this.state.filedRequired&&this.state.warning?<p>Please enter valid {this.props.warningWords||this.state.warningWords}</p>:null}
            </div>
        )
    }
}