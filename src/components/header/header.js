import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import SignIn from '../form/signin'
import SignUp from '../form/signup'
import '../../assets/css/survey.css'

class Header extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.setShowSignInForm = this.setShowSignInForm.bind(this)
        this.setShowSignUpForm = this.setShowSignUpForm.bind(this)
        this.submitSignIn = this.submitSignIn.bind(this)
        this.switchForm = this.switchForm.bind(this)
        this.submitSignUp = this.submitSignUp.bind(this)

        this.state = {
            showSignInForm: false,
            showSignUpForm: false
        }
    }

    setShowSignInForm(flag){
        this.setState({showSignInForm: flag})
    }

    setShowSignUpForm(flag){
        this.setState({showSignUpForm: flag})
    }

    submitSignIn(username, password) {
        alert(username)
        alert(password)

        this.setShowSignInForm(false)
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

    render(){
        return (
            <div>
                <Navbar className={'header-bg'}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/"><span className="icon glyphicon glyphicon-home"></span> <b>HOME</b></a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem className={'welcome-user'}>
                                <span><span className="icon glyphicon glyphicon-user"></span> Storm Spirit</span>
                            </NavItem>
                            <NavItem eventKey={1} href="survey">
                                <span className="icon glyphicon glyphicon-th"></span> SURVEY
                            </NavItem>
                            <NavItem eventKey={1} href="contact">
                                <span className="icon glyphicon glyphicon-envelope"></span> CONTACT
                            </NavItem>

                            <NavItem eventKey={1} href="about">
                                <span className="icon glyphicon glyphicon-list-alt"></span> ABOUT
                            </NavItem>
                            <NavItem eventKey={2} href="#" onClick={e => this.setShowSignInForm(true)}>
                                <span className="icon glyphicon glyphicon-log-in"></span> SIGNIN
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                {this.state.showSignInForm === true ? <SignIn show={this.setShowSignInForm} submit={this.submitSignIn} changeForm={this.switchForm}/>: ""}
                {this.state.showSignUpForm === true ? <SignUp changeForm={this.switchForm} submit={this.submitSignUp} show={this.setShowSignUpForm}/> : ''}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
