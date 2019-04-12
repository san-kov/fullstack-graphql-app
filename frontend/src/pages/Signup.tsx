import React from 'react'
import { TiMail, TiLockClosed, TiUser } from 'react-icons/ti'
import { withFormik, FormikProps, Field, Form } from 'formik'
import Loader from '../components/Loader'
import { graphql, ChildMutateProps } from 'react-apollo'
import { Register, RegisterVariables } from '../generated/Register'
import { register } from '../graphql/userQuery'

import { compose } from 'recompose'
import { withRouter, RouteComponentProps } from 'react-router'

import * as yup from 'yup'
interface FormProps {
  email: string
  username: string
  password: string
  general: string
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email('Please, enter a valid email.')
    .required(),
  password: yup
    .string()
    .label('Password')
    .min(5)
    .max(100)
    .required(),
  username: yup
    .string()
    .label('Username')
    .min(5)
    .max(100)
    .required()
})

type ChildProps = ChildMutateProps<{}, Register, RegisterVariables> &
  RouteComponentProps &
  FormikProps<FormProps>

const Signup: React.SFC<ChildProps> = ({ isSubmitting, touched, errors }) => {
  return (
    <div className="form">
      <h1>Sign Up</h1>
      {touched.general && errors.general && (
        <div className="error-message">
          <small>{errors.general}</small>
        </div>
      )}
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
        {touched.email && errors.email && (
          <div className="error-message">
            <small>{errors.email}</small>
          </div>
        )}
        <div className="icon-input">
          <TiUser size="20" />
          <Field
            type="text"
            name="username"
            placeholder="username"
            disabled={isSubmitting}
          />
        </div>
        {touched.username && errors.username && (
          <div className="error-message">
            <small>{errors.username}</small>
          </div>
        )}
        <div className="icon-input">
          <TiLockClosed size="20" />
          <Field
            type="password"
            name="password"
            placeholder="password"
            disabled={isSubmitting}
          />
        </div>
        {touched.password && errors.password && (
          <div className="error-message">
            <small>{errors.password}</small>
          </div>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader /> : 'Log In'}
        </button>
      </Form>
    </div>
  )
}

const withSignupForm = withFormik<ChildProps, FormProps, RouteComponentProps>({
  validationSchema: validationSchema,
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
    username: '',
    general: ''
  })
})

const withRegisterMutation = graphql<ChildProps>(register)

export default compose<ChildProps, {}>(
  withRouter,
  withRegisterMutation,
  withSignupForm
)(Signup)
