import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {ControlLabel, Checkbox, FormGroup} from 'react-bootstrap'
import PropTypes from "prop-types"

class CheckboxCom extends React.Component {
    static propTypes = {
        trailer: PropTypes.string,
        data: PropTypes.object,
        index: PropTypes.number,
        handleChangeData: PropTypes.func
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(answer){
        if(this.props.trailer !== 'true'){
            const tmp = this.props.data
            tmp.component.answer = answer
            this.props.handleChangeData(this.props.index, tmp)
        }
    }

    render() {
        return (
            <div className={'do-singletext'}>
                <ControlLabel>{this.props.index + 1}. {this.props.data.component.question}</ControlLabel>
                <FormGroup className={'checkbox-survey'}>
                    {this.props.data.component.options.map((option, index) => (
                        <div className={'checkbox-survey'}>
                                <Checkbox inline>{option}</Checkbox>
                        </div>
                    ))}

                </FormGroup>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxCom)
