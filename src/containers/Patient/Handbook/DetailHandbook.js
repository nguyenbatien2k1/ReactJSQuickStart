import React, { Component } from 'react';
import { connect } from "react-redux";

import './DetailHandbook.scss';
import {FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { userService } from '../../../services';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';
import HomeHeader from '../../HomePage/HomeHeader';

class DetailHandbook extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            detailHandbook: {},
        }
    }

    async componentDidMount() {
        let {handbookId} = this.props.match.params
        let res = await userService.getDetailHandbookById(handbookId);
        this.setState({
            detailHandbook: res.data
        })
    }
  
   
    async componentDidUpdate(prevProps, prevState, snapshot) {
       if(prevProps.language !== this.props.language) {

       }

   
    }


    render() {

        let {detailHandbook} = this.state

        return (
            <>
                <HomeHeader />
                <div className='detail-handbook-container'>
                    <div className='container'>
                        {
                            detailHandbook && !_.isEmpty(detailHandbook) && detailHandbook.contentHTML &&
                            <p dangerouslySetInnerHTML={{__html: detailHandbook.contentHTML}}></p>
                        }
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailHandbook));
