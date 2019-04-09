import React from 'react'
import { TiMail, TiLockClosed, TiUser } from 'react-icons/ti'
import { withFormik, FormikProps, Field, Form } from 'formik'
import Loader from '../components/Loader'
import { graphql, ChildMutateProps } from 'react-apollo'
import { Register, RegisterVariables } from '../generated/Register'
import { register } from '../graphql/userQuery'

import { compose } from 'recompose'
import { withRouter, RouteComponentProps } from 'react-router'

interface FormProps {
  email: string
  username: string
  password: string
}

type ChildProps = ChildMutateProps<Register, RegisterVariables> &
  RouteComponentProps &
  FormikProps<FormProps>

const Signup: React.SFC<ChildProps> = ({ isSubmitting }) => {
  return (
    <div className="form">
      <h1>Sign Up</h1>
      <Form>
        <div className="icon-input">
          <TiMail size="20" />
          <Field
            type="email"
            name="email"
            placeholder="email"
            disabled={isSubmitting}
          />
        </div>
        <div className="icon-input">
          <TiUser size="20" />
          <Field
            type="text"
            name="username"
            placeholder="username"
            disabled={isSubmitting}
          />
        </div>
        <div className="icon-input">
          <TiLockClosed size="20" />
          <Field
            type="password"
            name="password"
            placeholder="password"
            disabled={isSubmitting}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader /> : 'Log In'}
        </button>
      </Form>
    </div>
  )
}

const withSignupForm = withFormik<ChildProps, FormProps, RouteComponentProps>({
  handleSubmit: async (
    { email, password, username },
    { setSubmitting, props: { mutate, history }, resetForm }
  ) => {
    setSubmitting(true)

    await mutate({
      variables: {
        email,
        username,
        password
      }
    })

    setSubmitting(false)
    resetForm()
    history.push('/login')
  },
  mapPropsToValues: () => ({
    email: '',
    password: '',
    username: ''
  })
})

const withRegisterMutation = graphql<ChildProps>(register)

export default compose<ChildProps, {}>(
  withRouter,
  withRegisterMutation,
  withSignupForm
)(Signup)
