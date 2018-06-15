import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import * as formAction from '../form/formAction'
import SignIn from '../form/signin'
import SignUp from '../form/signup'
import '../../assets/css/survey.css'

class Header extends Component {
    static propTypes = {
        signIn: PropTypes.func.isRequired,
        showSignInForm: PropTypes.func.isRequired,
        header: PropTypes.object.isRequired,
        getUsernameByToken: PropTypes.func.isRequired,
        showUsernameInHeader: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.props = props;

        this.setShowSignInForm = this.setShowSignInForm.bind(this)
        this.setShowSignUpForm = this.setShowSignUpForm.bind(this)
        this.submitSignIn = this.submitSignIn.bind(this)
        this.switchForm = this.switchForm.bind(this)
        this.submitSignUp = this.submitSignUp.bind(this)
        this.signout = this.signout.bind(this)
        this.requireSignIn = this.requireSignIn.bind(this)

        this.state = {
            showSignInForm: false,
            showSignUpForm: false,
            isRedirect: false
        }
    }
    componentWillMount() {
        const token = localStorage.getItem('userToken')

        if(token !== null && token !== undefined){
            this.props.getUsernameByToken(token)
        }

        if(localStorage.getItem('signinForm') !== null){
            this.setState({showSignInForm: true})
            localStorage.removeItem('signinForm')
        }

    }

    setShowSignInForm(flag){
        this.setState({showSignInForm: flag})
    }

    setShowSignUpForm(flag){
        this.setState({showSignUpForm: flag})
    }

    submitSignIn(username, password) {
        this.setShowSignInForm(false)
        this.props.signIn({name: username, pass: password})
    }

    switchForm(key){
        if(key === 1){
            this.setShowSignInForm(false)
            this.setShowSignUpForm(true)
        } else {
            this.setShowSignUpForm(false)
            this.setShowSignInForm(true)
        }
    }

    submitSignUp(username, email, password){
        alert(username)
        alert(email)
        alert(password)
    }

    signout(){
        this.setState({isRedirect: true})
        localStorage.clear();
        this.props.showUsernameInHeader('')
    }

    requireSignIn(){
        if(this.props.header.username === ''){
            localStorage.setItem('signinForm', true)
        }
    }

    render(){
        return (
            <div>
                {this.state.isRedirect === true ? <Redirect to='/'/>: ''}
                <Navbar className={'header-bg'}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/"><span className="icon glyphicon glyphicon-home"></span> <b>HOME</b></a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            {this.props.header.username === '' ? '' :
                                <NavItem className={'welcome-user'}>
                                    <span><span className="icon glyphicon glyphicon-user"></span> {this.props.header.username}</span>
                                </NavItem>
                            }

                            <NavItem eventKey={1} href="survey" onClick={e => this.requireSignIn()}>
                                <span className="icon glyphicon glyphicon-th"></span> SURVEY
                            </NavItem>
                            <NavItem eventKey={1} href="contact">
                                <span className="icon glyphicon glyphicon-envelope"></span> CONTACT
                            </NavItem>

                            <NavItem eventKey={1} href="about">
                                <span className="icon glyphicon glyphicon-list-alt"></span> ABOUT
                            </NavItem>
                            {this.props.header.username === '' ?
                                <NavItem eventKey={2} href="#" onClick={e => this.setShowSignInForm(true)}>
                                    <span className="icon glyphicon glyphicon-log-in"></span> SIGNIN
                                </NavItem> :
                                <NavItem eventKey={2} href="#" onClick={e => this.signout()}>
                                    <span className="icon glyphicon glyphicon-log-out"></span> SIGNOUT
                                </NavItem>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                {this.state.showSignInForm === true ? <SignIn show={this.setShowSignInForm} submit={this.submitSignIn} changeForm={this.switchForm}/>: ""}
                {this.state.showSignUpForm === true ? <SignUp changeForm={this.switchForm} submit={this.submitSignUp} show={this.setShowSignUpForm}/> : ''}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        header: state.header,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    signIn: formAction.signIn,
    showUsernameInHeader: formAction.showUsernameInHeader,
    getUsernameByToken: formAction.getUsernameByToken
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
