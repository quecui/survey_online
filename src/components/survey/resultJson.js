import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactJson from 'react-json-view'
import {Button} from 'react-bootstrap'
import PropTypes from "prop-types"
import RootStar from '../../assets/img/star-black.png'
import Star from '../../assets/img/star-ye.png'

class ResultJson extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        surveyId: PropTypes.string.isRequired,
        rating: PropTypes.array.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            isFormatJson: [],
            ratingText: ''
        }

        this.setFormatIndex = this.setFormatIndex.bind(this)
        this.genRatingText = this.genRatingText.bind(this)
    }

    componentWillMount(){
        const tmp = []
        this.props.data.map(question => {
            tmp.push(false)
        })

        this.genRatingText()
        this.setState({isFormatJson: tmp})
    }



    setFormatIndex(index, value){
        const tmp = this.state.isFormatJson
        tmp[index] = value
        this.setState({isFormatJson: tmp})
    }

    genRatingText(){
      let index = 2

      for(let i = 0; i < 5; i++){
        if(this.props.rating[i] === 1){
          if(i === 0){
            break
          }

          index = i - 1
          break
        }
      }

      switch (index){
        case 0:
          this.setState({ratingText: 'Very bad'})
          break
        case 1:
          this.setState({ratingText: 'Bad'})
          break
        case 2:
          this.setState({ratingText: 'Normal'})
          break
        case 3:
          this.setState({ratingText: 'Good'})
          break
        case 4:
          this.setState({ratingText: 'Very Good'})
          break
        default:
          this.setState({ratingText: 'Normal'})
          break
      }
    }

    render() {
        return (
            <div>
              <div className={'star-css star-result'}>
                <span className={'star-title star-result-title'}><b>Rating for this survey: </b></span>
                {this.props.rating.map((st, stIndex) => (
                  <span>
                    {st === 1 ? <img className={'icon-star'} src={RootStar} />: <img className={'icon-star'} src={Star} />}
                  </span>
                ))}
                <b>{this.state.ratingText}</b>
              </div>
                <table className={'table-result'}>
                    <tr className={'header-result'}>
                        <th className={'th-table-format'}>STT</th>
                        <th>Results</th>
                        <th className={'th-table-format'}>JSON Format</th>
                    </tr>
                    {this.props.data.map((question, index) => (
                        <tr>
                            <td className={'header-stt'}>{index + 1}</td>
                            <td className={'content-stt'}>
                                {this.state.isFormatJson[index] === false ? JSON.stringify(question): <ReactJson src={question} />}
                            </td>
                            <td>
                                {this.state.isFormatJson[index] === false ?
                                    <Button onClick={e => this.setFormatIndex(index, true)}>Json</Button>:
                                    <Button onClick={e => this.setFormatIndex(index, false)}>Raw</Button>
                                }

                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ResultJson)
