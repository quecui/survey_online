import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Button, ControlLabel, InputGroup, FormControl} from 'react-bootstrap'
import PropTypes from "prop-types"

class ResultChart extends React.Component {
    static propTypes = {
        //trailer: PropTypes.string
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            isChangeView : false
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Button>asdasd</Button>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ResultChart)
