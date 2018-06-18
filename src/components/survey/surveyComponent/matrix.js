import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {ControlLabel, InputGroup, FormControl, Button} from 'react-bootstrap'
import PropTypes from "prop-types";

class Matrix extends React.Component {
    static propTypes = {
        delete: PropTypes.func.isRequired,
        handleValue: PropTypes.func.isRequired,
        move: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.addRowOption = this.addRowOption.bind(this)
        this.addColOption = this.addColOption.bind(this)
        this.deleteColValue = this.deleteColValue.bind(this)
        this.deleteRowValue = this.deleteRowValue.bind(this)
        this.handleRowChange = this.handleRowChange.bind(this)
        this.handleColChange = this.handleColChange.bind(this)
    }

    addRowOption(){
        const tmp = this.props.data
        tmp.component.rowOptions.push('Option ' + new Date().getMilliseconds())
        tmp.component.numberChange = tmp.component.numberChange + 1
        this.props.handleValue(this.props.index, tmp)
    }

    addColOption(){
        const tmp = this.props.data
        tmp.component.colOptions.push('Option ' + new Date().getMilliseconds())
        tmp.component.numberChange = tmp.component.numberChange + 1
        this.props.handleValue(this.props.index, tmp)
    }

    deleteColValue(index){
        const tmp = this.props.data
        tmp.component.colOptions.splice(index, 1)
        tmp.component.numberChange = tmp.component.numberChange - 1
        this.props.handleValue(this.props.index, tmp)
    }

    deleteRowValue(index){
        const tmp = this.props.data
        tmp.component.rowOptions.splice(index, 1)
        tmp.component.numberChange = tmp.component.numberChange - 1
        this.props.handleValue(this.props.index, tmp)
    }

    handleRowChange(value, index){
        const tmp = this.props.data
        tmp.component.rowOptions[index] = value
        tmp.component.numberChange = tmp.component.numberChange +1
        this.props.handleValue(this.props.index, tmp)
    }

    handleColChange(value, index){
        const tmp = this.props.data
        tmp.component.colOptions[index] = value
        tmp.component.numberChange = tmp.component.numberChange +1
        this.props.handleValue(this.props.index, tmp)
    }

    render() {
        return (
            <div className={'component-survey'}>
                <div className={'single-text'}>
                    <div className={'single-text-name'}>
                        <ControlLabel className={'signin-form'}>Matrix</ControlLabel>
                        <span className={'select-type-text'}>
                             <input type={'checkbox'}></input> Required
                             <span onClick={e => this.props.move(this.props.index, 1)}><span className="glyphicon glyphicon-triangle-top" />Up</span>
                             <span onClick={e => this.props.move(this.props.index, 2)}><span className="glyphicon glyphicon-triangle-bottom" />Down</span>
                        </span>
                    </div>
                    <div className={'single-text-input'}>
                        <div className={'text-question'}>
                            <InputGroup>
                                <InputGroup.Addon><span className="glyphicon glyphicon-pencil" /></InputGroup.Addon>
                                <FormControl
                                    type="text"
                                    placeholder="Input your question here" />
                                <FormControl.Feedback />
                            </InputGroup>
                        </div>
                        <div onClick={e => this.props.delete(this.props.index)} className="glyphicon glyphicon-trash" />

                        <div className={'option-answer'}>
                            <div>
                                <b>Option Answer</b>
                            </div>

                            <div className={'option-answer-content matrix'}>
                                <table className={'table-left'}>
                                    <tr>
                                        <th>Row Options <span onClick={e => this.addRowOption()} className={'matrix-add '}><span className="glyphicon glyphicon-screenshot"/> Create New</span></th>
                                    </tr>
                                    {this.props.data.component.rowOptions.map((option, index) => (
                                        <tr>
                                            <td>
                                                <InputGroup className={'matrix-input'}>
                                                    <FormControl
                                                        type="text"
                                                        value={option}
                                                        onChange={e => this.handleRowChange(e.target.value, index)}
                                                        placeholder="Input your value here" />
                                                    <InputGroup.Button><Button onClick={e => this.deleteRowValue(index)}>&#10006;</Button></InputGroup.Button>
                                                </InputGroup>
                                            </td>
                                        </tr>
                                    ))}
                                </table>

                                <table className={'table-right'}>
                                    <tr>
                                        <th>Column Options <span onClick={e => this.addColOption()} className={'matrix-add '}><span className="glyphicon glyphicon-screenshot"/> Create New</span></th>
                                    </tr>
                                    {this.props.data.component.colOptions.map((option, index) => (
                                        <tr>
                                            <td>
                                                <InputGroup className={'matrix-input'}>
                                                    <FormControl
                                                        type="text"
                                                        value={option}
                                                        onChange={e => this.handleColChange(e.target.value, index)}
                                                        placeholder="Input your value here" />
                                                    <InputGroup.Button><Button onClick={e => this.deleteColValue(index)}>&#10006;</Button></InputGroup.Button>
                                                </InputGroup>
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                                <div className={'clear'}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Matrix)
