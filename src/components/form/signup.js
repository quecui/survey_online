import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Modal, Button, ControlLabel, FormControl, InputGroup, FormGroup} from 'react-bootstrap'
import PropTypes from "prop-types";

class SignUp extends React.Component {
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
        this.validate = this.validate.bind(this)

        this.state = {
            username: '',
            password: '',
            email: '',
            repeatPassword: '',
            message: ''
        }
    }

    handleChange(key, value){
        switch (key){
            case 1:
                this.setState({username: value})
                break

            case 2:
                this.setState({email: value})
                break

            case 3:
                this.setState({password: value})
                break

            case 4:
                this.setState({repeatPassword: value})
                break

            default:
                alert('No matched')
        }
    }

    submit(){
        if(this.state.username === '' || this.state.password === '' || this.state.email === '' || this.state.repeatPassword === '') {
            this.setState({message: 'Please Complete Form'})
            return 0
        }

        if(this.validate() === true)
           this.props.submit(this.state.username, this.state.email, this.state.password)
        return 1
    }

    validate(){
        if(this.state.username.length < 5){
            this.setState({message: 'Min length of username is 5 required'})
            return false
        }
        if(this.state.password.length < 5){
            this.setState({message: 'Min length of password is 5 required'})
            return false
        }

        if(this.state.password !== this.state.repeatPassword){
            this.setState({message: 'Password and Repeat-Password is different'})
            return false
        }

        if(this.state.email.indexOf('@') < 0){
            this.setState({message: 'Email is wrong format'})
            return false
        }

        this.setState({message: ''})
        return true
    }

    render() {
        return(
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title><b>SIGNUP</b></Modal.Title>
                    </Modal.Header>
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
                                    onChange={e => this.handleChange(1, e.target.value)}/>
                                <FormControl.Feedback />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup controlId="formValidationSuccess2" validationState=''>
                            <ControlLabel className={'signin-form'}>Email</ControlLabel>
                            <InputGroup>
                                <InputGroup.Addon><span className="glyphicon glyphicon-pencil" /></InputGroup.Addon>
                                <FormControl
                                    type="email"
                                    value={this.state.email}
                                    placeholder="Input email here"
                                    onChange={e => this.handleChange(2, e.target.value)}/>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup controlId="formValidationSuccess2" validationState=''>
                            <ControlLabel className={'signin-form'}>Password</ControlLabel>
                            <InputGroup className={'signin-bot-space'}>
                                <InputGroup.Addon><span className="glyphicon glyphicon-pencil" /></InputGroup.Addon>
                                <FormControl
                                    type="password"
                                    value={this.state.password}
                                    placeholder="Input password here"
                                    onChange={e => this.handleChange(3, e.target.value)}
                                />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup controlId="formValidationSuccess2" validationState=''>
                            <ControlLabel className={'signin-form'}>Repeat Password</ControlLabel>
                            <InputGroup>
                                <InputGroup.Addon><span className="glyphicon glyphicon-pencil" /></InputGroup.Addon>
                                <FormControl
                                    type="password"
                                    value={this.state.repeatPassword}
                                    placeholder="Input password again"
                                    onChange={e => this.handleChange(4, e.target.value)}/>
                            </InputGroup>
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <a className={'signup-link'} href={'#register'} onClick={e => this.props.changeForm(2)}>Signin Now!</a>
                        <Button onClick={e => this.props.show(false)}>Close</Button>
                        <Button onClick={e => this.submit()} bsStyle="primary">Submit</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
