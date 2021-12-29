// Import Modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import FormikControl from '../../Components/Formik/Control';

const Create = (props) => {
  const baseURL =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/state';
  // console.log(baseURL + props.match.params.slug);
  const latestdate = Date();
  const [formValues, setFormValues] = useState({
    id: '',
    name: '',
    createdAt: '',
  });
  // **** Setting validationSchema
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    // email: Yup.string()
    //   .email('Invalid email format')
    //   .required('Required'),
    // course: Yup.string().required('Required'),
    // courseDate: Yup.date()
    // .required('Required')
    // .nullable()
  });

  const onSubmit = (values) => {
    values.createdAt = new Date();
    axios
      .post(baseURL, values)
      .then((res) => {
        // console.log(res.status);
        if (res.status === 201) {
          alert('Successfully Created');
          props.history.push('/state/list');
        } else Promise.reject();
      })
      .catch((err) => alert('Something went wrong'));
    // console.log('Form data', values);
  };

  // useEffect(() => {
  //   axios
  //     .get(baseURL + props.match.params.slug)
  //     .then((res) => {
  //       const { id, name, createdAt } = res.data;
  //       setFormValues({ id, name, createdAt });
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-8">
          <h2>Create New Record</h2>
        </div>
        <div className="col" align="right"></div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col">
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <FormikControl
                    control="hidden"
                    type="text"
                    label="ID"
                    name="id"
                    className="form-control"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="State Name:"
                    name="name"
                    className="form-control"
                  />
                  <FormikControl
                    control="hidden"
                    type="text"
                    label="Created"
                    name="createdAt"
                    className="form-control"
                    disabled="true"
                  />
                  <hr />
                  <Link to={'/state/List'} className="btn btn-warning">
                    Back
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={formik.isSubmitting}
                  >
                    Create
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default Create;
