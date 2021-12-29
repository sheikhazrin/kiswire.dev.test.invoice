// CustomerEdit Component for update data

// Import Modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import FormikControl from '../../Components/Formik/Control';

const StateEdit = (props) => {
  const baseURL =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/state/';
  // console.log(baseURL + props.match.params.slug);
  const latestdate = Date();
  const [formValues, setFormValues] = useState({
    id: '',
    name: '',
    createdAt: '',
  });
  // ****** datatable validation schema
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
  // ****** onSubmmit
  const onSubmit = (values) => {
    values.createdAt = new Date();
    axios
      .put(baseURL + props.match.params.slug, values)
      .then((res) => {
        if (res.status === 200) {
          alert('Successfully Update');
          props.history.push('/state/list');
        } else Promise.reject();
      })
      .catch((err) => alert('Something went wrong'));
    // console.log('Form data', values);
  };
  // ****** Load Data
  useEffect(() => {
    axios
      .get(baseURL + props.match.params.slug)
      .then((res) => {
        const { id, name, createdAt } = res.data;
        setFormValues({ id, name, createdAt });
      })
      .catch((err) => console.log(err));
  }, []);

  // ****** return
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-8">
          <h2>Update Record</h2>
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
                    control="input"
                    type="text"
                    label="Created"
                    name="createdAt"
                    className="form-control"
                    disabled
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
                    Update
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
export default StateEdit;
