import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Button, Modal, ControlLabel, InputGroup, FormControl} from 'react-bootstrap'
import PropTypes from "prop-types"
import * as surveyAction from './surveyAction'
import {CopyToClipboard} from "react-copy-to-clipboard";

class SurveyList extends React.Component {
    static propTypes = {
        changeView: PropTypes.func.isRequired,
        getAnswer: PropTypes.func.isRequired,
        publishSurvey: PropTypes.func.isRequired,
        getSurveyUrl: PropTypes.func.isRequired,
        getDetailSurvey: PropTypes.func.isRequired,
        deleteSurveyFromServer: PropTypes.func.isRequired,
        surveyList: PropTypes.array.isRequired,
        createNewSurvey: PropTypes.func.isRequired,
        header: PropTypes.object.isRequired,
        setShowModalLink: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.addNewSurvey = this.addNewSurvey.bind(this)
        this.setShowConfirm = this.setShowConfirm.bind(this)
        this.deleteSurvey = this.deleteSurvey.bind(this)
        this.setShowPublishConfirm = this.setShowPublishConfirm.bind(this)
        this.publishSurvey = this.publishSurvey.bind(this)
        this.getDetailSurvey = this.getDetailSurvey.bind(this)
        this.getUrl = this.getUrl.bind(this)
        this.getResult = this.getResult.bind(this)

        this.state = {
            showDeleteConfirm: false,
            surveyIndex: 0,
            showPublishConfirm: false,
            disableEdit: false,
            showUrl: false,
            value: '',
            copied: false,
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.header.showUrl !== undefined && nextProps.header.showUrl === true) {
            this.setState({showUrl: true})
            nextProps.setShowModalLink(false)
        }
    }

    getUrl(index){
        const data = {
            token: localStorage.getItem('token'),
            survey_id: this.props.surveyList[index]._id
        }

        this.props.getSurveyUrl(data)
    }

    addNewSurvey(){
        const data = {
            name: 'Khao sat ' + new Date().getMilliseconds(),
            token: localStorage.getItem('token'),
            target: 10,
            time: new Date().setDate(new Date().getDate() + 7)
        }

        this.props.createNewSurvey(data)
    }

    setShowConfirm(index, value){
        this.setState({surveyIndex: index})
        this.setState({showDeleteConfirm: value})
    }

    deleteSurvey(){
        const data = {
            token: localStorage.getItem('token'),
            survey_id: this.props.surveyList[this.state.surveyIndex]._id
        }
        this.props.deleteSurveyFromServer(data, this.state.surveyIndex)
        this.setState({showDeleteConfirm: false})
    }

    setShowPublishConfirm(index, value){
        this.setState({surveyIndex: index})
        this.setState({showPublishConfirm: value})
    }

    publishSurvey(){
        const data = {
            token: localStorage.getItem('token'),
            survey_id: this.props.surveyList[this.state.surveyIndex]._id
        }

        this.setState({showPublishConfirm: false})
        this.props.publishSurvey(data, this.state.surveyIndex)
    }

    getDetailSurvey(index){
        const data = {
            token: localStorage.getItem('token'),
            survey_id: this.props.surveyList[index]._id
        }
        this.props.getDetailSurvey(data)
    }

    getResult(index){
        const data = {
            token: localStorage.getItem('token'),
            survey_id: this.props.surveyList[index]._id
        }

        this.props.getAnswer(data)
    }

    render() {
        return (
            <span>
                <div className={'page-mid-space'} />
                <div className="page-content">
                    <div className={'survey-content'}>
                        <Button onClick={e => this.addNewSurvey()} bsStyle="success">Create Survey</Button>
                        <table>
                            <tbody>
                            {this.props.surveyList.map((survey, index) => (
                                <tr>
                                    <td className="survey-name">
                                        <b>{survey.name}</b>
                                    </td>
                                    <td>
                                        <Button onClick={e => this.getUrl(index)} disabled={!survey.active === true} className={'btn-survey'} bsStyle="info"><b>Get URL</b></Button>
                                        <Button disabled={survey.active === true}onClick={e => this.getDetailSurvey(index)} className={'btn-survey'} bsStyle="info"><b>Edit</b></Button>
                                        <Button disabled={survey.active === true} onClick={e => this.setShowPublishConfirm(index, true)} className={'btn-survey'} bsStyle="info"><b>Pulish</b></Button>
                                        <Button onClick={e => this.getResult(index)} className={'btn-survey'} bsStyle="info"><b>Result</b></Button>
                                        <Button onClick={e => this.setShowConfirm(index, true)} className={'btn-survey'} bsStyle="danger"><b>Delete</b></Button>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </div>
                </div>

                {this.state.showDeleteConfirm === false? '':
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title className={'confirm-delete'}>Do you want to delete this survey ?</Modal.Title>
                        </Modal.Header>

                        <Modal.Footer>
                            <Button onClick={e =>this.setShowConfirm(this.state.surveyIndex, false)}>Cancel</Button>
                            <Button onClick={e => this.deleteSurvey()} bsStyle="primary">Submit</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                }

                {this.state.showPublishConfirm === false ? '':
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title className={'confirm-delete'}>Publish Confirm</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <b className={'publish-confirm'}>After publish, this survey cannot edit</b>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={e =>this.setShowPublishConfirm(this.state.surveyIndex, false)}>Cancel</Button>
                            <Button onClick={e => this.publishSurvey()} bsStyle="primary">Submit</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                }

                {this.state.showUrl === false ? '':
                    <Modal.Dialog>
                        <Modal.Body>
                            <ControlLabel><b>Survey URL</b></ControlLabel>
                            <InputGroup>
                                <InputGroup.Addon><span className="glyphicon glyphicon-pencil" /></InputGroup.Addon>
                                <FormControl
                                    type="text"
                                    value={this.props.header.link}
                                />
                            </InputGroup>
                        </Modal.Body>

                        <Modal.Footer>
                          <CopyToClipboard text={this.props.header.link}
                                           onCopy={() => this.setState({copied: true})}>
                            <Button onClick={() => this.setState({showUrl: false})} bsStyle="warning">Copy</Button>
                          </CopyToClipboard>

                            <Button onClick={e => this.setState({showUrl: false})} bsStyle="primary">Close</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                }
            </span>
        )
    }
}

const mapStateToProps = (state) => ({
    surveyList: state.surveyList,
    header: state.header
})

const mapDispatchToProps = dispatch => bindActionCreators({
    createNewSurvey: surveyAction.createNewSurvey,
    deleteSurveyFromServer: surveyAction.deleteSurveyFromServer,
    publishSurvey: surveyAction.publishSurvey,
    getDetailSurvey: surveyAction.getDetailSurvey,
    getSurveyUrl: surveyAction.getSurveyUrl,
    getAnswer: surveyAction.getAnswer,
    setShowModalLink: surveyAction.setShowModalLink
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList)
