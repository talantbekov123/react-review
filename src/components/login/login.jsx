import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

/*
  Login лучше описать как функциональный компонент, используя хуки, useState
  Это поможет нам сократить код 
*/

class Login extends PureComponent {
  state = {
    redirectToPreviousRoute: false,
    userName: '',
    password: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    const { userName, password } = this.state

    this.props.logIn(
      {
        userName,
        password,
      },
      () => {
        this.setState({ redirectToPreviousRoute: true })
      }
    )
  }

  handleChange = e => {
    const value = e.currentTarget.value
    const fieldName = e.currentTarget.dataset.fieldName

    this.setState(prev => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  render() {
    const { location, errorMessage } = this.props
    const { from } = location.state || { from: { pathname: '/' } }
    const { userName, password, redirectToPreviousRoute } = this.state
    /*
      В render функции не жедательно выполнять вычисления или логику.
      Желательно отдавать чистый jsx, лучше вынести условный оператор ниже выше в конмпоненту
    */
    if (redirectToPreviousRoute) {
      return <Redirect to={from} />
    }

    /*
      Содержимое внутри return лучше вынести в отдельный презентационный компонент, а данные и методы передать через props
    */
    return (
      <div>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={this.handleSubmit}>
          <input
            data-field-name={'userName'}
            type={'text'}
            onChange={this.handleChange}
            placeholder={'Имя'}
            value={userName}
          />
          <input
            data-field-name={'password'}
            type={'text'}
            onChange={this.handleChange}
            placeholder={'Пароль'}
            value={password}
          />
          <button type="submit">Log in</button>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
}

export default Login
