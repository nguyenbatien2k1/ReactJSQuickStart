import React, { Component } from 'react';
import { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import userService from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

import { emitter } from '../../utils/emitter';

import './UserManage.scss';

class UserManage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditModal: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await userService.getAllUsers('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            })
        }
    }

    
    toggleModalUser = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }
    
    toggleModalEditUser = (user) => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal,
        })
    }
    
    handleBtnAddNewUser = () => {
        this.setState({
            isOpenModal : true,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await userService.createNewUser(data);
            if(response && response.errCode !== 0) {
                alert(response.errMessage);
            }
            else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModal: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log(error)
        }

    }

    handleEditUser = (user) => {
        try {
            this.setState({
                isOpenEditModal: !this.state.isOpenEditModal,
                userEdit: user
            })
        } catch (error) {
            console.log(error);
        }
    }

    editUser = async (user) => {
        try {
            let res = await userService.editUser(user);
            if(res && res.errCode !== 0) {
                alert(res.errMessage);
            }
            else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenEditModal: false,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await userService.deleteUser(user.id);
            if(response && response.errCode !== 0) {
                alert(response.errMessage);
            }
            else {
                await this.getAllUsersFromReact();
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <ModalUser
                    isOpenModal = {this.state.isOpenModal}
                    toggleFromParent = {this.toggleModalUser}
                    createNewUser = {this.createNewUser}
                />
                {
                    this.state.isOpenEditModal &&
                        <ModalEditUser 
                            isOpenModal = {this.state.isOpenEditModal}
                            toggleFromParent = {this.toggleModalEditUser}
                            currentUser = {this.state.userEdit}
                            editUser = {this.editUser}
                        />
                }

                <div className="title text-center">Tien Basic</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' 
                            onClick={(e) => this.handleBtnAddNewUser(e)}>
                                <i className="fas fa-plus"></i> Add new user
                    </button>
                </div>
                <div className='users-table mt-3 mx-1'>
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {
                            arrUsers && arrUsers.map((user, index) => {
                                return (
                                    <Fragment key={index}>
                                        <tr>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => this.handleEditUser(user)}><i className="fas fa-edit"></i></button>
                                                <button className='btn-delete' onClick={() => this.handleDeleteUser(user)}><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    </Fragment>
                                )
                            })
                        }
                    </tbody>
                </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
