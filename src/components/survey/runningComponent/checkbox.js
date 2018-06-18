import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {ControlLabel, Checkbox, FormGroup} from 'react-bootstrap'
import PropTypes from "prop-types"

class CheckboxCom extends React.Component {
    static propTypes = {
        trailer: PropTypes.string,
        data: PropTypes.object,
        index: PropTypes.number,
        handleChangeData: PropTypes.func,
        isRequired: PropTypes.bool
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.handleChange = this.handleChange.bind(this)

        this.state = {
          checked: []
        }
    }

  componentWillMount(){
      let tmp = []
      this.props.data.component.options.map(dt => {
        tmp.push(false)
      })

      this.setState({checked: tmp})
  }

    handleChange(answer, index){
        let flag = !this.state.checked[index]
        this.setState({checked: !this.state.checked})

        if(this.props.trailer !== 'true' && flag === true){
            const tmp = this.props.data
            tmp.component.answer.push(answer)
            this.props.handleChangeData(this.props.index, tmp)
        }

      if(this.props.trailer !== 'true' && flag === false){
        const tmp = this.props.data
        tmp.component.answer.slice(index, 1)
        this.props.handleChangeData(this.props.index, tmp)
      }
    }

    render() {
        return (
            <div className={'do-singletext'}>
                <ControlLabel>{this.props.index + 1}. {this.props.data.component.question} {this.props.data.required === true ? <span className={'icon-required'}>*</span>: ''}</ControlLabel>
                <FormGroup className={'checkbox-survey'}>
                    {this.props.data.component.options.map((option, index) => (
                        <div className={'checkbox-survey'}>
                                <Checkbox checked={this.state.checked[index]} onClick={e => this.handleChange(option, index)} inline>{option}</Checkbox>
                        </div>
                    ))}

                </FormGroup>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxCom)
