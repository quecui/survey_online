import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from "prop-types";
import {Button, FormControl, InputGroup, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import SurveySettingModal from './modalSurveySetting'
import * as surveyUtils from '../../utils/survey'
import SingleText from './surveyComponent/singletext'

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
                                        <td><span onClick={e => this.addComponent(2)}><span className="glyphicon glyphicon-calendar"/> Birthdate</span></td>
                                    </tr>
                                    <tr>
                                        <td><span><span className="glyphicon glyphicon-certificate"/> Color</span></td>
                                    </tr>
                                    <tr>
                                        <td><span><span className="icon glyphicon glyphicon-envelope"/> Email</span></td>
                                    </tr>
                                    <tr>
                                        <td><span><span className="glyphicon glyphicon-check"/> Checkbox</span></td>
                                    </tr>
                                    <tr>
                                        <td><span><span className="glyphicon glyphicon-triangle-bottom"/> Dropdown</span></td>
                                    </tr>
                                    <tr>
                                        <td><span><span className="glyphicon glyphicon-comment"/> Comment</span></td>
                                    </tr>
                                    <tr>
                                        <td><span><span className="glyphicon glyphicon-th-large"/> Matrix</span></td>
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
                                                                <div>{component.type === 1 ? <SingleText />: ''}</div>
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
