import React, { Component } from "react";
import { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import Select from "react-select";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { userService } from "../../../services";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedDoctor: "",
      doctors: [],
      hasOldData: false,
      action: ''
    };
  }

  componentDidMount() {
    this.props.getAllDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorsRedux !== this.props.doctorsRedux) {
      let dataDoctorSelect = this.buildDataInputSelect(this.props.doctorsRedux);
      this.setState({
        doctors: dataDoctorSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataDoctorSelect = this.buildDataInputSelect(this.props.doctorsRedux);
      this.setState({
        doctors: dataDoctorSelect,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleChange = async (selectedDoctor) => {
    let { hasOldData } = this.state;
    this.setState({ selectedDoctor });
    let res = await userService.getDetailDoctor(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        action: CRUD_ACTIONS.EDIT
      });
    }
    if (!res.data.Markdown) {
      this.setState({
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        hasOldData: false,
        action: CRUD_ACTIONS.CREATE
      });
    }
  };

  handleSaveContent = () => {
    this.props.createInfoDoctor({
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: this.state.action
    });
  };

  handleChangeTextArea = (e) => {
    this.setState({
      description: e.target.value,
    });
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

  render() {
    const { selectedDoctor, doctors, hasOldData } = this.state;

    return (
      <div className="manage-doctor-container container my-3">
        <div className="text-center title mb-3"> TIEN BASIC </div>
        <div className="more-info my-3">
          <div className="row">
            <div className="content-left col-6">
              <label>
                <FormattedMessage id="manage-doctor.choose-doctor" />
              </label>
              <Select
                value={selectedDoctor}
                options={doctors}
                onChange={this.handleChange}
              />
            </div>
            <div className="content-right col-6">
              <label>
                <FormattedMessage id="manage-doctor.introduction-info" />
              </label>
              <textarea
                className="form-control"
                rows="4"
                cols="50"
                value={this.state.description}
                onChange={(e) => this.handleChangeTextArea(e)}
              ></textarea>
            </div>
          </div>
        </div>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
          value={this.state.contentMarkdown}
        />
        <button
          type="button"
          className={hasOldData ? "btn btn-warning my-3" : 'btn btn-primary my-3' }
          onClick={() => this.handleSaveContent()}
        >
          {
            hasOldData ? "Lưu thông tin" : "Tạo mới thông tin"
          }
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorsRedux: state.admin.doctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.getAllDoctorsStart()),
    createInfoDoctor: (data) => dispatch(actions.createInfoDoctorStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
