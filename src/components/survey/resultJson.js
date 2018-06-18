import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactJson from 'react-json-view'
import {Button} from 'react-bootstrap'
import PropTypes from "prop-types"

class ResultJson extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        surveyId: PropTypes.string.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            isFormatJson: []
        }

        this.setFormatIndex = this.setFormatIndex.bind(this)
    }

    componentWillMount(){
        const tmp = []
        this.props.data.map(question => {
            tmp.push(false)
        })

        this.setState({isFormatJson: tmp})
    }

    setFormatIndex(index, value){
        const tmp = this.state.isFormatJson
        tmp[index] = value
        this.setState({isFormatJson: tmp})
    }

    render() {
        return (
            <div>
                <table className={'table-result'}>
                    <tr className={'header-result'}>
                        <th className={'th-table-format'}>STT</th>
                        <th>Results</th>
                        <th className={'th-table-format'}>JSON Format</th>
                    </tr>
                    {this.props.data.map((question, index) => (
                        <tr>
                            <td className={'header-stt'}>{index + 1}</td>
                            <td className={'content-stt'}>
                                {this.state.isFormatJson[index] === false ? JSON.stringify(question): <ReactJson src={question} />}
                            </td>
                            <td>
                                {this.state.isFormatJson[index] === false ?
                                    <Button onClick={e => this.setFormatIndex(index, true)}>Json</Button>:
                                    <Button onClick={e => this.setFormatIndex(index, false)}>Raw</Button>
                                }

                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ResultJson)
