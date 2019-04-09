import React from 'react'
import { TiMail, TiLockClosed, TiUser } from 'react-icons/ti'
import { withFormik, FormikProps, Field, Form } from 'formik'
import Loader from '../components/Loader'
interface FormProps {
  email: string
  username: string
  password: string
}

const Signup: React.SFC<FormikProps<FormProps>> = ({ isSubmitting }) => {
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
            placeholder="password"
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

const withSignupForm = withFormik<{}, FormProps>({
  handleSubmit: (values, { setSubmitting }) => {
    setSubmitting(true)
  },
  mapPropsToValues: () => ({
    email: '',
    password: '',
    username: ''
  })
})

export default withSignupForm(Signup)
