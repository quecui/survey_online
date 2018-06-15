import React from 'react'
import SurveyList from './surveyList'
import DesignSurvey from './designSurvey'
import PropTypes from "prop-types"

class Survey extends React.Component {
    static propTypes = {
        // signIn: PropTypes.func.isRequired

    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            editView: false,
            mainView: true
        }

        this.changeView = this.changeView.bind(this)
    }

    changeView(key){
        switch (key){
            case 1:
                this.setState({editView: true})
                this.setState({mainView: false})
                break
            case 2:
                this.setState({mainView: true})
                this.setState({editView: false})
                break
            default:
                this.setState({mainView: true})
                this.setState({editView: false})
        }
    }

    render() {
        return (
            <div className="page-body">
                {this.state.mainView === true ? <SurveyList changeView={this.changeView}/>: ''}
                {this.state.editView === true ? <DesignSurvey changeView={this.changeView}/> : ''}
            </div>
        )
    }
}

export default Survey
