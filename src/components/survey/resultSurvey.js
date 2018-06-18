import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Button} from 'react-bootstrap'
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

        this.mergeAnswer = this.mergeAnswer.bind(this)
        this.countAnswer = this.countAnswer.bind(this)
        this.count = this.count.bind(this)
        this.removeDupAnswer = this.removeDupAnswer.bind(this)
    }

    componentWillMount(){
        if(this.props.result.length === 0) {
            this.setState({alert: true})
        }

        if(this.props.result.length > 0 && this.props.result[0].survey_id !== undefined){
            this.setState({surveyId: this.props.result[0].survey_id})
            const tmp = this.countAnswer(this.mergeAnswer(this.props.result))
            this.setState({data: tmp})
        }


    }

    count(answers, numbers){
      const tmps = []
      answers.map((answer, index) => {
        let flag = false
        tmps.map((tmp, i) => {
          if(answer === tmp){
            if(numbers[i] === undefined){
              numbers.push(1)
            } else {
              numbers[i] = numbers[i] + 1
            }
            flag = true
          }
        })

        if(flag === false){
          tmps.push(answer)
          numbers.push(1)
        }
      })

      return numbers
    }

    removeDupAnswer(answers){
      const tmps = []

      answers.map((answer, index) => {
        let flag = false

        for(let i = 0; i < tmps.length; i++){
          if(tmps[i] === answer) {
            flag = true
            break
          }
        }

        if(flag == false){
          tmps.push(answer)
        }

      })

      return tmps
    }

    countAnswer(results){
        results.map((result, i) => {
          const answers = result.answer
          const numbers = result.number
          result.number = this.count(answers, numbers)
          result.answer = this.removeDupAnswer(answers)
        })

        return results
    }

    mergeAnswer(results){
      const anwserArr = []
      let flag = false
      let data = ''

      results.map((result, index) => { // get all submit
        let j = 0;
        JSON.parse(result.data).map((pages, i) => { //get all page
          pages.data.map((component) => { // get all component

            if(flag === false){
              if(component.type !== 8){
                data = {
                  type: component.type,
                  question: component.component.question,
                  answer: Array.isArray(component.component.answer) !== false ? component.component.answer : (component.component.answer === '' ? []: [component.component.answer]),
                  number: []
                }
                anwserArr.push(data)
              }
            } else {
                Array.isArray(component.component.answer) === false ? anwserArr[j].answer.push(component.component.answer) : anwserArr[j].answer = [...anwserArr[j].answer, ...component.component.answer]
            }
            j ++;
          })

        })
        flag = true
      })

      return anwserArr
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.alert === true ? '' :
                        <div>
                          {this.state.isChangeView === false ?
                            <Button bsStyle="primary" className={'btn-show-chart'}
                                    onClick={e => this.setState({isChangeView: !this.state.isChangeView})}>Show Chart</Button>:
                            <Button bsStyle="primary" className={'btn-show-chart'}
                                    onClick={e => this.setState({isChangeView: !this.state.isChangeView})}>Back</Button>
                          }
                        </div>
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
