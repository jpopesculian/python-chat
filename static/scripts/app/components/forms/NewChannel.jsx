import React from 'react'
import Immutable from 'immutable'

import TextField from 'app/components/ui/TextField'
import Form from 'app/components/ui/Form'
import StreamMap from 'app/services/stream-map'
import {extractTargetValue, isSlug, preventDefault} from 'app/services/utils'

class NewChannelForm extends React.Component {

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
    this.streams = new StreamMap('newChannelSubmit', 'newChannelField')

    let newChannelValues = this.streams.get('newChannelField').map(extractTargetValue)
    newChannelValues.subscribe((value) => {
      this._formValues = this._formValues.set('channel', value)
    })
    newChannelValues.debounce(300)
      .map(::this._validateChannel)
      .subscribe((error) => {
        this.setState({form: this.state.form.set('newChannelFieldError', error)})
      })

    this.streams.get('newChannelSubmit')
      .map(preventDefault)
      .map(() => this._formValues.get('channel'))
      .map(::this._validateChannel)
      .filter((error) => !error)
      .map(() => {
        let data = this._formValues.toObject()
        return data
      })
      .subscribe(
        (response) => {
          this.props.onSuccess(response)
        }
      )
  }

  componentWillUnmount() {
    this.streams.dispose()
  }

  _validateChannel(channel) {
    let error = ''
    if (!channel) {
      return ' '
    } else if (channel.length < 3) {
      error = 'Must be at least 3 characters long'
    } else if (channel.length > 64) {
      error = 'Must be less than 64 characters long'
    } else if (!isSlug(channel)) {
      error = 'Invalid channel (no spaces or weird characters)'
    }
    return error
  }

  render() {
    return (
      <Form onSubmit={this.streams.get('newChannelSubmit')}>
        <TextField
          error={this.state.form.get('newChannelFieldError')}
          onChange={this.streams.get('newChannelField')}
          placeholder="Create Channel"
        />
        {this.props.children}
      </Form>
    )
  }

}

export default NewChannelForm
