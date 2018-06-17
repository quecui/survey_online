import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from "prop-types";
import RunSurvey from './runSurvey'
import * as surveyAction from './surveyAction'
import * as SurveyUtil from '../../utils/survey'

class DoSurvey extends React.Component {
    static propTypes = {
        showDoSurvey: PropTypes.func.isRequired,
        survey: PropTypes.object
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            pages: [],
            change: 0,
            surveyId: ''
        }
    }

    componentWillMount(){
        const url = window.location.href
        const surveyId = url.split('/')[url.split('/').length - 1]

        this.setState({surveyId: surveyId})

        const data = {
            token: localStorage.getItem('token'),
            survey_id: surveyId
        }

        this.props.showDoSurvey(data)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.survey.pages.length > 0){
            this.setState({pages: SurveyUtil.convertPageFromString(nextProps.survey.pages)})
            this.setState({change: this.state.change + 1})
        }
    }

    render() {
        return (
            <div className="page-content design-page do-page">
                <div className={'do-survey-title'}>
                    {this.props.survey.name}
                </div>
                {this.state.change > 0 ? <div><RunSurvey surveyId={this.state.surveyId} data={this.state.pages} trailer={'false'}/></div>: ''}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    survey: state.survey,
    header: state.header
})

const mapDispatchToProps = dispatch => bindActionCreators({
    showDoSurvey: surveyAction.showDoSurvey
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DoSurvey)
