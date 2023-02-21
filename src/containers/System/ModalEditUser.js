import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

    }

    componentDidMount() {
        let user = this.props.currentUser;
        // let {currentUser} = this.props;
        if(user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'abc',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = (e) => {
        let copyState = {
            ...this.state
        }

        copyState[e.target.name] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = Object.keys(this.state);
        for(let i = 0; i < arrInput.length ; i++) {
            if(!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameters ' + arrInput[i] + '!');
                break;
            }
        }
        return isValid;
    }

    handleSave = (e) => {
        let isValid = this.checkValidateInput();
        if(isValid) {
            // callAPI
            this.props.editUser(this.state);
        }

    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpenModal} 
                toggle={() => this.toggle()} 
                className={"modal-user-container"}
                size={"lg"}
                >
                <ModalHeader toggle={() => this.toggle()}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div style={{display: "flex", gap: "12px"}}>
                            <div className='input-container'>
                                <label htmlFor='email'>Email</label>
                                <input 
                                        id='email' 
                                        type='text' 
                                        name='email' 
                                        onChange={(e) => this.handleOnchangeInput(e)}
                                        value={this.state.email}
                                        disabled
                                />
                            </div>
                            <div className='input-container'>
                                <label htmlFor='password'>Password</label>
                                <input id='password' type='password' name='password'
                                onChange={(e) => this.handleOnchangeInput(e)} 
                                value={this.state.password} 
                                disabled
                                />
                            </div>
                        </div>
                            <div className='input-container'>
                                <label htmlFor='firstName'>FirstName</label>
                                <input id='firstName' type='text' name='firstName'
                                onChange={(e) => this.handleOnchangeInput(e)}
                                value={this.state.firstName} />
                            </div>
                            <div className='input-container'>
                                <label htmlFor='lastName'>LastName</label>
                                <input id='lastName' type='text' name='lastName'
                                onChange={(e) => this.handleOnchangeInput(e)}
                                value={this.state.lastName} />
                            </div>
                            <div className='input-container'>
                                <label htmlFor='address'>Address</label>
                                <input id='address' type='text' name='address'
                                onChange={(e) => this.handleOnchangeInput(e)}
                                value={this.state.address} />
                            </div>
                    </div>
                           
                </ModalBody>
                <ModalFooter>
                <Button 
                    className='px-3' 
                    color="primary" 
                    onClick={(e) => this.handleSave(e)} >
                    Save
                </Button>
                <Button className='px-3' color="secondary" onClick={() => this.toggle()}>
                    Cancel 
                </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
