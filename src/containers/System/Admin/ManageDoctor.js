import React, { Component } from 'react';
import { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';
import Select from 'react-select';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { LANGUAGES } from '../../../utils';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            selectedDoctor: '',
            doctors: []
        }
    }

    componentDidMount() {
        this.props.getAllDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.doctorsRedux !== this.props.doctorsRedux) {
            let dataDoctorSelect = this.buildDataInputSelect(this.props.doctorsRedux)
            this.setState({
                doctors: dataDoctorSelect
            })
        }

        if(prevProps.language !== this.props.language) {
            let dataDoctorSelect = this.buildDataInputSelect(this.props.doctorsRedux)
            this.setState({
                doctors: dataDoctorSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    handleSaveContent = () => {
        this.props.createInfoDoctor({
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value
        })
    }

    handleChangeTextArea = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let {language} = this.props
        if(inputData && inputData.length > 0) {
            result = inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id

                return object
            })
        }
        return result;
    }

    render() {

        const { selectedDoctor, doctors } = this.state;
           
        return (
            <div className='manage-doctor-container container my-3'>
                <div className='text-center title mb-3'> TIEN BASIC </div>
                <div className='more-info my-3'>
                    <div className='row'>
                        <div className='content-left col-6'>
                            <label><FormattedMessage id="manage-doctor.choose-doctor" /></label>
                            <Select
                                value={selectedDoctor}
                                options={doctors}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='content-right col-6'>
                            <label><FormattedMessage id="manage-doctor.introduction-info" /></label>
                            <textarea 
                                className='form-control' 
                                rows="4" cols="50"
                                value={this.state.description}
                                onChange={(e) => this.handleChangeTextArea(e)}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
                <MdEditor 
                    style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange} 
                />
                <button
                    type='button' 
                    className='btn btn-primary my-3'
                    onClick={() => this.handleSaveContent()}
                    >Save Content</button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorsRedux: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.getAllDoctorsStart()),
        createInfoDoctor: (data) => dispatch(actions.createInfoDoctorStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
