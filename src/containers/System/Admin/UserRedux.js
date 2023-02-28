import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';

import { userService } from '../../../services';
import * as actions from "../../../store/actions";

class UserRedux extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            genderArr: [],
            positionArr: [],
            roleIdArr: []
        }
    }
    

    async componentDidMount() {
        this.props.getGenderStart();
        // try {
        //     let res = await userService.getAllCodeService('gender');
        //     if(res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         })
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
    }


    render() {

        let language = this.props.language;
        let genders = this.state.genderArr;   
        let positions = this.state.positionArr;   
        let roleIds = this.state.roleIdArr;   

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Tien Basic
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='col-12 text-center my-3 display-6'><FormattedMessage id="manage-user.add-new-user" /></div>
                        <div className='row'>
                        <form className='col-12'>
                            <div className="row mb-3">
                                <div className="form-group col-6">
                                    <label htmlFor="inputEmail4"><FormattedMessage id="manage-user.email" /></label>
                                    <input type="email" className="form-control" id="inputEmail4" />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="inputPassword4"><FormattedMessage id="manage-user.password" /></label>
                                    <input type="password" className="form-control" id="inputPassword4" />
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <div className="form-group col-6 mb-3">
                                    <label htmlFor="firstName"><FormattedMessage id="manage-user.first-name" /></label>
                                    <input type="text" className="form-control" id="firstName" placeholder="..." />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="lastName"><FormattedMessage id="manage-user.last-name" /></label>
                                    <input type="text" className="form-control" id="lastName" placeholder="..." />
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <div className="form-group col-9">
                                    <label htmlFor="inputAddress"><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="Address..." />
                                </div>
                                
                                <div className="form-group col-3">
                                    <label htmlFor="phonenumber"><FormattedMessage id="manage-user.phonenumber" /></label>
                                    <input type="text" className="form-control" id="phonenumber" placeholder="" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-4">
                                    <label><FormattedMessage id="manage-user.gender" /></label>
                                    <select className="form-control">
                                        {
                                            genders && genders.length > 0 &&
                                            genders.map((gender, index) => {
                                                return (
                                                    <option key={index}>{language === LANGUAGES.VI ? gender.valueVi : gender.valueEn}</option>
                                                )
                                            })
                                        }                        
                                    </select>
                                </div>

                                <div className="form-group col-4">
                                    <label htmlFor="inputState"><FormattedMessage id="manage-user.position" /></label>
                                    <select className="form-control">
                                        {
                                            positions && positions.length > 0 &&
                                            positions.map((position, index) => {
                                                return (
                                                    <option key={index}>{language === LANGUAGES.VI ? position.valueVi : position.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="form-group col-4">
                                    <label htmlFor="inputState"><FormattedMessage id="manage-user.roleId" /></label>
                                    <select className="form-control">
                                    {
                                            roleIds && roleIds.length > 0 &&
                                            roleIds.map((roleId, index) => {
                                                return (
                                                    <option key={index}>{language === LANGUAGES.VI ? roleId.valueVi : roleId.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="form-group col-3 my-3">
                                    <label htmlFor="image"><FormattedMessage id="manage-user.image" /></label>
                                    <input type="text" className="form-control" id="image" placeholder="" />
                                </div>
                                
                            </div>
                            <div className="form-group mb-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        <FormattedMessage id="manage-user.check-me-out" />
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                <FormattedMessage id="manage-user.sign-in" />
                            </button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
