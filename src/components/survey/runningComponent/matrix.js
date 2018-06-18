import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from "prop-types"

class Matrix extends React.Component {
    static propTypes = {
        trailer: PropTypes.string.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            trailer: this.props.trailer !== 'true' ? 0: 1
        }
    }

    render() {
        return (
            <div>
              asdasd
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Matrix)
