import './footer.scss'

import React, {Component} from 'react';

export default class Footer extends Component {
    constructor(){
        super();
    }

    render(){
        return (
            <footer>
                <div className="footer-top">
                    <a href="#">Accessories</a>
                    <a href="#">Product Support</a>
                    <a href="#">Compatibility</a>
                    <a href="#">Business Inquiries</a>
                </div>
                <div className="footer-bottom">
                    <a href="#">Product Sales Terms</a>
                    <a href="#">Return Policy</a>
                    <a href="#">Snap Inc.</a>
                    <a href="#">Snap Inc. Terms of Service</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Download&nbsp;Snapchat</a>
                </div>
            </footer>
        )
    }
}