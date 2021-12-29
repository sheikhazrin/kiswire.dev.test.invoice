// Import Modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAxios } from 'use-axios-client';
import * as Yup from 'yup';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import { Route, Redirect, useNavigate, withRouter } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// import CustomerForm from './CustomerForm';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

// Create Component

const CustomerCreate = () => {
  const baseURL =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/customer';

  const [post, setPost] = React.useState(null);
  const submitStatus = 'KO';

  // function RedirectTo() {
  //   let history = useNavigate();
  //   history('/customer/list');
  // }

  const formik = useFormik({
    initialValues: {
      name: '',
      address1: '',
      address2: '',
      mailing_district: '',
      mailing_state: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .required('Required'),
      address1: Yup.string()
        .min(10, 'Must be 10 characters or more')
        .required('Required'),
      mailing_district: Yup.string().required('Required'),
      mailing_state: Yup.string().required('Required'),
      // email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      // console.log(values);
      axios
        .post(baseURL, values)
        .then((res) => {
          setPost(res.data);
          //
          console.log('Successfull');
          formik.Redirect('/');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Redirect
  });

  // onSubmit handler

  // const postData = () => {

  //   axios({
  //     method: 'post',
  //     url: 'url',
  //     data: { values },
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setStatus({
  //           sent: true,
  //           msg: 'Create Successfull !',
  //         });
  //       } else Promise.reject();
  //     })
  //     .catch((err) => {
  //       // Something went wrong
  //       setStatus({
  //         sent: false,
  //         msg: `Error! ${err}. Please try again later.`,
  //       });
  //     });
  //   // alert(JSON.stringify(values, null, 2));
  //   console.log(this.setStatus);
  // },

  // Return submit form
  return (
    <Container>
      <div className="row g-5">
        <h2>Customer</h2>
      </div>

      <div className="row g-5">
        <div className="form-wrapper">
          <form onSubmit={formik.handleSubmit} className="form">
            <FormGroup>
              <label htmlFor="name">First Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="d-block invalid-feedback">
                  {formik.errors.name}
                </div>
              ) : null}
            </FormGroup>
            <FormGroup>
              <label htmlFor="address1">Address 1</label>
              <input
                id="address1"
                name="address1"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address1}
              />
              {formik.touched.address1 && formik.errors.address1 ? (
                <div className="d-block invalid-feedback">
                  {formik.errors.address1}
                </div>
              ) : null}
            </FormGroup>
            <FormGroup>
              <label htmlFor="address2"> Address 2</label>
              <input
                id="address2"
                name="address2"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address2}
              />
              {formik.touched.address2 && formik.errors.address2 ? (
                <div className="d-block invalid-feedback">
                  {formik.errors.address2}
                </div>
              ) : null}
            </FormGroup>
            <FormGroup>
              <label htmlFor="mailing_district"> District 2</label>
              <input
                id="mailing_district"
                name="mailing_district"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mailing_district}
              />
              {formik.touched.mailing_district &&
              formik.errors.mailing_district ? (
                <div className="d-block invalid-feedback">
                  {formik.errors.mailing_district}
                </div>
              ) : null}
            </FormGroup>
            <FormGroup>
              <label htmlFor="mailing_state"> Address 2</label>
              <input
                id="mailing_state"
                name="mailing_state"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mailing_state}
              />
              {formik.touched.mailing_state && formik.errors.mailing_state ? (
                <div className="d-block invalid-feedback">
                  {formik.errors.mailing_state}
                </div>
              ) : null}
            </FormGroup>
            {formik.submitStatus != '' ? (
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={formik.isSubmitting || formik.isValidating}
              >
                Submit
              </button>
            ) : (
              <p>ff</p>
            )}
          </form>
        </div>
      </div>
    </Container>
  );
};

// Export Create Component
export default CustomerCreate;
