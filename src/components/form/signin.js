import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Modal, Button, ControlLabel, FormControl, InputGroup, FormGroup} from 'react-bootstrap'
import PropTypes from "prop-types";

class SignIn extends React.Component {
    static propTypes = {
        show: PropTypes.func.isRequired,
        submit: PropTypes.func.isRequired,
        changeForm: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props

        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)

        this.state = {
            username: '',
            password: '',
            message: ''
        }
    }

    handleChange(key, value){
        if(key === 1) {
            this.setState({username: value})
        } else {
            this.setState({password: value})
        }
    }

    submit(){
        if(this.state.username === '' || this.state.password === '') {
            this.setState({message: 'Please Complete Form'})
        }
        else {
            this.setState({message: ''})
            this.props.submit(this.state.username, this.state.password)
            this.props.show(false)
        }
    }

    render() {
        return(
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title><b>SIGNIN</b></Modal.Title>
                    </Modal.Header>
                    <form>
                        <Modal.Body>
                            <span className={'signin-message'}>{this.state.message}</span>
                            <FormGroup controlId="formValidationSuccess2" validationState=''>
                                <ControlLabel className={'signin-form'}>Username</ControlLabel>
                                <InputGroup>
                                    <InputGroup.Addon><span className="glyphicon glyphicon-pencil" /></InputGroup.Addon>
                                    <FormControl
                                        type="text"
                                        value={this.state.username}
                                        placeholder="Input username here"
                                        onChange={e => this.handleChange(1, e.target.value)} required/>
                                    <FormControl.Feedback />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup controlId="formValidationSuccess2" validationState=''>
                                <ControlLabel className={'signin-form sigin-form-pass'}>Password</ControlLabel>
                                <InputGroup className={'signin-bot-space'}>
                                    <InputGroup.Addon><span className="glyphicon glyphicon-pencil" /></InputGroup.Addon>
                                    <FormControl
                                        type="password"
                                        value={this.state.password}
                                        placeholder="Input password here"
                                        onChange={e => this.handleChange(2, e.target.value)}
                                    />
                                    <FormControl.Feedback />
                                </InputGroup>
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <a className={'signup-link'} href={'#register'} onClick={e => this.props.changeForm(1)}>Signup Now!</a>
                            <Button onClick={e => this.props.show(false)}>Close</Button>
                            <Button onClick={e => this.submit()} bsStyle="primary">Submit</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
