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

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];


class ManageDoctor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: ''
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContent = () => {
        console.log(this.state)
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    handleChangeTextArea = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    render() {

        const { selectedDoctor } = this.state;
       
        return (
            <div className='manage-doctor-container container my-3'>
                <div className='text-center title mb-3'> TIEN BASIC </div>
                <div className='more-info my-3'>
                    <div className='row'>
                        <div className='content-left col-6'>
                            <label>Chọn bác sĩ:</label>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChange}
                                options={options}
                            />
                        </div>
                        <div className='content-right col-6'>
                            <label>Thông tin giới thiệu:</label>
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
                <button t
                    ype='button' 
                    className='btn btn-primary my-3'
                    onClick={() => this.handleSaveContent()}
                    >Save Content</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
