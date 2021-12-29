// *****  Import Modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import FormikControl from '../../Components/Formik/Control';

const DistrictEdit = (props) => {
  // ***** setting variable
  const baseURL =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/district/';
  const stateURL =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/state';
  // ***** setting useState
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
  // ***** setting validation schema
  const validationSchema = Yup.object({
    dname: Yup.string().required('Required'),
    dstate: Yup.string().required('Required'),
    // course: Yup.string().required('Required'),
    // courseDate: Yup.date().required('Required').nullable(),
  });
  // ***** setting onSubmit
  const onSubmit = (values) => {
    // console.log('Form data', values);
    values.dcreatedAt = new Date();
    axios
      .put(baseURL + props.match.params.slug, values)
      .then((res) => {
        // console.log(baseURL);
        // console.log(values);
        if (res.status === 200) {
          alert('Successfully Updated');
          props.history.push('/district/list');
        } else Promise.reject();
      })
      .catch((err) => alert('Something went wrong'));

    // console.log('Form data', values);
  };

  const defaultValue = (options, value) => {
    console.log('value here', value);
    return options ? options.find((option) => option.value === value) : '';
  };
  // ***** fetchStateData
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
  // ***** fetchDistrictData
  useEffect(() => {
    async function fetchDistrictData() {
      axios
        .get(baseURL + props.match.params.slug)
        .then((response) => {
          const { id, dname, dstate, dcreatedAt } = response.data;
          setFormValues({ id, dname, dstate, dcreatedAt });
        })
        .catch((error) => console.log(error));

      // .get(baseURL)
      // .then((response) => {
      //   // console.log(response.data);
      //   setFormValues(response.data);
      // })
      // .catch((error) => {
      //   console.log(error);
    }

    fetchDistrictData();
  }, []);
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
                    name="dname"
                    className="form-control"
                  />
                  <div className="form-group">
                    <label for="dstate">State Name: </label>
                    <Field
                      name="dstate"
                      as="select"
                      className="form-control"
                      disabled={formik.isSubmitting}
                      // value={defaultValue(stateValue.dstate, formValues)}
                      // options={stateValue}
                    >
                      <option value="">Select State</option>
                      {stateValue.map((value) => (
                        <option value={value.name} key={value.id}>
                          {value.name}
                        </option>
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
                  <FormikControl
                    control="input"
                    type="text"
                    label="Created"
                    name="dcreatedAt"
                    className="form-control"
                    disabled
                  />
                  <hr />
                  <Link to={'/district/list'} className="btn btn-warning">
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
export default DistrictEdit;
