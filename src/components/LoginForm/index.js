import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    showErrorMsg: false,
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label htmlFor="username" className="username-label">
          USERNAME
        </label>
        <br />
        <input
          id="username"
          type="text"
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={this.getUsername}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password, showPassword} = this.state

    return (
      <>
        <label htmlFor="password" className="username-label">
          PASSWORD
        </label>
        <br />
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={this.getPassword}
        />
      </>
    )
  }

  clickCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-main-container">
        <div className="login-form-sub-container">
          <div className="login-website-logo-container">
            <img
              src="https://res.cloudinary.com/dzqfuqpu4/image/upload/v1736601641/Frame_8787_srmuxy.png"
              className="login-form-wesite-logo"
              alt="login website logo"
            />
          </div>
          <form className="login-form-container" onSubmit={this.onSubmitForm}>
            <div className="login-input-container">{this.renderUsername()}</div>
            <div className="login-input-container">{this.renderPassword()}</div>
            <div className="login-checkbox-label-container">
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox"
                onClick={this.clickCheckbox}
              />
              <label className="show-password-label" htmlFor="checkbox">
                Show Password
              </label>
            </div>
            <button type="submit" className="login-submit-button">
              Login
            </button>
            {showErrorMsg && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
