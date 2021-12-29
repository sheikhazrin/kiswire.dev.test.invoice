import React from 'react';
import { Form } from 'react-bootstrap';
import {
  useFormik,
  withFormik,
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import * as Yup from 'yup';

const Login = (props) => {
  return (
    <Formik
      initialValues={{ firstName: '', email: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        email: Yup.string()
          .min(20, 'Must be 20 characters or less')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => (
        <div className="form-wrapper">
          <form onSubmit={formik.handleSubmit} className="form">
            <Form.Group className="mb-3">
              {/* <label htmlFor="firstName">First Name</label> */}
              <input
                id="firstName"
                type="text"
                {...formik.getFieldProps('firstName')}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null}
            </Form.Group>
            <FormGroup>
              <label htmlFor="email">Email Address</label>
              <textarea
                id="email"
                type="email"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </FormGroup>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
