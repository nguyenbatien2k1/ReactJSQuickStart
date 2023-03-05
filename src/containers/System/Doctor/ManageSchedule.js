import React, { Component } from 'react';
import { connect } from "react-redux";

import './ManageSchedule.scss';
import { FormattedDate, FormattedMessage } from 'react-intl';

import Select from "react-select";
import { dateFormat, LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { userService } from '../../../services';


class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            selectedDoctor: {},
            doctors: [], 
            currentDate: '',
            schedules: []
        }
    }

    componentDidMount() {
        this.props.getAllDoctors();
        this.props.getAllSchedule();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.doctorsRedux !== this.props.doctorsRedux) {
            this.setState({
                doctors: this.props.doctorsRedux
            })
        }
        if(prevProps.schedules !== this.props.schedules) {
            this.setState({
                schedules: this.props.schedules.map(item => {
                    item.isSelected = false;
                    return item
                })
            })
        }
    }

    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        console.log(selectedDoctor)
    };

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
          result = inputData.map((item, index) => {
            let object = {};
            let labelVi = `${item.lastName} ${item.firstName}`;
            let labelEn = `${item.firstName} ${item.lastName}`;
    
            object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            object.value = item.id;
    
            return object;
          });
        }
        return result;
      };

    handleOnchangeDatePicker = (data) => {
        this.setState({
            currentDate: data[0]
        })
    }

    handleClickButtonTime = (time) => {
        let {schedules} = this.state;
        if(schedules && schedules.length > 0) {
            schedules = schedules.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
        }
        this.setState({
            schedules: schedules
        })
    }

    handleSaveManageSchedule = async () => {
        let {schedules, selectedDoctor, currentDate} = this.state;
        let result = [];

        if(_.isEmpty(selectedDoctor)) {
            toast.error('Doctor Error...');
            return;
        }

        if(!currentDate) {
            toast.error('Date Error...');
            return;
        }

        let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        // let formatedDate = moment(new Date(currentDate)).format(dateFormat.SEND_TO_SERVER);

        if(schedules && schedules.length > 0) {
            let selectedSchedules = schedules.filter(item => item.isSelected);
            if(selectedSchedules && selectedSchedules.length > 0) {
                selectedSchedules.map(item => {
                    let object = {}
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = item.key;

                    result.push(object);
                })
            }
            else {
                toast.error('Schedule Error...');
                return;
            }
        }

        let res = await userService.bulkCreateSchedule({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatedDate
        });

        if(res && res.errCode === 0) {
            toast.success('Create Schedule Success!')
        }
        else {
            toast.error('Schedule Error...');
        }
    }

    render() {

        const doctors = this.buildDataInputSelect(this.state.doctors);
        const {selectedDoctor, schedules} = this.state;
        const {language} = this.props;
        return (
            <div className='manage-schedule-container container my-3'>
                <div className='m-s-title text-center'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container my-4'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={selectedDoctor}
                                options={doctors}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='col-3 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker 
                                className='form-control'
                                onChange={this.handleOnchangeDatePicker}
                                value={this.state.currentDate}
                                minDate={new Date().setHours(0,0,0,0)}
                            />
                        </div>
                        <div className='col-10 pick-hour-container my-4'>
                            {
                                schedules && schedules.length > 0 &&
                                schedules.map((item, index) => {
                                    return (
                                        <button 
                                            key={index}
                                            className={item.isSelected ? 'btn btn-warning' :'btn btn-outline-primary'}
                                            onClick={() => this.handleClickButtonTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                        <button type='button' className='btn btn-primary my-3'
                                onClick={() => this.handleSaveManageSchedule()}
                        >
                            <FormattedMessage id="manage-schedule.save-info" />
                        </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        doctorsRedux: state.admin.doctors,
        schedules: state.admin.schedules
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.getAllDoctorsStart()),
        getAllSchedule: () => dispatch(actions.getAllScheduleStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
