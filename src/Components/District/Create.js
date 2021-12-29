// *****  Import Modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import FormikControl from '../../Components/Formik/Control';

const DistrictCreate = (props) => {
  // ***** setting variable
  const baseURL =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/district';
  const stateURL =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/state';
  // console.log(baseURL + props.match.params.slug);
  const latestdate = Date();
  const [stateValue, setStateValue] = useState([]);
  const [formValues, setFormValues] = useState({
    id: '',
    dname: '',
    dstate: '',
    dcreatedAt: '',
  });

  const [selected, setSelected] = useState('');
  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };
  const validationSchema = Yup.object({
    dname: Yup.string().required('Required'),
    dstate: Yup.string().required('Required'),
    // course: Yup.string().required('Required'),
    // courseDate: Yup.date().required('Required').nullable(),
  });
  const onSubmit = (values) => {
    // console.log('Form data', values);
    values.dcreatedAt = new Date();
    axios
      .post(baseURL, values)
      .then((res) => {
        // console.log(baseURL);
        // console.log(values);
        if (res.status === 201) {
          alert('Successfully Created');
          props.history.push('/district/list');
        } else Promise.reject();
      })
      .catch((err) => alert('Something went wrong'));
    // console.log('Form data', values);
  };

  useEffect(() => {
    async function fetchStateData() {
      axios
        .get(stateURL)
        .then((response) => {
          // console.log(response.data);
          setStateValue(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchStateData();
  }, []);

  // ***** return
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
            onSubmit={onSubmit}
            setFieldValue
          >
            {(formik) => {
              return (
                <Form>
                  <FormikControl
                    className="form-control"
                    control="input"
                    type="text"
                    label="District Name"
                    name="dname"
                    disabled={formik.isSubmitting}
                  />
                  <div className="form-group">
                    <label for="dstate">State Name: </label>
                    <Field
                      name="dstate"
                      as="select"
                      className="form-control"
                      disabled={formik.isSubmitting}
                    >
                      <option value="">Select State</option>
                      {stateValue.map((value) => (
                        <option value={value.name} key={value.id}>
                          {value.name}
                        </option>
                        // <option value={value.name} key={value.id}>
                        //   {value.name}
                        // </option>
                      ))}
                      {/* <option value="green">Green</option> */}
                    </Field>
                    {/* {formik.dstate ? 'Hide' : 'Show'} */}
                    {formik.errors.dstate ? (
                      <div className="d-block invalid-feedback">
                        {formik.errors.dstate}
                      </div>
                    ) : null}
                  </div>
                  <hr />
                  <Link to={'/district/List'} className="btn btn-warning">
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
export default DistrictCreate;
