import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from "prop-types";
import {Button, FormControl, InputGroup, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import SurveySettingModal from './modalSurveySetting'
import * as surveyUtils from '../../utils/survey'
import SingleText from './surveyComponent/singletext'
import Birthdate from './surveyComponent/birthdate'
import Checkbox from './surveyComponent/checkbox'
import Color from './surveyComponent/color'
import Comment from './surveyComponent/comment'
import Dropbox from './surveyComponent/dropbox'
import Matrix from './surveyComponent/matrix'
import Email from './surveyComponent/email'
import Number from './surveyComponent/number'

class DesignSurvey extends React.Component {
    static propTypes = {
        survey: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            showSettingModal: false,
            unitTarget: 0,
            timeTarget: '',

            pages: this.props.survey.pages,
            pageIndex: 0
        }

        this.setShowSetting = this.setShowSetting.bind(this)
        this.saveSetting = this.saveSetting.bind(this)
        this.addPage = this.addPage.bind(this)
        this.removePage = this.removePage.bind(this)
        this.addComponent = this.addComponent.bind(this)
        this.delete = this.delete.bind(this)
        this.moveComponent = this.moveComponent.bind(this)
    }

    setShowSetting(value){
        this.setState({showSettingModal: value})
    }

    saveSetting(unit, time){
        this.setState({unitTarget: unit})
        this.setState({timeTarget: time})
        alert(time)
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

    render() {
        return(
            <span>
                <div className={'page-mid-space design-survey'}>
                    <InputGroup className={'edit-survey-input'}>
                        <FormControl
                            type="text"
                            value="Hard Grass"
                            placeholder="Input survey name here"/>
                    </InputGroup>

                    <Button className={'btn-save-survey'}>Save</Button>
                </div>
                <div className="page-content design-page">
                    <div className={'survey-content'}>
                        <span className={'toolbox'}><b>TOOL BOX</b></span>
                        <span className={'btn-add-page'}><Button onClick={e => this.addPage()}><span className="glyphicon glyphicon-plus"/> Add Page</Button></span>
                        <span className={'edit-setting'}><Button onClick={e => this.setShowSetting(true)}><span className="glyphicon glyphicon-cog"/> Setting</Button></span>
                        {this.state.showSettingModal === true ? <SurveySettingModal save={this.saveSetting} show={this.setShowSetting}/>: ''}

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
                                                                <div>{component.type === 1 ? <SingleText move={this.moveComponent} index={i} delete={this.delete}/>: ''}</div>
                                                                <div>{component.type === 2 ? <Birthdate move={this.moveComponent} index={i} delete={this.delete}/>: ''}</div>
                                                                <div>{component.type === 5 ? <Checkbox move={this.moveComponent} index={i} delete={this.delete}/>: ''}</div>
                                                                <div>{component.type === 3 ? <Color move={this.moveComponent} index={i} delete={this.delete}/>: ''}</div>
                                                                <div>{component.type === 7 ? <Comment move={this.moveComponent} index={i} delete={this.delete}/>: ''}</div>
                                                                <div>{component.type === 6 ? <Dropbox move={this.moveComponent} index={i} delete={this.delete}/>: ''}</div>
                                                                <div>{component.type === 4 ? <Email move={this.moveComponent} index={i} delete={this.delete} />: ''}</div>
                                                                <div>{component.type === 8 ? <Matrix move={this.moveComponent} index={i} delete={this.delete}/>: ''}</div>
                                                                <div>{component.type === 9 ? <Number move={this.moveComponent} index={i} delete={this.delete}/>: ''}</div>
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
                </div>
            </span>
        )
    }
}

const mapStateToProps = (state) => ({
    survey: state.survey
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DesignSurvey)
