import React from 'react'
import Immutable from 'immutable'
import Rx from 'rx'

import TextField from 'app/components/ui/TextField'
import Form from 'app/components/ui/Form'
import StreamMap from 'app/services/stream-map'
import Http from 'app/services/http'
import {extractTargetValue, preventDefault} from 'app/services/utils'
import {isSlug} from 'app/services/validators'

class NewRoomForm extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    onSuccess: React.PropTypes.func
  }

  static defaultProps = {
    onSuccess: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      form: Immutable.Map()
    }
    this._formValues = Immutable.Map()
  }

  componentWillMount() {
    this.streams = new StreamMap('newRoomSubmit', 'newRoomField')
    this.streams.set('validatable', new Rx.Subject())

    let newRoomValues = this.streams.get('newRoomField').map(extractTargetValue)
    newRoomValues.subscribe((value) => {
      this._formValues = this._formValues.set('room', value)
    })
    newRoomValues.debounce(300)
      .pausable(this.streams.get('validatable'))
      .map(::this._validateRoom)
      .subscribe((error) => {
        this.setState({form: this.state.form.set('newRoomError', error)})
      })

    this.streams.get('validatable').onNext(true)

    this.streams.get('newRoomSubmit')
      .map(preventDefault)
      .map(() => this._formValues.get('room'))
      .map(::this._validateRoom)
      .filter((error) => !error)
      .flatMap(() => {
        this.streams.get('validatable').onNext(false)
        let data = this._formValues.toObject()
        return Http.post('/api/v1/rooms', data)
      })
      .subscribe(
        (response) => {
          this.streams.get('validatable').onNext(true)
          if (Http.isOk(response)) {
            React.findDOMNode(this.refs.newRoomField.refs.input).value = ''
            return this.props.onSuccess(response)
          }
          let code = response.get('body').error
          return this._handleFormError(code)
        }
      )
  }

  componentWillUnmount() {
    this.streams.dispose()
  }

  _handleFormError(code) {
    let message = ''
    switch (code) {
    case 'room_exists':
      message = 'Room already exists'
      break
    default:
      message = 'Room could not be created'
    }
    this.setState({form: this.state.form.set('newRoomError', message)})
    return false
  }

  _validateRoom(room) {
    let error = ''
    if (!room) {
      return ' '
    } else if (room.length < 3) {
      error = 'Must be at least 3 characters long'
    } else if (room.length > 64) {
      error = 'Must be less than 64 characters long'
    } else if (!isSlug(room)) {
      error = 'Invalid room (no spaces or weird characters)'
    }
    return error
  }

  render() {
    return (
      <Form onSubmit={this.streams.get('newRoomSubmit')}>
        <TextField
          error={this.state.form.get('newRoomError')}
          onChange={this.streams.get('newRoomField')}
          placeholder="Create Room"
          ref="newRoomField"
        />
        {this.props.children}
      </Form>
    )
  }

}

export default NewRoomForm
