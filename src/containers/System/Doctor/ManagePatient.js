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
            currentDate: new Date(),
            listPatient: []
        }
    }

    async componentDidMount() {
        const {userInfo} = this.props;
        let {currentDate} = this.state;
        this.getDataPatient(userInfo.id, currentDate);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    getDataPatient =  async (userInfo, date) => {

        let currentDate = moment(new Date(date)).format('DD/MM/YYYY');

        let res = await userService.getAllPatientForDoctor(userInfo, currentDate)

        if(res && res.errCode === 0) {
            this.setState({
                listPatient: res.data
            })
        }
    }

    handleOnchangeDatePicker = async (data) => {
        
        this.setState({
            currentDate: data[0]
        })

        const {userInfo} = this.props;
        let {currentDate} = this.state;
        this.getDataPatient(userInfo.id, currentDate);
    }

    handleEditUser = () => {
        alert('hi')
    }

    handleDeleteUser = () => {
        alert('hello')
    }

    render() {

        let {listPatient} = this.state;
        
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
                                <th>STT</th>
                                <th>Fullname</th>
                                <th>PhoneNumber</th>
                                <th>Address</th>
                                <th>Giới tính</th>
                                <th>Thời gian khám</th>
                                <th>Ngày khám</th>
                                <th>Actions</th>
                            </tr>
                            {
                                listPatient && listPatient.length > 0 &&
                                listPatient.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.fullname}</td>
                                            <td>{item.phonenumber}</td>
                                            <td>{item.patientData && item.patientData.address}</td>
                                            <td>{item.patientData && item.patientData.genderData && this.props.language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn}</td>
                                            <td>{item.timeTypeDataPatient && this.props.language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn}</td>                                      
                                            <td>{item.date}</td>                                      
                                            <td className='btn-actions'>
                                                <button className='btn btn-success' onClick={(e) => this.handleEditUser(e)}>Xác nhận</button>
                                                <button className='btn btn-warning' onClick={(e) => this.handleDeleteUser(e)}>Gửi hóa đơn</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
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
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
