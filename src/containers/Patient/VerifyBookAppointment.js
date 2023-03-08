import React, { Component } from "react";
import { connect } from "react-redux";


import { FormattedMessage } from "react-intl";
import moment from "moment";
import localization from "moment/locale/vi";

import { Link, withRouter } from "react-router-dom";
import { userService } from "../../services";

import HomeHeader from "../HomePage/HomeHeader";

import './VerifyBookAppointment.scss'
import { toast } from "react-toastify";

class VerifyBookAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
        statusVerify: false
    };
  }

  async componentDidMount() {
    if(this.props.location) {
        let urlParams = new URLSearchParams(this.props.location.search);
        let token = urlParams.get('token');
        let doctorId = urlParams.get('doctorId');

        let res = await userService.postVerifyBookAppointment(token, doctorId);

        if(res && res.errCode === 0) {
            this.setState({
                statusVerify: true,
            })
            toast.success('Success!');
        }
        else if(res.errCode !== 0) {
            this.setState({
                statusVerify: false
            })
            toast.error('Error...');
        }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    
  }


  render() {

    let {statusVerify} = this.state

    console.log(statusVerify)

    return (
        <>
            <HomeHeader />
            {
                statusVerify === true ? 
                <>
                    <div className="verify-book-appointment">
                        <div>
                            Xác nhận lịch hẹn thành công!
                        </div>
                        <Link className="link" to='/home'>Bấm vào đây để trở lại trang chủ.</Link>
                    </div>
                </> :
                <>
                    <div className="verify-book-appointment">
                        <div>
                            Lịch hẹn không tồn tại hoặc đã được xác thực trước đó...
                        </div>
                        <div>
                            <Link className="link" to='/home'>Bấm vào đây để trở lại trang chủ.</Link>
                        </div>
                    </div>
                </>
            }
        </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyBookAppointment));
