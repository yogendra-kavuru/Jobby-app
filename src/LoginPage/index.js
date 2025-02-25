import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginPage extends Component {
  state = {usernameInput: '', passwordInput: '', errorMsg: ''}

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onLogin = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 2})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to='/' />
    }

    const {usernameInput, passwordInput, errorMsg} = this.state
    return (
      <div className='login-bg-container'>
        <p>*For testing enter any username and password</p>
        <form onSubmit={this.onLogin} className='login-form-container'>
          <img
            className='login-form-logo-img'
            src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
            alt='website logo'
          />
          <label htmlFor='usernameInput' className='label-txt'>
            USERNAME
          </label>
          <input
            id='usernameInput'
            className='login-input'
            type='text'
            placeholder='Username'
            value={usernameInput}
            onChange={this.onChangeUsername}
          />

          <label htmlFor='passwordInput' className='label-txt'>
            PASSWORD
          </label>
          <input
            id='passwordInput'
            className='login-input'
            type='password'
            placeholder='Password'
            value={passwordInput}
            onChange={this.onChangePassword}
          />
          <button className='login-btn' type='submit'>
            Login
          </button>
          {errorMsg !== '' && <p className='error-msg'>*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginPage
