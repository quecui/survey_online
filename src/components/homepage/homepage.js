import React from 'react'
import {Button, ButtonToolbar} from 'react-bootstrap'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className={'home-container'}>
                <div className={'home-body-title'}>
                    <b>Start something that matters</b>
                </div>
                <div className={'home-body-head'}>
                    Easy to manage your survey and get more information
                </div>
                <ButtonToolbar>
                    <Button className={'btn-homepage'} bsStyle="primary" bsSize="large">Let's Create Survey Now</Button>
                </ButtonToolbar>
            </div>
        )
    }
}

export default HomePage
