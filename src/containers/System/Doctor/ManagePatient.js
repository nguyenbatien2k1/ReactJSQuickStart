import React, { Component } from 'react';
import { connect } from "react-redux";

import './ManagePatient.scss';
import { FormattedDate, FormattedMessage } from 'react-intl';

import Select from "react-select";
import { dateFormat, LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { userService } from '../../../services';


class ManagePatient extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            currentDate: new Date()
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    handleOnchangeDatePicker = (data) => {
        
        this.setState({
            currentDate: data[0]
        })
    }

    render() {
        return (
            <div className='manage-patient-container'>
                <div className='container'>
                    <div className='title'><FormattedMessage id="menu.doctor.manage-patient" /></div>
                    <div className='form-group col-4'>
                        <label>Chọn ngày khám bệnh</label>
                        <DatePicker 
                            className='form-control'
                            onChange={this.handleOnchangeDatePicker}
                            value={this.state.currentDate}
                        />
                    </div>
                    <div className='col-12'>
                    <table id="table-manage-patient">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            <tr>
                                <td>{`user.email`}</td>
                                <td>{`user.firstName`}</td>
                                <td>{`user.lastName`}</td>
                                <td>{`user.address`}</td>
                                <td>
                                    {/* <button className='btn-edit' onClick={() => this.handleEditUser(patient)}><i className="fas fa-edit"></i></button>
                                    <button className='btn-delete' onClick={() => this.handleDeleteUser(user)}><i className="fas fa-trash-alt"></i></button> */}
                                    abc
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
