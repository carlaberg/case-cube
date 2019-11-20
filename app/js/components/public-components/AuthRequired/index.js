import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { currentUser } from '../../../actions'

const AuthRequired = ({ currentUser, auth, children }) => {
  useEffect(() => {
    currentUser()
  }, [])
  
  if (!auth.currentUser.userId) return 'not authorized'
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

const mapStateToProps = state => ({ auth: state.auth })

const mapDispatchToProps = dispatch => {
  return {
    currentUser: credentials => {
      dispatch(currentUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRequired);
