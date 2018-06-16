import React from 'react'
import {ControlLabel, InputGroup, FormControl, Button} from 'react-bootstrap'
import PropTypes from "prop-types";

class SingleInput extends React.Component {
    static propTypes = {
        delete: PropTypes.func.isRequired,
        move: PropTypes.func.isRequired,
        handleValue: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
        question: PropTypes.string.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(question){
        const tmp = this.props.data
        tmp.component.question = question

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
                                <InputGroup.Button><Button><span className="icon-btn glyphicon glyphicon-pencil" /></Button></InputGroup.Button>
                                <FormControl
                                    type="text"
                                    value={this.props.question}
                                    onChange={e => this.handleChange(e.target.value)}
                                    placeholder="Input your question here" />
                                <FormControl.Feedback />
                            </InputGroup>
                        </div>
                        <div onClick={e => this.props.delete(this.props.index)} className="glyphicon glyphicon-trash" />
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleInput
