import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {Button, ButtonToolbar} from 'react-bootstrap'

class HomePage extends React.Component {
    static propTypes = {
        showSignInForm: PropTypes.func.isRequired,
        history: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.props = props;

        this.gotoSurvey = this.gotoSurvey.bind(this)
    }

    gotoSurvey(){
        this.props.history.push(`/survey`)
    }

    render() {
        return (
            <div className={'home-container'}>
                <div className={'home-body-title'}>
                    <b>Start something that matters</b>
                </div>
                <div className={'home-body-head'}>
                    Easy to manage your survey and get more information
                </div>
                <ButtonToolbar>
                    <Button onClick={e => this.gotoSurvey()} className={'btn-homepage'} bsStyle="primary" bsSize="large">Let's Create Survey Now</Button>
                </ButtonToolbar>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

