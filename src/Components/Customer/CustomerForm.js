import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import {
  Container,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

const CustomerForm = (props) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string()
      .email('You have enter an invalid email address')
      .required('Required'),
    rollno: Yup.number()
      .positive('Invalid roll number')
      .integer('Invalid roll number')
      .required('Required'),
  });
  console.log(props);
  return (
    <Container>
      <div className="row g-5">
        <h2>Customer</h2>
      </div>

      <div className="row g-5">
        <div className="form-wrapper">
          <Formik {...props} validationSchema={validationSchema}>
            <Form>
              <FormGroup>
                <label for="name">Name : </label>
                <Field name="name" type="text" className="form-control" />
                <ErrorMessage
                  name="name"
                  className="d-block invalid-feedback"
                  component="span"
                />
              </FormGroup>
              <FormGroup>
                <label for="name">Address 1 : </label>
                <Field name="email" type="textarea" className="form-control" />
                <ErrorMessage
                  name="email"
                  className="d-block invalid-feedback"
                  component="span"
                />
              </FormGroup>
              <FormGroup>
                <label for="name">Address 2 : </label>
                <Field name="email" type="textarea" className="form-control" />
                <ErrorMessage
                  name="email"
                  className="d-block invalid-feedback"
                  component="span"
                />
              </FormGroup>
              <Row>
                <Col>
                  <FormGroup>
                    <label for="name">District : </label>
                    <Field
                      name="email"
                      type="textarea"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="email"
                      className="d-block invalid-feedback"
                      component="span"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label for="name">State: </label>
                    <Field
                      name="email"
                      type="textarea"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="email"
                      className="d-block invalid-feedback"
                      component="span"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="py-3 d-grid gap-2">
                <Button variant="primary" size="default" type="submit">
                  {props.children}
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default CustomerForm;
