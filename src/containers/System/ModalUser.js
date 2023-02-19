import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        
        this.state = {

        }
    }
    

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }


    render() {
        console.log(this.props);
        return (
            <Modal 
                isOpen={this.props.isOpenModal} 
                toggle={() => this.toggle()} 
                className={"modal-user-container"}
                size={"lg"}
                >
                <ModalHeader toggle={() => this.toggle()}>Create new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div style={{display: "flex", gap: "12px"}}>
                            <div className='input-container'>
                                <label htmlFor='email'>Email</label>
                                <input id='email' type='text' name='email' />
                            </div>
                            <div className='input-container'>
                                <label htmlFor='password'>Password</label>
                                <input id='password' type='password' name='password' />
                            </div>
                        </div>
                            <div className='input-container'>
                                <label htmlFor='firstName'>FirstName</label>
                                <input id='firstName' type='text' name='firstName' />
                            </div>
                            <div className='input-container'>
                                <label htmlFor='lastName'>LastName</label>
                                <input id='lastName' type='text' name='lastName' />
                            </div>
                            <div className='input-container'>
                                <label htmlFor='address'>Address</label>
                                <input id='address' type='text' name='address' />
                            </div>
                    </div>
                           
                </ModalBody>
                <ModalFooter>
                <Button className='px-3' color="primary" onClick={() => this.toggle()} >
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
