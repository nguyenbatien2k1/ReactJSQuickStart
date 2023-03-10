import React, { Component } from 'react';
import { connect } from "react-redux";

import './ManageClinic.scss';
import { FormattedDate, FormattedMessage } from 'react-intl';

import Select from "react-select";
import { CommonUtils, dateFormat, LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { userService } from '../../../services';

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageClinic extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
           nameClinic: '',
           addressClinic: '',
           descriptionHTML: '',
           descriptionMarkdown: '',
           imageClinic: '',
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    handleOnChangeInput = (e, id) => {
        let copyState = {...this.state};
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    handleChangeImage = async (e) => {
        let file = e.target.files[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageClinic: base64,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };

    handleSaveInfo = async () => {
        let res = await userService.createNewClinic(this.state);

        if(res && res.errCode === 0) {
            toast.success('Create a new clinic success!');
            this.setState({
                nameClinic: '',
                addressClinic: '',
                imageClinic: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        }
        else {
            toast.error('Error...')
        }
    }

    
    render() {

        return (
            <div className='manage-clinic-container p-3'>
            <div className='title my-3'>Quản lý phòng khám / Cơ sở y tế</div>
            <div className='container'>

            <div className='name-clinic row'>
                <div className='col-4 form-group'>
                    <label>Tên phòng khám / Cơ sở y tế</label>
                    <input 
                        value={this.state.nameClinic}
                        className='form-control'
                        onChange={(e) => this.handleOnChangeInput(e, 'nameClinic')}
                    />
                </div>

                <div className='col-8 form-group'>
                    <label>Chọn ảnh phòng khám/Cơ sở y tế:</label>
                    <input 
                        type='file' className='form-control-file' 
                        onChange={(e) => this.handleChangeImage(e)}
                    />
                </div>

                <div className='form-group col-6'>
                    <label>Địa chỉ</label>
                    <textarea
                        rows={3} 
                        value={this.state.addressClinic}
                        className='form-control'
                        onChange={(e) => this.handleOnChangeInput(e, 'addressClinic')}
                    />
                </div>
            </div>

            <MdEditor
                style={{ height: "250px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
            />

            <button 
                className='btn btn-primary mt-3'
                onClick={() => this.handleSaveInfo()}
            >Save Info</button>

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
