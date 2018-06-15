import React from 'react'
import {ControlLabel, InputGroup, FormControl, Button} from 'react-bootstrap'

class Contact extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.showMessage = this.showMessage.bind(this)

        this.state = {
            message: ''
        }
    }

    showMessage(){
        this.setState({message: 'Thank your opinion. We will reply soon!'})
    }

    render() {
        return (
            <div className="page-body">
                <div className={'page-mid-space'} />
                <div className="page-content">
                    <div className={'contact-content'}>
                        {this.state.message === '' ?
                            <form>
                                <ControlLabel className={'signin-form'}>Title</ControlLabel>
                                <InputGroup>
                                    <InputGroup.Addon><span className="glyphicon glyphicon-pencil" /></InputGroup.Addon>
                                    <FormControl
                                        type="text"
                                        placeholder="Input title here" />
                                </InputGroup>

                                <ControlLabel className={'signin-form contact-message'}>Message</ControlLabel>
                                <FormControl componentClass="textarea" placeholder="textarea" className={'contact-textarea'}/>
                                <Button onClick={e => this.showMessage()} type="submit">Submit</Button>
                            </form>
                            :
                            <div className={'contact-message-center'}>{this.state.message}</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact
