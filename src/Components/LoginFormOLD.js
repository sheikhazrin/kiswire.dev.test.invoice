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

const LoginForm = (props) => {
  return (
    <Formik
      initialValues={{ tokenNum: '' }}
      validationSchema={Yup.object({
        tokenNum: Yup.string()
          .min(15, 'Must be 15 characters or less')
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
        <div className="form">
          <form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupToken">
              <Form.Label>Email address</Form.Label>
              <textarea
                className="form-control"
                placeholder="Token"
                id="tokenNum"
                type="text"
                {...formik.getFieldProps('tokenNum')}
              />
              {formik.touched.tokenNum && formik.errors.tokenNum ? (
                <small className="text-danger">{formik.errors.tokenNum}</small>
              ) : null}
            </Form.Group>
            <Button variant="outline-primary">Primary</Button>{' '}
          </form>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
