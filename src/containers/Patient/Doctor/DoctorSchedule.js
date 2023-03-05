import React, { Component } from 'react';
import { connect } from "react-redux";

import './DoctorSchedule.scss';
import {FormattedMessage } from 'react-intl';
import Select from "react-select";
import moment from 'moment';
import localization from "moment/locale/vi";
import { LANGUAGES } from '../../../utils';
import { userService } from '../../../services';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
           allDays: [],
        }
    }

    async componentDidMount() {
        this.setAllDays(this.props.language);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language) {
            this.setAllDays(this.props.language);
        }
    }
    setAllDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            object.label = language === LANGUAGES.VI ? moment(new Date()).add(i, 'days').format('dddd - DD/MM') : moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            object.value = moment(new Date()).add(i, 'days').format('DD/MM/YYYY');
            
            allDays.push(object)
        }
        this.setState({
            allDays: allDays,
        })
    }

    handleOnChangeSelect = async (e) => {
        let doctorId = this.props.detailDoctor.id;
        let date = e.target.value;
        let res = await userService.getScheduleDoctorByDate(doctorId, date);
        console.log(res)
    }

    render() {

        const {allDays} = this.state;

        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select
                        onChange={(e) => this.handleOnChangeSelect(e)}
                    >
                        {
                            allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option 
                                        key={index} 
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='available-time'>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
