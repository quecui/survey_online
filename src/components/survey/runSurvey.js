import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Button} from 'react-bootstrap'
import PropTypes from "prop-types"
import {Redirect} from 'react-router-dom'
import * as surveyAction from './surveyAction'
import Birthdate from './runningComponent/birthdate'
import CheckboxCom from './runningComponent/checkbox'
import Color from './runningComponent/color'
import Comment from './runningComponent/comment'
import DropdownCom from './runningComponent/dropdown'
import Email from './runningComponent/email'
import Matrix from './runningComponent/matrix'
import Number from './runningComponent/number'
import SingleText from './runningComponent/singletext'

class RunSurvey extends React.Component {
    static propTypes = {
        trailer: PropTypes.string.isRequired,
        postAnswer: PropTypes.func,
        data: PropTypes.object.isRequired,
        surveyId: PropTypes.string
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            trailer: this.props.trailer,
            pageIndex: 0,
            data: this.props.data,
            isShowWelcome: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.arrowRightAction = this.arrowRightAction.bind(this)
        this.submitAnswer = this.submitAnswer.bind(this)
        this.checkLastPage = this.checkLastPage.bind(this)
    }

    handleChange(index, data){
        const tmpPages = this.state.data
        tmpPages[this.state.pageIndex].data[index] = data
        this.setState({data: tmpPages})
    }

    arrowRightAction(){
        let flag = false
        if(this.props.trailer === 'false'){
            for(let i = 0; i < this.state.data[this.state.pageIndex].data.length; i++){
                let component = this.state.data[this.state.pageIndex].data[i]
                if(component.required === true && component.component.answer === ''){
                    alert('Please complete this page')
                    flag = true
                    break
                }
            }
        }

        if(flag === false) {
            this.setState({pageIndex: this.state.pageIndex + 1})
        }
    }

    checkLastPage(){
        let flag = false
        let pageLength = this.state.data.length

        if(this.props.trailer === 'false'){
            for(let i = 0; i < this.state.data[pageLength - 1].data.length; i++){
                let component = this.state.data[this.state.pageIndex].data[i]
                if(component.required === true && component.component.answer === ''){
                    alert('Please complete this page')
                    flag = true
                    break
                }
            }
        }

        return flag
    }

    submitAnswer(){
        if(this.checkLastPage() === false){
            console.log(this.state.data)
            this.props.postAnswer({survey_id: this.props.surveyId, data: JSON.stringify(this.state.data)})
            this.setState({isShowWelcome: true})

        }
    }

    render() {
        return (
            <div className={'do-survey-body'}>
                {this.state.isShowWelcome === true ? <Redirect to="/"/>:''}
                <div className={'arrow-trailer'}>
                    {this.state.pageIndex === 0 ? '': <span onClick={e => this.setState({pageIndex: this.state.pageIndex - 1})}  className="glyphicon glyphicon-arrow-left"/>}
                    {this.state.pageIndex < this.state.data.length - 1 ? <span onClick={e => this.arrowRightAction()} className="glyphicon glyphicon-arrow-right"/>: ''}
                </div>
                <div>
                    {this.state.data.map((page, index) => (
                        <div className={'run-survey'}>
                            {this.state.pageIndex === index ?
                                <span>
                                {page.data.map((component, i) => (
                                    <span>
                                        <div className={'do-survey-component'}>
                                            {component.type === 1 ?
                                                <SingleText index={i}
                                                            handleChangeData={this.handleChange}
                                                            answer={component.component.answer}
                                                            trailer={this.state.trailer}
                                                            data={component}/>: ''}
                                        </div>
                                        <div className={'do-survey-component'}>
                                            {component.type === 9 ? <Number handleChangeData={this.handleChange}
                                                                            answer={component.component.answer}
                                                                            index={i}
                                                                            trailer={this.state.trailer}
                                                                            data={component}/>: ''}
                                        </div>
                                        <div className={'do-survey-component'}>
                                            {component.type === 2 ? <Birthdate index={i}
                                                                               trailer={this.state.trailer}
                                                                               handleChangeData={this.handleChange}
                                                                               answer={component.component.answer}
                                                                               data={component}/>: ''}
                                        </div>
                                        <div className={'do-survey-component'}>
                                            {component.type === 3 ? <Color index={i}
                                                                           trailer={this.state.trailer}
                                                                           handleChangeData={this.handleChange}
                                                                           answer={component.component.answer}
                                                                           data={component}/>: ''}
                                        </div>
                                        <div className={'do-survey-component'}>
                                            {component.type === 4 ? <Email index={i}
                                                                           trailer={this.state.trailer}
                                                                           handleChangeData={this.handleChange}
                                                                           answer={component.component.answer}
                                                                           data={component}/>: ''}
                                        </div>
                                         <div className={'do-survey-component'}>
                                            {component.type === 7 ? <Comment index={i}
                                                                             trailer={this.state.trailer}
                                                                             handleChangeData={this.handleChange}
                                                                             answer={component.component.answer}
                                                                             data={component}/>: ''}
                                        </div>
                                         <div className={'do-survey-component'}>
                                            {component.type === 5 ? <CheckboxCom index={i}
                                                                                 handleChangeData={this.handleChange}
                                                                                 isRequired={component}
                                                                                 trailer={this.state.trailer}
                                                                                 data={component}/>: ''}
                                        </div>
                                        <div className={'do-survey-component'}>
                                            {component.type === 6 ? <DropdownCom index={i} handleChangeData={this.handleChange} trailer={this.state.trailer} data={component}/>: ''}
                                        </div>
                                    </span>
                                ))}
                            </span>
                                : ''}
                        </div>
                    ))}
                </div>
                {this.state.data.length - 1 === this.state.pageIndex ? <Button onClick={e => this.submitAnswer()} bsStyle="success" className={'submit-do-survey'}>Submit</Button>: ''}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
    postAnswer: surveyAction.postAnswer
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RunSurvey)
