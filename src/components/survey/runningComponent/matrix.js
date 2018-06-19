import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from "prop-types"

class Matrix extends React.Component {
    static propTypes = {
        trailer: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        index: PropTypes.number,
        handleChangeData: PropTypes.func
    }

    constructor(props, context) {
        super(props, context)
        this.props = props;

        this.state = {
            trailer: this.props.trailer !== 'true' ? 0: 1,
            maxRowIndex: this.props.data.component.rowOptions.length
        }

        this.handleChange = this.handleChange.bind(this)
        this.checkExist = this.checkExist.bind(this)
    }

    handleChange(indexCol, indexRow){
        if(this.props.trailer !== 'true' && this.checkExist(this.props.data.component.answer, this.props.data.component.colOptions[indexCol]) === false){
            const tmps = this.props.data
            const data = {
                col: this.props.data.component.colOptions[indexCol],
                rows:[this.props.data.component.rowOptions[indexRow]]
            }

            tmps.component.answer.push(data)
            this.props.handleChangeData(this.props.index, tmps)
        }
    }

    checkExist(answers, element){
        let flag = false
        for(let i = 0; i < answers.length; i++){
            if(answers[i].col === element){
                flag = true
                break
            }
        }
        return flag
    }

    render() {
        return (
            <div>
              <div>
                  {this.props.index + 1}. {this.props.data.component.question}
              </div>
              <table className={'matrix-table'}>
                  <tr>
                      <td className={'first-td'}></td>
                      {this.props.data.component.rowOptions.map((row, i) => (
                          <td>{row}</td>
                      ))}
                  </tr>
                  {this.props.data.component.colOptions.map((col, i) => (
                      <tr>
                          <td>{col}</td>
                          {this.props.data.component.rowOptions.map((row, j) => (
                              <td><input onClick={e => this.handleChange(i, j)} type="radio"
                                         name={i < this.state.maxRowIndex ? this.props.data.component.rowOptions[i] : this.props.data.component.colOptions[i]} value={row}/></td>
                          ))}
                      </tr>
                  ))}
              </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Matrix)
