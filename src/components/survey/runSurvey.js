import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Button} from 'react-bootstrap'
import PropTypes from "prop-types"
import Birthdate from './runningComponent/birthdate'
import CheckboxCom from './runningComponent/checkbox'
import Color from './runningComponent/color'
import Comment from './runningComponent/comment'
import DropdownCom from './runningComponent/dropdown'
import Email from './runningComponent/email'
import Matrix from './runningComponent/matrix'
import Number from './runningComponent/number'
import SingleText from './runningComponent/singletext'

class RunSurvey extends React.Component {
    static propTypes = {
        trailer: PropTypes.string.isRequired,
        data: PropTypes.object
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            trailer: this.props.trailer !== 'true' ? 0: 1,
            pageIndex: 0
        }
    }

    render() {
        return (
            <div className={'do-survey-body'}>
                <div className={'arrow-trailer'}>
                    {this.state.pageIndex === 0 ? '': <span onClick={e => this.setState({pageIndex: this.state.pageIndex - 1})}  className="glyphicon glyphicon-arrow-left"/>}
                    {this.state.pageIndex < this.props.data.length - 1 ? <span onClick={e => this.setState({pageIndex: this.state.pageIndex + 1})} className="glyphicon glyphicon-arrow-right"/>: ''}
                </div>
                <div>
                    {this.props.data.map((page, index) => (
                        <div className={'run-survey'}>
                            {this.state.pageIndex === index ?
                                <span>
                                {page.data.map((component, i) => (
                                    <span>
                                        <div className={'do-survey-component'}>
                                            {component.type === 1 ? <SingleText index={i} trailer={'true'} data={component}/>: ''}
                                        </div>
                                        <div className={'do-survey-component'}>
                                            {component.type === 9 ? <Number index={i} trailer={'true'} data={component}/>: ''}
                                        </div>
                                        <div className={'do-survey-component'}>
                                            {component.type === 2 ? <Birthdate index={i} trailer={'true'} data={component}/>: ''}
                                        </div>
                                        <div className={'do-survey-component'}>
                                            {component.type === 3 ? <Color index={i} trailer={'true'} data={component}/>: ''}
                                        </div>
                                        <div className={'do-survey-component'}>
                                            {component.type === 4 ? <Color index={i} trailer={'true'} data={component}/>: ''}
                                        </div>
                                         <div className={'do-survey-component'}>
                                            {component.type === 7 ? <Comment index={i} trailer={'true'} data={component}/>: ''}
                                        </div>
                                         <div className={'do-survey-component'}>
                                            {component.type === 5 ? <CheckboxCom index={i} trailer={'true'} data={component}/>: ''}
                                        </div>
                                        <div className={'do-survey-component'}>
                                            {component.type === 6 ? <DropdownCom index={i} trailer={'true'} data={component}/>: ''}
                                        </div>
                                    </span>
                                ))}
                            </span>
                                : ''}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RunSurvey)
