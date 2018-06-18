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
import RootStar from '../../assets/img/star-black.png'
import Star from '../../assets/img/star-ye.png'

class RunSurvey extends React.Component {
    static propTypes = {
        trailer: PropTypes.string.isRequired,
        postAnswer: PropTypes.func,
        data: PropTypes.object.isRequired,
        surveyId: PropTypes.string,
        star: PropTypes.number
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            trailer: this.props.trailer,
            pageIndex: 0,
            data: this.props.data,
            isShowWelcome: false,
            star: [1,1,1,1,1]
        }

        this.handleChange = this.handleChange.bind(this)
        this.arrowRightAction = this.arrowRightAction.bind(this)
        this.submitAnswer = this.submitAnswer.bind(this)
        this.checkLastPage = this.checkLastPage.bind(this)
        this.changeStar = this.changeStar.bind(this)
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

                if(component.required === true){
                  if(component.component.answer === ''){
                    alert('Please complete question ' + (i+1))
                    flag = true
                    break
                  }


                  if(component.type === 4 ){
                    if(component.component.answer.indexOf('@') < 0){
                      alert('Email wrong format')
                      flag = true
                      break
                    }
                  }

                  if(component.type === 5){
                    if(component.component.answer.length === 0){
                      alert('Please complete question ' + (i+1))
                      flag = true
                      break
                    }
                  }

                  if(component.type === 8){
                      if(component.component.answer.length < component.component.colOptions.length){
                          alert('Please complete question ' + (i+1))
                          flag = true
                          break
                      }
                  }
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
                if(component.required === true){
                  if(component.component.answer === ''){
                    alert('Please complete question ' + (i+1))
                    flag = true
                    break
                  }


                  if(component.type === 4 ){
                    if(component.component.answer.indexOf('@') < 0){
                      alert('Email wrong format')
                      flag = true
                      break
                    }
                  }

                  if(component.type === 5){
                    if(component.component.answer.length === 0){
                      alert('Please complete question ' + (i+1))
                      flag = true
                      break
                    }
                  }

                  if(component.type === 8){
                      if(component.component.answer.length < component.component.colOptions.length){
                          alert('Please complete question ' + (i+1))
                          flag = true
                          break
                      }
                  }
                }
            }
        }

        return flag
    }

    submitAnswer(){
        if(this.checkLastPage() === false){
            this.props.postAnswer({survey_id: this.props.surveyId, data: JSON.stringify(this.state.data)})
            this.setState({isShowWelcome: true})

        }
    }

    changeStar(index){
        const tmp = this.state.star
        for(let i = 0; i < 5; i++){
            if(i <= index){
                tmp[i] = 2
            } else {
                tmp[i] = 1
            }
        }

        this.setState({star: tmp})
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

                                        <div className={'do-survey-component'}>
                                            {component.type === 8 ? <Matrix index={i} handleChangeData={this.handleChange} trailer={this.state.trailer} data={component}/>: ''}
                                        </div>
                                    </span>
                                ))}
                            </span>
                                : ''}
                        </div>
                    ))}
                </div>
                <div>
                    <div className={'star-css'}>
                        <span className={'star-title'}>Rating for this survey: </span>
                        {this.state.star.map((st, stIndex) => (
                            <span>
                                {st === 1 ? <img className={'icon-star'} onMouseEnter={e => this.changeStar(stIndex)} src={RootStar} />: <img className={'icon-star'} onMouseEnter={e => this.changeStar(stIndex)} src={Star} />}
                            </span>
                        ))}
                    </div>
                    <div>
                        {this.state.data.length - 1 === this.state.pageIndex && this.props.trailer === 'false' ?
                            <Button onClick={e => this.submitAnswer()} bsStyle="success" className={'submit-do-survey'}>Submit</Button>: ''}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
    postAnswer: surveyAction.postAnswer
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RunSurvey)
