import React from 'react'
import {Button} from 'react-bootstrap'

class Survey extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.props = props;
    }

    render() {
        return (
            <div className="page-body">
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
                                    <Button className={'btn-survey'} bsStyle="info"><b>Edit</b></Button>
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
            </div>
        )
    }
}

export default Survey
