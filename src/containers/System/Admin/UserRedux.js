import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './UserRedux.scss'

import * as actions from "../../../store/actions";

class UserRedux extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            genderArr: [],
            positionArr: [],
            roleIdArr: [],
            previewImageURL: '',
            isOpen: false,
        }
    }
    

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPostionStart();
        this.props.getRoleIdStart();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }

        if(prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }

        if(prevProps.roleIdRedux !== this.props.roleIdRedux) {
            this.setState({
                roleIdArr: this.props.roleIdRedux
            })
        }
    }

    handleChangeImage = (e) => {
        let file = e.target.files[0];
        if(file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageURL: objectUrl
            })
        }
    }

    openPreviewImage = () => {
        if(!this.state.previewImageURL) return;
        this.setState({
            isOpen: true
        })
    }

    render() {

        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        
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
                        {
                            isLoadingGender ? 'Loading...' : 
                            <React.Fragment>
                                <div className='col-12 text-center my-3 display-4'><FormattedMessage id="manage-user.add-new-user" /></div>
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

                                        <div className="form-group col-8 my-3">
                                            <label htmlFor="image"><FormattedMessage id="manage-user.image" /></label>
                                            <div className='preview-image-container'>
                                                <label className='label-upload' htmlFor='image'>Tải ảnh lên<i className='fas fa-upload'></i></label>
                                                <input 
                                                    type="file" 
                                                    id="image" 
                                                    hidden
                                                    onChange={(e) => this.handleChangeImage(e)}
                                                />
                                                <div 
                                                    className='preview-image' 
                                                    style={{backgroundImage: `url(${this.state.previewImageURL})`}}
                                                    onClick={() => this.openPreviewImage()}
                                                >

                                                </div>
                                            </div>
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
                            </React.Fragment>
                        }
                    </div>
                </div>
                {
                    this.state.isOpen &&

                    <Lightbox
                        mainSrc={this.state.previewImageURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoadingGender: state.admin.isLoadingGender,

        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleIdRedux: state.admin.roleIds,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPostionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleIdStart: () => dispatch(actions.fetchRoleIdStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
