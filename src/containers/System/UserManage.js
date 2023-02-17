import React, { Component } from 'react';
import { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import userService from '../../services/userService';

import './UserManage.scss';

class UserManage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await userService.getAllUsers('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            })
        }
    }


    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <div className="title text-center">Tien Basic</div>
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
                            arrUsers && arrUsers.map((arrUser, index) => {
                                return (
                                    <Fragment>
                                        <tr>
                                            <td>{arrUser.email}</td>
                                            <td>{arrUser.firstName}</td>
                                            <td>{arrUser.lastName}</td>
                                            <td>{arrUser.address}</td>
                                            <td>
                                                <button className='btn-edit'><i className="fas fa-edit"></i></button>
                                                <button className='btn-delete'><i className="fas fa-trash-alt"></i></button>
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
