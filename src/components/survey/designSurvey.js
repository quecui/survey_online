import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from "prop-types";
import {Button, FormControl, InputGroup, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import SurveySettingModal from './modalSurveySetting'
import * as surveyUtils from '../../utils/survey'
import SingleInput from './surveyComponent/singleinput'
import Checkbox from './surveyComponent/checkbox'
import Matrix from './surveyComponent/matrix'
import RunSurvey from './runSurvey'
import * as surveyAction from './surveyAction'


class DesignSurvey extends React.Component {
    static propTypes = {
        survey: PropTypes.object.isRequired,
        saveSurvey: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            showSettingModal: false,
            unitTarget: this.props.survey.target,
            timeTarget: surveyUtils.setTimeTarget(this.props.survey.time),

            pages: surveyUtils.convertPageFromString(this.props.survey.pages),
            survey: this.props.survey,
            pageIndex: 0,

            trailer: false
        }

        this.setShowSetting = this.setShowSetting.bind(this)
        this.saveSetting = this.saveSetting.bind(this)
        this.addPage = this.addPage.bind(this)
        this.removePage = this.removePage.bind(this)
        this.addComponent = this.addComponent.bind(this)
        this.delete = this.delete.bind(this)
        this.moveComponent = this.moveComponent.bind(this)
        this.handleChangeData = this.handleChangeData.bind(this)
        this.showTrailer = this.showTrailer.bind(this)
        this.changeSurveyName = this.changeSurveyName.bind(this)
        this.saveSurvey = this.saveSurvey.bind(this)
        this.validateSurvey = this.validateSurvey.bind(this)
        this.setTimeTarget = this.setTimeTarget.bind(this)
    }

    setTimeTarget(){

    }

    setShowSetting(value){
        this.setState({showSettingModal: value})
    }

    saveSetting(unit, time){
        this.setState({unitTarget: unit})
        this.setState({timeTarget: time})
    }

    addPage(){
        if(this.state.pages.length <= 7){
            const tmpPages = this.state.pages
            tmpPages.push({data: []})
            this.setState({pages: tmpPages})
        }
    }

    removePage(){
        if(this.state.pages.length > 1){
            const tmpPages = this.state.pages
            tmpPages.splice(this.state.pageIndex, 1)
            if(this.state.pageIndex >= tmpPages.length) {
                this.setState({pageIndex: this.state.pageIndex - 1})
            }

            this.setState({pages: tmpPages})
        }
    }

    addComponent(key){
        if(this.state.pages.length === 0) {
            const data = {
                data: []
            }
            const tmp = this.state.pages
            tmp.push(data)

            this.setState({pages: tmp})
        }

        const tmpPages = surveyUtils.addComponent(key, this.state.pages, this.state.pageIndex)
        this.setState({pages: tmpPages})
    }

    delete(componentIndex){
        const tmpPages = this.state.pages
        tmpPages[this.state.pageIndex].data.splice(componentIndex, 1)
        this.setState({pages: tmpPages})
    }

    moveComponent(componentIndex, key){
        const tmpPages = this.state.pages
        const tmpComponent = tmpPages[this.state.pageIndex].data[componentIndex]
        // Up
        if(key === 1) {
            if(componentIndex > 0) {
                tmpPages[this.state.pageIndex].data[componentIndex] =  tmpPages[this.state.pageIndex].data[componentIndex - 1]
                tmpPages[this.state.pageIndex].data[componentIndex - 1] = tmpComponent
            }
        }

        // Down
        if(key === 2){
            if(componentIndex < tmpPages[this.state.pageIndex].data.length - 1){
                tmpPages[this.state.pageIndex].data[componentIndex] =  tmpPages[this.state.pageIndex].data[componentIndex + 1]
                tmpPages[this.state.pageIndex].data[componentIndex + 1] = tmpComponent
            }
        }

        this.setState({pages: tmpPages})
    }

    // Todo
    handleChangeData(componentIndex, data){
        const tmpPages = this.state.pages
        tmpPages[this.state.pageIndex].data[componentIndex] = data
        this.setState({pages: tmpPages})
    }

    showTrailer(value){
        this.setState({trailer: value})
    }

    changeSurveyName(value){
        const tmp = this.state.survey
        tmp.name = value

        this.setState({survey: tmp})
    }

    validateSurvey(){
        if(this.state.survey.name === '') {
            alert('Survey name is required')
            return false
        }

        if(this.state.pages[0].data === undefined || this.state.pages[0].data.length === 0){
            alert('Survey Component is required')
            return false
        }

        return true
    }

    saveSurvey(){
        if(this.validateSurvey() === true){
            const data = {
                token: localStorage.getItem('token'),
                survey_id: this.state.survey._id,
                name: this.state.survey.name,
                time: this.state.timeTarget,
                target: this.state.unitTarget,
                star: 3,
                pages: surveyUtils.convertPageToString(this.state.pages)
            }

            this.props.saveSurvey(data)
        }
    }


    render() {
        return(
            <span>
                <div className={'page-mid-space design-survey'}>
                    <InputGroup className={'edit-survey-input'}>
                        <FormControl
                            type="text"
                            value={this.props.survey.name}
                            onChange={e => this.changeSurveyName(e.target.value)}
                            placeholder="Input survey name here"/>
                    </InputGroup>
                    {this.state.trailer === false ?
                        <Button onClick={e => this.saveSurvey()} className={'btn-save-survey'}>Save</Button>:
                        <Button onClick={e => this.showTrailer(false)} className={'btn-save-survey'}>Back</Button>
                    }

                </div>
                <div className="page-content design-page">
                    {this.state.trailer === true ?
                        <RunSurvey data={this.state.pages} trailer={'true'}/>
                        :
                        <div className={'survey-content'}>
                            <span className={'toolbox'}><b>TOOL BOX</b></span>
                            <span className={'setting-group-btn'}>
                              <span className={'btn-add-page'}><Button onClick={e => this.addPage()}><span className="glyphicon glyphicon-plus"/> Add Page</Button></span>
                                <Button onClick={e => this.showTrailer(true)}><span className="glyphicon glyphicon-expand"/> Trailer</Button>
                                <span className={'edit-setting'}><Button onClick={e => this.setShowSetting(true)}><span className="glyphicon glyphicon-cog"/> Setting</Button></span>
                            </span>
                            {this.state.showSettingModal === true ? <SurveySettingModal time={this.state.timeTarget} target={this.state.unitTarget} save={this.saveSetting} show={this.setShowSetting}/>: ''}

                            <div className={'edit-design'}>
                                <div className={'edit-toolbox'}>
                                    <table className={'toolbox-table'}>
                                        <tr>
                                            <td><span onClick={e => this.addComponent(1)}><span className="glyphicon glyphicon-text-width"/> Single Text</span></td>
                                        </tr>
                                        <tr>
                                            <td><span onClick={e => this.addComponent(9)}><span className="glyphicon glyphicon-sound-7-1"/> Number</span></td>
                                        </tr>
                                        <tr>
                                            <td><span onClick={e => this.addComponent(2)}><span className="glyphicon glyphicon-calendar"/> Birthdate</span></td>
                                        </tr>
                                        <tr>
                                            <td><span onClick={e => this.addComponent(3)}><span className="glyphicon glyphicon-certificate"/> Color</span></td>
                                        </tr>
                                        <tr>
                                            <td><span onClick={e => this.addComponent(4)}><span className="icon glyphicon glyphicon-envelope"/> Email</span></td>
                                        </tr>
                                        <tr>
                                            <td><span onClick={e => this.addComponent(5)}><span className="glyphicon glyphicon-check"/> Checkbox</span></td>
                                        </tr>
                                        <tr>
                                            <td><span onClick={e => this.addComponent(6)}><span className="glyphicon glyphicon-triangle-bottom"/> Dropdown</span></td>
                                        </tr>
                                        <tr>
                                            <td><span onClick={e => this.addComponent(7)}><span className="glyphicon glyphicon-comment"/> Comment</span></td>
                                        </tr>
                                        <tr>
                                            <td><span onClick={e => this.addComponent(8)}><span className="glyphicon glyphicon-th-large"/> Matrix</span></td>
                                        </tr>
                                    </table>
                                </div>
                                <div className={'edit-show'}>
                                    <div className={'edit-page-list'}>
                                        <ButtonToolbar>
                                            <ButtonGroup>
                                                {this.state.pages.map((page, index) => (
                                                    <Button onClick={e => this.setState({pageIndex: index})}>Page {index + 1}</Button>
                                                ))}
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                    </div>
                                    <div className={'show-area'}>
                                        <span onClick={e => this.removePage()} className="remove-page glyphicon glyphicon-remove"></span>
                                        <span className={'show-component'}>
                                        {this.state.pages.map((page, index) => (
                                            <div>
                                                {this.state.pageIndex === index ?
                                                    <div>
                                                        {page.data.map((component, i) => (
                                                            <span>
                                                                <div>
                                                                    {component.type === 1 || component.type === 2 || component.type === 3 || component.type === 7 || component.type === 4 || component.type === 9 ?
                                                                        <SingleInput
                                                                            question={component.component.question}
                                                                            isRequired={component.required}
                                                                            data={component}
                                                                            handleValue={this.handleChangeData}
                                                                            move={this.moveComponent}
                                                                            index={i}
                                                                            delete={this.delete}/>: ''}</div>
                                                                <div>{component.type === 5 || component.type === 6 ?
                                                                    <Checkbox
                                                                        isRequired={component.required}
                                                                        numberChange={component.component.numberChange}
                                                                        question={component.component.question}
                                                                        data={component}
                                                                        handleValue={this.handleChangeData}
                                                                        move={this.moveComponent}
                                                                        index={i}
                                                                        delete={this.delete}/>: ''}</div>
                                                                <div>{component.type === 8 ?
                                                                    <Matrix
                                                                        question={component.component.question}
                                                                        isRequired={component.required}
                                                                        numberChange={component.component.numberChange}
                                                                        data={component}
                                                                        handleValue={this.handleChangeData}
                                                                        move={this.moveComponent}
                                                                        index={i}
                                                                        delete={this.delete}/>: ''}</div>
                                                            </span>
                                                        ))}
                                                    </div>
                                                    : ''}
                                            </div>
                                        ))}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    }
                </div>
            </span>
        )
    }
}

const mapStateToProps = (state) => ({
    survey: state.survey
})

const mapDispatchToProps = dispatch => bindActionCreators({
    saveSurvey: surveyAction.saveSurvey
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DesignSurvey)
