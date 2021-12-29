// *****  Import Modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import FormikControl from '../../Components/Formik/Control';

const CustomerEdit = (props) => {
  // ***** setting variable
  const baseURL =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/customer/';
  const stateURL =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/state';
  const districtURL =
    'https://61c4403ef1af4a0017d99432.mockapi.io/api/kiswire/dev/district';
  // ***** setting useState
  const latestdate = Date();
  const [stateValue, setStateValue] = useState([]);
  const [districtValue, setDistrictValue] = useState([]);
  const [formValues, setFormValues] = useState({
    id: '',
    cname: '',
    caddress: '',
    cstate: '',
    cdistrict: '',
    dcreatedAt: '',
  });
  const [selected, setSelected] = useState('');
  const StateHandler = (event) => {
    // console.log(event);
    const { value } = event.target;
    formValues.cstate = value;
    LoadDistrict();
  };
  // ***** Refresh LoadDistrict
  const LoadDistrict = () => {
    // console.log('LoadDistrict');
    axios
      .get(districtURL)
      .then((response) => {
        // console.log(response.data);
        setDistrictValue(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ***** setting validation schema
  const validationSchema = Yup.object({
    cname: Yup.string().required('Required'),
    cname: Yup.string().required('Required'),
    cstate: Yup.string().required('Required'),
    cdistrict: Yup.string().required('Required'),
    // courseDate: Yup.date().required('Required').nullable(),
  });
  // ***** setting onSubmit
  const onSubmit = (values) => {
    // console.log('Form data', values);
    values.ccreatedAt = new Date();
    axios
      .put(baseURL + props.match.params.slug, values)
      .then((res) => {
        // console.log(baseURL);
        // console.log(values);
        if (res.status === 200) {
          alert('Successfully Updated');
          props.history.push('/customer/list');
        } else Promise.reject();
      })
      .catch((err) => alert('Something went wrong'));
  };

  const defaultValue = (options, value) => {
    console.log('value here', value);
    return options ? options.find((option) => option.value === value) : '';
  };
  // ***** Load State Data
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

  // ***** Load District Data
  useEffect(() => {
    async function fetchDistrictData() {
      axios
        .get(districtURL)
        .then((response) => {
          // console.log(response.data);
          setDistrictValue(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchDistrictData();
  }, []);
  // ***** fetchCustomerData
  useEffect(() => {
    async function fetchCustomerData() {
      axios
        .get(baseURL + props.match.params.slug)
        .then((response) => {
          const { id, cname, caddress, cstate, cdistrict, ccreatedAt } =
            response.data;
          setFormValues({ id, cname, caddress, cstate, cdistrict, ccreatedAt });
        })
        .catch((error) => console.log(error));
    }

    fetchCustomerData();
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
                    disabled={formik.isSubmitting}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="Customer Name:"
                    name="cname"
                    className="form-control"
                    disabled={formik.isSubmitting}
                  />
                  <FormikControl
                    control="textarea"
                    type="text"
                    label="Customer Adress:"
                    name="caddress"
                    className="form-control"
                    disabled={formik.isSubmitting}
                  />
                  <div className="row justify-content-md-center">
                    <div className="col-6">
                      <div className="form-group">
                        <label for="cstate">State: </label>
                        <Field
                          name="cstate"
                          as="select"
                          className="form-control"
                          disabled={formik.isSubmitting}
                          onChange={StateHandler}
                          // value={defaultValue(stateValue.cstate, formValues)}
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
                        {formik.errors.cstate ? (
                          <div className="d-block invalid-feedback">
                            {formik.errors.cstate}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label for="cdistrict">District: </label>
                        <Field
                          name="cdistrict"
                          as="select"
                          className="form-control"
                          disabled={formik.isSubmitting}
                          // value={defaultValue(stateValue.cdistrict, formValues)}
                          // options={stateValue}
                        >
                          <option value="">Select District</option>
                          {districtValue
                            .filter(
                              (state) => state.dstate === formValues.cstate
                            )
                            .map((value) => (
                              <option value={value.dname} key={value.id}>
                                {value.dname}
                              </option>
                            ))}
                          {/* <option value="green">Green</option> */}
                        </Field>
                        {/* {formik.dstate ? 'Hide' : 'Show'} */}
                        {formik.errors.cdistrict ? (
                          <div className="d-block invalid-feedback">
                            {formik.errors.cdistrict}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Created"
                    name="ccreatedAt"
                    className="form-control"
                    disabled
                  />
                  <hr />
                  <Link to={'/customer/list'} className="btn btn-warning">
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
export default CustomerEdit;
