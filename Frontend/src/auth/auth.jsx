import React, {Component} from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './auth.css'
import { login, signUp } from './authActions'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import If from '../common/operator/if'
import Messages from '../common/msg/menssages'
import Input from '../common/form/inputAuth'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = { loginMode: true }
  }

  changeMode() {
    this.setState({ loginMode: !this.state.loginMode })
  }

  onSubmit(values) {
    const { login, signUp } = this.props
    this.state.loginMode ? login(values) : signUp(values)
  }

  render() {
    const { loginMode } = this.state
    const { handleSubmit } = this.props

    
    return( 
      <div className="login-box">
        <div className="login-logo"> <b> My</b> Money </div>
        <div className="login-box-body">
          <p className="login-box-msg">Welcome</p>
          <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
            <Field component={Input} type="input" name="name" placeholder="Name" icon="user" hide={loginMode} />
            <Field component={Input} type="email" name="email" placeholder="E-mail" icon="envelope" />
            <Field component={Input} type="password" name="password" placeholder="Password" icon="lock" />
            <Field component={Input} type="password" name="confirm_password" placeholder="Confirm password" icon="lock" hide={loginMode} />
            <Row>
              <Grid cols="4">
                <button type="submit" className="btn btn-primary btn-block btn-flat">
                  {loginMode ? "Log In" : "Sign Up"}
                </button>
              </Grid>
            </Row>
          </form>
          <br />
          <a onClick={() => this.changeMode()}>
            {loginMode
              ? "New user? Sign Up!"
              : "Already have an account? Enter here"}
          </a>
        </div>
        <Messages />
      </div>
    )
  }
}

Auth = reduxForm({form: 'authForm'})(Auth)
const mapDispatchToProps = dispatch => bindActionCreators({ login, signUp }, dispatch)
export default connect(null, mapDispatchToProps)(Auth)