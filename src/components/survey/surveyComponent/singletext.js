import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {ControlLabel, InputGroup, FormControl} from 'react-bootstrap'

class SingleText extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.props = props;
    }

    render() {
        return (
            <div className={'component-survey'}>
                <div className={'single-text'}>
                    <div className={'single-text-name'}>
                        <ControlLabel className={'signin-form'}>SingleText</ControlLabel>
                        <span className={'select-type-text'}>
                             <input type={'checkbox'}></input> Required
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
                        <div className="glyphicon glyphicon-trash" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SingleText)
