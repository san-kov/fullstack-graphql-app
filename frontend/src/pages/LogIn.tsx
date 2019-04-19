import React from 'react'
import { TiMail, TiLockClosed, TiWarning } from 'react-icons/ti'
import { withFormik, FormikProps, Field, Form } from 'formik'
import Loader from '../components/Loader'
import { graphql, ChildMutateProps } from 'react-apollo'
import { login, getCurrentUser } from '../graphql/userQuery'

import { compose } from 'recompose'
import { withRouter, RouteComponentProps } from 'react-router'
import { Login, LoginVariables } from '../generated/Login'

import * as yup from 'yup'
interface FormProps {
  email: string
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
    .required()
})

type ChildProps = ChildMutateProps<{}, Login, LoginVariables> &
  RouteComponentProps &
  FormikProps<FormProps>

const LoginPage: React.SFC<ChildProps> = ({
  isSubmitting,
  errors,
  touched
}) => {
  return (
    <div className="form">
      <h1>Log In</h1>
      <Form>
        {errors.general && (
          <div className="error-message">
            <small>{errors.general}</small>
          </div>
        )}
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

const withLoginForm = withFormik<ChildProps, FormProps, RouteComponentProps>({
  validationSchema: validationSchema,
  handleSubmit: async (
    { email, password },
    { setSubmitting, props: { mutate, history }, resetForm, setFieldError }
  ) => {
    setSubmitting(true)

    try {
      const res = await mutate({
        variables: {
          email,
          password
        },
        refetchQueries: [{ query: getCurrentUser }]
      })

      resetForm()
      history.push('/')
    } catch (e) {
      console.log(e.graphQLErrors)
      e.graphQLErrors.forEach((err: any) => {
        if (!err.extensions)
          return setFieldError('general', 'Internal server error')
        err.extensions.exception.validationErrors.forEach((err2: any) => {
          setFieldError(
            err2.property,
            err2.constraints[Object.keys(err2.constraints)[0]]
          )
          console.log(
            err2.property,
            err2.constraints[Object.keys(err2.constraints)[0]]
          )
        })
      })
    }

    setSubmitting(false)
  },
  mapPropsToValues: () => ({
    email: '',
    password: '',
    general: ''
  })
})

const withLoginMutation = graphql<ChildProps>(login)

export default compose<ChildProps, {}>(
  withRouter,
  withLoginMutation,
  withLoginForm
)(LoginPage)
