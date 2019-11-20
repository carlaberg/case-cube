import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Button from '../Button'
import { login } from '../../../actions'
import { withRouter } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
   width: 300px;
   height: 40px;
   border: 1px solid black;
   margin-bottom: 20px;
   padding: 0 10px;
`

const LoginForm = ({ login, auth, history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Wrapper>
      <Input
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username} 
      />
      <Input
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button text="SIGN IN" onClick={() => login({ username, password }, () => history.push('/admin/cases'))} />
    </Wrapper>
  )
}

const mapStateToProps = state => ({ auth: state.auth })

const mapDispatchToProps = dispatch => {
  return {
    login: (credentials, callback) => {
      dispatch(login(credentials, callback))
    }
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(LoginForm)