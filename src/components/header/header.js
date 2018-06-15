import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import '../../assets/css/survey.css'
import HomeIcon from '../../assets/img/home.png'

class Header extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render(){
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#brand"><b>HOME</b></a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            <span className="glyphicon glyphicon-user"></span> Link
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            Link Right
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
