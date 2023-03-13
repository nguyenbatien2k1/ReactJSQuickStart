import React, { Component } from 'react';
import { connect } from "react-redux";

import './ManageHandBook.scss';
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



class ManageHandBook extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
           nameHandbook: '',
           imgHandbook: '',
           contentHTML: '',
           contentMarkdown: ''
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
          contentMarkdown: text,
          contentHTML: html,
        });
    };

    handleChangeImage = async (e) => {
        let file = e.target.files[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
              imgHandbook: base64,
            })
        }
      } 

    handleSaveInfo = async () => {
        // console.log(this.state)
        // return;
        let res = await userService.postCreateHandbook(this.state);
        if(res && res.errCode === 0) {
            toast.success('Create HandBook success')
        }
        else {
            toast.error('Error');
        }
    }

    
    render() {
        return (
            <div className='manage-handbook-container'>
                <div className='title'>Quản lý cẩm nang</div>
                <div className='container my-3'>
                    <div className='row'>
                        <div className='form-group col-6'>
                            <label>Tên cẩm nang</label>
                            <input 
                                className='form-control'
                                value={this.state.nameHandbook}    
                                onChange={(e) => this.setState({nameHandbook: e.target.value})}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Chọn ảnh</label>
                            <input type="file" className="form-control-file"
                                    onChange={(e) => this.handleChangeImage(e)}
                            ></input>
                        </div>
                    </div>
                    <MdEditor
                        style={{ height: "300px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                        />
                    <div className='btn btn-primary my-3'
                        onClick={() => this.handleSaveInfo()}
                    >Save Info</div>
                    </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandBook);
