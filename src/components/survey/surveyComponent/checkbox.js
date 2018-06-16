import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {ControlLabel, InputGroup, FormControl} from 'react-bootstrap'
import PropTypes from "prop-types";

class Checkbox extends React.Component {
    static propTypes = {
        delete: PropTypes.func.isRequired,
        handleValue: PropTypes.func.isRequired,
        move: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
        question: PropTypes.string.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.handleQuestion = this.handleQuestion.bind(this)
        this.handleOption = this.handleOption.bind(this)
        this.deteleOption = this.deteleOption.bind(this)
        this.addOption = this.addOption.bind(this)
    }

    handleQuestion(question){
        const tmp = this.props.data
        tmp.component.question = question

        this.props.handleValue(this.props.index, tmp)
    }

    handleOption(index, value){
        const tmp = this.props.data
        tmp.component.options[index] = value
        tmp.component.numberChange = tmp.component.numberChange + 1

        this.props.handleValue(this.props.index, tmp)
    }

    deteleOption(index){
        const tmp = this.props.data
        tmp.component.options.splice(index, 1)
        tmp.component.numberChange = tmp.component.numberChange - 1
        this.props.handleValue(this.props.index, tmp)
    }

    addOption(){
        const tmp = this.props.data
        tmp.component.options.push('Option ' + new Date().getMilliseconds())
        tmp.component.numberChange = tmp.component.numberChange + 1

        this.props.handleValue(this.props.index, tmp)
    }

    render() {
        return (
            <div className={'component-survey'}>
                <div className={'single-text'}>
                    <div className={'single-text-name'}>
                        <ControlLabel className={'signin-form'}>{this.props.data.name}</ControlLabel>
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
                                    value={this.props.question}
                                    onChange={e => this.handleQuestion(e.target.value)}
                                    placeholder="Input your question here" />
                                <FormControl.Feedback />
                            </InputGroup>
                        </div>
                        <div onClick={e => this.props.delete(this.props.index)} className="glyphicon glyphicon-trash" />

                        <div className={'option-answer'}>
                            <div>
                                <b>Option Answer</b>
                                <span onClick={e => this.addOption()} className="glyphicon glyphicon-plus-sign"/>
                            </div>

                            <div className={'option-answer-content'}>
                                <table>
                                    {this.props.data.component.options.map((option, index) => (
                                        <tr>
                                            <td>
                                                <InputGroup>
                                                    <InputGroup.Addon><span className="glyphicon glyphicon-map-marker" /></InputGroup.Addon>
                                                    <FormControl
                                                        type="text"
                                                        value={option}
                                                        onChange={e => this.handleOption(index, e.target.value)}
                                                        placeholder="Input your value here" />
                                                    <FormControl.Feedback />
                                                </InputGroup>
                                            </td>
                                            <td><span onClick={e => this.deteleOption(index)} className="glyphicon glyphicon-trash" /></td>
                                        </tr>
                                    ))}
                                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox)
