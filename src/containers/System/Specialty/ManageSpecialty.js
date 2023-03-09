import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import './ManageSpecialty.scss';

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils } from '../../../utils';
import { userService } from '../../../services';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


class ManageSpecialty extends Component {

    constructor(props) {
        super(props);

        this.state = {
           nameSpecialty: '',
           imageSpecialty: '',
           descriptionHTML: '',
           descriptionMarkdown: '',
        }
    }

    componentDidMount() {

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
                imageSpecialty: base64,
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
        this.setState({
            nameSpecialty: '',
            imageSpecialty: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }, () => {
            console.log(this.state)
        })
        let res = await userService.createNewSpecialty(this.state);
        if(res && res.errCode === 0) {
            toast.success('Create a new specialty success!');
            this.setState({
                nameSpecialty: '',
                imageSpecialty: '',
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
            <div className='manage-specialty-container p-3'>
                <div className='title my-3'>Quản lý chuyên khoa khám bệnh</div>
                <div className='container'>

                <div className='name-specialty row'>
                    <div className='col-4 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input 
                            value={this.state.nameSpecialty}
                            className='form-control'
                            onChange={(e) => this.handleOnChangeInput(e, 'nameSpecialty')}
                        />
                    </div>

                    <div className='col-8 form-group'>
                        <label>Chọn ảnh chuyên khoa:</label>
                        <input 
                            type='file' className='form-control-file' 
                            onChange={(e) => this.handleChangeImage(e)}
                        />
                    </div>

                    <div></div>
                </div>

                <MdEditor
                    style={{ height: "300px" }}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
