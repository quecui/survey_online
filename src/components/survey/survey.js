import React from 'react'
import PropTypes from "prop-types"
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import SurveyList from './surveyList'
import DesignSurvey from './designSurvey'
import ResultSurvey from './resultSurvey'

class Survey extends React.Component {
    static propTypes = {
        header: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            editView: false,
            mainView: true,
            resultView: false
        }

        this.changeView = this.changeView.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.header.changeView > 0){
            this.changeView(nextProps.header.changeView)
        }
    }

    changeView(key){
        switch (key){
            case 1:
                this.setState({editView: true})
                this.setState({mainView: false})
                this.setState({resultView: false})
                break
            case 2:
                this.setState({mainView: true})
                this.setState({editView: false})
                this.setState({resultView: false})
                break
            case 3:
                this.setState({mainView: false})
                this.setState({editView: false})
                this.setState({resultView: true})
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
                {this.state.resultView === true ? <ResultSurvey changeView={this.changeView}/> : ''}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    header: state.header
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Survey)

