 import React from 'react'
 import styled from 'styled-components'
 import LoginForm from '../LoginForm'

 const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
 `
 
 const LoginPage = () => {
   return (
    <Wrapper>
      <LoginForm />
    </Wrapper>
   )
 }
 
 export default LoginPage