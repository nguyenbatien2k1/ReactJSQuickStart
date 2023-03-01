import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './UserRedux.scss'

import * as actions from "../../../store/actions";
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            genderArr: [],
            positionArr: [],
            roleIdArr: [],
            previewImageURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            position: '',
            roleId: '',
            image: ''

        }
    }
    

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPostionStart();
        this.props.getRoleIdStart();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux) {
            let genders = this.props.genderRedux;
            this.setState({
                genderArr: this.props.genderRedux,
                gender: genders && genders.length > 0 ? genders[0].key : ''
            })
        }

        if(prevProps.positionRedux !== this.props.positionRedux) {
            let positions = this.props.positionRedux;
            this.setState({
                positionArr: this.props.positionRedux,
                position: positions && positions.length > 0 ? positions[0].key : ''
            })
        }

        if(prevProps.roleIdRedux !== this.props.roleIdRedux) {
            let roleIds = this.props.roleIdRedux;
            this.setState({
                roleIdArr: this.props.roleIdRedux,
                roleId: roleIds && roleIds.length > 0 ? roleIds[0].key : ''
            })
        }

        if(prevProps.usersRedux !== this.props.usersRedux) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: '',
                position: '',
                roleId: '',
                image: ''
            })
        }
    }

    handleChangeImage = (e) => {
        let file = e.target.files[0];
        if(file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageURL: objectUrl,
                image: file
            })
        }
    }

    openPreviewImage = () => {
        if(!this.state.previewImageURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleChangeInput = (e, id) => {
        let copyState = {...this.state}
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    handleSignin = () => {
        if(this.checkValidateInput()) {
            // fire action redux
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                image: this.state.image,
                roleId: this.state.roleId,
                positionId: this.state.position,
            })
        }
        else return;
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber'];

        for(let i = 0; i < arrCheck.length; i++) {
            if(!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing input ' + arrCheck[i] + ' !');
                break;
            }
        }

        return isValid;
    }

    render() {

        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        
        let genders = this.state.genderArr;   
        let positions = this.state.positionArr;   
        let roleIds = this.state.roleIdArr;   

        let {email, password, firstName, lastName, address, phonenumber, gender, position, roleId, image} = this.state;

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Tien Basic
                </div>
                <div className='user-redux-body'>
                    <div className='container my-4'>
                        {
                            isLoadingGender ? 'Loading...' : 
                            <React.Fragment>
                                <div className='col-12 text-center my-3 display-4'><FormattedMessage id="manage-user.add-new-user" /></div>
                                <div className='row'>
                                <form className='col-12'>
                                    <div className="row mb-3">
                                        <div className="form-group col-6">
                                            <label htmlFor="inputEmail4"><FormattedMessage id="manage-user.email" /></label>
                                            <input
                                                required 
                                                type="email" 
                                                className="form-control" 
                                                id="inputEmail4" 
                                                value={email}
                                                onChange={(e) => this.handleChangeInput(e, 'email')}/>
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="inputPassword4"><FormattedMessage id="manage-user.password" /></label>
                                            <input 
                                                required
                                                type="password" className="form-control" id="inputPassword4"
                                                value={password}
                                                onChange={(e) => this.handleChangeInput(e, 'password')}/>
                                        </div>
                                    </div>

                                    <div className='row mb-3'>
                                        <div className="form-group col-6 mb-3">
                                            <label htmlFor="firstName"><FormattedMessage id="manage-user.first-name" /></label>
                                            <input type="text" className="form-control" id="firstName" placeholder="..."
                                                    value={firstName}                                               
                                                   onChange={(e) => this.handleChangeInput(e, 'firstName')} />
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="lastName"><FormattedMessage id="manage-user.last-name" /></label>
                                            <input type="text" className="form-control" id="lastName" placeholder="..." 
                                                    value={lastName}
                                                    onChange={(e) => this.handleChangeInput(e, 'lastName')}/>
                                        </div>
                                    </div>

                                    <div className='row mb-3'>
                                        <div className="form-group col-9">
                                            <label htmlFor="inputAddress"><FormattedMessage id="manage-user.address" /></label>
                                            <input type="text" className="form-control" id="inputAddress" placeholder="Address..." 
                                                value={address}                                             
                                                onChange={(e) => this.handleChangeInput(e, 'address')}/>
                                        </div>
                                        
                                        <div className="form-group col-3">
                                            <label htmlFor="phonenumber"><FormattedMessage id="manage-user.phonenumber" /></label>
                                            <input type="text" className="form-control" id="phonenumber" placeholder="" 
                                                value={phonenumber}
                                                onChange={(e) => this.handleChangeInput(e, 'phonenumber')}/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-4">
                                            <label><FormattedMessage id="manage-user.gender" /></label>
                                            <select className="form-control" onChange={(e) => this.handleChangeInput(e, 'gender')}>
                                                {
                                                    genders && genders.length > 0 &&
                                                    genders.map((gender, index) => {
                                                        return (
                                                            <option key={index} value={gender.key}>{language === LANGUAGES.VI ? gender.valueVi : gender.valueEn}</option>
                                                        )
                                                    })
                                                }                        
                                            </select>
                                        </div>

                                        <div className="form-group col-4">
                                            <label htmlFor="inputState"><FormattedMessage id="manage-user.position" /></label>
                                            <select className="form-control" onChange={(e) => this.handleChangeInput(e, 'position')}>
                                                {
                                                    positions && positions.length > 0 &&
                                                    positions.map((position, index) => {
                                                        return (
                                                            <option key={index} value={position.key}>{language === LANGUAGES.VI ? position.valueVi : position.valueEn}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="form-group col-4">
                                            <label htmlFor="inputState"><FormattedMessage id="manage-user.roleId" /></label>
                                            <select className="form-control" onChange={(e) => this.handleChangeInput(e, 'roleId')}>
                                            {
                                                    roleIds && roleIds.length > 0 &&
                                                    roleIds.map((roleId, index) => {
                                                        return (
                                                            <option key={index} value={roleId.key}>{language === LANGUAGES.VI ? roleId.valueVi : roleId.valueEn}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="form-group col-8 my-3">
                                            <label htmlFor="image"><FormattedMessage id="manage-user.image" /></label>
                                            <div className='preview-image-container'>
                                                <label className='label-upload' htmlFor='image'><FormattedMessage id="manage-user.upload-image" /><i className='fas fa-upload'></i></label>
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
                                    <button 
                                        type="button" 
                                        className="btn btn-primary mb-5"
                                        onClick={() => this.handleSignin()}>
                                        <FormattedMessage id="manage-user.sign-in" />
                                    </button>
                                </form>
                                </div>
                            </React.Fragment>
                        }
                        <TableManageUser />
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

        usersRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPostionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleIdStart: () => dispatch(actions.fetchRoleIdStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        getAllUsers: () => dispatch(actions.getAllUsersStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
