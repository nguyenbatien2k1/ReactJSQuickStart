import React, { Component } from 'react';
import { connect } from "react-redux";

import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';

import Select from "react-select";
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';


class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            selectedDoctor: '',
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
                schedules: this.props.schedules
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

    handleSaveManageSchedule = () => {
        alert('hi')
    }

    handleOnchangeDatePicker = (data) => {
        this.setState({
            currentDate: data[0]
        })
    }

    render() {

        const doctors = this.buildDataInputSelect(this.state.doctors);
        const {selectedDoctor, schedules} = this.state;
        const {language} = this.props;

        console.log(schedules)

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
                                minDate={new Date()}

                            />
                        </div>
                        <div className='col-10 pick-hour-container my-4'>
                            {
                                schedules && schedules.length > 0 &&
                                schedules.map((item, index) => {
                                    return (
                                        <button 
                                            key={index}
                                            className={'btn btn-outline-primary'}
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
