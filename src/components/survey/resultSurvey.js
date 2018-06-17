import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Button, ControlLabel, InputGroup, FormControl} from 'react-bootstrap'
import PropTypes from "prop-types"
import ResultJson from './resultJson'
import ResultChart from './resultChart'

class ResultSurvey extends React.Component {
    static propTypes = {
        result: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            isChangeView : false,
            surveyId: '',
            data: [],
            alert: false
        }

    }

    componentWillMount(){
        if(this.props.result.length === 0) {
            this.setState({alert: true})
        }

        if(this.props.result.length > 0 && this.props.result[0].survey_id !== undefined){
            this.setState({surveyId: this.props.result[0].survey_id})

            const tmp = []
            // Todo: sai roi. phai tong hop tat ca ket qua
            this.props.result.map((resultElement) => {
                resultElement.data.map((page) => {
                    page.data.map((question) => {
                        tmp.push(question)
                    })
                })
            })

            this.setState({data: tmp})
        }


    }

    render() {
        return (
            <div>
                <div>
                    {this.state.alert === true ? '' :
                        <Button bsStyle="primary" className={'btn-show-chart'}
                                onClick={e => this.setState({isChangeView: !this.state.isChangeView})}>Show By
                            Question</Button>
                    }
                </div>
                {this.state.alert === true ? '':
                    <div>
                        {this.state.isChangeView === false ?
                            <ResultJson data={this.state.data} surveyId={this.state.surveyId}/> :
                            <ResultChart data={this.state.data} surveyId={this.state.surveyId}/>
                        }
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    result: state.result
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ResultSurvey)
