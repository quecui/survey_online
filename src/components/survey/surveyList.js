import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Button} from 'react-bootstrap'
import PropTypes from "prop-types"

class SurveyList extends React.Component {
    static propTypes = {
        changeView: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;
    }

    render() {
        return (
            <span>
                <div className={'page-mid-space'} />
                <div className="page-content">
                    <div className={'survey-content'}>
                        <Button bsStyle="success">Create Survey</Button>
                        <table>
                            <tbody>
                            <tr>
                                <td className="survey-name">
                                    <b>Survey 1234</b>
                                </td>
                                <td>
                                    <Button className={'btn-survey'} bsStyle="info"><b>Get URL</b></Button>
                                    <Button onClick={e => this.props.changeView(1)} className={'btn-survey'} bsStyle="info"><b>Edit</b></Button>
                                    <Button className={'btn-survey'} bsStyle="info"><b>Pulish</b></Button>
                                    <Button className={'btn-survey'} bsStyle="info"><b>Result</b></Button>
                                    <Button className={'btn-survey'} bsStyle="danger"><b>Delete</b></Button>
                                </td>
                            </tr>

                            <tr className={'vd'}>
                                <td className="survey-name">
                                    <b>Survey 1234</b>
                                </td>
                                <td>
                                    <Button className={'btn-survey'} bsStyle="info"><b>Get URL</b></Button>
                                    <Button className={'btn-survey'} bsStyle="info"><b>Edit</b></Button>
                                    <Button className={'btn-survey'} bsStyle="info"><b>Pulish</b></Button>
                                    <Button className={'btn-survey'} bsStyle="info"><b>Result</b></Button>
                                    <Button className={'btn-survey'} bsStyle="danger"><b>Delete</b></Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </span>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList)
