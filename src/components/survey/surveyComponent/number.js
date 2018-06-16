import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {ControlLabel, InputGroup, FormControl} from 'react-bootstrap'
import PropTypes from "prop-types";

class Number extends React.Component {
    static propTypes = {
        delete: PropTypes.func.isRequired,
        move: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;
    }

    render() {
        return (
            <div className={'component-survey'}>
                <div className={'single-text'}>
                    <div className={'single-text-name'}>
                        <ControlLabel className={'signin-form'}>Number</ControlLabel>
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
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Number)
