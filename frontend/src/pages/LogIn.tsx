import React from 'react'
import { TiMail, TiLockClosed } from 'react-icons/ti'
import { withFormik, FormikProps, Field, Form } from 'formik'
import Loader from '../components/Loader'
import { graphql, ChildMutateProps } from 'react-apollo'
import { login, getCurrentUser } from '../graphql/userQuery'

import { compose } from 'recompose'
import { withRouter, RouteComponentProps } from 'react-router'
import { Login, LoginVariables } from '../generated/Login'

interface FormProps {
  email: string
  password: string
}

type ChildProps = ChildMutateProps<{}, Login, LoginVariables> &
  RouteComponentProps &
  FormikProps<FormProps>

const LoginPage: React.SFC<ChildProps> = ({ isSubmitting }) => {
  return (
    <div className="form">
      <h1>Log In</h1>
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

const withLoginForm = withFormik<ChildProps, FormProps, RouteComponentProps>({
  handleSubmit: async (
    { email, password },
    { setSubmitting, props: { mutate, history }, resetForm }
  ) => {
    setSubmitting(true)

    await mutate({
      variables: {
        email,
        password
      },
      refetchQueries: [{ query: getCurrentUser }]
    })

    setSubmitting(false)
    resetForm()
    history.push('/')
  },
  mapPropsToValues: () => ({
    email: '',
    password: ''
  })
})

const withLoginMutation = graphql<ChildProps>(login)

export default compose<ChildProps, {}>(
  withRouter,
  withLoginMutation,
  withLoginForm
)(LoginPage)
