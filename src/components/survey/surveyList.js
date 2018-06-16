import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Button, Modal} from 'react-bootstrap'
import PropTypes from "prop-types"
import * as surveyAction from './surveyAction'

class SurveyList extends React.Component {
    static propTypes = {
        changeView: PropTypes.func.isRequired,
        deleteSurvey: PropTypes.func.isRequired,
        surveyList: PropTypes.array.isRequired,
        createNewSurvey: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.addNewSurvey = this.addNewSurvey.bind(this)
        this.setShowConfirm = this.setShowConfirm.bind(this)
        this.deleteSurvey = this.deleteSurvey.bind(this)
        this.setShowPublishConfirm = this.setShowPublishConfirm.bind(this)
        this.publishSurvey = this.publishSurvey.bind(this)

        this.state = {
            showDeleteConfirm: false,
            surveyIndex: 0,
            showPublishConfirm: false
        }
    }

    addNewSurvey(){
        const data = {
            name: 'Khao sat ' + new Date().getMilliseconds(),
            pages: [
                {
                    data: [
                        {
                            type: 7,
                            name: 'Commnent',
                            component: {
                                question: 'Which color do you like ?',
                                answer: ''
                            },
                            required: 'none'
                        }
                    ]
                }
            ]
        }

        this.props.createNewSurvey(data)
    }

    setShowConfirm(index, value){
        this.setState({surveyIndex: index})
        this.setState({showDeleteConfirm: value})
    }

    deleteSurvey(){
        this.props.deleteSurvey(this.state.surveyIndex)
        this.setState({showDeleteConfirm: false})
    }

    setShowPublishConfirm(index, value){
        this.setState({surveyIndex: index})
        this.setState({showPublishConfirm: value})
    }

    publishSurvey(){
        this.setState({showPublishConfirm: false})
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
                                        <Button className={'btn-survey'} bsStyle="info"><b>Get URL</b></Button>
                                        <Button onClick={e => this.props.changeView(1)} className={'btn-survey'} bsStyle="info"><b>Edit</b></Button>
                                        <Button onClick={e => this.setShowPublishConfirm(index, true)} className={'btn-survey'} bsStyle="info"><b>Pulish</b></Button>
                                        <Button className={'btn-survey'} bsStyle="info"><b>Result</b></Button>
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
            </span>
        )
    }
}

const mapStateToProps = (state) => ({
    surveyList: state.surveyList
})

const mapDispatchToProps = dispatch => bindActionCreators({
    createNewSurvey: surveyAction.addNewSurvey,
    deleteSurvey: surveyAction.deleteSurvey
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList)
