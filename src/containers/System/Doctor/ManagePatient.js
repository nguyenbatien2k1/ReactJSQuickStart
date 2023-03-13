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
import RemedyModal from './RemedyModal';
import LoadingOverlay from "react-loading-overlay";


class ManagePatient extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            currentDate: new Date(),
            listPatient: [],
            isOpen: false,
            dataModal: {},
            isShowLoading: false,
        }
    }

    async componentDidMount() {
        await this.getDataPatient();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if(prevProps.listPatient !== this.props.listPatient) {
        //     console.log('did update: ')
        //     await this.getDataPatient();
        // }
    }

    getDataPatient = async () => {

        let {userInfo} = this.props;
        let {currentDate} = this.state;

        let formatDate = moment(new Date(currentDate)).format('DD/MM/YYYY');
        let res = await userService.getAllPatientForDoctor(userInfo.id, formatDate);

        if(res && res.errCode === 0) {
            this.setState({
                listPatient: res.data
            })
        }
    }

    handleOnchangeDatePicker = async (date) => {
        
        this.setState({
            currentDate: date[0]
        }, async () => {
            let {userInfo} = this.props;
            let {currentDate} = this.state;
            await this.getDataPatient();
        })

    }

    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            date: item.date,
            fullname: item.fullname
        }

        this.setState({
            isOpen: true,
            dataModal: data
        })

    }

    handleCloseModal = () => {
        this.setState({
            isOpen: false,
        })
    }

    sendRemedy = async (data) => {
        let {dataModal} = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await userService.postSendRemedy({
            email: data.email,
            imgBase64: data.imgBase64,
            tailFile: data.tailFile,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            date: dataModal.date,
            language: this.props.language,
            fullname: dataModal.fullname,
        })
        if(res && res.errCode === 0) {
            this.handleCloseModal();
            this.setState({
                isShowLoading: false
            })
            toast.success('Update Appointment OK');
            setTimeout(async () => {
                await this.getDataPatient();
            }, 500)

            
        }
        else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Failed...')
        }
    }

    render() {

        let {listPatient, isOpen, dataModal} = this.state;
        let {language} = this.props;
        
        return (
            <LoadingOverlay
            active={this.state.isShowLoading}
            spinner={true}
            text="Loading..."
            >
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
                                    listPatient && listPatient.length > 0 ?
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
                                                    <button className='btn btn-success' onClick={() => this.handleConfirm(item)}>Gửi hóa đơn</button>
                                                </td>
                                            </tr>
                                        )
                                    }) : <tr>
                                        <td colSpan={8} className={'text-center'}>No Data</td>
                                    </tr>
                                }
                                {/* {
                                    listPatient && listPatient.length === 0 && <td colSpan={8} className={'text-center'}>No Data</td>
                                } */}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>

                <RemedyModal
                    isOpen={isOpen}
                    dataModal={dataModal}
                    handleCloseModal={this.handleCloseModal}
                    sendRemedy={this.sendRemedy}
                />
            </LoadingOverlay>
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
