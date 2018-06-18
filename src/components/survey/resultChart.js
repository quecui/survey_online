import React from 'react'
import { Bar, Line, Pie, Polar, Doughnut } from 'react-chartjs-2'
import {Button} from 'react-bootstrap'
import PropTypes from "prop-types"

const colorRoot = ['#FF6384', '#36A2EB', '#FFCE56', '#888888', '#CC0000', '#FFFFFF', '#DA70D6', '#705b0a', '#ba9f34']

class ResultChart extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        surveyId: PropTypes.string.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
          data: this.props.data,
          questionDate: '',
          questionIndex: 0,
          dataView: false,
          dataChart: '',

          lineChart: false,
          pieChart: false,
          barChart: false,
          polarChart: false,
          donutChart: false
        }

        this.showChar = this.showChar.bind(this)
        this.selectQuestion = this.selectQuestion.bind(this)
        this.createLineChartData = this.createLineChartData.bind(this)
        this.createPieChartData = this.createPieChartData.bind(this)
        this.createBarChartData = this.createBarChartData.bind(this)
        this.createPolarChartData = this.createPolarChartData.bind(this)
        this.createDonutChartData = this.createDonutChartData.bind(this)
    }

    showChar(key){
      if(key === 93)
        key = 1
      else {
        if(this.state.questionDate === ''){
          key = 10
        }
      }
      switch (key){
        case 1: {
          this.setState({questionDate: this.state.data[this.state.questionIndex]})
          this.setState({dataView: true})
          this.setState({lineChart: false})
          this.setState({pieChart: false})
          this.setState({barChart: false})
          this.setState({polarChart: false})
          this.setState({donutChart: false})
          break
        }

        case 2: {
          this.createLineChartData()
          this.setState({dataView: false})
          this.setState({pieChart: false})
          this.setState({barChart: false})
          this.setState({lineChart: true})
          this.setState({polarChart: false})
          this.setState({donutChart: false})
          break
        }

        case 3:{
          this.createPieChartData()
          this.setState({dataView: false})
          this.setState({pieChart: true})
          this.setState({lineChart: false})
          this.setState({barChart: false})
          this.setState({polarChart: false})
          this.setState({donutChart: false})
          break
        }

        case 4:{
          this.createBarChartData()
          this.setState({dataView: false})
          this.setState({pieChart: false})
          this.setState({lineChart: false})
          this.setState({barChart: true})
          this.setState({polarChart: false})
          this.setState({donutChart: false})
          break
        }

        case 5: {
          this.createPolarChartData()
          this.setState({dataView: false})
          this.setState({pieChart: false})
          this.setState({lineChart: false})
          this.setState({barChart: false})
          this.setState({polarChart: true})
          this.setState({donutChart: false})
          break
        }

        case 6:{
          this.createDonutChartData()
          this.setState({dataView: false})
          this.setState({pieChart: false})
          this.setState({lineChart: false})
          this.setState({barChart: false})
          this.setState({polarChart: false})
          this.setState({donutChart: true})
          break
        }

        default:
          alert('Please choose question')
      }
    }

    selectQuestion(index){
      this.setState({questionIndex: index})
      this.setState({questionDate: this.state.data[index]})

      this.showChar(93)
    }

    createPieChartData(){
      const color = []
      this.state.questionDate.answer.map((com, i) => {
        color[i] = colorRoot[i]
      })

      const pie = {
        labels: this.state.questionDate.answer,
        datasets: [
          {
            data: this.state.questionDate.number,
            backgroundColor: color,
            hoverBackgroundColor: color,
          },
        ],
      }

      this.setState({dataChart: pie})
    }

    createLineChartData(){
      const line = {
        labels: this.state.questionDate.answer,
        datasets: [
          {
            label: 'Line Chart',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.state.questionDate.number,
          },
        ],
      }

      this.setState({dataChart: line})
    }

    createBarChartData(){
      const bar = {
        labels: this.state.questionDate.answer,
        datasets: [
          {
            label: 'Bar Chart',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: this.state.questionDate.number,
          },
        ],
      }

      this.setState({dataChart: bar})
    }

    createPolarChartData(){
      const color = []
      this.state.questionDate.answer.map((com, i) => {
        color[i] = colorRoot[i]
      })

      const polar = {
        datasets: [
          {
            data: this.state.questionDate.number,
            backgroundColor: color,
            label: 'Polar Chart', // for legend
          },
        ],
        labels: this.state.questionDate.answer,
      }

      this.setState({dataChart: polar})
    }

    createDonutChartData(){
      const color = []
      this.state.questionDate.answer.map((com, i) => {
        color[i] = colorRoot[i]
      })

      const donut = {
        labels: this.state.questionDate.answer,
        datasets: [
          {
            data: this.state.questionDate.number,
            backgroundColor: color,
            hoverBackgroundColor: color,
          },
        ],
      }
      this.setState({dataChart: donut})
    }

    render() {
        return (
            <div>
              <table className={'table-result'}>
                <tr className={'header-result'}>
                  <th className={'th-table-format question-format'}>Question</th>
                  <th className={'th-table-format tool-css'}>
                    <Button onClick={e => this.showChar(1)} className={'w3-btn w3-red'}>
                      Data
                    </Button>
                    <Button onClick={e => this.showChar(2)} className={'btn-result w3-btn w3-green'}>
                      Line Chart
                    </Button>
                    <Button onClick={e => this.showChar(3)} className={'btn-result w3-btn w3-purple'}>
                      Pie Chart
                    </Button>
                    <Button onClick={e => this.showChar(4)} className={'btn-result w3-btn w3-blue'}>
                      Bar Chart
                    </Button>
                    <Button onClick={e => this.showChar(5)} className={'btn-result w3-btn w3-white'}>
                      Polar Chart
                    </Button>
                    <Button onClick={e => this.showChar(6)} className={'btn-result w3-btn w3-grey'}>
                      Doughnut Chart
                    </Button>
                  </th>
                </tr>
                <tr>
                  <td>
                    {this.state.data.map((component, index) => (
                       <Button bsStyle="success" onClick={e => this.selectQuestion(index)} className={'btn-question-chart'}>Question {index + 1}</Button>
                    ))}
                  </td>
                  <td>
                    {this.state.questionDate === '' ? '':
                      <div className={'span-chart-content'}>
                        <div className={'question-in-chart'}>
                          Question: {this.state.questionDate.question}
                        </div>
                        {this.state.dataView === false ? '' :
                          <div>
                            Answer:
                          </div>
                        }
                        <div className={'ans-css'}>
                          {this.state.dataView === false ? '' :
                            <span>
                              {this.state.questionDate.answer.map((ans, i) => (
                                <div>{ans}</div>
                              ))}
                            </span>
                          }

                          {this.state.lineChart === false ? '':
                            <div className={'chart-show'}>
                                <Line data={this.state.dataChart}/>
                            </div>
                          }

                          {this.state.pieChart === false ? '':
                            <div className={'chart-show'}>
                              <Pie data={this.state.dataChart}/>
                            </div>
                          }

                          {this.state.barChart === false ? '':
                            <div className={'chart-show'}>
                              <Bar data={this.state.dataChart}/>
                            </div>
                          }

                          {this.state.polarChart === false ? '':
                            <div className={'chart-show'}>
                              <Polar data={this.state.dataChart}/>
                            </div>
                          }

                          {this.state.donutChart === false ? '':
                            <div className={'chart-show'}>
                              <Doughnut data={this.state.dataChart}/>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </td>
                </tr>
              </table>
            </div>
        )
    }
}

export default ResultChart
