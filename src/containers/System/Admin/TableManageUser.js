import React, { Component } from 'react';
import { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './TableManageUser.scss';

class TableManageUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userArr: [],
        }
    }

    componentDidMount() {
        this.props.getAllUsers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.usersRedux !== this.props.usersRedux) {
            this.setState({
                userArr: this.props.usersRedux
            })
        }
    }

    handleEditUser = (user) => {
        // console.log(this.props.handleEditUserParent(user));
        this.props.handleEditUserParent(user);
    }

    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id);
    }
   
    render() {
        let users = this.state.userArr;
       
        return (
            <div className='users-container'>
                <table id="table-manage-user">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {
                            users && users.map((user, index) => {
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
        );
    }

}

const mapStateToProps = state => {
    return {
        usersRedux: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => dispatch(actions.getAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUserStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
