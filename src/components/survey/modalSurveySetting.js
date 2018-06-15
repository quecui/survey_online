import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Button, FormControl, InputGroup, Modal, FormGroup, ControlLabel} from 'react-bootstrap'
import PropTypes from "prop-types";

class SurveySettingModal extends React.Component {
    static propTypes = {
        show: PropTypes.func.isRequired,
        save: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            unitTarget: '',
            timeTarget: '',
            message: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.save = this.save.bind(this)
    }

    handleChange(key, value){
        if(key === 1){
            this.setState({unitTarget: value})
        }

        if(key === 2){
            this.setState({timeTarget: value})
        }
    }

    save(){
        if(this.state.timeTarget === '' || this.state.unitTarget === '') {
            this.setState({message: 'Please complete form'})
        } else {
            this.setState({message: ''})
            this.props.save(this.state.unitTarget, this.state.timeTarget)
            this.props.show(false)
        }
    }

    render() {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header className={'setting-title'}>
                        <Modal.Title><b><span className="glyphicon glyphicon-cog"/> Setting</b></Modal.Title>
                    </Modal.Header>
                    <form>
                        <Modal.Body>
                            <span className={'signin-message'}>{this.state.message}</span>
                            <FormGroup controlId="formValidationSuccess2" validationState=''>
                                <ControlLabel className={'signin-form'}>Unit Target</ControlLabel>
                                <InputGroup>
                                    <InputGroup.Addon><span className="glyphicon glyphicon-pencil" /></InputGroup.Addon>
                                    <FormControl
                                        type="number"
                                        value={this.state.unitTarget}
                                        onChange={e => this.handleChange(1, e.target.value)}
                                        placeholder="Input unit target here"/>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup controlId="formValidationSuccess2" validationState=''>
                                <ControlLabel className={'signin-form sigin-form-pass'}>Time Target</ControlLabel>
                                <InputGroup className={'signin-bot-space'}>
                                    <InputGroup.Addon><span className="glyphicon glyphicon-pencil" /></InputGroup.Addon>
                                    <FormControl
                                        type="date"
                                        value={this.state.timeTarget}
                                        onChange={e => this.handleChange(2, e.target.value)}
                                        placeholder="Input password here"
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={e => this.props.show(false)}>Close</Button>
                            <Button onClick={e => this.save()} bsStyle="primary">Submit</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SurveySettingModal)
